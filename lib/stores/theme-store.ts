"use client";

import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const themeStorage: StateStorage = {
  getItem: () => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      return JSON.stringify({ state: { theme: stored }, version: 0 });
    }

    return JSON.stringify({ state: { theme: getSystemTheme() }, version: 0 });
  },
  setItem: (_, value) => {
    const parsed = JSON.parse(value) as { state: { theme: Theme } };
    window.localStorage.setItem(THEME_STORAGE_KEY, parsed.state.theme);
    applyTheme(parsed.state.theme);
  },
  removeItem: () => {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  },
};

type ThemeState = {
  theme: Theme;
  hasHydrated: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      hasHydrated: false,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        get().setTheme(next);
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "ai-commerce-theme-store",
      storage: createJSONStorage(() => themeStorage),
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          applyTheme(state.theme);
        }

        useThemeStore.setState({ hasHydrated: true });
      },
    }
  )
);
