"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LanguagesIcon } from "lucide-react";
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
import { createTranslationGeneration } from "@/features/translation-studio/actions";
import {
  defaultTranslationStudioInput,
  translationModeOptions,
  translationStudioInputSchema,
  type TranslationStudioInput,
  type TranslationStudioOutput,
} from "@/features/translation-studio/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";
import { useToolPreview } from "@/lib/stores/generation-preview-store";
import type { WorkspaceOptionLists } from "@/lib/workspace-options";

export function TranslationStudioForm({
  defaultValues = defaultTranslationStudioInput,
  languages,
}: {
  defaultValues?: TranslationStudioInput;
  languages: WorkspaceOptionLists["languages"];
}) {
  const { output, generationId, savePreview } =
    useToolPreview<TranslationStudioOutput>("translation-studio");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TranslationStudioInput>({
    resolver: zodResolver(translationStudioInputSchema),
    defaultValues,
  });

  async function onSubmit(values: TranslationStudioInput) {
    try {
      const result = await createTranslationGeneration(values);
      savePreview(result.output, result.generationId);
      toast.success("Translation saved to history.");
    } catch {
      toast.error("Could not translate this content.");
    }
  }

  return (
    <CustomOptionsProvider>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="app-panel ring-0">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <CardTitle>Translation input</CardTitle>
                <CardDescription>
                  Translate, localize, or adapt content for SEO in another language.
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
                name="sourceLanguage"
                render={({ field }) => (
                  <OptionSelectField
                    id="sourceLanguage"
                    label="From"
                    optionKey="languages"
                    options={languages}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.sourceLanguage?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="targetLanguage"
                render={({ field }) => (
                  <OptionSelectField
                    id="targetLanguage"
                    label="To"
                    optionKey="languages"
                    options={languages}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.targetLanguage?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="mode"
                render={({ field }) => (
                  <SimpleSelectField
                    id="mode"
                    label="Mode"
                    options={translationModeOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.mode?.message}
                  />
                )}
              />
            </FormFieldGrid>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="sourceContent">
                Content
              </label>
              <Textarea
                id="sourceContent"
                rows={10}
                placeholder="Paste product content to translate..."
                aria-invalid={Boolean(errors.sourceContent)}
                {...register("sourceContent")}
              />
              {errors.sourceContent?.message ? (
                <p className="text-sm text-destructive">
                  {errors.sourceContent.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Translation output is saved with notes and keywords.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                <LanguagesIcon data-icon="inline-start" />
                {isSubmitting ? "Translating..." : "Translate content"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <TranslationPreview output={output} generationId={generationId} />
      </div>
    </CustomOptionsProvider>
  );
}

function TranslationPreview({
  output,
  generationId,
}: {
  output: TranslationStudioOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="app-panel ring-0 h-fit xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>Translation result</CardTitle>
          <CardDescription>Translated content will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            No translation yet.
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
            <CardTitle>Translation result</CardTitle>
            <CardDescription>Saved generation {generationId}</CardDescription>
          </div>
          <Badge variant="secondary">Translation</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-sm">
          <PreviewBlock title="Translated content" value={output.translatedContent} />
          <PreviewBlock title="Localization notes" value={output.localizedNotes.join("\n")} />
          <PreviewBlock title="SEO keywords" value={output.seoKeywords.join(", ") || "None"} />
        </div>
      </CardContent>
    </Card>
  );
}
