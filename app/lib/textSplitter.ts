export interface CardPage {
  text: string;
  isCover: boolean;
  pageIndex: number;
}

const MAX_CHARS_PER_CARD = 200;
const IDEAL_CHARS_PER_CARD = 160;

export function splitText(raw: string): CardPage[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  if (trimmed.length <= MAX_CHARS_PER_CARD) {
    return [{ text: trimmed, isCover: true, pageIndex: 0 }];
  }

  const paragraphs = trimmed
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return splitBySentences(trimmed);
  }

  return mergeShortParagraphs(paragraphs);
}

function splitBySentences(text: string): CardPage[] {
  const sentences = text.split(/(?<=[。！？；\n])/).filter((s) => s.trim());
  const pages: CardPage[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (
      current.length + sentence.length > MAX_CHARS_PER_CARD &&
      current.length > 0
    ) {
      pages.push({
        text: current.trim(),
        isCover: pages.length === 0,
        pageIndex: pages.length,
      });
      current = sentence;
    } else {
      current += sentence;
    }
  }

  if (current.trim()) {
    pages.push({
      text: current.trim(),
      isCover: pages.length === 0,
      pageIndex: pages.length,
    });
  }

  return pages.length > 0
    ? pages
    : [{ text: text.trim(), isCover: true, pageIndex: 0 }];
}

function mergeShortParagraphs(paragraphs: string[]): CardPage[] {
  const pages: CardPage[] = [];
  let current = "";

  for (const para of paragraphs) {
    if (para.length > MAX_CHARS_PER_CARD) {
      if (current.trim()) {
        pages.push({
          text: current.trim(),
          isCover: pages.length === 0,
          pageIndex: pages.length,
        });
        current = "";
      }
      const subPages = splitBySentences(para);
      for (const sp of subPages) {
        pages.push({
          text: sp.text,
          isCover: pages.length === 0,
          pageIndex: pages.length,
        });
      }
    } else if (
      current.length + para.length + 2 > IDEAL_CHARS_PER_CARD &&
      current.length > 0
    ) {
      pages.push({
        text: current.trim(),
        isCover: pages.length === 0,
        pageIndex: pages.length,
      });
      current = para;
    } else {
      current += (current ? "\n\n" : "") + para;
    }
  }

  if (current.trim()) {
    pages.push({
      text: current.trim(),
      isCover: pages.length === 0,
      pageIndex: pages.length,
    });
  }

  return pages;
}

export function extractTitle(text: string): string {
  const firstLine = text.split(/[\n。！？]/)[0]?.trim() || "";
  if (firstLine.length <= 20) return firstLine;
  return firstLine.slice(0, 18) + "…";
}
