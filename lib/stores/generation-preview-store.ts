"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GenerationTool =
  | "product-generator"
  | "rewrite-studio"
  | "seo-optimizer"
  | "translation-studio";

type PreviewEntry = {
  output: unknown;
  generationId: string;
};

type GenerationPreviewState = {
  previews: Partial<Record<GenerationTool, PreviewEntry>>;
  setPreview: (tool: GenerationTool, preview: PreviewEntry) => void;
  clearPreview: (tool: GenerationTool) => void;
};

export const useGenerationPreviewStore = create<GenerationPreviewState>()(
  persist(
    (set) => ({
      previews: {},
      setPreview: (tool, preview) =>
        set((state) => ({
          previews: { ...state.previews, [tool]: preview },
        })),
      clearPreview: (tool) =>
        set((state) => {
          const next = { ...state.previews };
          delete next[tool];
          return { previews: next };
        }),
    }),
    {
      name: "ai-commerce-generation-previews",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function useToolPreview<T>(tool: GenerationTool) {
  const preview = useGenerationPreviewStore((state) => state.previews[tool]);
  const setPreview = useGenerationPreviewStore((state) => state.setPreview);
  const clearPreview = useGenerationPreviewStore((state) => state.clearPreview);

  return {
    output: (preview?.output as T | undefined) ?? null,
    generationId: preview?.generationId ?? "",
    savePreview: (output: T, generationId: string) =>
      setPreview(tool, { output, generationId }),
    clearPreview: () => clearPreview(tool),
  };
}
