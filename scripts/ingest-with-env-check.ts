// Environment check and setup

import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { faker } from "@faker-js/faker";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

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

// Resume data from the existing ingest.ts file
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
          {
            name: "Google Maps UI Redesign",
            description:
              "Managed a cross-functional team to improve the user interface of Google Maps, leading to a 10% reduction in user complaints.",
            link: "google.com",
          },
        ],
        duration: {
          startDate: "2021-06-01",
          endDate: "2023-05-01",
        },
      },
      {
        company: "Microsoft",
        location: "Redmond, WA",
        role: "Associate Product Manager",
        projects: [
          {
            name: "Microsoft Teams Growth",
            description:
              "Developed and executed the product roadmap for Microsoft Teams, resulting in a 20% increase in active users.",
            link: "microsoft.com",
          },
          {
            name: "Microsoft Office Expansion",
            description:
              "Conducted market research and competitive analysis to identify new product opportunities for Microsoft Office.",
            link: "microsoft.com",
          },
        ],
        duration: {
          startDate: "2019-07-01",
          endDate: "2021-05-01",
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
  {
    pastExperience: [
      {
        company: "Google",
        location: "SF",
        role: "Software Engineer",
        projects: [
          {
            name: "Google Search Feature",
            description: "Developed a new feature for Google Search.",
            link: "https://www.google.com",
          },
        ],
        duration: {
          startDate: "2022-01-01",
          endDate: "2023-01-01",
        },
      },
    ],
    education: {
      degree: "Bachelor's Degree",
      field: "Computer Science",
      institution: "Stanford University",
      location: "CA",
    },
  },
];

// Add more sample resumes
resumes.push({
  pastExperience: [
    {
      company: "Meta",
      location: "Menlo Park, CA",
      role: "Software Engineer",
      projects: [
        {
          name: "React Performance Optimization",
          description:
            "Optimized React components performance resulting in 30% faster load times for Facebook main feed.",
          link: "facebook.com",
        },
      ],
      duration: {
        startDate: "2020-06-01",
        endDate: "2023-01-01",
      },
    },
  ],
  education: {
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "UC Berkeley",
    location: "Berkeley, CA",
  },
});

// Schema for generating organic candidate data using LLM
const candidateEnhancementSchema = z.object({
  firstName: z.string().describe("A realistic first name"),
  lastName: z.string().describe("A realistic last name"),
  title: z.string().describe("Professional title based on experience"),
  bio: z.string().describe("Professional bio (2-3 sentences)"),
  location: z.string().describe("Current location (city, state/country)"),
  timezone: z.string().describe("Timezone (e.g., America/Los_Angeles)"),
  expectedSalaryMin: z.number().describe("Expected minimum salary"),
  expectedSalaryMax: z.number().describe("Expected maximum salary"),
  salaryCurrency: z.string().describe("Currency code (USD, EUR, etc.)"),
  experienceLevel: z
    .enum(["entry", "junior", "mid", "senior", "lead", "principal"])
    .describe("Experience level"),
  yearsOfExperience: z.number().describe("Total years of experience"),
  skills: z
    .array(
      z.object({
        name: z.string().describe("Skill name"),
        category: z
          .string()
          .describe("Skill category (e.g., Programming, Design, Management)"),
        proficiency: z
          .enum(["beginner", "intermediate", "advanced", "expert"])
          .describe("Skill proficiency level"),
        yearsOfExperience: z
          .number()
          .describe("Years of experience with this skill"),
      }),
    )
    .describe("Technical and soft skills extracted from experience"),
  workTypes: z
    .array(
      z.enum(["full-time", "part-time", "contract", "freelance", "internship"]),
    )
    .describe("Preferred work types"),
  isRemoteOpen: z.boolean().describe("Open to remote work"),
  enhancedProjects: z
    .array(
      z.object({
        title: z.string().describe("Enhanced project title"),
        description: z.string().describe("Enhanced project description"),
        longDescription: z.string().describe("Detailed project description"),
        technologies: z
          .array(z.string())
          .describe("Technologies used in the project"),
        githubUrl: z.string().optional().describe("Mock GitHub URL"),
        liveUrl: z.string().optional().describe("Mock live demo URL"),
      }),
    )
    .describe("Enhanced project details based on the original projects"),
});

type CandidateEnhancement = z.infer<typeof candidateEnhancementSchema>;

async function generateCandidateEnhancement(
  resume: Resume,
): Promise<CandidateEnhancement> {
  const resumeText = JSON.stringify(resume, null, 2);

  const result = await generateObject({
    model: openrouter("google/gemini-2.0-flash-001"),
    system: [
      "You are an AI assistant that enhances candidate profiles based on resume data.",
      "Generate realistic and professional candidate information that matches the experience level and background.",
      "For salary expectations, use market-appropriate ranges based on location and experience.",
      "For skills, extract relevant technologies and competencies from the work experience.",
      "Make sure all generated data is consistent and realistic.",
    ].join("\n"),
    schema: candidateEnhancementSchema,
    prompt: `Based on this resume data, generate enhanced candidate profile information:\n\n${resumeText}`,
  });

  return result.object;
}

function generateRandomUserId(): string {
  return `user_${faker.string.alphanumeric(21)}`;
}

function generateRandomEmail(): string {
  return faker.internet.email();
}

function calculateExperienceScore(yearsOfExperience: number): number {
  // Simple scoring: 10 points per year, capped at 100
  return Math.min(yearsOfExperience * 10, 100);
}

function calculateSkillScore(skills: { proficiency: string }[]): number {
  // Simple scoring based on number of skills and proficiency
  const proficiencyScores = {
    beginner: 5,
    intermediate: 10,
    advanced: 15,
    expert: 20,
  };

  return skills.reduce((total, skill) => {
    return (
      total +
      (proficiencyScores[skill.proficiency as keyof typeof proficiencyScores] ||
        5)
    );
  }, 0);
}

async function ingestCandidate(resume: Resume, index: number) {
  console.log(`\n🔄 Processing candidate ${index + 1}...`);

  try {
    // Generate enhanced candidate data using LLM
    console.log("🤖 Generating enhanced candidate data with LLM...");
    const enhancement = await generateCandidateEnhancement(resume);

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

    if (!user) {
      throw new Error("Failed to create user");
    }

    console.log("✅ User created successfully");

    // Calculate scores
    const skillScore = calculateSkillScore(enhancement.skills);
    const experienceScore = calculateExperienceScore(
      enhancement.yearsOfExperience,
    );
    const totalScore = skillScore + experienceScore;

    // Insert candidate profile
    const [candidateProfile] = await db
      .insert(schema.candidateProfiles)
      .values({
        userId: user.userId,
        currentStep: 5, // Completed onboarding
        firstName: enhancement.firstName,
        lastName: enhancement.lastName,
        title: enhancement.title,
        bio: enhancement.bio,
        location: enhancement.location,
        timezone: enhancement.timezone,
        isRemoteOpen: enhancement.isRemoteOpen,
        workTypes: enhancement.workTypes,
        experienceLevel: enhancement.experienceLevel,
        yearsOfExperience: enhancement.yearsOfExperience,
        expectedSalaryMin: enhancement.expectedSalaryMin,
        expectedSalaryMax: enhancement.expectedSalaryMax,
        salaryCurrency: enhancement.salaryCurrency,
        parsedResumeData: resume,
        verificationStatus: "approved",
        totalScore,
        skillScore,
        experienceScore,
        outreachCount: 0,
        isActive: true,
        isOpenToWork: true,
        onboardingCompletedAt: new Date(),
      })
      .returning();

    if (!candidateProfile) {
      throw new Error("Failed to create candidate profile");
    }

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
        technologies: enhancement.skills.map((s) => s.name).slice(0, 5), // Sample technologies
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
        // Mock graduation dates based on experience
        startDate: "2016-09-01", // Sept 2016
        endDate: "2020-06-01", // June 2020
      });

      console.log("✅ Added education record");
    }

    // Insert skills
    for (const skill of enhancement.skills) {
      await db.insert(schema.skills).values({
        candidateId: candidateProfile.id,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
        isVerified: faker.datatype.boolean({ probability: 0.3 }),
        verificationSource: faker.datatype.boolean({ probability: 0.3 })
          ? "GitHub"
          : null,
      });
    }

    console.log(`✅ Added ${enhancement.skills.length} skills`);

    // Insert projects
    const projectsToInsert = enhancement.enhancedProjects.slice(0, 3); // Limit to 3 projects
    for (const [projectIndex, project] of projectsToInsert.entries()) {
      await db.insert(schema.projects).values({
        candidateId: candidateProfile.id,
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        technologies: project.technologies,
        startDate: `${2022 + projectIndex}-${String(projectIndex * 3 + 1).padStart(2, "0")}-01`, // Spread projects across time
        endDate: `${2022 + projectIndex}-${String((projectIndex + 1) * 3 + 1).padStart(2, "0")}-01`,
        isFeatured: projectIndex === 0, // First project is featured
        isPublic: true,
        displayOrder: projectIndex,
      });
    }

    console.log(`✅ Added ${projectsToInsert.length} projects`);

    return candidateProfile;
  } catch (error) {
    console.error(`❌ Error processing candidate ${index + 1}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting candidate ingestion process...");
  console.log(`📝 Processing ${resumes.length} resumes\n`);

  const results = [];

  for (const [index, resume] of resumes.entries()) {
    try {
      const candidate = await ingestCandidate(resume, index);
      results.push(candidate);

      // Add delay to avoid rate limiting
      if (index < resumes.length - 1) {
        console.log("⏳ Waiting 2 seconds before processing next candidate...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Failed to process candidate ${index + 1}:`, error);
      // Continue with next candidate
    }
  }

  console.log(`\n🎉 Ingestion completed!`);
  console.log(
    `✅ Successfully processed: ${results.length}/${resumes.length} candidates`,
  );

  // Print summary
  for (const candidate of results) {
    if (candidate) {
      console.log(
        `  • ${candidate.firstName} ${candidate.lastName} (${candidate.title})`,
      );
    }
  }

  process.exit(0);
}

// Run the ingestion
main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
