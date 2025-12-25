import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot Password" description="Reset your password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
