import { clerkClient } from "@clerk/nextjs/server";

const clerk = await clerkClient();

const userId = "user_2xpaEBNLc4ZirOS0oglZ7LSWo85";
const user = await clerk.users.updateUser(userId, {});

console.log(user);
