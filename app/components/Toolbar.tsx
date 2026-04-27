"use client";

import { useState, useRef, useEffect } from "react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "@/app/lib/icons";
import {
  themes,
  fontOptions,
  fontCategories,
  paddingOptions,
  type Theme,
  type FontOption,
  type AlignOption,
  type PaddingOption,
} from "@/app/lib/themes";
import type { AspectRatio } from "@/app/components/MultiCardPreview";

const ratioOptions: { value: AspectRatio; label: string }[] = [
  { value: "3:4", label: "3:4" },
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
];
import { useFavoriteFonts } from "@/app/lib/useFavoriteFonts";

interface ToolbarProps {
  theme: Theme;
  font: FontOption;
  align: AlignOption;
  padding: PaddingOption;
  showQuotes: boolean;
  ratio: AspectRatio;
  onThemeChange: (theme: Theme) => void;
  onFontChange: (font: FontOption) => void;
  onAlignChange: (align: AlignOption) => void;
  onPaddingChange: (padding: PaddingOption) => void;
  onQuotesChange: (show: boolean) => void;
  onRatioChange: (ratio: AspectRatio) => void;
}

function DropdownSelect({
  trigger,
  children,
  open,
  onToggle,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onToggle]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600"
      >
        {trigger}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 4.5 6 7.5 9 4.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[240px] z-50 max-h-[400px] overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
}

const themeGroups = [
  { key: "solid" as const, label: "经典" },
  { key: "gradient" as const, label: "渐变" },
  { key: "illustration" as const, label: "插画" },
];

