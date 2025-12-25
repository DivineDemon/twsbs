import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { privacyPolicyContent, smsPolicyContent } from "@/lib/policies";
import { PolicyModal } from "./policy-modal";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full mt-auto max-w-[500px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
      <div className="mt-auto flex justify-center gap-4 text-xs text-muted-foreground">
        <PolicyModal
          title="Privacy Policy"
          content={privacyPolicyContent}
          triggerText="Privacy Policy"
        />
        <PolicyModal
          title="SMS Policy"
          content={smsPolicyContent}
          triggerText="SMS Policy"
        />
      </div>
    </div>
  );
}
