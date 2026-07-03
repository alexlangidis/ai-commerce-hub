import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppPanel } from "@/components/app/app-panel";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/features/history/CopyButton";
import {
  getGenerationTitle,
  HistoryOutput,
} from "@/features/history/HistoryOutput";
import { getHistoryGenerationDetail } from "@/features/history/queries";
import { RegenerateButton } from "@/features/history/RegenerateButton";
import { PRODUCT_CONTENT_TOOL_NAME } from "@/features/product-content-generator/generate";
import { REWRITE_STUDIO_TOOL_NAME } from "@/features/rewrite-studio/generate";
import { SEO_OPTIMIZER_TOOL_NAME } from "@/features/seo-optimizer/generate";
import { TRANSLATION_STUDIO_TOOL_NAME } from "@/features/translation-studio/generate";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ generationId: string }>;
}) {
  const { generationId } = await params;
  const generation = await getHistoryGenerationDetail(generationId);

  if (!generation) {
    notFound();
  }

  const title = getGenerationTitle(
    generation.input,
    `Generation ${generation.id.slice(0, 8)}`,
  );
  const canRegenerate = [
    PRODUCT_CONTENT_TOOL_NAME,
    REWRITE_STUDIO_TOOL_NAME,
    SEO_OPTIMIZER_TOOL_NAME,
    TRANSLATION_STUDIO_TOOL_NAME,
  ].includes(generation.tool);

  return (
    <PageShell>
      <PageHeader
        eyebrow="History detail"
        title={title}
        description={`${generation.tool} · ${generation.language} · ${generation.tone} · ${generation.model}`}
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            <RegenerateButton
              generationId={generation.id}
              disabled={!canRegenerate}
            />
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/dashboard/history" />}
            >
              Back to history
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">
          Created{" "}
          {formatDistanceToNow(new Date(generation.createdAt), {
            addSuffix: true,
          })}
        </Badge>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {generation.versions.length} version
          {generation.versions.length === 1 ? "" : "s"}
        </Badge>
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <AppPanel>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Latest output</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Copy individual fields or inspect version output below.
                </p>
              </div>
              <CopyButton
                label="Copy all"
                value={JSON.stringify(generation.output, null, 2)}
              />
            </div>
            <HistoryOutput output={generation.output} />
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
                value={JSON.stringify(generation.input, null, 2)}
              />
            </div>
            <pre className="max-h-[480px] overflow-auto rounded-xl bg-muted/50 p-3 text-xs leading-5">
              {JSON.stringify(generation.input, null, 2)}
            </pre>
          </div>
        </AppPanel>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Versions</h2>
          <p className="text-sm text-muted-foreground">
            Regeneration adds a new version and promotes it to the latest output.
          </p>
        </div>
        {generation.versions.map((version) => (
          <AppPanel key={version.id}>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-base font-semibold">
                    Version {version.versionNumber}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {version.model} ·{" "}
                    {formatDistanceToNow(new Date(version.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <CopyButton
                  label="Copy version"
                  value={JSON.stringify(version.output, null, 2)}
                />
              </div>
              <HistoryOutput output={version.output} compact />
            </div>
          </AppPanel>
        ))}
      </section>
    </PageShell>
  );
}
