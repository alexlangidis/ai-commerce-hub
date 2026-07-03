"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SlidersHorizontalIcon, XIcon } from "lucide-react";

import { EmptyState } from "@/components/app/app-panel";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HistoryListCard } from "@/features/history/HistoryListCard";
import { formatToolLabel } from "@/features/history/HistoryOutput";
import {
  defaultHistoryFilters,
  filterHistoryGenerations,
  getHistoryFilterOptions,
  hasActiveHistoryFilters,
  type HistoryFilters,
} from "@/features/history/history-filters";
import type { HistoryGeneration } from "@/features/history/queries";

type HistoryListProps = {
  generations: HistoryGeneration[];
};

export function HistoryList({ generations }: HistoryListProps) {
  const [filters, setFilters] = useState<HistoryFilters>(defaultHistoryFilters);
  const { tools, languages } = useMemo(
    () => getHistoryFilterOptions(generations),
    [generations],
  );
  const filteredGenerations = useMemo(
    () => filterHistoryGenerations(generations, filters),
    [generations, filters],
  );
  const filtersActive = hasActiveHistoryFilters(filters);

  if (!generations.length) {
    return (
      <EmptyState
        title="No generations yet"
        description="Create your first product content generation to see it saved here with full version history."
        action={
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/product-generator" />}
          >
            Open Product Generator
          </Button>
        }
      />
    );
  }

  const toolItems = [
    { label: "All tools", value: "all" },
    ...tools.map((tool) => ({
      label: formatToolLabel(tool),
      value: tool,
    })),
  ];
  const languageItems = [
    { label: "All languages", value: "all" },
    ...languages.map((language) => ({
      label: language,
      value: language,
    })),
  ];

  function updateFilter<Key extends keyof HistoryFilters>(
    key: Key,
    value: HistoryFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function clearFilters() {
    setFilters(defaultHistoryFilters);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex shrink-0 items-center gap-2 text-sm font-medium">
          <SlidersHorizontalIcon className="size-4 text-muted-foreground" />
          Filter history
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <FilterSelect
            id="history-tool-filter"
            label="Tool"
            items={toolItems}
            value={filters.tool}
            onValueChange={(value) =>
              updateFilter("tool", value as HistoryFilters["tool"])
            }
          />
          <FilterSelect
            id="history-language-filter"
            label="Language"
            items={languageItems}
            value={filters.language}
            onValueChange={(value) => updateFilter("language", value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          Showing {filteredGenerations.length} of {generations.length}
        </p>
        {filtersActive ? (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            <XIcon data-icon="inline-start" />
            Clear filters
          </Button>
        ) : null}
      </div>

      {filteredGenerations.length ? (
        <section className="grid gap-3">
          {filteredGenerations.map((generation) => (
            <HistoryListCard key={generation.id} generation={generation} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No matching generations"
          description="Try another tool or language filter, or clear filters to see everything."
          action={
            filtersActive ? (
              <Button type="button" variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            ) : (
              <Button
                nativeButton={false}
                render={<Link href="/dashboard/product-generator" />}
              >
                Open Product Generator
              </Button>
            )
          }
        />
      )}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  items,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  items: Array<{ label: string; value: string }>;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
      <label
        className="text-xs font-medium text-muted-foreground sm:whitespace-nowrap sm:text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onValueChange(next ?? "all")}
      >
        <SelectTrigger id={id} className="w-full sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
