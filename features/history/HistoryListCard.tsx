import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronRightIcon } from "lucide-react";

import { AppPanel } from "@/components/app/app-panel";
import { Badge } from "@/components/ui/badge";
import {
  formatToolLabel,
  getGenerationPreview,
  getGenerationTitle,
} from "@/features/history/HistoryOutput";
import type { HistoryGeneration } from "@/features/history/queries";

type HistoryListCardProps = {
  generation: HistoryGeneration;
};

export function HistoryListCard({ generation }: HistoryListCardProps) {
  const title = getGenerationTitle(
    generation.input,
    `Generation ${generation.id.slice(0, 8)}`,
  );
  const preview = getGenerationPreview(generation.output);
  const href = `/dashboard/history/${generation.id}`;

  return (
    <AppPanel className="overflow-hidden transition-colors hover:border-primary/20">
      <Link
        href={href}
        className="flex items-start gap-4 p-4 sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <Badge variant="outline" className="text-xs font-normal">
              {generation.versions.length} version
              {generation.versions.length === 1 ? "" : "s"}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatToolLabel(generation.tool)} · {generation.language} ·{" "}
            {formatDistanceToNow(new Date(generation.createdAt), {
              addSuffix: true,
            })}
          </p>

          {preview ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground/90">
              {preview}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1 pt-0.5 text-sm font-medium text-primary">
          <span className="hidden sm:inline">View details</span>
          <ChevronRightIcon className="size-4" />
        </div>
      </Link>
    </AppPanel>
  );
}
