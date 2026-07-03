"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";

import { saveBrandVoice } from "@/features/brand-voice/actions";
import {
  brandVoiceSchema,
  defaultBrandVoiceValues,
  type BrandVoiceValues,
} from "@/features/brand-voice/schema";

type BrandVoiceFormProps = {
  initialValues?: BrandVoiceValues;
};

export function BrandVoiceForm({ initialValues }: BrandVoiceFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandVoiceValues>({
    resolver: zodResolver(brandVoiceSchema),
    defaultValues: initialValues ?? defaultBrandVoiceValues,
  });

  async function onSubmit(values: BrandVoiceValues) {
    setStatus("");
    await saveBrandVoice(values);
    setStatus("Brand voice saved.");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-2xl flex-col gap-5 rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950"
    >
      <Field
        label="Language"
        error={errors.language?.message}
        inputProps={register("language")}
      />
      <Field
        label="Tone"
        error={errors.tone?.message}
        inputProps={register("tone")}
      />
      <TextAreaField
        label="Style"
        error={errors.style?.message}
        inputProps={register("style")}
      />
      <TextAreaField
        label="Avoid"
        error={errors.avoid?.message}
        inputProps={register("avoid")}
      />
      <TextAreaField
        label="Preferred CTA"
        error={errors.preferredCta?.message}
        inputProps={register("preferredCta")}
      />

      {status ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
          {status}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Saving..." : "Save brand voice"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  inputProps: UseFormRegisterReturn;
};

function Field({ label, error, inputProps }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      {label}
      <input
        {...inputProps}
        aria-invalid={Boolean(error)}
        className="h-11 rounded-md border border-black/10 bg-transparent px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-white/15 dark:text-zinc-50 dark:focus:border-zinc-50"
      />
      {error ? (
        <span className="text-sm font-normal text-red-600 dark:text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  error?: string;
  inputProps: UseFormRegisterReturn;
};

function TextAreaField({ label, error, inputProps }: TextAreaFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      {label}
      <textarea
        {...inputProps}
        rows={3}
        aria-invalid={Boolean(error)}
        className="min-h-24 rounded-md border border-black/10 bg-transparent px-3 py-2 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-white/15 dark:text-zinc-50 dark:focus:border-zinc-50"
      />
      {error ? (
        <span className="text-sm font-normal text-red-600 dark:text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}
