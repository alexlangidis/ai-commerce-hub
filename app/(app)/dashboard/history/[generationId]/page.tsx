import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { Button } from "@/components/ui/button";
import { HistoryDetailView } from "@/features/history/HistoryDetailView";
import { getGenerationTitle } from "@/features/history/HistoryOutput";
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

      <HistoryDetailView
        key={generation.versions.length}
        createdAt={generation.createdAt}
        versions={generation.versions.map((version) => ({
          id: version.id,
          versionNumber: version.versionNumber,
          createdAt: version.createdAt,
          model: version.model,
          output: version.output as Record<string, unknown>,
        }))}
        input={generation.input as Record<string, unknown>}
      />
    </PageShell>
  );
}
