import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { isNotNull } from "drizzle-orm";

// Set initial credits for all candidates
await db.update(users).set({ credits: 1000 }).where(isNotNull(users.userId));

console.log("✅ Successfully set credits to 1000 for all users");

process.exit(0);
