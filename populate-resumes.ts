import { db } from "@/server/db";
import { candidateProfiles } from "@/server/db/schema";
import { inArray, isNull } from "drizzle-orm";

async function populateResumes() {
  const profiles = await db
    .select()
    .from(candidateProfiles)
    .where(isNull(candidateProfiles.resumeUrl));

  // Update the profile with the mock resume URL
  await db
    .update(candidateProfiles)
    .set({
      resumeUrl:
        "https://oxsvqazfnvlbysyadhcs.supabase.co/storage/v1/object/public/resumes/user_2xpaEBNLc4ZirOS0oglZ7LSWo85/1748699526063_resume.pdf",
    })
    .where(
      inArray(
        candidateProfiles.id,
        profiles.map((p) => p.id),
      ),
    );

  console.log(`Updated ${profiles.length} candidate profiles with resume URLs`);
}

// Execute the population
populateResumes()
  .catch(console.error)
  .finally(() => process.exit(0));
