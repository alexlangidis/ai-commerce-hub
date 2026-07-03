import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const formFieldGridClassName =
  "grid items-start gap-4 md:grid-cols-3 [&>*]:min-w-0";

export const formFieldGridWideClassName =
  "grid items-start gap-4 xl:grid-cols-3 [&>*]:min-w-0";

export const formFieldSplitGridClassName =
  "grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_220px] [&>*]:min-w-0";

type FormFieldProps = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  className?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function FormField({
  id,
  label,
  description,
  error,
  className,
  children,
  footer,
}: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <label className="text-sm font-medium leading-none" htmlFor={id}>
          {label}
        </label>
        {description ? (
          <p className="text-xs leading-5 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {footer}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

export function FormFieldGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(formFieldGridClassName, className)}>{children}</div>
  );
}
