import { z } from "zod";

// Schema for parsed resume data
export const parsedResumeDataSchema = z.object({
  fullName: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z
    .string()
    .optional()
    .describe("Current or target role/job title from the resume"),
  skills: z
    .string()
    .optional()
    .describe("Top 3-5 skills mentioned in the resume, comma-separated"),
  experience: z
    .string()
    .optional()
    .describe("Years of professional experience as a number"),
  location: z
    .string()
    .optional()
    .describe("Current location or location mentioned in resume"),
  githubUrl: z.string().optional().describe("GitHub profile URL if mentioned"),
  linkedinUrl: z
    .string()
    .optional()
    .describe("LinkedIn profile URL if mentioned"),
});

export type ParsedResumeData = z.infer<typeof parsedResumeDataSchema>;
