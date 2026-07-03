"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { brandProfiles } from "@/db/schema";
import { brandVoiceSchema, type BrandVoiceValues } from "@/features/brand-voice/schema";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/session";

export async function saveBrandVoice(input: BrandVoiceValues) {
  const session = await requireSession();
  const values = brandVoiceSchema.parse(input);

  await db
    .insert(brandProfiles)
    .values({
      ...values,
      userId: session.user.id,
    })
    .onConflictDoUpdate({
      target: brandProfiles.userId,
      set: {
        ...values,
        updatedAt: new Date(),
      },
    });

  revalidatePath("/dashboard/brand-voice");
}

export async function getBrandVoice() {
  const session = await requireSession();

  return db.query.brandProfiles.findFirst({
    where: eq(brandProfiles.userId, session.user.id),
  });
}
