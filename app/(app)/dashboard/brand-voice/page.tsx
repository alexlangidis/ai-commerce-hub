import { BrandVoiceForm } from "@/features/brand-voice/BrandVoiceForm";
import { getBrandVoice } from "@/features/brand-voice/actions";
import { defaultBrandVoiceValues } from "@/features/brand-voice/schema";

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Brand Voice
        </p>
        <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Set the voice every AI tool should follow
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          This profile will guide generated product descriptions, rewrites,
          translations, and SEO copy.
        </p>
      </section>

      <BrandVoiceForm initialValues={initialValues} />
    </main>
  );
}
