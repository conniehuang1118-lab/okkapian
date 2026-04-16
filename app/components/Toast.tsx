"use client";

import { useEffect, useState } from "react";

export interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "error";
}

let toastId = 0;
const listeners = new Set<(msg: ToastMessage) => void>();

export function showToast(text: string, type: "success" | "error" = "success") {
  const msg: ToastMessage = { id: ++toastId, text, type };
  listeners.forEach((fn) => fn(msg));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 2400);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg backdrop-blur-sm animate-[fadeInUp_0.25s_ease-out] ${
            t.type === "success"
              ? "bg-gray-900/90 text-white"
              : "bg-red-600/90 text-white"
          }`}
        >
          {t.type === "success" ? "✓ " : "✕ "}
          {t.text}
        </div>
      ))}
    </div>
  );
}
