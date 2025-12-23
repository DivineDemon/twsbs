import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | The World Shall Be Saved",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
