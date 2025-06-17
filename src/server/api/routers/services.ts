import { env } from "@/env";
import { supabaseServerClient } from "@/lib/supabase/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import Exa from "exa-js";
import { z } from "zod";

const clerk = await clerkClient();

export const servicesRouter = createTRPCRouter({
  getLinkedinInfo: protectedProcedure.query(async ({ ctx }) => {
    const linkedin = await clerk.users.getUserOauthAccessToken(
      ctx.session.userId,
      "linkedin_oidc",
    );

    return linkedin;
  }),

  getGithubInfo: protectedProcedure.query(async ({ ctx }) => {
    const github = await clerk.users.getUserOauthAccessToken(
      ctx.session.userId,
      "github",
    );

    return github;
  }),

  getResumeUploadUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;
      const fileExtension = input.fileName.split(".").pop() ?? "pdf";
      const fileName = `${userId}/${Date.now()}_resume.${fileExtension}`;

      const supabase = await supabaseServerClient();

      // Generate presigned URL for upload
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUploadUrl(fileName, {
          upsert: true,
        });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to generate upload URL");
      }

      // Construct the public URL for the uploaded file
      const resumeUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${fileName}`;

      return {
        presigned: {
          path: fileName,
          token: data.token,
          signedUrl: data.signedUrl,
        },
        resumeUrl,
      };
    }),

  getVideoUploadUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;
      const fileExtension = input.fileName.split(".").pop() ?? "mp4";
      const fileName = `${userId}/${Date.now()}_intro_video.${fileExtension}`;

      const supabase = await supabaseServerClient();

      // Generate presigned URL for upload
      const { data, error } = await supabase.storage
        .from("videos")
        .createSignedUploadUrl(fileName, {
          upsert: true,
        });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error("Failed to generate upload URL");
      }

      // Construct the public URL for the uploaded file
      const videoUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${fileName}`;

      return {
        presigned: {
          path: fileName,
          token: data.token,
          signedUrl: data.signedUrl,
        },
        videoUrl,
      };
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

  searchLinkedin: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exa = new Exa(env.EXA_API_KEY);

      const result = await exa.search(input.query, {
        category: "linkedin profile",
        type: "auto",
        numResults: 3,
      });

      console.log(result);

      return result;
    }),
});
