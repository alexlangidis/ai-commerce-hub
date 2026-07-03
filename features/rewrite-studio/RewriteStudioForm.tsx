"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
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
import { createRewriteGeneration } from "@/features/rewrite-studio/actions";
import {
  defaultRewriteStudioInput,
  rewriteLanguageOptions,
  rewriteModeOptions,
  rewriteStudioInputSchema,
  rewriteToneOptions,
  type RewriteStudioInput,
  type RewriteStudioOutput,
} from "@/features/rewrite-studio/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";

type SelectName = "mode" | "targetLanguage" | "tone";

export function RewriteStudioForm() {
  const [output, setOutput] = useState<RewriteStudioOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RewriteStudioInput>({
    resolver: zodResolver(rewriteStudioInputSchema),
    defaultValues: defaultRewriteStudioInput,
  });

  async function onSubmit(values: RewriteStudioInput) {
    try {
      const result = await createRewriteGeneration(values);
      setOutput(result.output);
      setGenerationId(result.generationId);
      toast.success("Rewrite saved to history.");
    } catch {
      toast.error("Could not rewrite this description.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card>
        <CardHeader>
          <CardTitle>Rewrite settings</CardTitle>
          <CardDescription>
            Paste existing product copy and choose how it should be improved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-3">
              <SelectField
                control={control}
                name="mode"
                label="Mode"
                options={rewriteModeOptions}
                error={errors.mode?.message}
              />
              <SelectField
                control={control}
                name="targetLanguage"
                label="Language"
                options={rewriteLanguageOptions}
                error={errors.targetLanguage?.message}
              />
              <SelectField
                control={control}
                name="tone"
                label="Tone"
                options={rewriteToneOptions}
                error={errors.tone?.message}
              />
            </div>

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
  );
}

function SelectField({
  control,
  name,
  label,
  options,
  error,
}: {
  control: Control<RewriteStudioInput>;
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

function RewritePreview({
  output,
  generationId,
}: {
  output: RewriteStudioOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="h-fit xl:sticky xl:top-20">
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
    <Card className="h-fit xl:sticky xl:top-20">
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
