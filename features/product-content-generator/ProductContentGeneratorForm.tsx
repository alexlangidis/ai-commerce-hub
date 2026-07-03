"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
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
import { createProductContent } from "@/features/product-content-generator/actions";
import {
  defaultProductContentInput,
  productCategoryOptions,
  productContentInputSchema,
  productLanguageOptions,
  productToneOptions,
  type ProductContentInput,
  type ProductContentOutput,
} from "@/features/product-content-generator/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";

type SelectFieldName = "category" | "targetLanguage" | "tone";

export function ProductContentGeneratorForm() {
  const [output, setOutput] = useState<ProductContentOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductContentInput>({
    resolver: zodResolver(productContentInputSchema),
    defaultValues: defaultProductContentInput,
  });

  async function onSubmit(values: ProductContentInput) {
    try {
      const result = await createProductContent(values);
      setOutput(result.output);
      setGenerationId(result.generationId);
      toast.success("Product content generated and saved.");
    } catch {
      toast.error("Could not generate product content. Please try again.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card>
        <CardHeader>
          <CardTitle>Product details</CardTitle>
          <CardDescription>
            Add the product facts. The preview generator saves output to history
            without using AI yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Product name"
                placeholder="MagSafe Clear Case"
                inputProps={register("productName")}
                error={errors.productName?.message}
              />
              <InputField
                label="Brand"
                placeholder="Acme"
                inputProps={register("brand")}
                error={errors.brand?.message}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <SelectField
                control={control}
                name="category"
                label="Category"
                options={productCategoryOptions}
                error={errors.category?.message}
              />
              <SelectField
                control={control}
                name="targetLanguage"
                label="Language"
                options={productLanguageOptions}
                error={errors.targetLanguage?.message}
              />
              <SelectField
                control={control}
                name="tone"
                label="Tone"
                options={productToneOptions}
                error={errors.tone?.message}
              />
            </div>

            <TextAreaField
              label="Features"
              description="One per line or comma-separated."
              placeholder="Transparent design, MagSafe compatible, raised camera edge"
              inputProps={register("features")}
              error={errors.features?.message}
            />

            <TextAreaField
              label="Specifications"
              description="Add dimensions, compatibility, material, capacity, or other facts."
              placeholder="Compatible with iPhone 15, TPU material, 1.5mm raised lip"
              inputProps={register("specifications")}
              error={errors.specifications?.message}
            />

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Output is saved as generation version 1 for history and future
                regeneration.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                <WandSparklesIcon data-icon="inline-start" />
                {isSubmitting ? "Generating..." : "Generate preview"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ProductContentPreview output={output} generationId={generationId} />
    </div>
  );
}

function InputField({
  label,
  placeholder,
  error,
  inputProps,
}: {
  label: string;
  placeholder: string;
  error?: string;
  inputProps: UseFormRegisterReturn;
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

function SelectField({
  control,
  name,
  label,
  options,
  error,
}: {
  control: Control<ProductContentInput>;
  name: SelectFieldName;
  label: string;
  options: readonly string[];
  error?: string;
}) {
  const items = options.map((option) => ({
    label: option,
    value: option,
  }));

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

function TextAreaField({
  label,
  description,
  placeholder,
  error,
  inputProps,
}: {
  label: string;
  description: string;
  placeholder: string;
  error?: string;
  inputProps: UseFormRegisterReturn;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor={inputProps.name}>
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Textarea
        {...inputProps}
        id={inputProps.name}
        rows={4}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function ProductContentPreview({
  output,
  generationId,
}: {
  output: ProductContentOutput | null;
  generationId: string;
}) {
  if (!output) {
    return (
      <Card className="h-fit xl:sticky xl:top-20">
        <CardHeader>
          <CardTitle>Output preview</CardTitle>
          <CardDescription>
            Generated content will appear here after the first submit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            No generation yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit xl:sticky xl:top-20">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle>Output preview</CardTitle>
            <CardDescription>Saved generation {generationId}</CardDescription>
          </div>
          <Badge variant="secondary">Preview</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-sm">
          <PreviewBlock title="SEO title" value={output.seoTitle} />
          <PreviewBlock title="Short description" value={output.shortDescription} />
          <PreviewBlock title="Long description" value={output.longDescription} />
          <PreviewBlock title="Benefits" value={output.bulletBenefits.join("\n")} />
          <PreviewBlock title="Meta title" value={output.metaTitle} />
          <PreviewBlock title="Meta description" value={output.metaDescription} />
          <PreviewBlock title="Tags" value={output.tags.join(", ")} />
          <PreviewBlock title="Image alt text" value={output.imageAltText} />
          <PreviewBlock title="WooCommerce HTML" value={output.wooCommerceHtml} />
        </div>
      </CardContent>
    </Card>
  );
}
