import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "app-shell relative flex w-full flex-1 flex-col gap-6 p-4 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
