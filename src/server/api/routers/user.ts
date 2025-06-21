import { CREDITS_COST } from "@/lib/constants";
import { generateQuestions } from "@/server/ai";
import { db } from "@/server/db";
import {
  candidateProfiles,
  recruiterProfiles,
  users,
  type CandidateProfileSelect,
  type RecruiterProfileSelect,
} from "@/server/db/schema";
import { parsedResumeDataSchema } from "@/types/resume";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const getUser = async (userId: string) => {
  console.log({ userId });

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
      await Promise.allSettled([
        ctx.db.insert(users).values({ userId, credits: 100 }), // 100 free credits
        ctx.db.insert(candidateProfiles).values({ userId, currentStep: 0 }), // Move to basic info step
        ctx.db.insert(recruiterProfiles).values({ userId, currentStep: 0 }), // Move to basic info step
      ]);

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
      let existingUser = await getUser(userId);

      if (!existingUser?.candidateProfile) {
        await Promise.allSettled([
          ctx.db.insert(users).values({ userId, credits: 100 }), // 100 free credits
          ctx.db.insert(candidateProfiles).values({ userId, currentStep: 0 }), // Move to basic info step
          ctx.db.insert(recruiterProfiles).values({ userId, currentStep: 0 }), // Move to basic info step
        ]);

        existingUser = await getUser(userId);
      }

      const currentStep = existingUser?.candidateProfile.currentStep ?? 0;

      // Update candidate profile step and optionally resume URL and parsed data
      const updateData: Partial<CandidateProfileSelect> = {
        currentStep: currentStep + 1,
      };

      // if new step is 2 (aka after profile submit, then pass profile data to AI to get 3 questions)
      if (
        // updateData.currentStep === 2 &&
        input.parsedResumeData
      ) {
        const { questions } = await generateQuestions(input.parsedResumeData);
        updateData.onboardingData = {
          questions,
        };
      }

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

  saveIntroVideo: protectedProcedure
    .input(
      z.object({
        videoUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      // Check if user has a candidate profile
      const existingUser = await getUser(userId);

      if (!existingUser?.candidateProfile) {
        throw new Error("User does not have a candidate profile");
      }

      // Update candidate profile with video URL
      await ctx.db
        .update(candidateProfiles)
        .set({ introVideoUrl: input.videoUrl })
        .where(eq(candidateProfiles.userId, userId));

      return getUser(userId);
    }),
  nextRecruiterStep: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.userId;

    // Check if user has a recruiter profile
    const existingUser = await getUser(userId);

    if (!existingUser?.recruiterProfile) {
      throw new Error("User does not have a recruiter profile");
    }

    const currentStep = existingUser.recruiterProfile.currentStep ?? 0;
    const nextStep = currentStep + 1;

    // Update recruiter profile step
    const updateData: Partial<RecruiterProfileSelect> = {
      currentStep: nextStep,
    };

    // If completing the final step (step 2), mark onboarding as complete
    if (nextStep >= 2) {
      updateData.onboardingCompletedAt = new Date();
    }

    await ctx.db
      .update(recruiterProfiles)
      .set(updateData)
      .where(eq(recruiterProfiles.userId, userId));

    return getUser(userId);
  }),

  updateRecruiterProfile: protectedProcedure
    .input(
      z.object({
        firstName: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
        title: z.string().trim().optional(),
        phoneNumber: z.string().trim().optional(),
        companyName: z.string().trim().optional(),
        companyUrl: z.string().trim().optional(),
        companySize: z.string().trim().optional(),
        industry: z.string().trim().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      // Check if user has a recruiter profile
      const existingUser = await getUser(userId);

      if (!existingUser?.recruiterProfile) {
        throw new Error("User does not have a recruiter profile");
      }

      // Update recruiter profile with provided data
      await ctx.db
        .update(recruiterProfiles)
        .set(input)
        .where(eq(recruiterProfiles.userId, userId));

      return getUser(userId);
    }),

  completeRecruiterOnboarding: protectedProcedure
    .input(
      z.object({
        additionalData: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      // Check if user has a recruiter profile
      const existingUser = await getUser(userId);

      if (!existingUser?.recruiterProfile) {
        throw new Error("User does not have a recruiter profile");
      }

      // Mark onboarding as complete
      await ctx.db
        .update(recruiterProfiles)
        .set({
          currentStep: 2,
          onboardingCompletedAt: new Date(),
        })
        .where(eq(recruiterProfiles.userId, userId));

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
