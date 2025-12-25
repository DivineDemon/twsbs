import { z } from "zod";

export const updateObjectiveProgressSchema = z.object({
  journeyStepId: z.string(),
  objectiveId: z.string(),
  completed: z.boolean(),
});

export type UpdateObjectiveProgressInput = z.infer<
  typeof updateObjectiveProgressSchema
>;
