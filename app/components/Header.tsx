"use client";

import { useState, useRef, useEffect } from "react";
import { DownloadIcon, ChevronDownIcon } from "@/app/lib/icons";

interface HeaderProps {
  onExportPNG: () => void;
  onExportSVG: () => void;
  onCopyImage: () => void;
  onCopyURL: () => void;
  onAbout: () => void;
  onBack?: () => void;
  onExportAll?: () => void;
  pageCount?: number;
}

export default function Header({
  onExportPNG,
  onExportSVG,
  onCopyImage,
  onCopyURL,
  onAbout,
  onBack,
  onExportAll,
  pageCount = 1,
}: HeaderProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-sm border-b border-gray-100 relative z-50">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2 py-1.5 -ml-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            返回
          </button>
        )}
        <div className="flex items-center gap-1.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <text x="4" y="20" fill="#1a1a1a" fontSize="20" fontWeight="bold" fontFamily="serif">66</text>
          </svg>
          <span className="text-sm font-semibold text-gray-900">okkapian</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onAbout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 7v4M8 5.5v0" strokeLinecap="round" />
          </svg>
          关于
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <DownloadIcon />
            导出
            <ChevronDownIcon />
          </button>

          {exportOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[180px] z-50">
              {onExportAll && pageCount > 1 && (
                <>
                  <button
                    onClick={() => { onExportAll(); setExportOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M6 6h4M6 9h4" /></svg>
                    导出全部 {pageCount} 张 (ZIP)
                  </button>
                  <div className="h-px bg-gray-100 my-1" />
                </>
              )}
              <button
                onClick={() => { onExportPNG(); setExportOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2" /><circle cx="5.5" cy="6" r="1" fill="currentColor" stroke="none" /><path d="M2 11l3.5-3.5 2 2 3-3L14 10" /></svg>
                当前页 PNG
              </button>
              <button
                onClick={() => { onExportSVG(); setExportOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 10l2-4 2 4M10 6v4" /></svg>
                当前页 SVG
              </button>
              <button
                onClick={() => { onCopyImage(); setExportOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="10" height="10" rx="1.5" /><path d="M12 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v8a1 1 0 001 1h1" /></svg>
                复制图片
              </button>
              <button
                onClick={() => { onCopyURL(); setExportOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6.5 9.5a3 3 0 004-4l1-1a3 3 0 00-4.24-4.24l-1 1" /><path d="M9.5 6.5a3 3 0 00-4 4l-1 1a3 3 0 004.24 4.24l1-1" /></svg>
                复制链接
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
