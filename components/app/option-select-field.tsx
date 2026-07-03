"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/app/form-field";
import { useCustomOptions } from "@/components/app/custom-options-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addWorkspaceOption } from "@/features/workspace-options/actions";
import type { WorkspaceOptionKey } from "@/lib/workspace-options";
import { cn } from "@/lib/utils";

type OptionSelectFieldProps = {
  id: string;
  label: string;
  description?: string;
  options: readonly string[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  optionKey: WorkspaceOptionKey;
  addPlaceholder?: string;
  footer?: ReactNode;
  className?: string;
};

export function OptionSelectField({
  id,
  label,
  description,
  options,
  value,
  onValueChange,
  error,
  optionKey,
  addPlaceholder = "Add custom option",
  footer,
  className,
}: OptionSelectFieldProps) {
  const router = useRouter();
  const customOptions = useCustomOptions();
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const showCustomEditor = customOptions?.enabled ?? false;
  const items = options.map((option) => ({
    label: option,
    value: option,
  }));

  const canAdd = Boolean(draft.trim()) && !isPending;

  function handleAddOption() {
    const nextValue = draft.trim();

    if (!nextValue) {
      return;
    }

    startTransition(async () => {
      try {
        const created = await addWorkspaceOption({
          key: optionKey,
          value: nextValue,
        });
        onValueChange(created);
        setDraft("");
        toast.success(`Added "${created}".`);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not add option.",
        );
      }
    });
  }

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      error={error}
      footer={footer}
      className={className}
    >
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onValueChange(next ?? "")}
      >
        <SelectTrigger id={id} aria-invalid={Boolean(error)} className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {showCustomEditor ? (
        <div className="flex min-w-0 items-center gap-2">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={addPlaceholder}
            aria-label={`Add custom ${label.toLowerCase()}`}
            disabled={isPending}
            className="min-w-0 flex-1"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddOption();
              }
            }}
          />
          <Button
            type="button"
            variant={canAdd ? "default" : "outline"}
            className={cn(
              "shrink-0 disabled:pointer-events-none disabled:opacity-100",
              !canAdd &&
                "border-primary/25 bg-primary/10 text-primary/70 hover:bg-primary/10 hover:text-primary/70 dark:bg-primary/15 dark:hover:bg-primary/15",
            )}
            disabled={!canAdd}
            onClick={handleAddOption}
          >
            <PlusIcon data-icon="inline-start" />
            Add
          </Button>
        </div>
      ) : null}
    </FormField>
  );
}
