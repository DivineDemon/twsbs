"use client";

import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function GuestIndicator() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Only show on dashboard when not logged in
  const shouldShow =
    status !== "loading" && !session?.user && pathname.startsWith("/dashboard");

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Guest Mode</span>
      <Link href="/login">
        <Button variant="ghost" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </Link>
      <Link href="/register">
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Register
        </Button>
      </Link>
    </div>
  );
}
