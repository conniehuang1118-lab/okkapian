import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `你是一个资深的小红书内容运营专家。
用户会给你一段长文（可能是文章、播客文稿、会议记录、读书笔记等）。
请从中提炼出 3 到 5 个最能引起共鸣、最有传播价值的金句或核心观点。

要求：
- 每个金句字数控制在 20-50 字
- 金句要有情绪张力，适合做社交媒体分享图
- 优先选择有洞察力的、反直觉的、能引发讨论的句子
- 如果原文有特别精彩的原句，优先保留原文而非改写
- 必须严格按照以下 JSON 数组格式返回，不要包含任何其他文字：

[{ "content": "金句内容" }, ...]`;

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

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${SYSTEM_PROMPT}\n\n---\n\n以下是用户的长文：\n\n${text.slice(0, 8000)}`,
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

    return Response.json({ quotes });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
