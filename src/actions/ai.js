"use server";

import { trendingCareersSchema } from "@/schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export const getTrendingCareers = async () => {
  const { object } = await generateObject({
    model: google("gemini-2.0-flash-exp"),
    prompt:
      "Generate a list of trending careers accross all sectors in india in 2025.",
    schema: trendingCareersSchema,
  });

  return object;
};
