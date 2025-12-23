import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register | The World Shall Be Saved",
  description: "Create your account",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Join the movement to save the world"
      backButtonHref="/"
      backButtonLabel="Back to Home"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
