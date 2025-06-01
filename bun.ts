import { db } from "@/server/db";
import { candidateProfiles } from "@/server/db/schema";

await db.insert(candidateProfiles).values({
  userId: "user_2xrhpiAkDESg8bxHORa1louAeXt",
  firstName: "Ajinkya",
  lastName: "Bodke",
  title: "Software Engineer",
  bio: "I am a software engineer",
  currentStep: 0,
});

process.exit(0);
