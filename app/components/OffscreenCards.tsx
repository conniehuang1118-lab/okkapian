"use client";

import { QuoteIcon } from "@/app/lib/icons";
import type { Theme, FontOption, AlignOption, PaddingOption } from "@/app/lib/themes";
import type { AspectRatio } from "@/app/components/MultiCardPreview";
import type { CardPage } from "@/app/lib/textSplitter";

const ratioStyles: Record<AspectRatio, string> = {
  "3:4": "aspect-[3/4]",
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
};

interface OffscreenCardsProps {
  pages: CardPage[];
  author: string;
  theme: Theme;
  font: FontOption;
  align: AlignOption;
  padding: PaddingOption;
  showQuotes: boolean;
  ratio: AspectRatio;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function OffscreenCards({
  pages,
  author,
  theme,
  font,
  align,
  padding,
  showQuotes,
  ratio,
  cardRefs,
}: OffscreenCardsProps) {
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
      aria-hidden
      className="fixed pointer-events-none"
      style={{ left: "-9999px", top: 0 }}
    >
      {pages.map((page, i) => {
        const fontSize =
          page.text.length <= 30
            ? "text-2xl"
            : page.text.length <= 80
              ? "text-xl"
              : "text-lg";

        const hasBg = !!page.bgImage;

        return (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`w-[480px] ${ratioStyles[ratio]} rounded-2xl shadow-lg flex flex-col justify-center overflow-hidden mb-4 relative`}
            style={{
              background: theme.cardBg,
              backgroundImage: page.bgImage ? `url(${page.bgImage})` : theme.cardBgImage ? `url(${theme.cardBgImage})` : undefined,
              backgroundSize: (page.bgImage || theme.cardBgImage) ? "cover" : undefined,
              backgroundPosition: (page.bgImage || theme.cardBgImage) ? "center" : undefined,
              backgroundRepeat: (page.bgImage || theme.cardBgImage) ? "no-repeat" : undefined,
              padding: `${padding}px`,
            }}
          >
            {hasBg && <div className="absolute inset-0 bg-black/40" />}

            <div className="relative z-10 flex flex-col justify-center flex-1">
              {showQuotes && (
                <div className={`flex ${quoteAlign} mb-4`}>
                  <QuoteIcon color={hasBg ? "#fff" : theme.iconColor} size={40} />
                </div>
              )}

              <div
                className={`${alignClass} ${fontSize} leading-loose whitespace-pre-wrap break-words flex-1 flex items-center`}
                style={{
                  color: hasBg ? "#ffffff" : theme.textColor,
                  fontFamily: font.cssVar,
                }}
              >
                <div className="w-full">{page.text}</div>
              </div>

              <div className="mt-auto pt-6">
                <div
                  className="h-px mb-4"
                  style={{ backgroundColor: hasBg ? "rgba(255,255,255,0.3)" : theme.separatorColor }}
                />
                <div className={alignClass}>
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{
                      color: hasBg ? "rgba(255,255,255,0.7)" : theme.authorColor,
                      fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
                    }}
                  >
                    {author}
                  </span>
                </div>
              </div>
            </div>

            {pages.length > 1 && (
              <div
                className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] z-10"
                style={{
                  backgroundColor: hasBg ? "rgba(0,0,0,0.4)" : theme.separatorColor,
                  color: hasBg ? "#fff" : theme.authorColor,
                }}
              >
                {i + 1} / {pages.length}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
