"use client";

import { CheckCircle2, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc/client";

export function JourneyHeader() {
  const { data: steps } = trpc.journey.getJourneyMap.useQuery();

  if (!steps?.length) return null;

  // Calculate overall progress
  const allObjectives = steps.flatMap((s) => s.objectives);
  const totalObjectives = allObjectives.length;
  const completedObjectives = allObjectives.filter((o) => o.completed).length;
  const progressPercentage =
    totalObjectives > 0
      ? Math.round((completedObjectives / totalObjectives) * 100)
      : 0;

  // Determine current active level
  const activeStep =
    steps.find((s) => s.status === "ACTIVE") ||
    steps.find((s) => s.status === "COMPLETED" && s.order === steps.length);

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current Level
            </p>
            <h3 className="text-xl font-bold">
              {activeStep ? activeStep.title : "Uninitiated"}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <h3 className="text-xl font-bold">
              {completedObjectives} / {totalObjectives} Objectives
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col justify-center gap-2 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </span>
            </div>
            <span className="text-xl font-bold">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
