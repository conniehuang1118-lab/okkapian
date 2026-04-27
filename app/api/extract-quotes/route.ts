import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `你是一个资深的小红书内容创作者和运营专家。

用户会给你一段内容（可能是网页文章、播客文稿、会议记录、读书笔记、产品介绍等）。
请基于这段内容，帮用户生成 3 到 5 张适合发小红书的卡片文案。

要求：
- 第一张作为封面/标题卡，内容是一个吸引眼球的标题（15-25字），要有小红书爆款标题的风格（可以用 emoji、反问、数字、悬念等手法）
- 后面每张卡片是一个独立的知识点/观点/干货，字数控制在 30-60 字
- 不要照搬原文，要用小红书的口吻重新改写（口语化、有态度、有共鸣感）
- 内容要有逻辑递进，像一组连贯的小红书套图
- 必须严格按照以下 JSON 数组格式返回，不要包含任何其他文字：

[{ "content": "卡片文案内容" }, ...]

示例风格参考：
- 封面："打工人必看！这 5 个认知升级让我少走 3 年弯路 🚀"
- 内容卡："别把「我觉得」当成「用户需要」。真正的产品思维，是先找到痛点，再用最简单的方式解决它。"`;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { text: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text } = body;
  if (!text || text.trim().length < 20) {
    return Response.json(
      { error: "Text too short — need at least 20 characters" },
      { status: 400 }
    );
  }

  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  const prompt = `${SYSTEM_PROMPT}\n\n---\n\n以下是用户提供的原始内容：\n\n${text.slice(0, 8000)}`;
  const ai = new GoogleGenAI({ apiKey });

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const raw = response.text ?? "";
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return Response.json(
          { error: "AI did not return valid JSON", raw },
          { status: 502 }
        );
      }

      const quotes: { content: string }[] = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(quotes) || quotes.length === 0) {
        return Response.json(
          { error: "AI returned empty array", raw },
          { status: 502 }
        );
      }

      return Response.json({ quotes, model });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isRetryable =
        msg.includes("503") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("overloaded") ||
        msg.includes("404");
      if (isRetryable && model !== models[models.length - 1]) {
        continue;
      }
      return Response.json({ error: msg }, { status: 500 });
    }
  }

  return Response.json({ error: "All models unavailable" }, { status: 503 });
}
