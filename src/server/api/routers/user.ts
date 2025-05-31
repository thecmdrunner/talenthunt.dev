import { users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getOrCreateUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.userId;

    const existingUser = await ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.userId, userId),
    });

    if (!existingUser) {
      const newUser = await ctx.db
        .insert(users)
        .values({
          userId,
          credits: 50, // FREE Credits upon signup
        })
        .returning();

      return newUser;
    }

    return existingUser;
  }),
});
