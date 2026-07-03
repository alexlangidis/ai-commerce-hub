import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { TranslationStudioForm } from "@/features/translation-studio/TranslationStudioForm";

export default function TranslationStudioPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Translation Studio"
        title="Localize product content for international storefronts."
        description="Translate titles, descriptions, and SEO fields while keeping your brand voice consistent across languages."
      />
      <TranslationStudioForm />
    </PageShell>
  );
}
