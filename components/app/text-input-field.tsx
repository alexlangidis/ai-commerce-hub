"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { FormField } from "@/components/app/form-field";
import { Input } from "@/components/ui/input";

type TextInputFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
  error?: string;
  inputProps: UseFormRegisterReturn;
};

export function TextInputField({
  label,
  description,
  placeholder,
  error,
  inputProps,
}: TextInputFieldProps) {
  return (
    <FormField
      id={inputProps.name}
      label={label}
      description={description}
      error={error}
    >
      <Input
        {...inputProps}
        id={inputProps.name}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
    </FormField>
  );
}
