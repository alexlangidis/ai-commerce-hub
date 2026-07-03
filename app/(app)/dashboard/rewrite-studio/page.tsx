import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { RewriteStudioForm } from "@/features/rewrite-studio/RewriteStudioForm";

export default function RewriteStudioPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Rewrite Studio"
        title="Improve existing product descriptions."
        description="Paste current copy, choose a rewrite mode, and save a clean before/after version to history."
      />
      <RewriteStudioForm />
    </PageShell>
  );
}
