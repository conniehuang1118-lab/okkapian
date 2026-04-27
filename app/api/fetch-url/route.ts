import * as cheerio from "cheerio";

export async function POST(request: Request) {
  let body: { url: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url } = body;
  if (!url || !/^https?:\/\/.+/.test(url)) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return Response.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: 502 }
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").text().trim() || $("h1").first().text().trim();
    const metaDesc =
      $('meta[name="description"]').attr("content")?.trim() ||
      $('meta[property="og:description"]').attr("content")?.trim() ||
      "";
    const ogTitle =
      $('meta[property="og:title"]').attr("content")?.trim() || "";

    // Remove non-content elements
    $(
      "script,style,nav,header,footer,aside,iframe,noscript,svg,form,button,select,input,label,.ad,.ads,.sidebar,.comment,.comments,.nav,.menu,.footer,.header,[aria-hidden=true]"
    ).remove();

    const selectors = [
      "article",
      '[role="main"]',
      "main",
      ".post-content",
      ".article-content",
      ".entry-content",
      ".content",
      "#content",
      ".post",
      ".article",
    ];

    let text = "";
    for (const sel of selectors) {
      const el = $(sel);
      if (el.length && el.text().trim().length > 100) {
        text = el.text();
        break;
      }
    }

    if (!text) {
      text = $("body").text();
    }

    text = text
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\s+|\s+$/gm, "")
      .trim();

    // Build a rich context even if body text is poor (SPA sites)
    const parts: string[] = [];
    if (title) parts.push(`网站标题：${title}`);
    if (ogTitle && ogTitle !== title) parts.push(`页面标题：${ogTitle}`);
    if (metaDesc) parts.push(`网站描述：${metaDesc}`);
    parts.push(`网址：${url}`);

    if (text.length > 50) {
      parts.push(`\n页面正文内容：\n${text.slice(0, 7000)}`);
    }

    const finalText = parts.join("\n");

    if (finalText.length < 20) {
      return Response.json(
        { error: "无法从该链接提取到有效内容" },
        { status: 422 }
      );
    }

    return Response.json({ text: finalText, title: title || ogTitle });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
