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

const modules = [
  {
    title: "Product Content Generator",
    description:
      "Create SEO titles, descriptions, benefits, tags, alt text, and WooCommerce HTML.",
    status: "Ready",
    href: "/dashboard/product-generator",
  },
  {
    title: "Rewrite Studio",
    description:
      "Improve pasted product copy with professional, shorter, sales, technical, luxury, and Greek modes.",
    status: "Ready",
    href: "/dashboard/rewrite-studio",
  },
  {
    title: "SEO Optimizer",
    description:
      "Score titles and descriptions, find missing keywords, and generate improved versions.",
    status: "Ready",
    href: "/dashboard/seo-optimizer",
  },
  {
    title: "Translation Studio",
    description:
      "Translate and localize e-commerce content for Greek, English, German, French, Italian, and Spanish.",
    status: "Ready",
    href: "/dashboard/translation-studio",
  },
  {
    title: "Prompt Templates",
    description:
      "Start from ready templates for accessories, beauty, fashion, fitness, and more.",
    status: "Ready",
    href: "/dashboard/prompt-templates",
  },
  {
    title: "Brand Voice",
    description:
      "Control language, tone, style, claims to avoid, and the preferred CTA for all AI outputs.",
    status: "Ready",
    href: "/dashboard/brand-voice",
  },
  {
    title: "History / Versions",
    description:
      "Save each generation with input, output, tone, language, model, and compare versions.",
    status: "Ready",
    href: "/dashboard/history",
  },
];

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              AI commerce workspace
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              Build product content faster, with one shared brand voice.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              The foundation is ready: Better Auth, Neon, Drizzle, protected
              routes, Brand Voice, and generation history tables. Next we build
              the AI tools on top of this structure.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/brand-voice" />}
          >
            Set Brand Voice
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Auth</CardDescription>
            <CardTitle>Better Auth active</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Database</CardDescription>
            <CardTitle>Neon + Drizzle ready</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>UI</CardDescription>
            <CardTitle>shadcn sidebar shell</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{module.title}</CardTitle>
                <Badge
                  variant={module.status === "Ready" ? "default" : "outline"}
                >
                  {module.status}
                </Badge>
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            {module.href ? (
              <CardContent>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href={module.href} />}
                >
                  Open
                </Button>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </section>
    </main>
  );
}
