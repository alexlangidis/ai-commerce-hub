"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/app/form-field";

type SimpleSelectFieldProps = {
  id: string;
  label: string;
  description?: string;
  options: readonly string[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

export function SimpleSelectField({
  id,
  label,
  description,
  options,
  value,
  onValueChange,
  error,
  placeholder,
}: SimpleSelectFieldProps) {
  const items = options.map((option) => ({ label: option, value: option }));

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      error={error}
    >
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onValueChange(next ?? "")}
      >
        <SelectTrigger id={id} aria-invalid={Boolean(error)} className="w-full">
          <SelectValue placeholder={placeholder ?? `Select ${label.toLowerCase()}`} />
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
    </FormField>
  );
}
