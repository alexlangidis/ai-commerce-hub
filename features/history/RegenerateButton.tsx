"use client";

import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { regenerateGeneration } from "@/features/history/actions";

export function RegenerateButton({
  generationId,
  disabled = false,
}: {
  generationId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRegenerate() {
    startTransition(async () => {
      try {
        const result = await regenerateGeneration(generationId);
        toast.success(`Version ${result.versionNumber} generated.`);
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not regenerate this generation.",
        );
      }
    });
  }

  return (
    <Button
      type="button"
      onClick={handleRegenerate}
      disabled={disabled || isPending}
    >
      <RefreshCwIcon data-icon="inline-start" />
      {isPending ? "Regenerating..." : "Regenerate"}
    </Button>
  );
}
