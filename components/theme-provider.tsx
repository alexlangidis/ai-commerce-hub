"use client";

import { useEffect, type ReactNode } from "react";

import { useThemeStore, type Theme } from "@/lib/stores/theme-store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useThemeStore.persist.rehydrate();
  }, []);

  return children;
}

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const mounted = useThemeStore((state) => state.hasHydrated);

  return { theme, toggleTheme, setTheme, mounted };
}

export type { Theme };
