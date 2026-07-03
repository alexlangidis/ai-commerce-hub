"use client";

import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";

import { AppPanel } from "@/components/app/app-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/features/history/CopyButton";
import { HistoryOutput } from "@/features/history/HistoryOutput";
import { cn } from "@/lib/utils";

type HistoryVersion = {
  id: string;
  versionNumber: number;
  createdAt: string;
  model: string;
  output: Record<string, unknown>;
};

type HistoryDetailViewProps = {
  createdAt: string;
  versions: HistoryVersion[];
  input: Record<string, unknown>;
};

export function HistoryDetailView({
  createdAt,
  versions,
  input,
}: HistoryDetailViewProps) {
  const sortedVersions = useMemo(
    () =>
      [...versions].sort((a, b) => b.versionNumber - a.versionNumber),
    [versions],
  );
  const latestVersionId = sortedVersions[0]?.id ?? "";
  const [selectedVersionId, setSelectedVersionId] = useState(latestVersionId);

  const selectedVersion =
    sortedVersions.find((version) => version.id === selectedVersionId) ??
    sortedVersions[0];

  if (!selectedVersion) {
    return null;
  }

  const isLatest = selectedVersion.id === latestVersionId;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Badge variant="outline" className="w-fit">
          Created{" "}
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </Badge>

        <div
          role="tablist"
          aria-label="Generation versions"
          className="flex flex-wrap gap-1 rounded-xl border border-border/70 bg-muted/40 p-1"
        >
          {sortedVersions.map((version) => {
            const isActive = version.id === selectedVersionId;
            const isVersionLatest = version.id === latestVersionId;

            return (
              <Button
                key={version.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 rounded-lg px-3",
                  !isActive && "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setSelectedVersionId(version.id)}
              >
                V{version.versionNumber}
                {isVersionLatest ? (
                  <span className="hidden text-[11px] opacity-80 sm:inline">
                    · Latest
                  </span>
                ) : null}
              </Button>
            );
          })}
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <AppPanel>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  {isLatest
                    ? "Latest output"
                    : `Version ${selectedVersion.versionNumber} output`}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedVersion.model} ·{" "}
                  {formatDistanceToNow(new Date(selectedVersion.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <CopyButton
                label="Copy all"
                value={JSON.stringify(selectedVersion.output, null, 2)}
              />
            </div>
            <HistoryOutput output={selectedVersion.output} />
          </div>
        </AppPanel>

        <AppPanel className="h-fit xl:sticky xl:top-24">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Original input</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The exact data used for this generation.
                </p>
              </div>
              <CopyButton
                label="Copy input"
                value={JSON.stringify(input, null, 2)}
              />
            </div>
            <pre className="max-h-[480px] overflow-auto rounded-xl bg-muted/50 p-3 text-xs leading-5">
              {JSON.stringify(input, null, 2)}
            </pre>
          </div>
        </AppPanel>
      </section>
    </>
  );
}
