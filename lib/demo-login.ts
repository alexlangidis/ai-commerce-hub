"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const demoEmail = process.env.DEMO_ACCOUNT_EMAIL ?? "demo@ai-commerce-hub.dev";
const demoPassword = process.env.DEMO_ACCOUNT_PASSWORD ?? "Demo1234!";

export async function signInDemo() {
  try {
    await auth.api.signInEmail({
      body: {
        email: demoEmail,
        password: demoPassword,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "The demo account is not available or the credentials are invalid.",
    };
  }
}
