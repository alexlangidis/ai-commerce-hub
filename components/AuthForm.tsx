"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "login" | "signup";
};

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type AuthFormValues = LoginFormValues | SignupFormValues;

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [error, setError] = useState("");
  const schema = isSignup ? signupSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: isSignup
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  async function onSubmit(values: AuthFormValues) {
    setError("");

    const result = isSignup
      ? await authClient.signUp.email({
          name: "name" in values ? values.name : "",
          email: values.email,
          password: values.password,
          callbackURL: "/",
        })
      : await authClient.signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: "/",
        });

    if (result.error) {
      setError(result.error.message || "Authentication failed.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          {isSignup ? "Create account" : "Log in"}
        </h1>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {isSignup
            ? "Start with an email and password account."
            : "Use your email and password to continue."}
        </p>
      </div>

      {isSignup ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Name
          <input
            {...register("name")}
            autoComplete="name"
            aria-invalid={Boolean("name" in errors && errors.name)}
            className="h-11 rounded-md border border-black/10 bg-transparent px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-white/15 dark:text-zinc-50 dark:focus:border-zinc-50"
          />
          {"name" in errors && errors.name ? (
            <span className="text-sm font-normal text-red-600 dark:text-red-300">
              {errors.name.message}
            </span>
          ) : null}
        </label>
      ) : null}

      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Email
        <input
          type="email"
          {...register("email")}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className="h-11 rounded-md border border-black/10 bg-transparent px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-white/15 dark:text-zinc-50 dark:focus:border-zinc-50"
        />
        {errors.email ? (
          <span className="text-sm font-normal text-red-600 dark:text-red-300">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Password
        <input
          type="password"
          {...register("password")}
          autoComplete={isSignup ? "new-password" : "current-password"}
          aria-invalid={Boolean(errors.password)}
          className="h-11 rounded-md border border-black/10 bg-transparent px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-white/15 dark:text-zinc-50 dark:focus:border-zinc-50"
        />
        {errors.password ? (
          <span className="text-sm font-normal text-red-600 dark:text-red-300">
            {errors.password.message}
          </span>
        ) : null}
      </label>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {isSubmitting
          ? isSignup
            ? "Creating account..."
            : "Logging in..."
          : isSignup
            ? "Create account"
            : "Log in"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
