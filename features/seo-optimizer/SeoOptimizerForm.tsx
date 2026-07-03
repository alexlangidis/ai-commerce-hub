"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchCheckIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type Control, type UseFormRegisterReturn } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { createSeoOptimization } from "@/features/seo-optimizer/actions";
import {
  defaultSeoOptimizerInput,
  seoLanguageOptions,
  seoOptimizerInputSchema,
  type SeoOptimizerInput,
  type SeoOptimizerOutput,
} from "@/features/seo-optimizer/schema";

export function SeoOptimizerForm() {
  const [output, setOutput] = useState<SeoOptimizerOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeoOptimizerInput>({
    resolver: zodResolver(seoOptimizerInputSchema),
    defaultValues: defaultSeoOptimizerInput,
  });

  async function onSubmit(values: SeoOptimizerInput) {
    try {
      const result = await createSeoOptimization(values);
      setOutput(result.output);
      setGenerationId(result.generationId);
      toast.success("SEO optimization saved to history.");
    } catch {
      toast.error("Could not optimize this content.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card>
        <CardHeader>
          <CardTitle>SEO input</CardTitle>
          <CardDescription>
            Add a title, description, and target keyword.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <InputField
                label="Title"
                placeholder="Wireless Fast Charger"
                inputProps={register("title")}
                error={errors.title?.message}
              />
              <LanguageSelect
                control={control}
                error={errors.targetLanguage?.message}
              />
            </div>
            <InputField
              label="Target keyword"
              placeholder="fast wireless charger"
              inputProps={register("targetKeyword")}
              error={errors.targetKeyword?.message}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                rows={8}
                placeholder="Paste the current product description..."
                aria-invalid={Boolean(errors.description)}
                {...register("description")}
              />
              {errors.description?.message ? (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              ) : null}
            </div>
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
  );
}

function InputField({
  label,
  placeholder,
  inputProps,
  error,
}: {
  label: string;
  placeholder: string;
  inputProps: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={inputProps.name}>
        {label}
      </label>
      <Input
        {...inputProps}
        id={inputProps.name}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function LanguageSelect({
  control,
  error,
}: {
  control: Control<SeoOptimizerInput>;
  error?: string;
}) {
  const items = seoLanguageOptions.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor="targetLanguage">
        Language
      </label>
      <Controller
        control={control}
        name="targetLanguage"
        render={({ field }) => (
          <Select
            items={items}
            value={field.value}
            onValueChange={(value) => field.onChange(value ?? "")}
          >
            <SelectTrigger
              id="targetLanguage"
              aria-invalid={Boolean(error)}
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
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

function SeoPreview({
  output,
  generationId,
}: {
  output: SeoOptimizerOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="h-fit xl:sticky xl:top-20">
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
    <Card className="h-fit xl:sticky xl:top-20">
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

function PreviewBlock({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-lg bg-muted p-3">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <p className="whitespace-pre-wrap leading-6">{value}</p>
    </section>
  );
}
