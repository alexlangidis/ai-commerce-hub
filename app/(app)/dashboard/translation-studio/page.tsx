import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { TranslationStudioForm } from "@/features/translation-studio/TranslationStudioForm";
import { getWorkspaceOptionLists } from "@/features/workspace-options/actions";
import { getTranslationStudioFormDefaults } from "@/lib/brand-voice-tool-defaults";
import { ensureSelectedOption } from "@/lib/workspace-options";

export default async function TranslationStudioPage() {
  const [brandVoice, optionLists] = await Promise.all([
    getBrandVoice(),
    getWorkspaceOptionLists(),
  ]);
  const defaultValues = getTranslationStudioFormDefaults(brandVoice);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Translation Studio"
        title="Localize product content for international storefronts."
        description="Translate titles, descriptions, and SEO fields while keeping your brand voice consistent across languages."
      />
      <TranslationStudioForm
        defaultValues={defaultValues}
        languages={ensureSelectedOption(
          optionLists.languages,
          defaultValues.targetLanguage,
        )}
      />
    </PageShell>
  );
}
