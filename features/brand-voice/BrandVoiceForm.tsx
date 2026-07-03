"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MegaphoneIcon, ShieldAlertIcon, SparklesIcon, TypeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ComponentType, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { AppPanel } from "@/components/app/app-panel";
import {
  CustomOptionsProvider,
  CustomOptionsToggle,
} from "@/components/app/custom-options-context";
import { OptionSelectField } from "@/components/app/option-select-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { saveBrandVoice } from "@/features/brand-voice/actions";
import {
  brandVoiceSchema,
  defaultBrandVoiceValues,
  type BrandVoiceValues,
} from "@/features/brand-voice/schema";
import type { WorkspaceOptionLists } from "@/lib/workspace-options";
import { cn } from "@/lib/utils";

type BrandVoiceFormProps = {
  initialValues?: BrandVoiceValues;
  optionLists: Pick<
    WorkspaceOptionLists,
    "languages" | "tones" | "styles" | "avoids" | "ctas"
  >;
};

export function BrandVoiceForm({
  initialValues,
  optionLists,
}: BrandVoiceFormProps) {
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
    <CustomOptionsProvider>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
        <AppPanel className="overflow-visible">
          <div className="border-b border-border/60 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-base font-semibold">Brand rules</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick presets or add your own. Custom options sync across all tools.
                </p>
              </div>
              <CustomOptionsToggle />
            </div>
          </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-6">
            <BrandRuleSection
              title="Voice & language"
              icon={SparklesIcon}
            >
              <Controller
                control={control}
                name="language"
                render={({ field }) => (
                  <OptionSelectField
                    id="language"
                    label="Default language"
                    optionKey="languages"
                    options={optionLists.languages}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.language?.message}
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
            </BrandRuleSection>

            <Separator />

            <BrandRuleSection title="Writing style" icon={TypeIcon}>
              <Controller
                control={control}
                name="style"
                render={({ field }) => (
                  <OptionSelectField
                    id="style"
                    label="Style"
                    optionKey="styles"
                    options={optionLists.styles}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.style?.message}
                    addPlaceholder="Custom style"
                  />
                )}
              />
            </BrandRuleSection>

            <Separator />

            <BrandRuleSection title="Constraints" icon={ShieldAlertIcon}>
              <Controller
                control={control}
                name="avoid"
                render={({ field }) => (
                  <OptionSelectField
                    id="avoid"
                    label="Avoid"
                    optionKey="avoids"
                    options={optionLists.avoids}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.avoid?.message}
                    addPlaceholder="Custom rule"
                  />
                )}
              />
            </BrandRuleSection>

            <Separator />

            <BrandRuleSection title="Call to action" icon={MegaphoneIcon}>
              <Controller
                control={control}
                name="preferredCta"
                render={({ field }) => (
                  <OptionSelectField
                    id="preferredCta"
                    label="Preferred CTA"
                    optionKey="ctas"
                    options={optionLists.ctas}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.preferredCta?.message}
                    addPlaceholder="Custom CTA"
                  />
                )}
              />
            </BrandRuleSection>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Applies to Product Generator, Rewrite, SEO, and Translation.
            </p>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Saving..." : "Save brand voice"}
            </Button>
          </div>
        </form>
      </AppPanel>

      <AppPanel className="h-fit xl:sticky xl:top-24">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold">Live preview</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              AI instruction profile
            </p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Active
          </Badge>
        </div>
        <dl className="flex flex-col gap-2.5 p-5 sm:p-6">
          <PreviewRow label="Language" value={previewValues.language} />
          <PreviewRow label="Tone" value={previewValues.tone} />
          <PreviewRow label="Style" value={previewValues.style} />
          <PreviewRow label="Avoid" value={previewValues.avoid} />
          <PreviewRow label="CTA" value={previewValues.preferredCta} />
        </dl>
      </AppPanel>
    </div>
    </CustomOptionsProvider>
  );
}

function BrandRuleSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-3.5" />
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg bg-muted/40 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className={cn("mt-1 text-sm leading-5", !value && "text-muted-foreground")}>
        {value || "Not set"}
      </dd>
    </div>
  );
}
