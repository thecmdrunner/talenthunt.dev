import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { eq } from "drizzle-orm";

async function deleteUserAndDependentRecords(userId: string) {
  console.log(`🗑️  Starting deletion process for user: ${userId}`);

  try {
    // First, check if user exists
    const user = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.userId, userId))
      .limit(1);

    if (user.length === 0) {
      console.log(`❌ User ${userId} not found`);
      return;
    }

    console.log(`✅ User found: ${userId}`);

    // Get ALL candidate profiles for this user (there might be multiple)
    const candidateProfiles = await db
      .select()
      .from(schema.candidateProfiles)
      .where(eq(schema.candidateProfiles.userId, userId));

    // Get ALL recruiter profiles for this user (there might be multiple)
    const recruiterProfiles = await db
      .select()
      .from(schema.recruiterProfiles)
      .where(eq(schema.recruiterProfiles.userId, userId));

    let deletedRecords = 0;

    // Delete candidate-related records if candidate profiles exist
    if (candidateProfiles.length > 0) {
      console.log(`📋 Found ${candidateProfiles.length} candidate profile(s)`);

      for (const candidateProfile of candidateProfiles) {
        const candidateId = candidateProfile.id;
        console.log(`  Processing candidate profile: ${candidateId}`);

        // Delete job applications (candidate applications)
        const deletedJobApplications = await db
          .delete(schema.jobApplications)
          .where(eq(schema.jobApplications.candidateId, candidateId))
          .returning();
        if (deletedJobApplications.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedJobApplications.length} job applications`,
          );
          deletedRecords += deletedJobApplications.length;
        }

        // Delete featured candidates
        const deletedFeaturedCandidates = await db
          .delete(schema.featuredCandidates)
          .where(eq(schema.featuredCandidates.candidateId, candidateId))
          .returning();
        if (deletedFeaturedCandidates.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedFeaturedCandidates.length} featured candidate records`,
          );
          deletedRecords += deletedFeaturedCandidates.length;
        }

        // Delete candidate outreach records
        const deletedCandidateOutreach = await db
          .delete(schema.candidateOutreach)
          .where(eq(schema.candidateOutreach.candidateId, candidateId))
          .returning();
        if (deletedCandidateOutreach.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedCandidateOutreach.length} outreach records`,
          );
          deletedRecords += deletedCandidateOutreach.length;
        }

        // Delete verification questions
        const deletedVerificationQuestions = await db
          .delete(schema.verificationQuestions)
          .where(eq(schema.verificationQuestions.candidateId, candidateId))
          .returning();
        if (deletedVerificationQuestions.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedVerificationQuestions.length} verification questions`,
          );
          deletedRecords += deletedVerificationQuestions.length;
        }

        // Delete education records
        const deletedEducation = await db
          .delete(schema.education)
          .where(eq(schema.education.candidateId, candidateId))
          .returning();
        if (deletedEducation.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedEducation.length} education records`,
          );
          deletedRecords += deletedEducation.length;
        }

        // Delete work experience records
        const deletedWorkExperience = await db
          .delete(schema.workExperience)
          .where(eq(schema.workExperience.candidateId, candidateId))
          .returning();
        if (deletedWorkExperience.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedWorkExperience.length} work experience records`,
          );
          deletedRecords += deletedWorkExperience.length;
        }

        // Delete skills
        const deletedSkills = await db
          .delete(schema.skills)
          .where(eq(schema.skills.candidateId, candidateId))
          .returning();
        if (deletedSkills.length > 0) {
          console.log(`    ✅ Deleted ${deletedSkills.length} skills`);
          deletedRecords += deletedSkills.length;
        }

        // Delete projects
        const deletedProjects = await db
          .delete(schema.projects)
          .where(eq(schema.projects.candidateId, candidateId))
          .returning();
        if (deletedProjects.length > 0) {
          console.log(`    ✅ Deleted ${deletedProjects.length} projects`);
          deletedRecords += deletedProjects.length;
        }
      }

      // Now delete ALL candidate profiles by userId
      const deletedCandidateProfiles = await db
        .delete(schema.candidateProfiles)
        .where(eq(schema.candidateProfiles.userId, userId))
        .returning();
      console.log(
        `  ✅ Deleted ${deletedCandidateProfiles.length} candidate profile(s)`,
      );
      deletedRecords += deletedCandidateProfiles.length;

      // Verify candidate profiles are actually deleted
      const remainingCandidateProfiles = await db
        .select()
        .from(schema.candidateProfiles)
        .where(eq(schema.candidateProfiles.userId, userId));
      if (remainingCandidateProfiles.length > 0) {
        console.error(
          `❌ Still ${remainingCandidateProfiles.length} candidate profile(s) remaining!`,
        );
        throw new Error(
          `Failed to delete all candidate profiles for user ${userId}`,
        );
      }
    }

    // Delete recruiter-related records if recruiter profiles exist
    if (recruiterProfiles.length > 0) {
      console.log(`🏢 Found ${recruiterProfiles.length} recruiter profile(s)`);

      for (const recruiterProfile of recruiterProfiles) {
        const recruiterId = recruiterProfile.id;
        console.log(`  Processing recruiter profile: ${recruiterId}`);

        // First get all job IDs for this recruiter to delete related job applications
        const recruiterJobs = await db
          .select({ id: schema.jobs.id })
          .from(schema.jobs)
          .where(eq(schema.jobs.recruiterId, recruiterId));

        // Delete job applications for recruiter's jobs
        for (const job of recruiterJobs) {
          const deletedJobApplications = await db
            .delete(schema.jobApplications)
            .where(eq(schema.jobApplications.jobId, job.id))
            .returning();
          if (deletedJobApplications.length > 0) {
            console.log(
              `    ✅ Deleted ${deletedJobApplications.length} job applications for job ${job.id}`,
            );
            deletedRecords += deletedJobApplications.length;
          }
        }

        // Delete jobs
        const deletedJobs = await db
          .delete(schema.jobs)
          .where(eq(schema.jobs.recruiterId, recruiterId))
          .returning();
        if (deletedJobs.length > 0) {
          console.log(`    ✅ Deleted ${deletedJobs.length} jobs`);
          deletedRecords += deletedJobs.length;
        }

        // Delete outreach records (as recruiter)
        const deletedRecruiterOutreach = await db
          .delete(schema.candidateOutreach)
          .where(eq(schema.candidateOutreach.recruiterId, recruiterId))
          .returning();
        if (deletedRecruiterOutreach.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedRecruiterOutreach.length} recruiter outreach records`,
          );
          deletedRecords += deletedRecruiterOutreach.length;
        }

        // Delete search queries
        const deletedSearchQueries = await db
          .delete(schema.searchQueries)
          .where(eq(schema.searchQueries.recruiterId, recruiterId))
          .returning();
        if (deletedSearchQueries.length > 0) {
          console.log(
            `    ✅ Deleted ${deletedSearchQueries.length} search queries`,
          );
          deletedRecords += deletedSearchQueries.length;
        }
      }

      // Now delete ALL recruiter profiles by userId
      const deletedRecruiterProfiles = await db
        .delete(schema.recruiterProfiles)
        .where(eq(schema.recruiterProfiles.userId, userId))
        .returning();
      console.log(
        `  ✅ Deleted ${deletedRecruiterProfiles.length} recruiter profile(s)`,
      );
      deletedRecords += deletedRecruiterProfiles.length;

      // Verify recruiter profiles are actually deleted
      const remainingRecruiterProfiles = await db
        .select()
        .from(schema.recruiterProfiles)
        .where(eq(schema.recruiterProfiles.userId, userId));
      if (remainingRecruiterProfiles.length > 0) {
        console.error(
          `❌ Still ${remainingRecruiterProfiles.length} recruiter profile(s) remaining!`,
        );
        throw new Error(
          `Failed to delete all recruiter profiles for user ${userId}`,
        );
      }
    }

    // Verify no profiles remain before deleting user
    const finalCandidateCheck = await db
      .select()
      .from(schema.candidateProfiles)
      .where(eq(schema.candidateProfiles.userId, userId));

    const finalRecruiterCheck = await db
      .select()
      .from(schema.recruiterProfiles)
      .where(eq(schema.recruiterProfiles.userId, userId));

    if (finalCandidateCheck.length > 0) {
      console.error(
        `❌ Final check: Still ${finalCandidateCheck.length} candidate profile(s) found!`,
      );
      throw new Error(`Cannot delete user - candidate profiles still exist`);
    }

    if (finalRecruiterCheck.length > 0) {
      console.error(
        `❌ Final check: Still ${finalRecruiterCheck.length} recruiter profile(s) found!`,
      );
      throw new Error(`Cannot delete user - recruiter profiles still exist`);
    }

    console.log(`🔍 Final verification passed - no profiles remain`);

    // Finally, delete the user
    const deletedUser = await db
      .delete(schema.users)
      .where(eq(schema.users.userId, userId))
      .returning();

    if (deletedUser.length > 0) {
      console.log(`  ✅ Deleted user record`);
      deletedRecords += deletedUser.length;
    }

    console.log(
      `\n🎉 Successfully deleted user ${userId} and ${deletedRecords} dependent records`,
    );
  } catch (error) {
    console.error(`❌ Error deleting user ${userId}:`, error);
    throw error;
  }
}

async function main() {
  //   const userId = process.argv[2];
  const userId = "user_2xvwlu4zvSYGC7ZKqUe7C1Hk8cf";

  if (!userId) {
    console.error("❌ Please provide a userId as argument");
    console.log("Usage: pnpm tsx scripts/delete_user.ts <userId>");
    process.exit(1);
  }

  console.log(`🚀 Starting user deletion script...`);

  try {
    await deleteUserAndDependentRecords(userId);
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);
