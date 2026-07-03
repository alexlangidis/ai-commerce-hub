"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchCheckIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CustomOptionsProvider,
  CustomOptionsToggle,
} from "@/components/app/custom-options-context";
import { formFieldSplitGridClassName } from "@/components/app/form-field";
import { OptionSelectField } from "@/components/app/option-select-field";
import { TextAreaField } from "@/components/app/text-area-field";
import { TextInputField } from "@/components/app/text-input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSeoOptimization } from "@/features/seo-optimizer/actions";
import {
  defaultSeoOptimizerInput,
  seoOptimizerInputSchema,
  type SeoOptimizerInput,
  type SeoOptimizerOutput,
} from "@/features/seo-optimizer/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";
import { useToolPreview } from "@/lib/stores/generation-preview-store";
import type { WorkspaceOptionLists } from "@/lib/workspace-options";
import { cn } from "@/lib/utils";

export function SeoOptimizerForm({
  defaultValues = defaultSeoOptimizerInput,
  languages,
}: {
  defaultValues?: SeoOptimizerInput;
  languages: WorkspaceOptionLists["languages"];
}) {
  const { output, generationId, savePreview } =
    useToolPreview<SeoOptimizerOutput>("seo-optimizer");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeoOptimizerInput>({
    resolver: zodResolver(seoOptimizerInputSchema),
    defaultValues,
  });

  async function onSubmit(values: SeoOptimizerInput) {
    try {
      const result = await createSeoOptimization(values);
      savePreview(result.output, result.generationId);
      toast.success("SEO optimization saved to history.");
    } catch {
      toast.error("Could not optimize this content.");
    }
  }

  return (
    <CustomOptionsProvider>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="app-panel ring-0">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle>SEO input</CardTitle>
                <CardDescription>
                  Add a title, description, and target keyword.
                </CardDescription>
              </div>
              <CustomOptionsToggle />
            </div>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className={cn(formFieldSplitGridClassName)}>
              <TextInputField
                label="Title"
                placeholder="Wireless Fast Charger"
                inputProps={register("title")}
                error={errors.title?.message}
              />
              <Controller
                control={control}
                name="targetLanguage"
                render={({ field }) => (
                  <OptionSelectField
                    id="targetLanguage"
                    label="Language"
                    optionKey="languages"
                    options={languages}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.targetLanguage?.message}
                  />
                )}
              />
            </div>
            <TextInputField
              label="Target keyword"
              placeholder="fast wireless charger"
              inputProps={register("targetKeyword")}
              error={errors.targetKeyword?.message}
            />
            <TextAreaField
              label="Description"
              placeholder="Paste the current product description..."
              rows={8}
              inputProps={register("description")}
              error={errors.description?.message}
            />
            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Result includes score, suggestions, meta description, and an
                improved version.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                <SearchCheckIcon data-icon="inline-start" />
                {isSubmitting ? "Optimizing..." : "Optimize SEO"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <SeoPreview output={output} generationId={generationId} />
      </div>
    </CustomOptionsProvider>
  );
}

function SeoPreview({
  output,
  generationId,
}: {
  output: SeoOptimizerOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="app-panel ring-0 h-fit xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>SEO result</CardTitle>
          <CardDescription>Optimization results will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            No optimization yet.
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
            <CardTitle>SEO result</CardTitle>
            <CardDescription>Saved generation {generationId}</CardDescription>
          </div>
          <Badge variant="secondary">{output.seoScore}/100</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-sm">
          <PreviewBlock title="Title suggestions" value={output.titleSuggestions.join("\n")} />
          <PreviewBlock title="Meta description" value={output.metaDescription} />
          <PreviewBlock title="Missing keywords" value={output.missingKeywords.join(", ") || "None"} />
          <PreviewBlock title="Improved version" value={output.improvedVersion} />
        </div>
      </CardContent>
    </Card>
  );
}
