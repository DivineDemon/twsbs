"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import {
  type ResetPasswordInput,
  resetPasswordSchema,
} from "@/lib/validations/auth";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmPassword: "",
    },
  });

  // Verify token on mount using tRPC query
  const {
    data: tokenValidation,
    isLoading: isValidating,
    isError,
  } = trpc.auth.verifyResetToken.useQuery(
    { email: email || "" },
    {
      enabled: !!token && !!email,
      retry: false,
    },
  );

  const isValidToken = tokenValidation?.valid ?? false;

  // Show error toast when token is invalid
  useEffect(() => {
    if (!isValidating && (isError || !isValidToken) && token && email) {
      toast.error("Reset link expired", {
        description: "Please request a new password reset link",
      });
    }
  }, [isValidating, isError, isValidToken, token, email]);

  const resetPasswordMutation = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Password reset successfully", {
        description: "You can now log in with your new password",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast.error("Failed to reset password", {
        description: error.message,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  async function onSubmit(data: ResetPasswordInput) {
    setIsLoading(true);
    resetPasswordMutation.mutate(data);
  }

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Validating reset link...
        </p>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-destructive">
            Invalid or Expired Link
          </h3>
          <p className="text-sm text-muted-foreground">
            This password reset link is invalid or has expired. Reset links are
            only valid for 15 minutes.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/forgot-password">
            <Button className="w-full">Request new reset link</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
