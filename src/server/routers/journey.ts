import { updateObjectiveProgressSchema } from "@/lib/validations/journey";
import { protectedProcedure, router } from "../trpc";

export const journeyRouter = router({
  // Get full journey map with user progress
  getJourneyMap: protectedProcedure.query(async ({ ctx }) => {
    // 1. Fetch all steps with objectives
    const steps = await ctx.prisma.journeyStep.findMany({
      include: {
        objectives: {
          orderBy: {
            objectiveId: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    // 2. Fetch user's progress
    const userProgress = await ctx.prisma.userJourneyProgress.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    // 3. Create a lookup map for progress
    // Key: `${journeyStepId}-${objectiveId}` -> completed
    const progressMap = new Map<string, boolean>();
    userProgress.forEach((p) => {
      progressMap.set(`${p.journeyStepId}-${p.objectiveId}`, p.completed);
    });

    // 4. Transform data to include status
    // We need to determine step status: LOCKED, CHOOSE_LEVEL (Active), COMPLETED
    // Assuming sequential progression.

    let isPreviousStepCompleted = true; // First step is always unlocked

    const mappedSteps = steps.map((step) => {
      // Map objectives with completed status
      const mappedObjectives = step.objectives.map((obj) => ({
        ...obj,
        completed: progressMap.get(`${step.id}-${obj.objectiveId}`) ?? false,
      }));

      const allObjectivesCompleted = mappedObjectives.every((o) => o.completed);

      let status: "LOCKED" | "ACTIVE" | "COMPLETED" = "LOCKED";

      if (allObjectivesCompleted) {
        status = "COMPLETED";
      } else if (isPreviousStepCompleted) {
        status = "ACTIVE";
      }

      // Update for next iteration
      isPreviousStepCompleted = allObjectivesCompleted;

      return {
        ...step,
        objectives: mappedObjectives,
        status,
      };
    });

    return mappedSteps;
  }),

  // Update objective progress
  updateObjectiveProgress: protectedProcedure
    .input(updateObjectiveProgressSchema)
    .mutation(async ({ ctx, input }) => {
      const { journeyStepId, objectiveId, completed } = input;

      const progress = await ctx.prisma.userJourneyProgress.upsert({
        where: {
          userId_journeyStepId_objectiveId: {
            userId: ctx.user.id,
            journeyStepId,
            objectiveId,
          },
        },
        update: {
          completed,
          completedAt: completed ? new Date() : null,
        },
        create: {
          userId: ctx.user.id,
          journeyStepId,
          objectiveId,
          completed,
          completedAt: completed ? new Date() : null,
        },
      });

      // Check if all objectives for this step are completed
      const step = await ctx.prisma.journeyStep.findUnique({
        where: { id: journeyStepId },
        include: { objectives: true },
      });

      if (!step) {
        return { success: true, progress };
      }

      // Check user progress for all objectives in this step
      const stepProgress = await ctx.prisma.userJourneyProgress.findMany({
        where: {
          userId: ctx.user.id,
          journeyStepId,
        },
      });

      const allObjectivesCompleted = step.objectives.every((obj) => {
        // If this is the objective we just updated, use the new value
        if (obj.objectiveId === objectiveId) return completed;

        // Otherwise check database record
        const p = stepProgress.find((sp) => sp.objectiveId === obj.objectiveId);
        return p?.completed ?? false;
      });

      // If all completed, upgrade user level
      if (allObjectivesCompleted && completed) {
        // Only upgrade if action was "completing"
        let newLevel:
          | "Sharer"
          | "Trainer"
          | "Ambassador"
          | "Overseer"
          | undefined;

        // Map step order to levels
        // Step 1 (New Believer) -> Sharer
        // Step 2 (Sharer) -> Trainer
        // Step 3 (Trainer) -> Ambassador
        // Step 4 (Ambassador) -> Overseer
        switch (step.order) {
          case 1:
            newLevel = "Sharer";
            break;
          case 2:
            newLevel = "Trainer";
            break;
          case 3:
            newLevel = "Ambassador";
            break;
          case 4:
            newLevel = "Overseer";
            break;
        }

        if (newLevel) {
          await ctx.prisma.user.update({
            where: { id: ctx.user.id },
            data: { level: newLevel },
          });
        }
      }

      return {
        success: true,
        progress,
      };
    }),
});
