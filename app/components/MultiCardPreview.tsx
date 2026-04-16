"use client";

import { useRef } from "react";
import { QuoteIcon } from "@/app/lib/icons";
import type { Theme, FontOption, AlignOption, PaddingOption } from "@/app/lib/themes";
import type { CardPage } from "@/app/lib/textSplitter";

export type AspectRatio = "3:4" | "1:1" | "4:3";

const ratioStyles: Record<AspectRatio, { label: string; className: string }> = {
  "3:4": { label: "小红书", className: "aspect-[3/4]" },
  "1:1": { label: "朋友圈", className: "aspect-square" },
  "4:3": { label: "公众号", className: "aspect-[4/3]" },
};

interface MultiCardPreviewProps {
  pages: CardPage[];
  currentPage: number;
  author: string;
  theme: Theme;
  font: FontOption;
  align: AlignOption;
  padding: PaddingOption;
  showQuotes: boolean;
  ratio: AspectRatio;
  onPageChange: (index: number) => void;
  onTextChange: (pageIndex: number, text: string) => void;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function MultiCardPreview({
  pages,
  currentPage,
  author,
  theme,
  font,
  align,
  padding,
  showQuotes,
  ratio,
  onPageChange,
  onTextChange,
  cardRefs,
}: MultiCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  const quoteAlign =
    align === "center"
      ? "items-center"
      : align === "right"
        ? "items-end"
        : "items-start";

  const page = pages[currentPage];
  if (!page) return null;

  const fontSize =
    page.text.length <= 30
      ? "text-2xl sm:text-3xl"
      : page.text.length <= 80
        ? "text-lg sm:text-xl"
        : "text-base sm:text-lg";

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-auto min-h-0"
      style={{ background: theme.canvasBg }}
      ref={containerRef}
    >
      {/* Left/Right arrows */}
      {pages.length > 1 && (
        <>
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
              currentPage === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white/80 shadow-sm hover:bg-white hover:shadow-md"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={() => onPageChange(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
            className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
              currentPage === pages.length - 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 bg-white/80 shadow-sm hover:bg-white hover:shadow-md"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {/* Card */}
      <div
        ref={(el) => { cardRefs.current[currentPage] = el; }}
        className={`relative w-full max-w-[480px] ${ratioStyles[ratio].className} rounded-2xl shadow-lg flex flex-col justify-center overflow-hidden`}
        style={{
          background: theme.cardBg,
          padding: `${padding}px`,
        }}
      >
        {showQuotes && (
          <div className={`flex ${quoteAlign} mb-4`}>
            <QuoteIcon color={theme.iconColor} size={40} />
          </div>
        )}

        <div
          className={`${alignClass} ${fontSize} leading-loose whitespace-pre-wrap break-words flex-1 flex items-center`}
          style={{
            color: theme.textColor,
            fontFamily: font.cssVar,
          }}
        >
          <div
            className="w-full"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onTextChange(currentPage, e.currentTarget.textContent || "")}
          >
            {page.text}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div
            className="h-px mb-4"
            style={{ backgroundColor: theme.separatorColor }}
          />
          <div className={alignClass}>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                color: theme.authorColor,
                fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
              }}
            >
              {author}
            </span>
          </div>
        </div>

        {/* Page indicator on card */}
        {pages.length > 1 && (
          <div
            className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px]"
            style={{
              backgroundColor: theme.separatorColor,
              color: theme.authorColor,
            }}
          >
            {currentPage + 1} / {pages.length}
          </div>
        )}
      </div>

      {/* Dots pagination */}
      {pages.length > 1 && (
        <div className="flex items-center gap-1.5 mt-4">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`rounded-full transition-all ${
                i === currentPage
                  ? "w-6 h-2 bg-gray-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
