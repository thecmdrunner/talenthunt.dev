import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import fs from "fs";
import { z } from "zod";

const result = streamObject({
  // model: openrouter("google/gemini-2.0-flash-001"),
  model: openrouter("openai/gpt-4o-mini"),
  system:
    "You are a helpful assistant that can parse resumes and extract profile information. Extract the most relevant role/title, top skills, years of experience, location preferences, and any social media profiles mentioned.",

  schema: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    role: z
      .string()
      .describe("Current or target role/job title from the resume"),
    skills: z
      .string()
      .describe("Top 3-5 skills mentioned in the resume, comma-separated"),
    experience: z
      .string()
      .describe("Years of professional experience as a number"),
    location: z
      .string()
      .optional()
      .describe("Current location or location mentioned in resume"),
    githubUrl: z
      .string()
      .optional()
      .describe("GitHub profile URL if mentioned"),
    linkedinUrl: z
      .string()
      .optional()
      .describe("LinkedIn profile URL if mentioned"),
  }),
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is the file about?" },
        {
          type: "file",
          mimeType: "application/pdf",
          data: fs.readFileSync("/Users/thecmdrunner/Downloads/Pranav CV.pdf"),
          filename: "Pranav CV.pdf", // optional, not used by all providers
        },
      ],
    },
  ],
});

for await (const chunk of result.partialObjectStream) {
  console.clear();
  console.log(chunk);
}
