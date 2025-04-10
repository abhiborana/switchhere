import { z } from "zod";

export const roadmapSchema = z
  .object({
    title: z.string().describe("The title of the roadmap"),
    steps: z.array(
      z.object({
        title: z.string().describe("The title of the step"),
        description: z.string().describe("The description of the step"),
        priority: z
          .number()
          .describe("The priority of the step in number 1, 2, 3"),
        resources: z.array(
          z.object({
            url: z
              .string()
              .describe(
                "The valid URL of the official documentation or article or website, (NOT YOUTUBE LINK)",
              ),
            type: z
              .string()
              .describe("The type of the resource, e.g., video, article"),
            priority: z
              .number()
              .describe("The priority of the resource in number 1, 2, 3"),
          }),
        ),
      }),
    ),
  })
  .describe("The customized roadmap for the user with steps and resources.");

export const roadmapFormSchema = z.object({
  toBecome: z.string().min(1, "Please enter a goal to become a"),
  hoursPerDay: z
    .number()
    .min(1, "Please enter hours per day")
    .max(24, "Max 24 hours"),
  currentExperience: z.string().min(1, "Please enter your current experience"),
});
