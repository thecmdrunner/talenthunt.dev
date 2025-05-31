import { env } from "@/env";
import { createStandardCacheKey, withCache } from "@/lib/cache";
import {
  CACHE_CONFIG,
  CREDITS_COST,
  CREDIT_ERROR_MESSAGES,
} from "@/lib/constants";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { jobAttributesSchema, sampleJobAttributes } from "@/types/jobs";
import { groq } from "@ai-sdk/groq";
import { TRPCError } from "@trpc/server";
import { generateObject } from "ai";
import { eq, sql } from "drizzle-orm";
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
  naturalLanguageQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1, "Query cannot be empty"),
      }),
    )
    .output(jobAttributesSchema)
    .mutation(async ({ input, ctx }) => {
      const { query } = input;
      const userId = ctx.session.userId;

      console.log({ query, userId });

      // Create cache key for this query
      const cacheKey = createStandardCacheKey(
        CACHE_CONFIG.PREFIXES.AI_JOB_ATTRIBUTES,
        query,
      );

      // Use the cache helper with AI processing callback
      const result = await withCache({
        key: cacheKey,
        ttlSeconds: CACHE_CONFIG.AI_RESPONSE_TTL,

        callback: async () => {
          // This callback will only run on cache miss
          console.log("Cache miss - processing with AI and deducting credits");

          // Check if user has sufficient credits
          const user = await ctx.db.query.users.findFirst({
            where: eq(users.userId, userId),
          });

          if (!user) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }

          const requiredCredits = CREDITS_COST.NATURAL_LANGUAGE_SEARCH;

          if (user.credits < requiredCredits) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: CREDIT_ERROR_MESSAGES.NATURAL_LANGUAGE_SEARCH,
            });
          }

          try {
            // Deduct credits first (optimistic deduction)
            await ctx.db
              .update(users)
              .set({
                credits: sql`${users.credits} - ${requiredCredits}`,
              })
              .where(eq(users.userId, userId));

            console.log(
              `Credits deducted: ${requiredCredits}. Processing with AI...`,
            );

            const aiResult = await generateObject({
              //   model: openrouter("sarvamai/sarvam-m:free"),
              // model: openrouter("google/gemini-2.0-flash-001"),
              // model: openrouter("meta-llama/llama-4-scout"),
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

            console.log("AI processing successful");
            return aiResult.object;
          } catch (error) {
            // If AI processing fails, refund the credits
            await ctx.db
              .update(users)
              .set({
                credits: sql`${users.credits} + ${requiredCredits}`,
              })
              .where(eq(users.userId, userId));

            console.error("Error extracting job attributes:", error);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to extract job attributes from query",
            });
          }
        },
      });

      // Log whether this was a cache hit or miss
      if (result.servedCache) {
        // artificial delay to simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 400));

        console.log(
          "Returning result (cache hit = no credits deducted, cache miss = credits deducted)",
        );
      }

      return result.data;
    }),

  // New procedure to get cache statistics (optional, for debugging)
  getCacheStats: protectedProcedure.query(async () => {
    try {
      if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) {
        return { cacheEnabled: false, message: "KV not configured" };
      }

      // Get some basic stats (this is just for debugging)
      return {
        cacheEnabled: true,
        message: "Cache is enabled and configured",
        kvConfigured: true,
      };
    } catch (error) {
      return {
        cacheEnabled: false,
        message: "Cache error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});
