import { z } from "zod";

import {
  workspaceOptionKeys,
  type WorkspaceOptionKey,
} from "@/lib/workspace-options";

export const customOptionValueSchema = z
  .string()
  .trim()
  .min(2, "Add at least 2 characters.")
  .max(120, "Keep options under 120 characters.");

export const addWorkspaceOptionSchema = z.object({
  key: z.enum(workspaceOptionKeys),
  value: customOptionValueSchema,
});

export type AddWorkspaceOptionInput = z.infer<typeof addWorkspaceOptionSchema>;

export function isWorkspaceOptionKey(value: string): value is WorkspaceOptionKey {
  return workspaceOptionKeys.includes(value as WorkspaceOptionKey);
}
