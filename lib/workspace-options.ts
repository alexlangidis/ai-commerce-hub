import {
  avoidOptions,
  preferredCtaOptions,
  styleOptions,
  toneOptions,
} from "@/features/brand-voice/schema";
import { productCategoryOptions, productToneOptions } from "@/features/product-content-generator/schema";
import { rewriteToneOptions } from "@/features/rewrite-studio/schema";
import { languageOptions } from "@/lib/languages";

export const workspaceOptionKeys = [
  "languages",
  "categories",
  "tones",
  "styles",
  "avoids",
  "ctas",
] as const;

export type WorkspaceOptionKey = (typeof workspaceOptionKeys)[number];

export type WorkspaceCustomOptions = Record<WorkspaceOptionKey, string[]>;

export const emptyWorkspaceCustomOptions: WorkspaceCustomOptions = {
  languages: [],
  categories: [],
  tones: [],
  styles: [],
  avoids: [],
  ctas: [],
};

export const builtinWorkspaceOptions = {
  languages: [...languageOptions],
  categories: [...productCategoryOptions],
  tones: mergeUniqueStrings([...toneOptions, ...productToneOptions, ...rewriteToneOptions]),
  styles: [...styleOptions],
  avoids: [...avoidOptions],
  ctas: [...preferredCtaOptions],
} satisfies WorkspaceCustomOptions;

export type WorkspaceOptionLists = WorkspaceCustomOptions;

export function mergeUniqueStrings(values: readonly string[]) {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();

    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(trimmed);
  }

  return merged;
}

export function mergeWorkspaceOptionLists(
  custom: Partial<WorkspaceCustomOptions> | null | undefined,
): WorkspaceOptionLists {
  return {
    languages: mergeUniqueStrings([
      ...builtinWorkspaceOptions.languages,
      ...(custom?.languages ?? []),
    ]),
    categories: mergeUniqueStrings([
      ...builtinWorkspaceOptions.categories,
      ...(custom?.categories ?? []),
    ]),
    tones: mergeUniqueStrings([
      ...builtinWorkspaceOptions.tones,
      ...(custom?.tones ?? []),
    ]),
    styles: mergeUniqueStrings([
      ...builtinWorkspaceOptions.styles,
      ...(custom?.styles ?? []),
    ]),
    avoids: mergeUniqueStrings([
      ...builtinWorkspaceOptions.avoids,
      ...(custom?.avoids ?? []),
    ]),
    ctas: mergeUniqueStrings([
      ...builtinWorkspaceOptions.ctas,
      ...(custom?.ctas ?? []),
    ]),
  };
}

export function normalizeCustomOptionValue(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function ensureSelectedOption(
  options: readonly string[],
  selected?: string | null,
) {
  if (!selected?.trim()) {
    return [...options];
  }

  return mergeUniqueStrings([...options, selected]);
}
