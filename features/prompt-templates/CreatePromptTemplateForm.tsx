"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppPanel } from "@/components/app/app-panel";
import {
  CustomOptionsProvider,
  CustomOptionsToggle,
} from "@/components/app/custom-options-context";
import { OptionSelectField } from "@/components/app/option-select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPromptTemplate } from "@/features/prompt-templates/actions";
import {
  createPromptTemplateSchema,
  type CreatePromptTemplateInput,
} from "@/features/prompt-templates/schema";

type CreatePromptTemplateFormProps = {
  categories: readonly string[];
};

export function CreatePromptTemplateForm({
  categories,
}: CreatePromptTemplateFormProps) {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePromptTemplateInput>({
    resolver: zodResolver(createPromptTemplateSchema),
    defaultValues: {
      name: "",
      category: categories[0] ?? "",
      description: "",
      fieldsText: "",
    },
  });

  async function onSubmit(values: CreatePromptTemplateInput) {
    try {
      await createPromptTemplate(values);
      toast.success("Template created.");
      reset({
        name: "",
        category: categories[0] ?? "",
        description: "",
        fieldsText: "",
      });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create template.",
      );
    }
  }

  return (
    <CustomOptionsProvider>
      <AppPanel className="overflow-visible">
        <div className="border-b border-border/60 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-semibold">Create your own template</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Define the product type, category, and fields you want to reuse.
              </p>
            </div>
            <CustomOptionsToggle />
          </div>
        </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-5 py-5 sm:px-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Template name" error={errors.name?.message}>
            <Input
              placeholder="Wireless earbuds"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
          </Field>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <OptionSelectField
                id="template-category"
                label="Category"
                optionKey="categories"
                options={categories}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.category?.message}
              />
            )}
          />
        </div>

        <Field label="Description" error={errors.description?.message}>
          <Textarea
            placeholder="For true wireless earbuds, charging cases, and in-ear audio gear."
            rows={3}
            aria-invalid={Boolean(errors.description)}
            {...register("description")}
          />
        </Field>

        <Field
          label="Fields"
          description="One field per line. These are the product facts you usually collect."
          error={errors.fieldsText?.message}
        >
          <Textarea
            placeholder={"Battery life\nNoise cancellation\nCompatibility\nIncluded accessories"}
            rows={5}
            aria-invalid={Boolean(errors.fieldsText)}
            {...register("fieldsText")}
          />
        </Field>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            <PlusIcon data-icon="inline-start" />
            {isSubmitting ? "Creating..." : "Create template"}
          </Button>
        </div>
      </form>
      </AppPanel>
    </CustomOptionsProvider>
  );
}

function Field({
  label,
  description,
  error,
  children,
}: {
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium leading-none">{label}</span>
        {description ? (
          <p className="text-xs leading-5 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
