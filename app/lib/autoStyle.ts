import { themes, fontOptions, type Theme, type FontOption } from "./themes";

interface StyleSuggestion {
  theme: Theme;
  font: FontOption;
  align: "left" | "center" | "right";
  padding: 32 | 64 | 96 | 128;
  showQuotes: boolean;
}

const moodKeywords: Record<string, string[]> = {
  warm: ["温暖", "幸福", "快乐", "美好", "阳光", "感恩", "爱", "甜", "温柔", "陪伴", "拥抱", "微笑", "喜悦", "满足"],
  cool: ["冷静", "理性", "思考", "逻辑", "专注", "效率", "精确", "系统", "分析", "客观", "清醒"],
  dark: ["孤独", "夜", "沉默", "黑暗", "深邃", "迷失", "忧伤", "思念", "寂寞", "疲惫", "离别"],
  nature: ["山", "水", "花", "树", "风", "云", "海", "森林", "草", "星", "月", "雨", "春", "秋", "自然"],
  passion: ["激情", "热血", "奋斗", "拼搏", "梦想", "突破", "挑战", "勇气", "力量", "野心", "燃", "冲"],
  elegant: ["优雅", "从容", "品味", "精致", "格调", "艺术", "审美", "文艺", "诗", "古典", "韵味"],
  fresh: ["清新", "简单", "纯粹", "干净", "轻松", "自在", "随性", "洒脱", "少年", "青春"],
  romantic: ["浪漫", "樱花", "玫瑰", "心动", "恋", "情", "红", "粉", "花瓣", "告白"],
};

const moodToTheme: Record<string, string[]> = {
  warm: ["editorial", "sunset-glow", "flame"],
  cool: ["breeze", "glass", "twilight"],
  dark: ["noir", "cosmic", "ocean"],
  nature: ["forest-mist", "mint", "paper"],
  passion: ["flame", "ocean", "rose-gold"],
  elegant: ["editorial", "aurora", "glass"],
  fresh: ["breeze", "mint", "sakura"],
  romantic: ["sakura", "peach", "rose-gold"],
};

const moodToFont: Record<string, string[]> = {
  warm: ["noto-serif-sc", "instrument-serif"],
  cool: ["noto-sans-sc", "montserrat"],
  dark: ["noto-serif-sc", "instrument-serif"],
  nature: ["noto-serif-sc", "noto-sans-sc"],
  passion: ["montserrat", "noto-sans-sc"],
  elegant: ["noto-serif-sc", "instrument-serif"],
  fresh: ["montserrat", "noto-sans-sc"],
  romantic: ["noto-serif-sc", "instrument-serif"],
};

function detectMood(text: string): string {
  const scores: Record<string, number> = {};
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    scores[mood] = keywords.reduce(
      (sum, kw) => sum + (text.includes(kw) ? 1 : 0),
      0
    );
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (best[1] === 0) return "elegant";
  return best[0];
}

function pickTheme(mood: string): Theme {
  const candidates = moodToTheme[mood] || ["editorial"];
  const id = candidates[Math.floor(Math.random() * candidates.length)];
  return themes.find((t) => t.id === id) || themes[0];
}

function pickFont(mood: string): FontOption {
  const candidates = moodToFont[mood] || ["noto-serif-sc"];
  const id = candidates[0];
  return fontOptions.find((f) => f.id === id) || fontOptions[0];
}

export function autoStyle(text: string): StyleSuggestion {
  const mood = detectMood(text);
  const charCount = text.length;

  const padding =
    charCount <= 30 ? 96 : charCount <= 80 ? 64 : charCount <= 200 ? 64 : 32;

  const align = charCount <= 60 ? "center" : "left";

  const showQuotes = charCount <= 150;

  return {
    theme: pickTheme(mood),
    font: pickFont(mood),
    align,
    padding,
    showQuotes,
  };
}
