import type { PublicMetadata } from "@/server/auth/actions";
import { clerkClient } from "@clerk/nextjs/server";

const useremails = [
  "ajinkyabodke678@gmail.com",
  "nidhiajain2003@gmail.com",
  "pranavkulkarni195@gmail.com",
  "notpranavkulkarni@gmail.com",
];

const clerk = await clerkClient();

const users = await clerk.users.getUserList({
  emailAddress: useremails,
});

for (const user of users.data) {
  await clerk.users.updateUserMetadata(user.id, {
    publicMetadata: {
      earlyAccess: true,
    } satisfies PublicMetadata,
  });
}

console.log(users.data);

process.exit(0);
