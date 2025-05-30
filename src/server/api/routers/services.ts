import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

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
      "oauth_github",
    );

    return github;
  }),
});
