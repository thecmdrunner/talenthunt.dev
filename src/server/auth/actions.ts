"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
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
    const email = authedUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found");
    }

    const newUser = await db
      .insert(users)
      .values({
        userId: authedUser.id,
        credits: 50, // FREE Credits upon signup
        email,
      })
      .returning();

    return newUser;
  }

  return user;
};
