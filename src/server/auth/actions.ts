// "use server";

import { db } from "@/server/db";
import { currentUser, type User } from "@clerk/nextjs/server";
import { users } from "../db/schema";

const getUser = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.userId, userId),
  });

  return user;
};

export const getOrCreateUser = async () => {
  const authedUser = await currentUser();

  if (!authedUser) {
    throw new Error("Unauthenticated");
  }

  const user = await getUser(authedUser.id);

  if (!user) {
    const newUser = await db
      .insert(users)
      .values({
        userId: authedUser.id,
        credits: 50, // FREE Credits upon signup
      })
      .returning();

    return newUser;
  }

  return user;
};

export type PublicMetadata = {
  earlyAccess?: boolean;
};

export const extractPublicMetadata = (authedUser: User | null) => {
  if (!authedUser) {
    return null;
  }

  return authedUser.publicMetadata as PublicMetadata;
};
