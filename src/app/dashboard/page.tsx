import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Internal Dashboard</h1>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {session?.user?.name || "User"}!
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">You are securely logged in.</p>
          <div className="p-4 bg-muted rounded-md font-mono text-sm max-w-sm">
            <p>Email: {session?.user?.email}</p>
            <p>Role: {session?.user?.role}</p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="destructive" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
