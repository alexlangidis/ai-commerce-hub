"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch, type Control } from "react-hook-form";
import { toast } from "sonner";

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
import { saveBrandVoice } from "@/features/brand-voice/actions";
import {
  avoidOptions,
  brandVoiceSchema,
  defaultBrandVoiceValues,
  languageOptions,
  preferredCtaOptions,
  styleOptions,
  toneOptions,
  type BrandVoiceValues,
} from "@/features/brand-voice/schema";

type BrandVoiceFormProps = {
  initialValues?: BrandVoiceValues;
};

type SelectFieldName = "language" | "tone" | "style" | "avoid" | "preferredCta";

export function BrandVoiceForm({ initialValues }: BrandVoiceFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandVoiceValues>({
    resolver: zodResolver(brandVoiceSchema),
    defaultValues: initialValues ?? defaultBrandVoiceValues,
  });
  const previewValues = useWatch({ control });

  async function onSubmit(values: BrandVoiceValues) {
    try {
      await saveBrandVoice(values);
      toast.success("Brand voice saved.");
      router.refresh();
    } catch {
      toast.error("Could not save brand voice. Please try again.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="app-panel ring-0">
        <CardHeader>
          <CardTitle>Brand rules</CardTitle>
          <CardDescription>
            Choose presets first. Adjust the detail fields only when the brand
            needs something more specific.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                control={control}
                name="language"
                label="Default language"
                description="The language AI outputs should prefer."
                options={languageOptions}
                error={errors.language?.message}
              />
              <SelectField
                control={control}
                name="tone"
                label="Tone"
                description="How the copy should sound."
                options={toneOptions}
                error={errors.tone?.message}
              />
            </div>

            <SelectField
              control={control}
              name="style"
              label="Writing style"
              description="Pick the closest style for product descriptions and rewrites."
              options={styleOptions}
              error={errors.style?.message}
            />

            <SelectField
              control={control}
              name="avoid"
              label="Avoid"
              description="The main things AI should not include."
              options={avoidOptions}
              error={errors.avoid?.message}
            />

            <SelectField
              control={control}
              name="preferredCta"
              label="Preferred CTA"
              description="Reusable call-to-action for generated product copy."
              options={preferredCtaOptions}
              error={errors.preferredCta?.message}
            />

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                These settings will be reused by Product Generator, Rewrite,
                SEO, and Translation tools.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save brand voice"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="app-panel ring-0 h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>AI output preview</CardTitle>
          <CardDescription>
            This is the instruction profile future AI tools will follow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-col gap-4 text-sm">
            <PreviewRow label="Language" value={previewValues.language} />
            <PreviewRow label="Tone" value={previewValues.tone} />
            <PreviewRow label="Style" value={previewValues.style} />
            <PreviewRow label="Avoid" value={previewValues.avoid} />
            <PreviewRow label="CTA" value={previewValues.preferredCta} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function SelectField({
  control,
  name,
  label,
  description,
  options,
  error,
}: {
  control: Control<BrandVoiceValues>;
  name: SelectFieldName;
  label: string;
  description: string;
  options: readonly string[];
  error?: string;
}) {
  const items = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
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
        )}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-muted p-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="leading-6">{value || "Not set"}</dd>
    </div>
  );
}
