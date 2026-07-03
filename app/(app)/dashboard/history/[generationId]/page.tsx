import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/features/history/CopyButton";
import {
  getGenerationTitle,
  HistoryOutput,
} from "@/features/history/HistoryOutput";
import { getHistoryGenerationDetail } from "@/features/history/queries";

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

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              History detail
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-base leading-7 text-muted-foreground">
              {generation.tool} · {generation.language} · {generation.tone} ·{" "}
              {generation.model}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                Created{" "}
                {formatDistanceToNow(new Date(generation.createdAt), {
                  addSuffix: true,
                })}
              </Badge>
              <Badge variant="secondary">
                {generation.versions.length} version
                {generation.versions.length === 1 ? "" : "s"}
              </Badge>
            </div>
          </div>
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/dashboard/history" />}
          >
            Back to history
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Latest output</CardTitle>
                <CardDescription>
                  Copy individual fields or inspect version output below.
                </CardDescription>
              </div>
              <CopyButton
                label="Copy all"
                value={JSON.stringify(generation.output, null, 2)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <HistoryOutput output={generation.output} />
          </CardContent>
        </Card>

        <Card className="h-fit xl:sticky xl:top-20">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>Original input</CardTitle>
                <CardDescription>
                  The exact data used for this generation.
                </CardDescription>
              </div>
              <CopyButton
                label="Copy input"
                value={JSON.stringify(generation.input, null, 2)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[480px] overflow-auto rounded-lg bg-muted p-3 text-xs leading-5">
              {JSON.stringify(generation.input, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight">Versions</h2>
          <p className="text-sm text-muted-foreground">
            Regeneration will add more versions here later.
          </p>
        </div>
        {generation.versions.map((version) => (
          <Card key={version.id}>
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>Version {version.versionNumber}</CardTitle>
                  <CardDescription>
                    {version.model} ·{" "}
                    {formatDistanceToNow(new Date(version.createdAt), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </div>
                <CopyButton
                  label="Copy version"
                  value={JSON.stringify(version.output, null, 2)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <HistoryOutput output={version.output} compact />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
