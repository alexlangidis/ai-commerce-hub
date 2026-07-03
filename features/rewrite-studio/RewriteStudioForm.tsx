"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CustomOptionsProvider,
  CustomOptionsToggle,
} from "@/components/app/custom-options-context";
import { FormFieldGrid } from "@/components/app/form-field";
import { OptionSelectField } from "@/components/app/option-select-field";
import { SimpleSelectField } from "@/components/app/simple-select-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createRewriteGeneration } from "@/features/rewrite-studio/actions";
import {
  defaultRewriteStudioInput,
  rewriteModeOptions,
  rewriteStudioInputSchema,
  type RewriteStudioInput,
  type RewriteStudioOutput,
} from "@/features/rewrite-studio/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";
import { useToolPreview } from "@/lib/stores/generation-preview-store";
import type { WorkspaceOptionLists } from "@/lib/workspace-options";

export function RewriteStudioForm({
  defaultValues = defaultRewriteStudioInput,
  optionLists,
}: {
  defaultValues?: RewriteStudioInput;
  optionLists: Pick<WorkspaceOptionLists, "languages" | "tones">;
}) {
  const { output, generationId, savePreview } =
    useToolPreview<RewriteStudioOutput>("rewrite-studio");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RewriteStudioInput>({
    resolver: zodResolver(rewriteStudioInputSchema),
    defaultValues,
  });

  async function onSubmit(values: RewriteStudioInput) {
    try {
      const result = await createRewriteGeneration(values);
      savePreview(result.output, result.generationId);
      toast.success("Rewrite saved to history.");
    } catch {
      toast.error("Could not rewrite this description.");
    }
  }

  return (
    <CustomOptionsProvider>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="app-panel ring-0">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle>Rewrite settings</CardTitle>
                <CardDescription>
                  Paste existing product copy and choose how it should be improved.
                </CardDescription>
              </div>
              <CustomOptionsToggle />
            </div>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormFieldGrid>
              <Controller
                control={control}
                name="mode"
                render={({ field }) => (
                  <SimpleSelectField
                    id="mode"
                    label="Mode"
                    options={rewriteModeOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.mode?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="targetLanguage"
                render={({ field }) => (
                  <OptionSelectField
                    id="targetLanguage"
                    label="Language"
                    optionKey="languages"
                    options={optionLists.languages}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.targetLanguage?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="tone"
                render={({ field }) => (
                  <OptionSelectField
                    id="tone"
                    label="Tone"
                    optionKey="tones"
                    options={optionLists.tones}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.tone?.message}
                  />
                )}
              />
            </FormFieldGrid>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="existingDescription">
                Existing description
              </label>
              <Textarea
                id="existingDescription"
                rows={10}
                placeholder="Paste the current product description here..."
                aria-invalid={Boolean(errors.existingDescription)}
                {...register("existingDescription")}
              />
              {errors.existingDescription?.message ? (
                <p className="text-sm text-destructive">
                  {errors.existingDescription.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                The rewrite will be saved to History with before/after data.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                <WandSparklesIcon data-icon="inline-start" />
                {isSubmitting ? "Rewriting..." : "Rewrite description"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <RewritePreview output={output} generationId={generationId} />
      </div>
    </CustomOptionsProvider>
  );
}

function RewritePreview({
  output,
  generationId,
}: {
  output: RewriteStudioOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="app-panel ring-0 h-fit xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>Before / after</CardTitle>
          <CardDescription>Your rewritten content will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            No rewrite yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="app-panel ring-0 h-fit xl:sticky xl:top-24">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Before / after</CardTitle>
            <CardDescription>Saved generation {generationId}</CardDescription>
          </div>
          <Badge variant="secondary">Rewrite</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-sm">
          <PreviewBlock title="Before" value={output.beforeAfterPreview.before} />
          <PreviewBlock title="After" value={output.beforeAfterPreview.after} />
          <PreviewBlock
            title="Changes"
            value={output.summaryOfChanges.join("\n")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
