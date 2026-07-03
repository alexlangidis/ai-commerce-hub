import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("tool-hero p-6 sm:p-8", className)}>
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-3">
          <Badge
            variant="secondary"
            className="w-fit border-primary/15 bg-primary/10 text-primary"
          >
            {eyebrow}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
        {action ? <div className="relative shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
