import { db } from "@/server/db";
import {
  candidateProfiles,
  recruiterProfiles,
  users,
} from "@/server/db/schema";
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
      currentStep: 1, // Move to basic info step
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
});
