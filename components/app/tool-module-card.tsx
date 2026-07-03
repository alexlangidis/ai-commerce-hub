import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { AppPanel } from "@/components/app/app-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ToolModuleCard({
  title,
  description,
  href,
  icon: Icon,
  accent,
  badge = "Ready",
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  badge?: string;
}) {
  return (
    <AppPanel className="group transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-panel)]">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-xl bg-gradient-to-br",
              accent
            )}
          >
            <Icon className="size-5 text-primary" />
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {badge}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          className="w-fit"
          render={<Link href={href} />}
        >
          Open tool
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </AppPanel>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accentClass,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accentClass: string;
}) {
  return (
    <AppPanel className="relative overflow-hidden">
      <div className={cn("absolute inset-x-0 top-0 h-1", accentClass)} />
      <div className="flex items-center gap-4 p-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tracking-tight">{value}</p>
          {hint ? (
            <p className="text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
      </div>
    </AppPanel>
  );
}
