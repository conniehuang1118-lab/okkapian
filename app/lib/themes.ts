export interface Theme {
  id: string;
  name: string;
  group: "solid" | "gradient";
  canvasBg: string;
  cardBg: string;
  textColor: string;
  authorColor: string;
  accentColor: string;
  iconColor: string;
  separatorColor: string;
  preview: string;
}

export const themes: Theme[] = [
  // ── 经典纯色 ──
  {
    id: "editorial",
    name: "稿纸",
    group: "solid",
    canvasBg: "linear-gradient(135deg, #f5f0e8 0%, #ede4d4 100%)",
    cardBg: "#faf6ee",
    textColor: "#2a2420",
    authorColor: "#8a7a6a",
    accentColor: "#d4c4a8",
    iconColor: "#2a2420",
    separatorColor: "#ddd0c0",
    preview: "#ede4d4",
  },
  {
    id: "breeze",
    name: "微风",
    group: "solid",
    canvasBg: "linear-gradient(135deg, #e8f0f8 0%, #d0e4f4 100%)",
    cardBg: "#ffffff",
    textColor: "#1a2a3a",
    authorColor: "#5a7a9a",
    accentColor: "#a8c8e8",
    iconColor: "#c8ddf0",
    separatorColor: "#d0e0f0",
    preview: "#c8ddf0",
  },
  {
    id: "paper",
    name: "纸白",
    group: "solid",
    canvasBg: "linear-gradient(135deg, #f0f0ee 0%, #e8e8e4 100%)",
    cardBg: "#ffffff",
    textColor: "#222222",
    authorColor: "#888888",
    accentColor: "#cccccc",
    iconColor: "#dddddd",
    separatorColor: "#e0e0e0",
    preview: "#e8e8e4",
  },
  {
    id: "noir",
    name: "暗夜",
    group: "solid",
    canvasBg: "linear-gradient(135deg, #1a1a1a 0%, #111111 100%)",
    cardBg: "#222222",
    textColor: "#e8e8e8",
    authorColor: "#888888",
    accentColor: "#444444",
    iconColor: "#444444",
    separatorColor: "#333333",
    preview: "#222222",
  },
  {
    id: "glass",
    name: "玻璃",
    group: "solid",
    canvasBg: "linear-gradient(135deg, #dde4e8 0%, #c8d0d8 100%)",
    cardBg: "rgba(255,255,255,0.7)",
    textColor: "#1a2a3a",
    authorColor: "#6a7a8a",
    accentColor: "#a8b8c8",
    iconColor: "#b8c8d8",
    separatorColor: "#c8d4e0",
    preview: "#c8d0d8",
  },

  // ── 渐变 ──
  {
    id: "aurora",
    name: "极光",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(254,214,227,0.3) 100%)",
    textColor: "#2a2a3a",
    authorColor: "#7a6a8a",
    accentColor: "#d8a8e8",
    iconColor: "#c8b8d8",
    separatorColor: "rgba(200,180,220,0.4)",
    preview: "linear-gradient(135deg, #a8edea, #fed6e3)",
  },
  {
    id: "sunset-glow",
    name: "晚霞",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(252,182,159,0.2) 100%)",
    textColor: "#3a2420",
    authorColor: "#9a6a5a",
    accentColor: "#f0a888",
    iconColor: "#e8c0a8",
    separatorColor: "rgba(240,168,136,0.35)",
    preview: "linear-gradient(135deg, #ffecd2, #fcb69f)",
  },
  {
    id: "ocean",
    name: "深海",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(118,75,162,0.1) 100%)",
    textColor: "#1a1a3a",
    authorColor: "#6a5a9a",
    accentColor: "#a088d0",
    iconColor: "#b8a8d8",
    separatorColor: "rgba(102,126,234,0.25)",
    preview: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    id: "peach",
    name: "蜜桃",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(166,193,238,0.2) 100%)",
    textColor: "#2a1a30",
    authorColor: "#8a6a9a",
    accentColor: "#d0a0d8",
    iconColor: "#d8b8e0",
    separatorColor: "rgba(200,160,220,0.35)",
    preview: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
  },
  {
    id: "mint",
    name: "薄荷",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.93) 0%, rgba(150,230,161,0.15) 100%)",
    textColor: "#1a3020",
    authorColor: "#5a8a60",
    accentColor: "#88c890",
    iconColor: "#a0d8a8",
    separatorColor: "rgba(150,230,161,0.35)",
    preview: "linear-gradient(135deg, #d4fc79, #96e6a1)",
  },
  {
    id: "flame",
    name: "烈焰",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(245,175,25,0.12) 100%)",
    textColor: "#2a1a10",
    authorColor: "#8a5a30",
    accentColor: "#e89848",
    iconColor: "#f0b868",
    separatorColor: "rgba(245,175,25,0.3)",
    preview: "linear-gradient(135deg, #f5af19, #f12711)",
  },
  {
    id: "twilight",
    name: "暮光",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #0c3483 0%, #a2b6df 50%, #6b8dd6 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(107,141,214,0.12) 100%)",
    textColor: "#1a2040",
    authorColor: "#5a6a9a",
    accentColor: "#8098c8",
    iconColor: "#a0b0d8",
    separatorColor: "rgba(107,141,214,0.3)",
    preview: "linear-gradient(135deg, #0c3483, #a2b6df)",
  },
  {
    id: "sakura",
    name: "樱花",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(255,222,233,0.25) 100%)",
    textColor: "#30202a",
    authorColor: "#8a6a7a",
    accentColor: "#e0a0b8",
    iconColor: "#e8b8c8",
    separatorColor: "rgba(224,160,184,0.35)",
    preview: "linear-gradient(135deg, #ffdee9, #b5fffc)",
  },
  {
    id: "cosmic",
    name: "星河",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    cardBg: "linear-gradient(160deg, rgba(48,43,99,0.9) 0%, rgba(36,36,62,0.95) 100%)",
    textColor: "#e0ddf0",
    authorColor: "#9a90b8",
    accentColor: "#6060a0",
    iconColor: "#5050808a",
    separatorColor: "rgba(150,140,200,0.25)",
    preview: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  },
  {
    id: "rose-gold",
    name: "玫瑰金",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #f4c4f3 0%, #fc67fa 50%, #f4c4f3 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.93) 0%, rgba(244,196,243,0.2) 100%)",
    textColor: "#30102a",
    authorColor: "#9a5090",
    accentColor: "#d888d0",
    iconColor: "#e0a0d8",
    separatorColor: "rgba(216,136,208,0.3)",
    preview: "linear-gradient(135deg, #f4c4f3, #fc67fa)",
  },
  {
    id: "forest-mist",
    name: "山雾",
    group: "gradient",
    canvasBg: "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(193,223,196,0.2) 100%)",
    textColor: "#1a2a20",
    authorColor: "#5a7a60",
    accentColor: "#90c098",
    iconColor: "#a8d0b0",
    separatorColor: "rgba(144,192,152,0.35)",
    preview: "linear-gradient(135deg, #c1dfc4, #deecdd)",
  },
];

