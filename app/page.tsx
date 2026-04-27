"use client";

import { useState, useRef, useCallback } from "react";
import { toPng, toSvg } from "html-to-image";
import JSZip from "jszip";
import Header from "@/app/components/Header";
import MultiCardPreview from "@/app/components/MultiCardPreview";
import type { AspectRatio } from "@/app/components/MultiCardPreview";
import Toolbar from "@/app/components/Toolbar";
import AboutModal from "@/app/components/AboutModal";
import PasteEntry from "@/app/components/PasteEntry";
import OffscreenCards from "@/app/components/OffscreenCards";
import ToastContainer, { showToast } from "@/app/components/Toast";
import { autoStyle } from "@/app/lib/autoStyle";
import { splitText, type CardPage } from "@/app/lib/textSplitter";
import {
  themes,
  fontOptions,
  type Theme,
  type FontOption,
  type AlignOption,
  type PaddingOption,
} from "@/app/lib/themes";

type Mode = "paste" | "edit";

export default function Home() {
  const [mode, setMode] = useState<Mode>("paste");

  const [pages, setPages] = useState<CardPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [author, setAuthor] = useState("OKKAPIAN");

  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [font, setFont] = useState<FontOption>(fontOptions[0]);
  const [align, setAlign] = useState<AlignOption>("center");
  const [padding, setPadding] = useState<PaddingOption>(64);
  const [showQuotes, setShowQuotes] = useState(true);
  const [ratio, setRatio] = useState<AspectRatio>("3:4");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const visibleCardRef = useRef<(HTMLDivElement | null)[]>([]);
  const exportCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleGenerate = useCallback(
    (text: string, authorName: string) => {
      const style = autoStyle(text);
      setTheme(style.theme);
      setFont(style.font);
      setAlign(style.align);
      setPadding(style.padding);
      setShowQuotes(style.showQuotes);

      setRawText(text);
      const split = splitText(text);
      setPages(split);
      setCurrentPage(0);
      setAuthor(authorName);
      setMode("edit");
    },
    []
  );

  const handleAIGenerate = useCallback(
    async (text: string, authorName: string, sourceUrl?: string) => {
      setAiLoading(true);
      try {
        const res = await fetch("/api/extract-quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, url: sourceUrl }),
        });
        const data = await res.json();

        if (!res.ok || !data.quotes) {
          showToast(data.error || "AI 提取失败，请重试", "error");
          return;
        }

        const quotes: { content: string }[] = data.quotes;
        const aiPages: CardPage[] = quotes.map((q, i) => ({
          text: q.content,
          isCover: i === 0,
          pageIndex: i,
        }));

        const firstQuote = quotes[0]?.content || text;
        const style = autoStyle(firstQuote);
        setTheme(style.theme);
        setFont(style.font);
        setAlign("center");
        setPadding(64);
        setShowQuotes(true);

        setRawText(text);
        setPages(aiPages);
        setCurrentPage(0);
        setAuthor(authorName);
        setMode("edit");

        showToast(`AI 生成了 ${quotes.length} 张小红书卡片`);
      } catch {
        showToast("网络错误，请重试", "error");
      } finally {
        setAiLoading(false);
      }
    },
    []
  );

  const handleTextChange = useCallback(
    (pageIndex: number, text: string) => {
      setPages((prev) =>
        prev.map((p, i) => (i === pageIndex ? { ...p, text } : p))
      );
    },
    []
  );

  const [rawText, setRawText] = useState("");

  const handleBack = useCallback(() => {
    setMode("paste");
  }, []);

  const handleMergePages = useCallback(() => {
    const merged = pages.map((p) => p.text).join("\n\n");
    setPages([{ text: merged, isCover: true, pageIndex: 0 }]);
    setCurrentPage(0);
  }, [pages]);

  const handleResplit = useCallback(() => {
    if (!rawText) return;
    const split = splitText(rawText);
    setPages(split);
    setCurrentPage(0);
  }, [rawText]);

  // ── Export helpers ──

  async function safeToPng(el: HTMLElement) {
    try {
      return await toPng(el, { pixelRatio: 3, cacheBust: true });
    } catch {
      return await toPng(el, { pixelRatio: 3, cacheBust: true, skipFonts: true });
    }
  }

  async function safeToSvg(el: HTMLElement) {
    try {
      return await toSvg(el, { cacheBust: true });
    } catch {
      return await toSvg(el, { cacheBust: true, skipFonts: true });
    }
  }

  const handleExportPNG = useCallback(async () => {
    const el = visibleCardRef.current[currentPage];
    if (!el) return;
    try {
      const dataUrl = await safeToPng(el);
      const link = document.createElement("a");
      link.download = `okkapian-${currentPage + 1}.png`;
      link.href = dataUrl;
      link.click();
      showToast("PNG 已保存");
    } catch {
      showToast("导出失败，请重试", "error");
    }
  }, [currentPage]);

  const handleExportSVG = useCallback(async () => {
    const el = visibleCardRef.current[currentPage];
    if (!el) return;
    try {
      const dataUrl = await safeToSvg(el);
      const link = document.createElement("a");
      link.download = `okkapian-${currentPage + 1}.svg`;
      link.href = dataUrl;
      link.click();
      showToast("SVG 已保存");
    } catch {
      showToast("导出失败，请重试", "error");
    }
  }, [currentPage]);

  const handleCopyImage = useCallback(async () => {
    const el = visibleCardRef.current[currentPage];
    if (!el) return;
    try {
      const dataUrl = await safeToPng(el);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      showToast("图片已复制到剪贴板");
    } catch {
      showToast("复制失败，请重试", "error");
    }
  }, [currentPage]);

  // ── Export: all pages via offscreen render ──

  const handleExportAll = useCallback(async () => {
    if (pages.length <= 1) {
      handleExportPNG();
      return;
    }
    setExporting(true);
    showToast(`正在导出 ${pages.length} 张卡片…`);

    await new Promise((r) => setTimeout(r, 300));

    try {
      const zip = new JSZip();
      for (let i = 0; i < pages.length; i++) {
        const el = exportCardRefs.current[i];
        if (!el) continue;
        const dataUrl = await safeToPng(el);
        const base64 = dataUrl.split(",")[1];
        zip.file(`okkapian-${i + 1}.png`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.download = `okkapian-cards-${Date.now()}.zip`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      showToast(`${pages.length} 张卡片已打包下载`);
    } catch {
      showToast("批量导出失败，请重试", "error");
    } finally {
      setExporting(false);
    }
  }, [pages, handleExportPNG]);

  const handleCopyURL = useCallback(() => {
    const params = new URLSearchParams({
      theme: theme.id,
      font: font.id,
      align,
      padding: String(padding),
      quotes: showQuotes ? "on" : "off",
      ratio,
    });
    const url = `${window.location.origin}/#${params.toString()}`;
    navigator.clipboard.writeText(url).then(
      () => showToast("链接已复制"),
      () => showToast("复制失败", "error")
    );
  }, [theme, font, align, padding, showQuotes, ratio]);

  // ── Paste mode ──
  if (mode === "paste") {
    return (
      <>
        <PasteEntry onGenerate={handleGenerate} onAIGenerate={handleAIGenerate} aiLoading={aiLoading} />
        <ToastContainer />
      </>
    );
  }

  // ── Edit mode ──
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
        onCopyImage={handleCopyImage}
        onCopyURL={handleCopyURL}
        onAbout={() => setAboutOpen(true)}
        onBack={handleBack}
        onExportAll={pages.length > 1 ? handleExportAll : undefined}
        pageCount={pages.length}
      />
      <MultiCardPreview
        pages={pages}
        currentPage={currentPage}
        author={author}
        theme={theme}
        font={font}
        align={align}
        padding={padding}
        showQuotes={showQuotes}
        ratio={ratio}
        onPageChange={setCurrentPage}
        onTextChange={handleTextChange}
        cardRefs={visibleCardRef}
        onMerge={pages.length > 1 ? handleMergePages : undefined}
        onResplit={pages.length === 1 && rawText.length > 200 ? handleResplit : undefined}
      />
      <Toolbar
        theme={theme}
        font={font}
        align={align}
        padding={padding}
        showQuotes={showQuotes}
        ratio={ratio}
        onThemeChange={setTheme}
        onFontChange={setFont}
        onAlignChange={setAlign}
        onPaddingChange={setPadding}
        onQuotesChange={setShowQuotes}
        onRatioChange={setRatio}
      />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ToastContainer />

      {/* Offscreen: all cards rendered simultaneously for batch export */}
      {exporting && (
        <OffscreenCards
          pages={pages}
          author={author}
          theme={theme}
          font={font}
          align={align}
          padding={padding}
          showQuotes={showQuotes}
          ratio={ratio}
          cardRefs={exportCardRefs}
        />
      )}
    </div>
  );
}