function ThemeTabs({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const currentGroup = theme.group;
  const [activeTab, setActiveTab] = useState<"solid" | "gradient" | "illustration">(currentGroup);

  const filtered = themes.filter((t) => t.group === activeTab);

  return (
    <div className="px-2 pt-1.5 pb-1 w-[280px]">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-0.5 mb-2">
        {themeGroups.map((g) => (
          <button
            key={g.key}
            onClick={() => setActiveTab(g.key)}
            className={`flex-1 text-xs py-1.5 rounded-md transition-colors font-medium ${
              activeTab === g.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "solid" && (
        <div>
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${
                theme.id === t.id
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className="w-5 h-5 rounded-full border border-gray-200 shrink-0"
                style={{ background: t.preview }}
              />
              {t.name}
            </button>
          ))}
        </div>
      )}

      {activeTab === "gradient" && (
        <div className="grid grid-cols-2 gap-1">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-colors ${
                theme.id === t.id
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg border border-gray-200/60 shrink-0"
                style={{ background: t.preview }}
              />
              {t.name}
            </button>
          ))}
        </div>
      )}

      {activeTab === "illustration" && (
        <div className="grid grid-cols-3 gap-1">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] transition-colors ${
                theme.id === t.id
                  ? "ring-2 ring-gray-800 bg-gray-50 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div
                className="w-full aspect-[3/4] rounded-md border border-gray-200/60 shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${t.preview})` }}
              />
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill={filled ? "#f59e0b" : "none"}
      stroke={filled ? "#f59e0b" : "#ccc"}
      strokeWidth="1.2"
    >
      <path d="M7 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.7l-3.2 1.7.6-3.6L1.8 5.3l3.6-.5z" />
    </svg>
  );
}

export default function Toolbar({
  theme,
  font,
  align,
  padding,
  showQuotes,
  ratio,
  onThemeChange,
  onFontChange,
  onAlignChange,
  onPaddingChange,
  onQuotesChange,
  onRatioChange,
}: ToolbarProps) {
  const [openPanel, setOpenPanel] = useState<"theme" | "font" | null>(null);
  const { toggle: toggleFav, isFavorite, hydrated } = useFavoriteFonts();

  const favFonts = hydrated ? fontOptions.filter((f) => isFavorite(f.id)) : [];
  const nonFavFonts = hydrated ? fontOptions.filter((f) => !isFavorite(f.id)) : fontOptions;

  return (
    <div className="flex items-center justify-center px-4 pb-6 pt-2">
      <div className="flex items-center gap-0.5 bg-white rounded-2xl shadow-sm border border-gray-200/60 px-2 py-1.5 flex-wrap justify-center">
        {/* Theme */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">主题</span>
          <DropdownSelect
            open={openPanel === "theme"}
            onToggle={() => setOpenPanel(openPanel === "theme" ? null : "theme")}
            trigger={
              <div
                className="w-5 h-5 rounded-full border border-gray-200"
                style={
                  theme.group === "illustration"
                    ? { backgroundImage: `url(${theme.preview})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: theme.preview }
                }
              />
            }
          >
            <ThemeTabs theme={theme} onThemeChange={(t) => { onThemeChange(t); setOpenPanel(null); }} />
          </DropdownSelect>
        </div>

        <div className="w-px h-10 bg-gray-200 mx-1" />

        {/* Font */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">字体</span>
          <DropdownSelect
            open={openPanel === "font"}
            onToggle={() => setOpenPanel(openPanel === "font" ? null : "font")}
            trigger={
              <span className="text-sm font-medium">Aa</span>
            }
          >
            <div className="px-1 py-1">
              {/* Favorites section */}
              {favFonts.length > 0 && (
                <>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 px-3 pt-1.5 pb-1 flex items-center gap-1">
                    <StarIcon filled />
                    常用
                  </div>
                  {favFonts.map((f) => (
                    <FontRow
                      key={f.id}
                      f={f}
                      selected={font.id === f.id}
                      fav
                      onSelect={() => { onFontChange(f); setOpenPanel(null); }}
                      onToggleFav={() => toggleFav(f.id)}
                    />
                  ))}
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                </>
              )}

              {/* Categorized fonts */}
              {fontCategories.map((cat) => {
                const fonts = nonFavFonts.filter((f) => f.category === cat.key);
                if (fonts.length === 0) return null;
                return (
                  <div key={cat.key}>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 px-3 pt-1.5 pb-1">
                      {cat.label}
                    </div>
                    {fonts.map((f) => (
                      <FontRow
                        key={f.id}
                        f={f}
                        selected={font.id === f.id}
                        fav={false}
                        onSelect={() => { onFontChange(f); setOpenPanel(null); }}
                        onToggleFav={() => toggleFav(f.id)}
                      />
                    ))}
                  </div>
                );
              })}

              {/* License note */}
              <div className="text-[10px] text-gray-300 px-3 pt-2 pb-1 border-t border-gray-50 mt-1">
                以上字体均可免费商用（SIL OFL 1.1）
              </div>
            </div>
          </DropdownSelect>
        </div>

        <div className="w-px h-10 bg-gray-200 mx-1" />

        {/* Align */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">对齐</span>
          <div className="flex items-center">
            {(
              [
                { value: "left" as const, icon: <AlignLeftIcon /> },
                { value: "center" as const, icon: <AlignCenterIcon /> },
                { value: "right" as const, icon: <AlignRightIcon /> },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAlignChange(opt.value)}
                className={`p-2 rounded-lg transition-colors ${
                  align === opt.value
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-10 bg-gray-200 mx-1" />

        {/* Padding */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">间距</span>
          <div className="flex items-center">
            {paddingOptions.map((p) => (
              <button
                key={p}
                onClick={() => onPaddingChange(p)}
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  padding === p
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-10 bg-gray-200 mx-1" />

        {/* Ratio */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">尺寸</span>
          <div className="flex items-center">
            {ratioOptions.map((r) => (
              <button
                key={r.value}
                onClick={() => onRatioChange(r.value)}
                className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  ratio === r.value
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-10 bg-gray-200 mx-1" />

        {/* Quotes Toggle */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">引号</span>
          <button
            onClick={() => onQuotesChange(!showQuotes)}
            className={`relative w-10 h-[22px] rounded-full transition-colors ${
              showQuotes ? "bg-gray-800" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform ${
                showQuotes ? "left-[22px]" : "left-[3px]"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function FontRow({
  f,
  selected,
  fav,
  onSelect,
  onToggleFav,
}: {
  f: FontOption;
  selected: boolean;
  fav: boolean;
  onSelect: () => void;
  onToggleFav: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-1 rounded-lg transition-colors ${
        selected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <button
        onClick={onSelect}
        className="flex-1 text-left px-3 py-2 min-w-0"
      >
        <div
          className="text-sm truncate"
          style={{ fontFamily: f.cssVar }}
        >
          {f.name}
        </div>
        <div className="text-[10px] text-gray-400 truncate">
          {f.nameEn}
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav();
        }}
        className="p-2 shrink-0 hover:bg-gray-100 rounded-lg transition-colors"
        title={fav ? "取消收藏" : "收藏"}
      >
        <StarIcon filled={fav} />
      </button>
    </div>
  );
}