// ─── Font Options ─────────────────────────────────────────────
// All fonts are free for commercial use (SIL OFL / Apache 2.0)
// and loaded via Google Fonts in layout.tsx

export interface FontOption {
  id: string;
  name: string;
  nameEn: string;
  cssVar: string;
  category: "serif" | "sans" | "handwriting" | "display";
  license: string;
  preview: string;
}

export const fontOptions: FontOption[] = [
  // ── 宋体 / Serif ──
  {
    id: "noto-serif-sc",
    name: "思源宋体",
    nameEn: "Noto Serif SC",
    cssVar: "'Noto Serif SC', serif",
    category: "serif",
    license: "SIL OFL 1.1",
    preview: "落霞与孤鹜齐飞",
  },
  {
    id: "instrument-serif",
    name: "Instrument Serif",
    nameEn: "Instrument Serif",
    cssVar: "'Instrument Serif', serif",
    category: "serif",
    license: "SIL OFL 1.1",
    preview: "The quick brown fox",
  },
  // ── 黑体 / Sans ──
  {
    id: "noto-sans-sc",
    name: "思源黑体",
    nameEn: "Noto Sans SC",
    cssVar: "'Noto Sans SC', sans-serif",
    category: "sans",
    license: "SIL OFL 1.1",
    preview: "落霞与孤鹜齐飞",
  },
  {
    id: "montserrat",
    name: "Montserrat",
    nameEn: "Montserrat",
    cssVar: "'Montserrat', sans-serif",
    category: "sans",
    license: "SIL OFL 1.1",
    preview: "The quick brown fox",
  },
];

export type AlignOption = "left" | "center" | "right";
export type PaddingOption = 32 | 64 | 96 | 128;

export const paddingOptions: PaddingOption[] = [32, 64, 96, 128];

export const fontCategories = [
  { key: "serif" as const, label: "宋体" },
  { key: "sans" as const, label: "黑体" },
];
