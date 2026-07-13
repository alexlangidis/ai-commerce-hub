"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  KeyRoundIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { signInDemo } from "@/lib/demo-login";
import { cn } from "@/lib/utils";

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
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
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
          callbackURL: "/dashboard",
        })
      : await authClient.signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        });

    if (result.error) {
      setError(result.error.message || "Authentication failed.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function loginAsDemo() {
    setError("");
    setIsDemoSubmitting(true);

    const result = await signInDemo();

    if (!result.success) {
      setError(result.error ?? "Demo login failed.");
      setIsDemoSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="landing-glass rounded-2xl p-6 sm:p-8">
      <div className="mb-6 hidden flex-col gap-1 lg:flex">
        <h2 className="text-2xl font-semibold tracking-tight">
          {isSignup ? "Create account" : "Log in"}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          {isSignup
            ? "Start with email and password. Upgrade anytime."
            : "Enter your credentials to access the studio."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isSignup ? (
          <AuthField
            label="Name"
            error={"name" in errors ? errors.name?.message : undefined}
          >
            <div className="relative">
              <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...register("name")}
                autoComplete="name"
                className="h-10 pl-9"
                aria-invalid={Boolean("name" in errors && errors.name)}
              />
            </div>
          </AuthField>
        ) : null}

        <AuthField label="Email" error={errors.email?.message}>
          <div className="relative">
            <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              {...register("email")}
              autoComplete="email"
              className="h-10 pl-9"
              aria-invalid={Boolean(errors.email)}
            />
          </div>
        </AuthField>

        <AuthField label="Password" error={errors.password?.message}>
          <div className="relative">
            <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              {...register("password")}
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="h-10 pl-9"
              aria-invalid={Boolean(errors.password)}
            />
          </div>
        </AuthField>

        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="landing-glow mt-1 h-10 w-full"
        >
          {isSubmitting
            ? isSignup
              ? "Creating account..."
              : "Logging in..."
            : isSignup
              ? "Create account"
              : "Log in"}
          {!isSubmitting ? <ArrowRightIcon data-icon="inline-end" /> : null}
        </Button>
      </form>

      <Card className="mt-6 border-primary/20 bg-primary/5 shadow-none">
        <CardHeader className="gap-1 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <KeyRoundIcon className="size-4 text-primary" />
            Try the demo workspace
          </CardTitle>
          <CardDescription>
            Use the shared demo account to explore the studio. No signup needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-background/70"
            onClick={loginAsDemo}
            disabled={isSubmitting || isDemoSubmitting}
          >
            {isDemoSubmitting ? "Opening demo..." : "Log in with demo account"}
            {!isDemoSubmitting ? <ArrowRightIcon data-icon="inline-end" /> : null}
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {isSignup ? "Log in" : "Sign up free"}
        </Link>
      </p>
    </div>
  );
}

function AuthField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error ? (
        <span className={cn("text-sm text-destructive")}>{error}</span>
      ) : null}
    </label>
  );
}
