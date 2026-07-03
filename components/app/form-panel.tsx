import type { ReactNode } from "react";

import { AppPanel } from "@/components/app/app-panel";
import { cn } from "@/lib/utils";

export function ToolFormPanel({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <AppPanel className={cn("overflow-visible", className)}>
      <div className="border-b border-border/60 px-6 py-5">
        <h2 className="text-base font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="px-6 py-5">{children}</div>
      {footer ? <div className="tool-form-footer">{footer}</div> : null}
    </AppPanel>
  );
}

export function ToolPreviewPanel({
  title,
  description,
  badge,
  children,
  className,
}: {
  title: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AppPanel className={cn("h-fit xl:sticky xl:top-24", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-border/60 px-6 py-5">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {badge}
      </div>
      <div className="px-6 py-5">{children}</div>
    </AppPanel>
  );
}
