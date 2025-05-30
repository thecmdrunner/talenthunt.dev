import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobAttributesSchema, sampleJobAttributes } from "@/types/jobs";
import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

const systemPrompt = [
  "You are a helpful assistant that can extracts attributes from a job description for recruiter's ideal job requirement in JSON format. Make sure to include all relevant attributes in the response.",

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

  `Example of the JSON output: ${JSON.stringify(sampleJobAttributes)}`,
].join("\n");

export const aiRouter = createTRPCRouter({
  extractJobAttributes: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1, "Query cannot be empty"),
      }),
    )
    .output(jobAttributesSchema)
    .mutation(async ({ input }) => {
      const { query } = input;
      console.log({ query });

      try {
        const result = await generateObject({
          //   model: openrouter("sarvamai/sarvam-m:free"),
          // model: openrouter("google/gemini-2.0-flash-001"),
          // model: groq("llama-3.3-70b-versatile"),
          model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),

          mode: "json",
          system: systemPrompt,
          schema: jobAttributesSchema,
          messages: [
            {
              role: "user",
              content: query,
            },
          ],
        });

        const finalResult = result.object;

        return finalResult;
      } catch (error) {
        console.error("Error extracting job attributes:", error);
        throw new Error("Failed to extract job attributes from query");
      }
    }),
});
