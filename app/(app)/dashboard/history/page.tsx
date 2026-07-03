import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { HistoryList } from "@/features/history/HistoryList";
import { getHistoryGenerations } from "@/features/history/queries";

export default async function HistoryPage() {
  const generations = await getHistoryGenerations();

  return (
    <PageShell>
      <PageHeader
        eyebrow="History"
        title="Review every saved generation."
        description="Filter by tool or language, then open a generation to inspect versions, copy output, and regenerate."
      />

      <HistoryList generations={generations} />
    </PageShell>
  );
}
