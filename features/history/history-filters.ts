import type { HistoryGeneration } from "@/features/history/queries";
import { formatToolLabel } from "@/features/history/HistoryOutput";

export type HistoryToolFilter = "all" | HistoryGeneration["tool"];

export type HistoryFilters = {
  tool: HistoryToolFilter;
  language: string;
};

export const defaultHistoryFilters: HistoryFilters = {
  tool: "all",
  language: "all",
};

export function getHistoryFilterOptions(generations: HistoryGeneration[]) {
  const tools = [...new Set(generations.map((generation) => generation.tool))].sort(
    (a, b) => formatToolLabel(a).localeCompare(formatToolLabel(b)),
  );
  const languages = [
    ...new Set(generations.map((generation) => generation.language)),
  ].sort((a, b) => a.localeCompare(b));

  return { tools, languages };
}

export function filterHistoryGenerations(
  generations: HistoryGeneration[],
  filters: HistoryFilters,
) {
  return generations.filter((generation) => {
    if (filters.tool !== "all" && generation.tool !== filters.tool) {
      return false;
    }

    if (filters.language !== "all" && generation.language !== filters.language) {
      return false;
    }

    return true;
  });
}

export function hasActiveHistoryFilters(filters: HistoryFilters) {
  return filters.tool !== "all" || filters.language !== "all";
}
