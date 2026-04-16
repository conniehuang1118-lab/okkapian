"use client";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">关于</h2>

        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            okkapian 是一个把文案直接排成精美卡片的工具，适合小红书、朋友圈等社交平台发布。
          </p>
          <p>
            从多种主题风格和背景中选择，自定义字体、对齐方式和间距。
          </p>
          <p>
            准备好之后，点击导出将图片保存为 PNG、SVG，或直接复制到剪贴板。
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-[8px] text-white font-bold font-serif">ok</span>
            </div>
            <span className="text-xs text-gray-500">Made by okkapian</span>
          </div>
        </div>
      </div>
    </div>
  );
}
