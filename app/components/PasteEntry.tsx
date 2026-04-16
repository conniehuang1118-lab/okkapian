"use client";

import { useState } from "react";

interface PasteEntryProps {
  onGenerate: (text: string, author: string) => void;
}

export default function PasteEntry({ onGenerate }: PasteEntryProps) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const canGenerate = text.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <text x="4" y="20" fill="#1a1a1a" fontSize="20" fontWeight="bold" fontFamily="serif">
              66
            </text>
          </svg>
          <span className="text-lg font-semibold text-gray-900">okkapian</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
          粘贴文案，自动出片
        </h1>
        <p className="text-gray-500 mb-8">
          粘贴你的文字，okkapian 自动选配色、排版、拆分成多张卡片，导出就能发。
        </p>

        {/* Text area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="把你的文案粘贴在这里...&#10;&#10;可以是一段话、一篇文章、几句金句，&#10;长文会自动拆分成多张卡片。"
            className="w-full h-56 sm:h-64 p-5 text-base text-gray-800 bg-white border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 placeholder:text-gray-400 placeholder:leading-relaxed transition-all shadow-sm"
          />
          {text.length > 0 && (
            <div className="absolute bottom-3 right-4 text-xs text-gray-400">
              {text.length} 字
              {text.length > 120 && (
                <span className="ml-1 text-gray-500">
                  · 约 {Math.ceil(text.length / 80)} 张卡片
                </span>
              )}
            </div>
          )}
        </div>

        {/* Author */}
        <div className="mt-4">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="作者名（可选）"
            className="w-full px-5 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 placeholder:text-gray-400 transition-all shadow-sm"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={() => onGenerate(text.trim(), author.trim() || "OKKAPIAN")}
          disabled={!canGenerate}
          className={`mt-6 w-full py-4 rounded-2xl text-base font-semibold transition-all shadow-sm ${
            canGenerate
              ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md active:scale-[0.99]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          一键生成卡片
        </button>

        {/* Quick examples */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400">试试：</span>
          {[
            "内容不是越多越好，而是越有判断越珍贵。真正好的卡片，不是更花，而是更有呼吸感。",
            "生活不是等待风暴过去，而是学会在雨中起舞。每一个不曾起舞的日子，都是对生命的辜负。当你觉得为时已晚的时候，恰恰是最早的时候。别让任何人偷走你的梦想。",
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => setText(example)}
              className="px-3 py-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:text-gray-700 transition-colors"
            >
              {example.slice(0, 12)}…
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
