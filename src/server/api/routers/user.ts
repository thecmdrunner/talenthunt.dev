import { CREDITS_COST } from "@/lib/constants";
import { db } from "@/server/db";
import {
  candidateProfiles,
  recruiterProfiles,
  users,
  type CandidateProfileSelect,
} from "@/server/db/schema";
import { parsedResumeDataSchema } from "@/types/resume";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const getUser = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.userId, userId),
    with: {
      candidateProfile: true,
      recruiterProfile: true,
    },
  });

  return user;
};

export const userRouter = createTRPCRouter({
  getOrCreateUser: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    if (!userId) return;

    const existingUser = await getUser(userId);

    if (!existingUser) {
      await ctx.db.insert(users).values({
        userId,
        credits: 50, // FREE Credits upon signup
      });

      return await getUser(userId);
    }

    return existingUser;
  }),

  createCandidateProfile: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.userId;

    // Check if user already has a candidate profile
    const existingUser = await getUser(userId);
    if (existingUser?.candidateProfile) {
      throw new Error("User already has a candidate profile");
    }

    // Create candidate profile
    await ctx.db.insert(candidateProfiles).values({
      userId,
      currentStep: 0, // Move to basic info step
    });

    return getUser(userId);
  }),

  createRecruiterProfile: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.userId;

    // Check if user already has a recruiter profile
    const existingUser = await getUser(userId);
    if (existingUser?.recruiterProfile) {
      throw new Error("User already has a recruiter profile");
    }

    // Create recruiter profile
    await ctx.db.insert(recruiterProfiles).values({
      userId,
      currentStep: 1, // Move to basic info step
    });

    return getUser(userId);
  }),

  nextCandidateStep: protectedProcedure
    .input(
      z.object({
        resumeUrl: z.string().optional(),
        parsedResumeData: parsedResumeDataSchema.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      // Check if user has a candidate profile
      const existingUser = await getUser(userId);

      if (!existingUser?.candidateProfile) {
        throw new Error("User does not have a candidate profile");
      }

      // Update candidate profile step and optionally resume URL and parsed data
      const updateData: Partial<CandidateProfileSelect> = {
        currentStep: (existingUser.candidateProfile.currentStep ?? 0) + 1,
      };

      if (input.resumeUrl) {
        updateData.resumeUrl = input.resumeUrl;
      }

      if (input.parsedResumeData) {
        updateData.parsedResumeData = input.parsedResumeData;
      }

      await ctx.db
        .update(candidateProfiles)
        .set(updateData)
        .where(eq(candidateProfiles.userId, userId));

      return getUser(userId);
    }),

  getParsedResumeData: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const user = await ctx.db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId),
      columns: { parsedResumeData: true },
    });

    return user?.parsedResumeData;
  }),

  getUserCredits: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.userId, userId),
      columns: { credits: true },
    });

    return { credits: user?.credits ?? 0 };
  }),

  getCreditsStatus: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.userId, userId),
      columns: { credits: true },
    });

    const credits = user?.credits ?? 0;
    const minCreditsForSearch = CREDITS_COST.NATURAL_LANGUAGE_SEARCH;
    const lowCreditsThreshold = minCreditsForSearch * 2; // Alert when user has less than 2 searches worth

    return {
      credits,
      hasLowCredits: credits < lowCreditsThreshold,
      canPerformSearch: credits >= minCreditsForSearch,
      minCreditsForSearch,
    };
  }),
});
