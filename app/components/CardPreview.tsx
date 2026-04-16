"use client";

import { QuoteIcon } from "@/app/lib/icons";
import type { Theme, FontOption, AlignOption, PaddingOption } from "@/app/lib/themes";

interface CardPreviewProps {
  text: string;
  author: string;
  theme: Theme;
  font: FontOption;
  align: AlignOption;
  padding: PaddingOption;
  showQuotes: boolean;
  onTextChange: (text: string) => void;
  onAuthorChange: (author: string) => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function CardPreview({
  text,
  author,
  theme,
  font,
  align,
  padding,
  showQuotes,
  onTextChange,
  onAuthorChange,
  cardRef,
}: CardPreviewProps) {
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

  return (
    <div
      className="flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-auto min-h-0"
      style={{ background: theme.canvasBg }}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400/30" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400/30" />

      <div
        ref={cardRef}
        className="relative w-full max-w-[640px] rounded-2xl shadow-lg"
        style={{
          background: theme.cardBg,
          padding: `${padding}px`,
        }}
      >
        {showQuotes && (
          <div className={`flex ${quoteAlign} mb-6`}>
            <QuoteIcon color={theme.iconColor} size={48} />
          </div>
        )}

        <div
          className={`${alignClass} text-lg sm:text-xl leading-loose whitespace-pre-wrap break-words`}
          style={{
            color: theme.textColor,
            fontFamily: font.cssVar,
          }}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="在这里输入你的文案..."
          onBlur={(e) => onTextChange(e.currentTarget.textContent || "")}
        >
          {text}
        </div>

        <div
          className="my-8 h-px"
          style={{ backgroundColor: theme.separatorColor }}
        />

        <div className={alignClass}>
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              color: theme.authorColor,
              fontFamily: "var(--font-inter), var(--font-noto-sans-sc), sans-serif",
            }}
            contentEditable
            suppressContentEditableWarning
            data-placeholder="作者名"
            onBlur={(e) => onAuthorChange(e.currentTarget.textContent || "")}
          >
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}
