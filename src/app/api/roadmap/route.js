import { roadmapSchema } from "@/schema";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { toBecome, hoursPerDay, currentExperience, ...rest } =
    await req.json();

  const result = streamObject({
    model: google("gemini-2.0-flash-exp"),
    prompt: `Create a personalized roadmap for someone who wants to become a ${toBecome} in ${hoursPerDay} hours per day. They have ${currentExperience} experience.`,
    schema: roadmapSchema,
  });

  return result.toTextStreamResponse();
}
