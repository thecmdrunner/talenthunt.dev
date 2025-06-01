import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import fs from "fs/promises";
import { z } from "zod";

const data = {
  roles: [
    // Business-oriented roles
    "Product Manager",
    "Program Manager",
    "Project Manager",
    "Quality Assurance Tester",
    "Business Analyst",
    "Technical Program Manager",
    "Scrum Master",
    "Agile Coach",
    "UX Researcher",
    "Product Marketing Manager",
    "Operations Manager",
  ],
  companies: "FAANG, SaaS startups, India, EU and US based",
  location:
    "SF, NYC, CA, NY, London, Paris, Berlin, Amsterdam, Munich, Zurich, Vienna, Bengaluru, Mumbai, Delhi",
  description: "We're hiring Product Managers and Program Managers to join our growing product & operations team.",
  skills: [
    "Agile",
    "Scrum",
    "Kanban",
    "JIRA",
    "Confluence",
    "Figma",
    "User research",
    "A/B Testing",
    "Roadmapping",
    "Cross-functional collaboration",
    "SQL",
    "Excel",
    "Product analytics",
    "Customer interviews",
    "Stakeholder management",
    "Market research",
    "Notion",
    "Trello",
    "Miro",
  ],
};

const result = streamObject({
  model: openrouter("google/gemini-2.0-flash-001"),

  system: `
You are a helpful assistant that generates realistic sample resumes for common business-side tech roles.

Make sure each resume includes:
- 1 to 4 past experiences
- Projects under each job
- Duration of each job
- A realistic education background
- Diversity in industries, locations, and companies

Roles include Product Manager, Program Manager, QA Tester, Business Analyst, etc.
`.trim(),

  schema: z.object({
    resumes: z
      .array(
        z.object({
          pastExperience: z
            .array(
              z.object({
                company: z.string(),
                location: z.string(),
                role: z.string(),
                projects: z.array(
                  z.object({
                    name: z.string(),
                    description: z.string(),
                    link: z.string(),
                  }),
                ),
                duration: z.object({
                  startDate: z.string(),
                  endDate: z.string(),
                }),
              }),
            )
            .min(1)
            .max(4),
          education: z.object({
            degree: z.string(),
            field: z.string(),
            institution: z.string(),
            location: z.string(),
          }),
        }),
      )
      .min(1)
      .describe("Array of 25 business-side resumes"),
  }),

  messages: [
    {
      role: "user",
      content: `
Generate 25 diverse resumes for these roles:
${data.roles.join(", ")}

Use realistic companies, job titles, locations, and project names. Each resume must include:
- 1–4 past work experiences with company, location, projects, duration
- Education with degree, field, institution, location
- A mix of industries and locations (India, US, EU)

Return only valid data matching the schema.
`.trim(),
    },
  ],
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

const resumes = await result.object;

// DEBUG: Print to console first
console.log("\n\n=== Final Resume Output ===");
console.log(JSON.stringify(resumes, null, 2));

await fs.writeFile("biz-resumes.json", JSON.stringify(resumes, null, 2));
