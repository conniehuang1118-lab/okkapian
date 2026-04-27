import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `你是一个资深的小红书博主，擅长写种草推荐和干货分享帖。

用户会给你一段内容（可能是从某个网站/工具/产品页面抓取的文本）。
请基于这段内容，帮用户生成一组小红书套图卡片文案（4-6 张）。

**每张卡片的定位：**
1. 封面卡：一句吸引眼球的标题（15-30字），小红书爆款风格，可用 emoji、反问、数字
2. 介绍卡："这是什么"——用一句话说清这个工具/内容是干什么的，解决什么问题
3. 亮点卡："为什么推荐"——3-5 个核心亮点，每个亮点一句话，用 emoji 列表
4. 使用体验/教程卡：简单说怎么用、上手体验如何
5. 价格/免费信息卡（如果能判断出来的话）：免费还是付费、有没有替代品
6. 总结卡：一句话总结推荐理由 + 网站地址（如果原文中有的话）

**文案风格要求：**
- 小红书口吻：口语化、真诚、像朋友推荐给朋友
- 每张卡片 30-80 字，不要太长
- 善用 emoji 增加可读性（但不要过度）
- 如果是工具推荐，突出"好用""免费""效率""宝藏"这类种草词
- 不要用"本文""该产品"这种书面语

**必须严格按照以下 JSON 数组格式返回，不要包含任何其他文字：**
[{ "content": "卡片文案内容" }, ...]`;

async function callWithRetry(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  maxRetries = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      return response.text ?? "";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const isRetryable = msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("overloaded");
      if (isRetryable && attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { text: string; url?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text, url } = body;
  if (!text || text.trim().length < 20) {
    return Response.json(
      { error: "Text too short — need at least 20 characters" },
      { status: 400 }
    );
  }

  const urlContext = url ? `\n\n原始网址：${url}` : "";
  const prompt = `${SYSTEM_PROMPT}\n\n---\n\n以下是用户提供的原始内容：${urlContext}\n\n${text.slice(0, 8000)}`;
  const ai = new GoogleGenAI({ apiKey });

  const models = ["gemini-3-flash", "gemini-2.5-flash"];
  let lastError = "";

  for (const model of models) {
    try {
      const raw = await callWithRetry(ai, model, prompt, 2);

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
      lastError = err instanceof Error ? err.message : String(err);
      continue;
    }
  }

  return Response.json({ error: lastError || "All models failed" }, { status: 503 });
}
