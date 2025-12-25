"use client";

import { Check, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface Objective {
  journeyStepId: string;
  objectiveId: string;
  text: string;
  completed: boolean;
}

interface StepProps {
  id: string;
  title: string;
  description?: string | null;
  mission?: string | null;
  status: "LOCKED" | "ACTIVE" | "COMPLETED";
  objectives: Objective[];
  order: number;
}

export function StepCard({ step }: { step: StepProps }) {
  const [objectives, setObjectives] = useState(step.objectives);
  const utils = trpc.useUtils();

  const mutation = trpc.journey.updateObjectiveProgress.useMutation({
    onSuccess: (_data) => {
      // Optimistic update handled by local state, but we should invalidate to sync status
      utils.journey.getJourneyMap.invalidate();
    },
    onError: () => {
      toast.error("Failed to update progress");
    },
  });

  const handleToggle = (objectiveId: string, checked: boolean) => {
    // Optimistic update
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.objectiveId === objectiveId ? { ...obj, completed: checked } : obj,
      ),
    );

    mutation.mutate({
      journeyStepId: step.id,
      objectiveId,
      completed: checked,
    });
  };

  const getStepColor = (order: number) => {
    const validOrder = Math.max(1, Math.min(order, 7)); // Ensure 1-7 range
    switch (validOrder) {
      case 1:
        return {
          border: "border-red-500",
          bg: "bg-red-500",
          text: "text-red-500",
          lightBg: "bg-red-500/10",
          ring: "ring-red-500",
        };
      case 2:
        return {
          border: "border-orange-500",
          bg: "bg-orange-500",
          text: "text-orange-500",
          lightBg: "bg-orange-500/10",
          ring: "ring-orange-500",
        };
      case 3:
        return {
          border: "border-yellow-500",
          bg: "bg-yellow-500",
          text: "text-yellow-500",
          lightBg: "bg-yellow-500/10",
          ring: "ring-yellow-500",
        };
      case 4:
        return {
          border: "border-green-500",
          bg: "bg-green-500",
          text: "text-green-500",
          lightBg: "bg-green-500/10",
          ring: "ring-green-500",
        };
      case 5:
        return {
          border: "border-blue-500",
          bg: "bg-blue-500",
          text: "text-blue-500",
          lightBg: "bg-blue-500/10",
          ring: "ring-blue-500",
        };
      case 6:
        return {
          border: "border-indigo-500",
          bg: "bg-indigo-500",
          text: "text-indigo-500",
          lightBg: "bg-indigo-500/10",
          ring: "ring-indigo-500",
        };
      case 7:
        return {
          border: "border-violet-500",
          bg: "bg-violet-500",
          text: "text-violet-500",
          lightBg: "bg-violet-500/10",
          ring: "ring-violet-500",
        };
      default:
        return {
          border: "border-primary",
          bg: "bg-primary",
          text: "text-primary",
          lightBg: "bg-primary/10",
          ring: "ring-primary",
        };
    }
  };

  const colors = getStepColor(step.order);

  const isLocked = step.status === "LOCKED";
  const isCompleted = step.status === "COMPLETED";

  return (
    <Card
      className={cn(
        "relative transition-all duration-300",
        isLocked && "opacity-60 grayscale",
        step.status === "ACTIVE" &&
          cn(colors.border, "border ring-1", colors.ring),
      )}
    >
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
          <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-sm border">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Locked
            </span>
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold border",
                isCompleted
                  ? cn(colors.bg, "text-white", colors.border) // Completed: Solid Color
                  : step.status === "ACTIVE"
                    ? cn(colors.lightBg, colors.text, colors.border) // Active: Light BG + Color Text
                    : "bg-muted text-muted-foreground border-muted", // Locked/Pending
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : step.order}
            </div>
            <div>
              <CardTitle>{step.title}</CardTitle>
              {step.status === "ACTIVE" && (
                <CardDescription className={cn("font-medium", colors.text)}>
                  Current Step
                </CardDescription>
              )}
            </div>
          </div>
          {isCompleted && <Badge variant="default">Completed</Badge>}
        </div>
        {step.description && (
          <CardDescription className="mt-2">{step.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {step.mission && (
          <div className="mb-6 rounded-lg bg-muted/30 p-4 border border-l-4 border-l-primary/50">
            <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Level Requirement
            </h4>
            <p className="text-sm font-medium italic">"{step.mission}"</p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Objectives</h4>
          {objectives.map((obj) => (
            <div
              key={obj.objectiveId}
              className="flex items-start space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={obj.objectiveId}
                checked={obj.completed}
                onCheckedChange={(checked) =>
                  handleToggle(obj.objectiveId, checked as boolean)
                }
                disabled={isLocked}
              />
              <label
                htmlFor={obj.objectiveId}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer pt-0.5",
                  obj.completed && "text-muted-foreground line-through",
                )}
              >
                {obj.text}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
