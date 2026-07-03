import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              Brand Voice
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">
              Teach the app how your product copy should sound.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              These settings become the default instructions for the Product
              Content Generator, Rewrite Studio, SEO Optimizer, and Translation
              Studio.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick setup</CardTitle>
            <CardDescription>
              Start with presets. You can refine them later.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </section>

      <BrandVoiceForm initialValues={initialValues} />
    </main>
  );
}
