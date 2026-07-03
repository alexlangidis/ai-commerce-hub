import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getGenerationTitle,
  HistoryOutput,
} from "@/features/history/HistoryOutput";
import { getHistoryGenerations } from "@/features/history/queries";

export default async function HistoryPage() {
  const generations = await getHistoryGenerations();

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            History / Versions
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Review every saved generation.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            View generated product content, copy output fields, and inspect
            version history. Future regenerate actions will add version 2, 3,
            and beyond here.
          </p>
        </div>
      </section>

      {generations.length ? (
        <section className="grid gap-4">
          {generations.map((generation) => {
            const title = getGenerationTitle(
              generation.input,
              `Generation ${generation.id.slice(0, 8)}`,
            );

            return (
              <Card key={generation.id}>
                <CardHeader>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-col gap-2">
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>
                        {generation.tool} · {generation.language} ·{" "}
                        {generation.tone} · {generation.model}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {generation.versions.length} version
                          {generation.versions.length === 1 ? "" : "s"}
                        </Badge>
                        <Badge variant="outline">
                          {formatDistanceToNow(new Date(generation.createdAt), {
                            addSuffix: true,
                          })}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={
                        <Link href={`/dashboard/history/${generation.id}`} />
                      }
                    >
                      View details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <HistoryOutput output={generation.output} compact />
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No generations yet</CardTitle>
            <CardDescription>
              Create your first product content generation to see it here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              nativeButton={false}
              render={<Link href="/dashboard/product-generator" />}
            >
              Open Product Generator
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
