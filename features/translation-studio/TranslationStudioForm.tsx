"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LanguagesIcon } from "lucide-react";
import { Controller, useForm, type Control } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTranslationGeneration } from "@/features/translation-studio/actions";
import {
  defaultTranslationStudioInput,
  translationLanguageOptions,
  translationModeOptions,
  translationStudioInputSchema,
  type TranslationStudioInput,
  type TranslationStudioOutput,
} from "@/features/translation-studio/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";
import { useToolPreview } from "@/lib/stores/generation-preview-store";

type SelectName = "sourceLanguage" | "targetLanguage" | "mode";

export function TranslationStudioForm() {
  const { output, generationId, savePreview } =
    useToolPreview<TranslationStudioOutput>("translation-studio");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TranslationStudioInput>({
    resolver: zodResolver(translationStudioInputSchema),
    defaultValues: defaultTranslationStudioInput,
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
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card className="app-panel ring-0">
        <CardHeader>
          <CardTitle>Translation input</CardTitle>
          <CardDescription>
            Translate, localize, or adapt content for SEO in another language.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-3">
              <SelectField
                control={control}
                name="sourceLanguage"
                label="From"
                options={translationLanguageOptions}
                error={errors.sourceLanguage?.message}
              />
              <SelectField
                control={control}
                name="targetLanguage"
                label="To"
                options={translationLanguageOptions}
                error={errors.targetLanguage?.message}
              />
              <SelectField
                control={control}
                name="mode"
                label="Mode"
                options={translationModeOptions}
                error={errors.mode?.message}
              />
            </div>

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
  );
}

function SelectField({
  control,
  name,
  label,
  options,
  error,
}: {
  control: Control<TranslationStudioInput>;
  name: SelectName;
  label: string;
  options: readonly string[];
  error?: string;
}) {
  const items = options.map((option) => ({ label: option, value: option }));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            items={items}
            value={field.value}
            onValueChange={(value) => field.onChange(value ?? "")}
          >
            <SelectTrigger id={name} aria-invalid={Boolean(error)} className="w-full">
              <SelectValue />
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
        )}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
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
