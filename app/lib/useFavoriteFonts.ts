"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "okkapian-fav-fonts";

export function useFavoriteFonts() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback((fontId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(fontId)) {
        next.delete(fontId);
      } else {
        next.add(fontId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (fontId: string) => favorites.has(fontId),
    [favorites]
  );

  return { favorites, toggle, isFavorite, hydrated };
}
