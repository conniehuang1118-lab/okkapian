"use client";

import { useState } from "react";

type EntryTab = "paste" | "ai";

interface PasteEntryProps {
  onGenerate: (text: string, author: string) => void;
  onAIGenerate: (text: string, author: string) => void;
  aiLoading?: boolean;
}

export default function PasteEntry({
  onGenerate,
  onAIGenerate,
  aiLoading = false,
}: PasteEntryProps) {
  const [tab, setTab] = useState<EntryTab>("paste");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const canGenerate = text.trim().length > 0;
  const canAI = text.trim().length >= 20;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 min-h-screen relative overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        src="/hero-bg.mp4"
      />

      <div className="w-full max-w-xl relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
            <text x="4" y="20" fill="#1a1a1a" fontSize="20" fontWeight="bold" fontFamily="serif">
              66
            </text>
          </svg>
          <span className="text-lg font-semibold text-gray-900">okkapian</span>
        </div>

        {/* Tab switch */}
        <div className="flex bg-black/20 backdrop-blur-md rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab("paste")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "paste"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            粘贴出片
          </button>
          <button
            onClick={() => setTab("ai")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              tab === "ai"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span className="text-base">&#x2728;</span>
            AI 智能拆卡
          </button>
        </div>

        {tab === "paste" ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
              粘贴文案，自动出片
            </h1>
            <p className="text-gray-500 mb-8">
              粘贴你的文字，okkapian 自动选配色、排版、拆分成多张卡片，导出就能发。
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
              长文一键拆成金句卡
            </h1>
            <p className="text-white/60 mb-8">
              粘贴长篇文章、播客文稿或会议记录，AI 自动提取金句并生成小红书套图。
            </p>
          </>
        )}

        {/* Text area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              tab === "paste"
                ? "把你的文案粘贴在这里...\n\n可以是一段话、一篇文章、几句金句，\n长文会自动拆分成多张卡片。"
                : "粘贴长篇文章、播客文稿或会议记录...\n\nAI 会自动提取 3-5 个最有传播价值的金句，\n生成可以直接发小红书的套图。"
            }
            className={`w-full p-5 text-base resize-none focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 placeholder:leading-relaxed transition-all shadow-sm rounded-2xl ${
              tab === "paste"
                ? "h-56 sm:h-64 text-gray-800 bg-white/85 backdrop-blur-sm border border-gray-200/60 placeholder:text-gray-400"
                : "h-64 sm:h-80 text-white bg-white/10 backdrop-blur-md border border-white/20 placeholder:text-white/40"
            }`}
          />
          {text.length > 0 && (
            <div className={`absolute bottom-3 right-4 text-xs ${tab === "ai" ? "text-white/50" : "text-gray-400"}`}>
              {text.length} 字
              {tab === "paste" && text.length > 120 && (
                <span className="ml-1">
                  · 约 {Math.ceil(text.length / 80)} 张卡片
                </span>
              )}
              {tab === "ai" && text.length < 20 && (
                <span className="ml-1 text-amber-400">至少 20 字</span>
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
            className={`w-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:border-gray-300 transition-all shadow-sm rounded-xl ${
              tab === "paste"
                ? "text-gray-700 bg-white/85 backdrop-blur-sm border border-gray-200/60 placeholder:text-gray-400"
                : "text-white bg-white/10 backdrop-blur-md border border-white/20 placeholder:text-white/40"
            }`}
          />
        </div>

        {/* Buttons */}
        {tab === "paste" ? (
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
        ) : (
          <button
            onClick={() => onAIGenerate(text.trim(), author.trim() || "OKKAPIAN")}
            disabled={!canAI || aiLoading}
            className={`mt-6 w-full py-4 rounded-2xl text-base font-semibold transition-all shadow-sm ${
              canAI && !aiLoading
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:shadow-md active:scale-[0.99]"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {aiLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI 正在分析...
              </span>
            ) : (
              "✨ 一键生成小红书套图"
            )}
          </button>
        )}

        {/* Quick examples */}
        <div className="mt-6 flex flex-wrap items-center gap-2 px-1">
          <span className={`text-xs ${tab === "ai" ? "text-white/40" : "text-gray-400"}`}>试试：</span>
          {tab === "paste" ? (
            <>
              {[
                "内容不是越多越好，而是越有判断越珍贵。真正好的卡片，不是更花，而是更有呼吸感。",
                "生活不是等待风暴过去，而是学会在雨中起舞。每一个不曾起舞的日子，都是对生命的辜负。当你觉得为时已晚的时候，恰恰是最早的时候。别让任何人偷走你的梦想。",
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setText(example)}
                  className="px-3 py-1.5 text-xs text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full hover:border-gray-300 hover:text-gray-700 transition-colors"
                >
                  {example.slice(0, 12)}…
                </button>
              ))}
            </>
          ) : (
            <>
              {[
                {
                  label: "创作者困境",
                  text: "2026年，算法疲劳已经成为一个不可忽视的现象。创作者们发现，他们花了越来越多的时间去迎合平台的推荐机制，而不是真正创作有价值的内容。数据显示，超过60%的全职创作者表示他们感到倦怠。问题不在于内容质量下降了，而在于平台的注意力分配方式让优质内容越来越难被看见。当一个视频的前3秒决定了它的命运，我们失去的不仅是深度内容，还有创作者对自己作品的信心。真正的创作不应该是一场与算法的军备竞赛，而应该是与读者之间真诚的对话。",
                },
                {
                  label: "产品思维",
                  text: "好的产品不是功能的堆砌，而是对用户需求的精准洞察。很多创业者犯的最大错误，就是把「我觉得」当成了「用户需要」。真正的产品思维是：先找到一个真实存在的痛点，然后用最简单的方式解决它。MVP不是做一个粗糙的产品，而是用最小的成本验证一个假设。记住：用户不关心你用了什么技术，他们只关心自己的问题有没有被解决。最好的产品是用户用了之后会说「这就是我一直想要的」，而不是「哇这个技术好厉害」。",
                },
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setText(example.text)}
                  className="px-3 py-1.5 text-xs text-white/50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:border-white/40 hover:text-white/80 transition-colors"
                >
                  {example.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
