import { Heart, Map as MapIcon, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>TWSBS</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="ghost">Continue as Guest</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center md:py-32 lg:py-40">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            The World Shall Be <span className="text-primary">Saved</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Join the movement. Track your discipleship journey, connect with
            your network, and manage evangelism efforts all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                Continue as Guest
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section (Dummy Data) */}
        <section className="border-y bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold md:text-4xl">10k+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold md:text-4xl">50+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Countries
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold md:text-4xl">100k+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Gospel Shares
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold md:text-4xl">25k+</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  Decisions Made
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Network Management</h3>
              <p className="text-sm text-muted-foreground">
                Visualize your spiritual lineage and manage relationships with
                your upline and downline.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Evangelism Tools</h3>
              <p className="text-sm text-muted-foreground">
                Access powerful tools for sharing the gospel and tracking
                decisions in real-time.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                <MapIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Discipleship Journey</h3>
              <p className="text-sm text-muted-foreground">
                Track your progress through structured courses and unlock new
                levels of leadership.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} The World Shall Be Saved. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
