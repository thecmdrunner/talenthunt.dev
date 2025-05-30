import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { z } from "zod";

const query =
  "mobile dev ios and android, flutter only, on-site work in bangalore, ready to relocate, need immediately in the next 2 weeks, 8lpa";

console.log(`User: ${query}`);

const result = streamObject({
  //   model: openrouter("sarvamai/sarvam-m:free"),
  model: openrouter("google/gemini-2.0-flash-001"),

  system: [
    "You are a helpful assistant that can extracts attributes from a job description for recruiter's ideal job requirement. Make sure to include all relevant attributes in the response.",

    `For example, if the requirement is 'Product developer', suggest relevant well-known roles like: ${[
      "Software Engineer",
      "Product Engineer",
      "Data Scientist",
      "Product Manager",
      "Product Owner",
      "Product Analyst",
      "Product Designer",

      "Mobile Developer",
    ].join(", ")}`,

    `Example set of skills for an effective search filter: ${[
      "React",
      "Next.js",
      "Node.js",
      "Bun",
      "Vercel",
      "Netlify",
      "Supabase",
      "Tailwind",
      "Shadcn",
      "Shadcn UI",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "iOS",
      "Android",
      "Flutter",
      "React Native",
      "Swift",
      "Kotlin",
      "Java",

      "Comfy UI",

      "Replicate",
      "OpenAI",
      "Anthropic",
      "Claude",
      "Gemini",
      "Llama",
      "Grok",
      "Groq",
      "Pinecone",
      "Qdrant",

      "Amazon Web Services",
      "Google Cloud Platform",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",

      "Figma",
      "Photoshop",
      "Premiere Pro",
      "After Effects",
      "Photoshop",
      "Illustrator",
      "Linux",
    ].join(", ")}`,
  ].join("\n"),

  schema: z.object({
    pastExperience: z
      .object({
        duration: z.object({
          years: z.number().optional().describe("Years of experience"),
          filter: z
            .enum(["equal", "more than", "less than"])
            .optional()
            .describe(
              "Filter for n years of experience. for example, if the requirement states more than 3 years of experience, use 'more than' filter.",
            ),
        }),

        companies: z
          .array(z.string())
          .optional()
          .describe("Companies worked at"),

        roles: z.array(z.string()).optional().describe("Roles in the past"),

        locations: z
          .array(z.string())
          .optional()
          .describe("Countries like India, US, UK, etc."),
      })
      .optional()
      .describe("Past experience"),

    newJob: z.object({
      role: z.string().optional().describe("Role"),

      similarRoles: z
        .array(z.string())
        // .optional()
        .describe(`Suggest similar roles.`),

      gender: z
        .enum(["Male", "Female", "not specified"])
        .optional()
        .describe("Gender"),

      location: z
        .object({
          type: z.enum(["on-site", "remote", "hybrid"]),
          country: z.string().optional(),
          city: z.string().optional(),
        })
        .optional(),

      expectedSalary: z
        .object({
          min: z
            .number()
            .nullable()
            .optional()
            .describe("Expected Minimum salary, null if not specified"),
          max: z
            .number()
            .nullable()
            .optional()
            .describe("Expected Maximum salary, null if not specified"),
          currency: z
            .string()
            .optional()
            .describe("Currency like 'USD', 'INR' etc."),
        })
        .optional()
        .describe("Expected salary"),

      joiningNotice: z
        .object({
          duration: z.number().optional().describe("Notice period duration"),
          unit: z
            .enum(["days", "weeks", "months"])
            .optional()
            .describe("Time unit for notice period"),
          immediate: z
            .boolean()
            .optional()
            .describe("Whether candidate can join immediately"),
        })
        .optional()
        .describe("Joining notice period"),

      skills: z.array(z.string()).optional().describe("Skills"),
    }),

    education: z.string().optional().describe("Education"),
  }),

  messages: [
    {
      role: "user",
      content: query,
    },
  ],
});

for await (const chunk of result.partialObjectStream) {
  console.log(chunk);
}
