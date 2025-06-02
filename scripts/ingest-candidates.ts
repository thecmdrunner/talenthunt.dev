import { faker } from "@faker-js/faker";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { readFile } from "fs/promises";
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

const files = ["biz-resumes.json", "dev-resumes.json"] as const;

const devResumes = await readFile(files[0], "utf-8");
const bizResumes = await readFile(files[1], "utf-8");

const devResumesData = JSON.parse(devResumes) as { resumes: Resume[] };
const bizResumesData = JSON.parse(bizResumes) as { resumes: Resume[] };

const resumes = [
  // ...devResumesData.resumes, ...bizResumesData.resumes
  devResumesData.resumes[0],
] as Resume[];

// Resume data from the existing ingest.ts file
// const resumes: Resume[] = [
//   {
//     pastExperience: [
//       {
//         company: "Google",
//         location: "Mountain View, CA",
//         role: "Product Manager",
//         projects: [
//           {
//             name: "AI Search Feature",
//             description:
//               "Led the development and launch of a new AI-powered search feature, resulting in a 15% increase in user engagement.",
//             link: "google.com",
//           },
//           {
//             name: "Google Maps UI Redesign",
//             description:
//               "Managed a cross-functional team to improve the user interface of Google Maps, leading to a 10% reduction in user complaints.",
//             link: "google.com",
//           },
//         ],
//         duration: {
//           startDate: "2021-06-01",
//           endDate: "2023-05-01",
//         },
//       },
//       {
//         company: "Microsoft",
//         location: "Redmond, WA",
//         role: "Associate Product Manager",
//         projects: [
//           {
//             name: "Microsoft Teams Growth",
//             description:
//               "Developed and executed the product roadmap for Microsoft Teams, resulting in a 20% increase in active users.",
//             link: "microsoft.com",
//           },
//           {
//             name: "Microsoft Office Expansion",
//             description:
//               "Conducted market research and competitive analysis to identify new product opportunities for Microsoft Office.",
//             link: "microsoft.com",
//           },
//         ],
//         duration: {
//           startDate: "2019-07-01",
//           endDate: "2021-05-01",
//         },
//       },
//     ],
//     education: {
//       degree: "Master of Business Administration (MBA)",
//       field: "Business Administration",
//       institution: "Stanford University",
//       location: "Stanford, CA",
//     },
//   },
//   {
//     pastExperience: [
//       {
//         company: "Google",
//         location: "SF",
//         role: "Software Engineer",
//         projects: [
//           {
//             name: "Google Search Feature",
//             description: "Developed a new feature for Google Search.",
//             link: "https://www.google.com",
//           },
//         ],
//         duration: {
//           startDate: "2022-01-01",
//           endDate: "2023-01-01",
//         },
//       },
//     ],
//     education: {
//       degree: "Bachelor's Degree",
//       field: "Computer Science",
//       institution: "Stanford University",
//       location: "CA",
//     },
//   },
// ];

// Add more resumes from the JSON files for a more comprehensive test
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

resumes.push({
  pastExperience: [
    {
      company: "Stripe",
      location: "San Francisco, CA",
      role: "Backend Engineer",
      projects: [
        {
          name: "Payment Processing Pipeline",
          description:
            "Built scalable payment processing system handling millions of transactions daily.",
          link: "stripe.com",
        },
      ],
      duration: {
        startDate: "2021-03-01",
        endDate: "2024-01-01",
      },
    },
  ],
  education: {
    degree: "Master of Science",
    field: "Software Engineering",
    institution: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
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

function transformResumeDataToParsedFormat(
  resume: Resume,
  enhancement: CandidateEnhancement,
) {
  // Transform the Resume data to match ParsedResumeData schema structure
  // and include additional structured data for the enhanced candidate information
  return {
    fullName: `${enhancement.firstName} ${enhancement.lastName}`,
    email: generateRandomEmail(),
    role: enhancement.title,
    skills: enhancement.skills
      .map((s) => s.name)
      .slice(0, 5)
      .join(", "),
    experience: enhancement.yearsOfExperience.toString(),
    location: enhancement.location,
    githubUrl: enhancement.enhancedProjects[0]?.githubUrl,
    linkedinUrl: faker.internet.url(),
    // Extended data that includes the enhanced information
    enhancedData: {
      skills: enhancement.skills,
      workExperience: resume.pastExperience.map((exp) => ({
        company: exp.company,
        role: exp.role,
        location: exp.location,
        startDate: exp.duration.startDate,
        endDate: exp.duration.endDate,
        projects: exp.projects,
        description: exp.projects?.map((p) => p.description).join("\n") ?? "",
      })),
      education: resume.education,
      projects: enhancement.enhancedProjects.slice(0, 3),
    },
  };
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

    const userData = {
      userId,
      linkedinEmail: email,
      credits: faker.number.int({ min: 10, max: 100 }),
      githubUsername: faker.internet.userName(),
      linkedinUrl: `https://linkedin.com/in/${faker.internet.userName().toLowerCase()}`,
    };

    // console.log(`userData: ${JSON.stringify(userData, null, 2)}`);

    // Insert user first
    // const userResult = await db
    //   .insert(schema.users)
    //   .values(userData)
    //   .returning();

    // const user = userResult[0];
    //   if (!user) {
    //     throw new Error("Failed to create user");
    // }

    console.log("✅ User created successfully");

    // Calculate scores
    const skillScore = calculateSkillScore(enhancement.skills);
    const experienceScore = calculateExperienceScore(
      enhancement.yearsOfExperience,
    );
    const totalScore = skillScore + experienceScore;

    // Transform resume data to match ParsedResumeData schema
    const parsedResumeData = transformResumeDataToParsedFormat(
      resume,
      enhancement,
    );
    const data = {
      ...userData,
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
      parsedResumeData, // Now properly formatted
      verificationStatus: "approved",
      totalScore,
      skillScore,
      experienceScore,
      outreachCount: 0,
      isActive: true,
      isOpenToWork: true,
      onboardingCompletedAt: new Date(),
      approvedAt: new Date(), // Add approval timestamp
      lastActiveAt: new Date(), // Add last active timestamp
    };

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    // Insert candidate profile
    // const result = await db
    //   .insert(schema.candidateProfiles)
    //   .values(data)
    //   .returning();

    // const candidateProfile = result[0]!;

    // console.log(
    //   `✅ Candidate profile created with enhanced data: ${candidateProfile.firstName} ${candidateProfile.lastName}`,
    // );
    // console.log(
    //   `   📊 Score: ${totalScore} (Skills: ${skillScore}, Experience: ${experienceScore})`,
    // );
    // console.log(
    //   `   🎯 ${enhancement.skills.length} skills, ${resume.pastExperience.length} work experiences, ${enhancement.enhancedProjects.length} projects`,
    // );

    // return candidateProfile;
  } catch (error) {
    console.error(`❌ Error processing candidate ${index + 1}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting candidate ingestion process...");
  console.log(`📝 Processing ${resumes.length} resumes\n`);

  const results = [];

  const promises = resumes.map(async (resume, index) => {
    try {
      const candidate = await ingestCandidate(resume, index);

      // Add delay to avoid rate limiting
      if (index < resumes.length - 1) {
        console.log("⏳ Waiting 50ms before processing next candidate...");
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      return candidate;
    } catch (error) {
      console.error(`Failed to process candidate ${index + 1}:`, error);
      return null;
    }
  });

  const candidates = await Promise.all(promises);
  results.push(
    ...candidates.filter((c): c is NonNullable<typeof c> => c !== null),
  );

  console.log(`\n🎉 Ingestion completed!`);
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
