import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AppPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "app-panel overflow-hidden rounded-2xl bg-card text-card-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <AppPanel className="flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <span className="text-2xl">✦</span>
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </AppPanel>
  );
}
