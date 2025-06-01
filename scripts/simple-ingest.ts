import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { faker } from "@faker-js/faker";

// Define types for our resume data
interface ResumeProject {
  name: string;
  description: string;
  link: string;
}

interface ResumeExperience {
  company: string;
  location: string;
  role: string;
  projects: ResumeProject[];
  duration: {
    startDate: string;
    endDate?: string;
  };
}

interface ResumeEducation {
  degree: string;
  field: string;
  institution: string;
  location: string;
}

interface Resume {
  pastExperience: ResumeExperience[];
  education: ResumeEducation;
}

// Simplified resume data for testing
const resumes: Resume[] = [
  {
    pastExperience: [
      {
        company: "Google",
        location: "Mountain View, CA",
        role: "Product Manager",
        projects: [
          {
            name: "AI Search Feature",
            description:
              "Led the development and launch of a new AI-powered search feature, resulting in a 15% increase in user engagement.",
            link: "google.com",
          },
        ],
        duration: {
          startDate: "2021-06-01",
          endDate: "2023-05-01",
        },
      },
    ],
    education: {
      degree: "Master of Business Administration (MBA)",
      field: "Business Administration",
      institution: "Stanford University",
      location: "Stanford, CA",
    },
  },
];

function generateRandomUserId(): string {
  return `user_${faker.string.alphanumeric(21)}`;
}

function generateRandomEmail(): string {
  return faker.internet.email();
}

async function ingestSimpleCandidate(resume: Resume, index: number) {
  console.log(`\n🔄 Processing candidate ${index + 1}...`);

  try {
    // Generate random user data
    const userId = generateRandomUserId();
    const email = generateRandomEmail();

    console.log(`👤 Generated user: ${userId} (${email})`);

    // Insert user first
    const [user] = await db
      .insert(schema.users)
      .values({
        userId,
        linkedinEmail: email,
        credits: faker.number.int({ min: 10, max: 100 }),
      })
      .returning();

    console.log("✅ User created successfully");

    // Insert basic candidate profile
    const [candidateProfile] = await db
      .insert(schema.candidateProfiles)
      .values({
        userId: user!.userId,
        currentStep: 5, // Completed onboarding
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        title: "Product Manager",
        bio: "Experienced product manager with a passion for building user-centric products.",
        location: "Mountain View, CA",
        timezone: "America/Los_Angeles",
        isRemoteOpen: true,
        workTypes: ["full-time"],
        experienceLevel: "senior",
        yearsOfExperience: 5,
        expectedSalaryMin: 120000,
        expectedSalaryMax: 180000,
        salaryCurrency: "USD",
        parsedResumeData: resume,
        verificationStatus: "approved",
        totalScore: 85,
        skillScore: 40,
        experienceScore: 45,
        outreachCount: 0,
        isActive: true,
        isOpenToWork: true,
        onboardingCompletedAt: new Date(),
      })
      .returning();

    console.log(
      `✅ Candidate profile created: ${candidateProfile.firstName} ${candidateProfile.lastName}`,
    );

    // Insert work experience
    for (const experience of resume.pastExperience) {
      await db.insert(schema.workExperience).values({
        candidateId: candidateProfile.id,
        company: experience.company,
        position: experience.role,
        description:
          experience.projects?.map((p) => p.description).join("\n") ?? "",
        startDate: experience.duration.startDate,
        endDate: experience.duration.endDate ?? null,
        isCurrent: !experience.duration.endDate,
        location: experience.location,
        isRemote:
          experience.location?.toLowerCase().includes("remote") ?? false,
        technologies: ["Product Management", "Analytics", "Strategy"],
      });
    }

    console.log(
      `✅ Added ${resume.pastExperience.length} work experience records`,
    );

    // Insert education
    if (resume.education) {
      await db.insert(schema.education).values({
        candidateId: candidateProfile.id,
        institution: resume.education.institution,
        degree: resume.education.degree,
        fieldOfStudy: resume.education.field,
        description: `${resume.education.degree} in ${resume.education.field}`,
        startDate: "2018-09-01", // Sept 2018
        endDate: "2020-06-01", // June 2020
      });

      console.log("✅ Added education record");
    }

    // Insert some basic skills
    const basicSkills = [
      {
        name: "Product Management",
        category: "Management",
        proficiency: "expert" as const,
      },
      { name: "Analytics", category: "Data", proficiency: "advanced" as const },
      {
        name: "Strategy",
        category: "Business",
        proficiency: "advanced" as const,
      },
    ];

    for (const skill of basicSkills) {
      await db.insert(schema.skills).values({
        candidateId: candidateProfile.id,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: faker.number.int({ min: 2, max: 5 }),
        isVerified: false,
      });
    }

    console.log(`✅ Added ${basicSkills.length} skills`);

    // Insert a project
    await db.insert(schema.projects).values({
      candidateId: candidateProfile.id,
      title: "AI Search Feature",
      description:
        "Led the development and launch of a new AI-powered search feature",
      longDescription:
        "Led the development and launch of a new AI-powered search feature, resulting in a 15% increase in user engagement. Collaborated with cross-functional teams including engineering, design, and data science.",
      technologies: ["Product Management", "Analytics", "A/B Testing"],
      startDate: "2022-01-01", // Jan 2022
      endDate: "2023-03-01", // Mar 2023
      isFeatured: true,
      isPublic: true,
      displayOrder: 0,
    });

    console.log("✅ Added 1 project");

    return candidateProfile;
  } catch (error) {
    console.error(`❌ Error processing candidate ${index + 1}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting simple candidate ingestion process...");
  console.log(`📝 Processing ${resumes.length} resume\n`);

  const results = [];

  for (const [index, resume] of resumes.entries()) {
    try {
      const candidate = await ingestSimpleCandidate(resume, index);
      results.push(candidate);
    } catch (error) {
      console.error(`Failed to process candidate ${index + 1}:`, error);
      // Continue with next candidate
    }
  }

  console.log(`\n🎉 Simple ingestion completed!`);
  console.log(
    `✅ Successfully processed: ${results.length}/${resumes.length} candidates`,
  );

  // Print summary
  for (const candidate of results) {
    console.log(
      `  • ${candidate.firstName} ${candidate.lastName} (${candidate.title})`,
    );
  }

  process.exit(0);
}

// Run the ingestion
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
