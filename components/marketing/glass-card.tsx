import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: ReactNode;
  glow?: boolean;
};

export function GlassCard({ className, children, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "landing-glass rounded-2xl",
        glow && "landing-glow",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto text-center"
      )}
    >
      <p className="text-sm font-medium tracking-wide text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-muted-foreground text-pretty">
        {description}
      </p>
    </div>
  );
}
