import type { ParsedResumeData } from "@/types/resume";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export async function generateQuestions(parsedResumeData: ParsedResumeData) {
  const result = await generateObject({
    model: openrouter("openai/o4-mini"),
    schema: z.object({
      questions: z.array(z.string()).max(3),
    }),

    system: `You are an expert Technical professional reviewing candidate profile for a talent hiring platform. 

Your job is to evaluate whether this candidate should be approved for the platform based on their profile data.

You are given a candidate's data and you need to generate 3 questions that are relevant to the candidate's profile and experience, as a CTO or Product Hiring Manager would ask.

Keep in mind that the user has a total of 2 mins in front of the camera, and they have to answer spontaneously, so keep the questions short and concise, and try to grasp the candidate's "vibe" by asking high level questions rather than asking them to elaborate on any topic.

Keep it also fun for the candidate to answer, and make it verbal for them rather than very technical. This is meant to be a professional-yet-personal screening.`,

    prompt: JSON.stringify(parsedResumeData),
    providerOptions: {},
  });

  return result.object;
}
