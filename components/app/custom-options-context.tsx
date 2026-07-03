"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CustomOptionsContextValue = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

const CustomOptionsContext = createContext<CustomOptionsContextValue | null>(
  null,
);

export function CustomOptionsProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <CustomOptionsContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </CustomOptionsContext.Provider>
  );
}

export function useCustomOptions() {
  return useContext(CustomOptionsContext);
}

export function CustomOptionsToggle({ className }: { className?: string }) {
  const context = useCustomOptions();

  if (!context) {
    return null;
  }

  const { enabled, setEnabled } = context;

  return (
    <Button
      type="button"
      variant={enabled ? "default" : "outline"}
      size="sm"
      className={cn("shrink-0", className)}
      onClick={() => setEnabled(!enabled)}
    >
      <SlidersHorizontalIcon data-icon="inline-start" />
      {enabled ? "Hide custom options" : "Edit custom options"}
    </Button>
  );
}
