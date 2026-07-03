import { AppPanel } from "@/components/app/app-panel";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { BrandVoiceForm } from "@/features/brand-voice/BrandVoiceForm";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { defaultBrandVoiceValues } from "@/features/brand-voice/schema";

const setupSteps = [
  "Choose your default language.",
  "Pick the tone and writing style.",
  "Set what AI should avoid.",
  "Save once and reuse everywhere.",
];

export default async function BrandVoicePage() {
  const brandVoice = await getBrandVoice();
  const initialValues = brandVoice
    ? {
        language: brandVoice.language,
        tone: brandVoice.tone,
        style: brandVoice.style,
        avoid: brandVoice.avoid,
        preferredCta: brandVoice.preferredCta,
      }
    : defaultBrandVoiceValues;

  return (
    <PageShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PageHeader
          eyebrow="Brand Voice"
          title="Teach the app how your product copy should sound."
          description="These settings become the default instructions for the Product Content Generator, Rewrite Studio, SEO Optimizer, and Translation Studio."
          className="h-full"
        />

        <AppPanel>
          <div className="flex flex-col gap-4 p-6">
            <div>
              <h2 className="text-base font-semibold">Quick setup</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Start with presets. You can refine them later.
              </p>
            </div>
            <ol className="flex flex-col gap-3 text-sm">
              {setupSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </AppPanel>
      </section>

      <BrandVoiceForm initialValues={initialValues} />
    </PageShell>
  );
}
