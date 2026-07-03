"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deletePromptTemplate } from "@/features/prompt-templates/actions";

type DeletePromptTemplateButtonProps = {
  templateId: string;
};

export function DeletePromptTemplateButton({
  templateId,
}: DeletePromptTemplateButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePromptTemplate(templateId);
        toast.success("Template deleted.");
        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not delete template.",
        );
      }
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="shrink-0 text-muted-foreground hover:text-destructive"
      disabled={isPending}
      aria-label="Delete template"
      onClick={handleDelete}
    >
      <Trash2Icon />
    </Button>
  );
}
