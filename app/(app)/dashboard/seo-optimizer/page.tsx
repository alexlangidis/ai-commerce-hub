import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { SeoOptimizerForm } from "@/features/seo-optimizer/SeoOptimizerForm";
import { getWorkspaceOptionLists } from "@/features/workspace-options/actions";
import { getSeoOptimizerFormDefaults } from "@/lib/brand-voice-tool-defaults";
import { ensureSelectedOption } from "@/lib/workspace-options";

export default async function SeoOptimizerPage() {
  const [brandVoice, optionLists] = await Promise.all([
    getBrandVoice(),
    getWorkspaceOptionLists(),
  ]);
  const defaultValues = getSeoOptimizerFormDefaults(brandVoice);

  return (
    <PageShell>
      <PageHeader
        eyebrow="SEO Optimizer"
        title="Improve product content for a target keyword."
        description="Get a score, title ideas, meta description, missing keywords, and a stronger product description."
      />
      <SeoOptimizerForm
        defaultValues={defaultValues}
        languages={ensureSelectedOption(
          optionLists.languages,
          defaultValues.targetLanguage,
        )}
      />
    </PageShell>
  );
}
