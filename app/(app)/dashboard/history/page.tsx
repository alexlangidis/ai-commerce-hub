import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { AppPanel } from "@/components/app/app-panel";
import { EmptyState } from "@/components/app/app-panel";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getGenerationTitle,
  HistoryOutput,
} from "@/features/history/HistoryOutput";
import { getHistoryGenerations } from "@/features/history/queries";

export default async function HistoryPage() {
  const generations = await getHistoryGenerations();

  return (
    <PageShell>
      <PageHeader
        eyebrow="History"
        title="Review every saved generation."
        description="View generated product content, copy output fields, and inspect version history. Regenerate to add new versions over time."
      />

      {generations.length ? (
        <section className="grid gap-4">
          {generations.map((generation) => {
            const title = getGenerationTitle(
              generation.input,
              `Generation ${generation.id.slice(0, 8)}`,
            );

            return (
              <AppPanel key={generation.id}>
                <div className="flex flex-col gap-5 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {generation.tool} · {generation.language} ·{" "}
                        {generation.tone} · {generation.model}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {generation.versions.length} version
                          {generation.versions.length === 1 ? "" : "s"}
                        </Badge>
                        <Badge variant="outline">
                          {formatDistanceToNow(new Date(generation.createdAt), {
                            addSuffix: true,
                          })}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={
                        <Link href={`/dashboard/history/${generation.id}`} />
                      }
                    >
                      View details
                    </Button>
                  </div>
                  <HistoryOutput output={generation.output} compact />
                </div>
              </AppPanel>
            );
          })}
        </section>
      ) : (
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
      )}
    </PageShell>
  );
}
