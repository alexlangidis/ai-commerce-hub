import type { ReactNode } from "react";

import { AppPanel } from "@/components/app/app-panel";
import { cn } from "@/lib/utils";

export function InfoPanel({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AppPanel className={cn("h-fit", className)}>
      <div className="flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </AppPanel>
  );
}
