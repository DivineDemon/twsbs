"use client";

import { Loader2 } from "lucide-react";
import { StepCard } from "@/components/journey/step-card";
import { trpc } from "@/lib/trpc/client";

export function JourneyBoard() {
  const { data: steps, isLoading } = trpc.journey.getJourneyMap.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!steps?.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No journey steps found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  );
}
