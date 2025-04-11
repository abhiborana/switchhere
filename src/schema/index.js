import { z } from "zod";

export const roadmapSchema = z
  .object({
    title: z.string().describe("The title of the roadmap"),
    estimatedTime: z
      .string()
      .describe("The estimated time to complete the roadmap"),
    steps: z.array(
      z.object({
        title: z.string().describe("The title of the step"),
        description: z.string().describe("The description of the step"),
        priority: z
          .number()
          .describe("The priority of the step in number 1, 2, 3"),
        youtubeSearchQuery: z
          .string()
          .describe("The Youtube search query to get the best resources"),
      }),
    ),
  })
  .describe(
    "The customized roadmap for the user with steps and search queries",
  );

export const roadmapFormSchema = z.object({
  toBecome: z.string().min(1, "Please enter a goal to become a"),
  hoursPerDay: z
    .number()
    .min(1, "Please enter hours per day")
    .max(24, "Max 24 hours"),
  currentExperience: z.string().min(1, "Please enter your current experience"),
});
