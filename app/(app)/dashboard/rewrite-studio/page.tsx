import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { RewriteStudioForm } from "@/features/rewrite-studio/RewriteStudioForm";
import { getWorkspaceOptionLists } from "@/features/workspace-options/actions";
import { getRewriteStudioFormDefaults } from "@/lib/brand-voice-tool-defaults";
import { ensureSelectedOption } from "@/lib/workspace-options";

export default async function RewriteStudioPage() {
  const [brandVoice, optionLists] = await Promise.all([
    getBrandVoice(),
    getWorkspaceOptionLists(),
  ]);
  const defaultValues = getRewriteStudioFormDefaults(brandVoice);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Rewrite Studio"
        title="Improve existing product descriptions."
        description="Paste current copy, choose a rewrite mode, and save a clean before/after version to history."
      />
      <RewriteStudioForm
        defaultValues={defaultValues}
        optionLists={{
          languages: ensureSelectedOption(
            optionLists.languages,
            defaultValues.targetLanguage,
          ),
          tones: ensureSelectedOption(optionLists.tones, defaultValues.tone),
        }}
      />
    </PageShell>
  );
}
