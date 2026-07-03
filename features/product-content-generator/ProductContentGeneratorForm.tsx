"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ToolFormPanel,
  ToolPreviewPanel,
} from "@/components/app/form-panel";
import {
  CustomOptionsProvider,
  CustomOptionsToggle,
} from "@/components/app/custom-options-context";
import { FormFieldGrid } from "@/components/app/form-field";
import { OptionSelectField } from "@/components/app/option-select-field";
import { TextAreaField } from "@/components/app/text-area-field";
import { TextInputField } from "@/components/app/text-input-field";
import { createProductContent } from "@/features/product-content-generator/actions";
import {
  defaultProductContentInput,
  productContentInputSchema,
  type ProductContentInput,
  type ProductContentOutput,
} from "@/features/product-content-generator/schema";
import { PreviewBlock } from "@/features/shared/PreviewBlock";
import { useToolPreview } from "@/lib/stores/generation-preview-store";
import type { WorkspaceOptionLists } from "@/lib/workspace-options";

export function ProductContentGeneratorForm({
  defaultValues = defaultProductContentInput,
  optionLists,
}: {
  defaultValues?: ProductContentInput;
  optionLists: Pick<
    WorkspaceOptionLists,
    "languages" | "categories" | "tones"
  >;
}) {
  const { output, generationId, savePreview } =
    useToolPreview<ProductContentOutput>("product-generator");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductContentInput>({
    resolver: zodResolver(productContentInputSchema),
    defaultValues,
  });

  async function onSubmit(values: ProductContentInput) {
    try {
      const result = await createProductContent(values);
      savePreview(result.output, result.generationId);
      toast.success("Product content generated and saved.");
    } catch {
      toast.error("Could not generate product content. Please try again.");
    }
  }

  return (
    <CustomOptionsProvider>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <ToolFormPanel
          title="Product details"
          description="Add the product facts. The preview generator saves output to history without using AI yet."
          headerAction={<CustomOptionsToggle />}
        footer={
          <>
            <p className="text-sm text-muted-foreground">
              Output is saved as generation version 1 for history and future
              regeneration.
            </p>
            <Button type="submit" form="product-content-form" disabled={isSubmitting}>
              <WandSparklesIcon data-icon="inline-start" />
              {isSubmitting ? "Generating..." : "Generate preview"}
            </Button>
          </>
        }
      >
        <form
          id="product-content-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
            <div className="grid items-start gap-4 md:grid-cols-2 [&>*]:min-w-0">
              <TextInputField
                label="Product name"
                placeholder="MagSafe Clear Case"
                inputProps={register("productName")}
                error={errors.productName?.message}
              />
              <TextInputField
                label="Brand"
                placeholder="Acme"
                inputProps={register("brand")}
                error={errors.brand?.message}
              />
            </div>

            <FormFieldGrid className="md:grid-cols-1 xl:grid-cols-3">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <OptionSelectField
                    id="category"
                    label="Category"
                    optionKey="categories"
                    options={optionLists.categories}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.category?.message}
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
          </form>
      </ToolFormPanel>

      <ProductContentPreview output={output} generationId={generationId} />
      </div>
    </CustomOptionsProvider>
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
      <ToolPreviewPanel
        title="Output preview"
        description="Generated content will appear here after the first submit."
      >
        <div className="tool-empty-state">No generation yet. Fill in the form and click Generate preview.</div>
      </ToolPreviewPanel>
    );
  }

  return (
    <ToolPreviewPanel
      title="Output preview"
      description={`Saved generation ${generationId}`}
      badge={<Badge variant="secondary">Preview</Badge>}
    >
      <div className="flex flex-col gap-3 text-sm">
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
    </ToolPreviewPanel>
  );
}
