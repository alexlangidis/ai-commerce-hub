"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Could not copy. Please try again.");
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
      <CopyIcon data-icon="inline-start" />
      {label}
    </Button>
  );
}
