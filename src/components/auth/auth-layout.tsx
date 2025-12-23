import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backButtonHref?: string;
  backButtonLabel?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  backButtonHref,
  backButtonLabel,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
          {backButtonHref && backButtonLabel && (
            <div className="mt-4 text-center text-sm">
              <Link
                href={backButtonHref}
                className="text-primary hover:underline"
              >
                {backButtonLabel}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer / Copyright could go here */}
    </div>
  );
}
