import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { SeoOptimizerForm } from "@/features/seo-optimizer/SeoOptimizerForm";

export default function SeoOptimizerPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="SEO Optimizer"
        title="Improve product content for a target keyword."
        description="Get a score, title ideas, meta description, missing keywords, and a stronger product description."
      />
      <SeoOptimizerForm />
    </PageShell>
  );
}
