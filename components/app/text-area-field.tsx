"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { FormField } from "@/components/app/form-field";
import { Textarea } from "@/components/ui/textarea";

type TextAreaFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  inputProps: UseFormRegisterReturn;
};

export function TextAreaField({
  label,
  description,
  placeholder,
  error,
  rows = 4,
  inputProps,
}: TextAreaFieldProps) {
  return (
    <FormField
      id={inputProps.name}
      label={label}
      description={description}
      error={error}
    >
      <Textarea
        {...inputProps}
        id={inputProps.name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
    </FormField>
  );
}
