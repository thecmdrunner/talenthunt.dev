import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  getOrCreateUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const existingUser = await getUser(userId);

    if (!existingUser) {
      await ctx.db.insert(users).values({
        userId,
        credits: 50, // FREE Credits upon signup
      });

      return getUser(userId);
    }

    return existingUser;
  }),
});
