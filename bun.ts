// import { db } from "@/server/db";
// import { candidateProfiles, users } from "@/server/db/schema";

import { db } from "@/server/db";
import {
  candidateProfiles,
  recruiterProfiles,
  skills,
  users,
} from "@/server/db/schema";

import { eq } from "drizzle-orm";

// const data = [
//   {
//     userId: "user_NrWhFfJK3n1S1qlhzICdy",
//     linkedinEmail: "Lavada67@hotmail.com",
//     credits: 88,
//     githubUsername: "Serenity15",
//     linkedinUrl: "https://linkedin.com/in/misty_stehr",
//     currentStep: 5,
//     firstName: "Jane",
//     lastName: "Doe",
//     title: "Software Engineer",
//     bio: "A highly skilled software engineer with experience in optimizing React applications. Proven ability to improve performance and reduce load times. Passionate about creating efficient and user-friendly web applications.",
//     location: "Menlo Park, CA",
//     timezone: "America/Los_Angeles",
//     isRemoteOpen: true,
//     workTypes: ["full-time", "contract"],
//     experienceLevel: "mid",
//     yearsOfExperience: 3,
//     expectedSalaryMin: 150000,
//     expectedSalaryMax: 180000,
//     salaryCurrency: "USD",
//     parsedResumeData: {
//       fullName: "Jane Doe",
//       email: "Annie49@gmail.com",
//       role: "Software Engineer",
//       skills: "React, JavaScript, Redux, React Profiler",
//       experience: "3",
//       location: "Menlo Park, CA",
//       githubUrl: "github.com/mockuser/react-optimization",
//       linkedinUrl: "https://indelible-statue.net",
//       enhancedData: {
//         skills: [
//           {
//             name: "React",
//             category: "Programming",
//             proficiency: "advanced",
//             yearsOfExperience: 3,
//           },
//           {
//             name: "JavaScript",
//             category: "Programming",
//             proficiency: "advanced",
//             yearsOfExperience: 3,
//           },
//           {
//             name: "Redux",
//             category: "State Management",
//             proficiency: "intermediate",
//             yearsOfExperience: 3,
//           },
//           {
//             name: "React Profiler",
//             category: "Performance Tuning",
//             proficiency: "intermediate",
//             yearsOfExperience: 1,
//           },
//         ],
//         workExperience: [
//           {
//             company: "Meta",
//             role: "Software Engineer",
//             location: "Menlo Park, CA",
//             startDate: "2020-06-01",
//             endDate: "2023-01-01",
//             projects: [
//               {
//                 name: "React Performance Optimization",
//                 description:
//                   "Optimized React components performance resulting in 30% faster load times for Facebook main feed.",
//                 link: "facebook.com",
//               },
//             ],
//             description:
//               "Optimized React components performance resulting in 30% faster load times for Facebook main feed.",
//           },
//         ],
//         education: {
//           degree: "Bachelor of Science",
//           field: "Computer Science",
//           institution: "UC Berkeley",
//           location: "Berkeley, CA",
//         },
//         projects: [
//           {
//             title: "React Performance Optimization",
//             description:
//               "Optimized React components for Facebook's main feed, resulting in a 30% reduction in load times.",
//             longDescription:
//               "Led a project to optimize React components within Facebook's main feed. Identified and resolved performance bottlenecks, resulting in a 30% reduction in load times and improved user experience. Technologies used included React Profiler, JavaScript, and Redux.",
//             technologies: ["React", "JavaScript", "Redux", "React Profiler"],
//             githubUrl: "github.com/mockuser/react-optimization",
//             liveUrl: "facebook.com",
//           },
//         ],
//       },
//     },
//     verificationStatus: "approved",
//     totalScore: 80,
//     skillScore: 50,
//     experienceScore: 30,
//     outreachCount: 0,
//     isActive: true,
//     isOpenToWork: true,
//     onboardingCompletedAt: "2025-06-02T03:48:45.694Z",
//     approvedAt: "2025-06-02T03:48:45.694Z",
//     lastActiveAt: "2025-06-02T03:48:45.694Z",
//   },
//   {
//     userId: "user_pu5OppzHVXSzCDXzppVwL",
//     linkedinEmail: "Francesca83@yahoo.com",
//     credits: 91,
//     githubUsername: "Bonnie_Mosciski40",
//     linkedinUrl: "https://linkedin.com/in/julien_hauck72",
//     currentStep: 5,
//     firstName: "Alice",
//     lastName: "Smith",
//     title: "Product Manager",
//     bio: "A highly motivated and results-driven product manager with a proven track record of launching successful products and features. Adept at leading cross-functional teams and driving user engagement. Passionate about leveraging technology to solve complex problems and create innovative solutions.",
//     location: "Mountain View, CA",
//     timezone: "America/Los_Angeles",
//     isRemoteOpen: true,
//     workTypes: ["full-time"],
//     experienceLevel: "mid",
//     yearsOfExperience: 4,
//     expectedSalaryMin: 180000,
//     expectedSalaryMax: 220000,
//     salaryCurrency: "USD",
//     parsedResumeData: {
//       fullName: "Alice Smith",
//       email: "Bernadette.DAmore19@hotmail.com",
//       role: "Product Manager",
//       skills:
//         "Product Strategy, Roadmap Development, Team Leadership, User Research, A/B Testing",
//       experience: "4",
//       location: "Mountain View, CA",
//       githubUrl: "https://github.com/mockuser/ai-search-feature",
//       linkedinUrl: "https://unknown-nougat.org/",
//       enhancedData: {
//         skills: [
//           {
//             name: "Product Strategy",
//             category: "Product Management",
//             proficiency: "expert",
//             yearsOfExperience: 4,
//           },
//           {
//             name: "Roadmap Development",
//             category: "Product Management",
//             proficiency: "expert",
//             yearsOfExperience: 4,
//           },
//           {
//             name: "Team Leadership",
//             category: "Product Management",
//             proficiency: "expert",
//             yearsOfExperience: 4,
//           },
//           {
//             name: "User Research",
//             category: "Product Management",
//             proficiency: "advanced",
//             yearsOfExperience: 4,
//           },
//           {
//             name: "A/B Testing",
//             category: "Product Management",
//             proficiency: "advanced",
//             yearsOfExperience: 4,
//           },
//           {
//             name: "Machine Learning",
//             category: "Technology",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//           {
//             name: "UI/UX Design",
//             category: "Technology",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//         ],
//         workExperience: [
//           {
//             company: "Google",
//             role: "Product Manager",
//             location: "Mountain View, CA",
//             startDate: "2021-06-01",
//             endDate: "2023-05-01",
//             projects: [
//               {
//                 name: "AI Search Feature",
//                 description:
//                   "Led the development and launch of a new AI-powered search feature, resulting in a 15% increase in user engagement.",
//                 link: "google.com",
//               },
//               {
//                 name: "Google Maps UI Redesign",
//                 description:
//                   "Managed a cross-functional team to improve the user interface of Google Maps, leading to a 10% reduction in user complaints.",
//                 link: "google.com",
//               },
//             ],
//             description:
//               "Led the development and launch of a new AI-powered search feature, resulting in a 15% increase in user engagement.\nManaged a cross-functional team to improve the user interface of Google Maps, leading to a 10% reduction in user complaints.",
//           },
//           {
//             company: "Microsoft",
//             role: "Associate Product Manager",
//             location: "Redmond, WA",
//             startDate: "2019-07-01",
//             endDate: "2021-05-01",
//             projects: [
//               {
//                 name: "Microsoft Teams Growth",
//                 description:
//                   "Developed and executed the product roadmap for Microsoft Teams, resulting in a 20% increase in active users.",
//                 link: "microsoft.com",
//               },
//               {
//                 name: "Microsoft Office Expansion",
//                 description:
//                   "Conducted market research and competitive analysis to identify new product opportunities for Microsoft Office.",
//                 link: "microsoft.com",
//               },
//             ],
//             description:
//               "Developed and executed the product roadmap for Microsoft Teams, resulting in a 20% increase in active users.\nConducted market research and competitive analysis to identify new product opportunities for Microsoft Office.",
//           },
//         ],
//         education: {
//           degree: "Master of Business Administration (MBA)",
//           field: "Business Administration",
//           institution: "Stanford University",
//           location: "Stanford, CA",
//         },
//         projects: [
//           {
//             title: "AI Search Feature",
//             description:
//               "Developed and launched an AI-powered search feature that increased user engagement by 15%.",
//             longDescription:
//               "Led the end-to-end development and launch of a new AI-powered search feature, incorporating machine learning algorithms to improve search relevance and user experience. Collaborated with engineering, design, and marketing teams to ensure successful product delivery.",
//             technologies: [
//               "Machine Learning",
//               "Artificial Intelligence",
//               "Product Management",
//             ],
//             githubUrl: "https://github.com/mockuser/ai-search-feature",
//             liveUrl: "https://www.google.com/ai-search-feature",
//           },
//           {
//             title: "Google Maps UI Redesign",
//             description:
//               "Improved the user interface of Google Maps, leading to a 10% reduction in user complaints.",
//             longDescription:
//               "Managed a cross-functional team of designers and engineers to redesign the user interface of Google Maps. Conducted user research and A/B testing to optimize the user experience and address user pain points.",
//             technologies: ["UI/UX Design", "Product Management", "A/B Testing"],
//             githubUrl: "https://github.com/mockuser/google-maps-redesign",
//             liveUrl: "https://www.google.com/maps",
//           },
//         ],
//       },
//     },
//     verificationStatus: "approved",
//     totalScore: 150,
//     skillScore: 110,
//     experienceScore: 40,
//     outreachCount: 0,
//     isActive: true,
//     isOpenToWork: true,
//     onboardingCompletedAt: "2025-06-02T03:48:46.122Z",
//     approvedAt: "2025-06-02T03:48:46.122Z",
//     lastActiveAt: "2025-06-02T03:48:46.122Z",
//   },

//   {
//     userId: "user_WzGU5WduVbhxZM3LIt1xO",
//     linkedinEmail: "Barbara.Kiehn34@yahoo.com",
//     credits: 92,
//     githubUsername: "Rick.Murray",
//     linkedinUrl: "https://linkedin.com/in/melba57",
//     currentStep: 5,
//     firstName: "Jane",
//     lastName: "Smith",
//     title: "Backend Engineer",
//     bio: "Experienced Backend Engineer with a strong background in building scalable systems. Proven ability to design and implement efficient solutions for high-volume transaction processing. Passionate about leveraging technology to solve complex problems.",
//     location: "San Francisco, CA",
//     timezone: "America/Los_Angeles",
//     isRemoteOpen: true,
//     workTypes: ["full-time", "contract"],
//     experienceLevel: "mid",
//     yearsOfExperience: 3,
//     expectedSalaryMin: 150000,
//     expectedSalaryMax: 180000,
//     salaryCurrency: "USD",
//     parsedResumeData: {
//       fullName: "Jane Smith",
//       email: "Marianna53@gmail.com",
//       role: "Backend Engineer",
//       skills: "Java, Kafka, Cassandra, gRPC, Docker",
//       experience: "3",
//       location: "San Francisco, CA",
//       githubUrl: "github.com/mockuser/payment-pipeline",
//       linkedinUrl: "https://grave-viability.name",
//       enhancedData: {
//         skills: [
//           {
//             name: "Java",
//             category: "Programming",
//             proficiency: "advanced",
//             yearsOfExperience: 3,
//           },
//           {
//             name: "Kafka",
//             category: "Data Engineering",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//           {
//             name: "Cassandra",
//             category: "Database",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//           {
//             name: "gRPC",
//             category: "Networking",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//           {
//             name: "Docker",
//             category: "DevOps",
//             proficiency: "intermediate",
//             yearsOfExperience: 2,
//           },
//           {
//             name: "Kubernetes",
//             category: "DevOps",
//             proficiency: "intermediate",
//             yearsOfExperience: 1,
//           },
//           {
//             name: "AWS",
//             category: "Cloud",
//             proficiency: "intermediate",
//             yearsOfExperience: 1,
//           },
//         ],
//         workExperience: [
//           {
//             company: "Stripe",
//             role: "Backend Engineer",
//             location: "San Francisco, CA",
//             startDate: "2021-03-01",
//             endDate: "2024-01-01",
//             projects: [
//               {
//                 name: "Payment Processing Pipeline",
//                 description:
//                   "Built scalable payment processing system handling millions of transactions daily.",
//                 link: "stripe.com",
//               },
//             ],
//             description:
//               "Built scalable payment processing system handling millions of transactions daily.",
//           },
//         ],
//         education: {
//           degree: "Master of Science",
//           field: "Software Engineering",
//           institution: "Carnegie Mellon University",
//           location: "Pittsburgh, PA",
//         },
//         projects: [
//           {
//             title: "Payment Processing Pipeline",
//             description:
//               "Developed a high-throughput, low-latency payment processing pipeline capable of handling millions of transactions per day with 99.99% uptime.",
//             longDescription:
//               "Led the design and implementation of a distributed payment processing system using Kafka, Cassandra, and gRPC. Optimized system performance by implementing caching strategies and asynchronous processing, resulting in a 30% reduction in transaction latency. Collaborated with cross-functional teams to integrate the pipeline with various internal and external services. Implemented robust monitoring and alerting to ensure system stability and quickly address any issues.",
//             technologies: [
//               "Java",
//               "Kafka",
//               "Cassandra",
//               "gRPC",
//               "Docker",
//               "Kubernetes",
//               "AWS",
//             ],
//             githubUrl: "github.com/mockuser/payment-pipeline",
//             liveUrl: "payment-pipeline.example.com",
//           },
//         ],
//       },
//     },
//     verificationStatus: "approved",
//     totalScore: 105,
//     skillScore: 75,
//     experienceScore: 30,
//     outreachCount: 0,
//     isActive: true,
//     isOpenToWork: true,
//     onboardingCompletedAt: "2025-06-02T03:48:46.800Z",
//     approvedAt: "2025-06-02T03:48:46.800Z",
//     lastActiveAt: "2025-06-02T03:48:46.800Z",
//   },
// ];

// // insert in db - users table first and then candidateProfiles table

// async function insertData() {
//   console.log("Starting data insertion...");

//   try {
//     // First, insert into users table
//     const usersData = data.map((item) => ({
//       userId: item.userId,
//       githubUsername: item.githubUsername,
//       linkedinEmail: item.linkedinEmail,
//       linkedinUrl: item.linkedinUrl,
//       credits: item.credits,
//     }));

//     console.log(`Inserting ${usersData.length} users...`);
//     await db.insert(users).values(usersData).onConflictDoNothing();
//     console.log("✅ Users inserted successfully");

//     // Then, insert into candidateProfiles table
//     const candidateProfilesData = data.map((item) => ({
//       userId: item.userId,
//       currentStep: item.currentStep,
//       firstName: item.firstName,
//       lastName: item.lastName,
//       title: item.title,
//       bio: item.bio,
//       location: item.location,
//       timezone: item.timezone,
//       isRemoteOpen: item.isRemoteOpen,
//       workTypes: item.workTypes,
//       experienceLevel: item.experienceLevel,
//       yearsOfExperience: item.yearsOfExperience,
//       expectedSalaryMin: item.expectedSalaryMin,
//       expectedSalaryMax: item.expectedSalaryMax,
//       salaryCurrency: item.salaryCurrency,
//       parsedResumeData: item.parsedResumeData,
//       verificationStatus: item.verificationStatus,
//       totalScore: item.totalScore,
//       skillScore: item.skillScore,
//       experienceScore: item.experienceScore,
//       outreachCount: item.outreachCount,
//       isActive: item.isActive,
//       isOpenToWork: item.isOpenToWork,
//       onboardingCompletedAt: new Date(item.onboardingCompletedAt),
//       approvedAt: new Date(item.approvedAt),
//       lastActiveAt: new Date(item.lastActiveAt),
//     }));

//     console.log(
//       `Inserting ${candidateProfilesData.length} candidate profiles...`,
//     );
//     await db
//       .insert(candidateProfiles)
//       .values(candidateProfilesData)
//       .onConflictDoNothing();
//     console.log("✅ Candidate profiles inserted successfully");

//     console.log("🎉 All data inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting data:", error);
//     throw error;
//   }
// }

// // Execute the insertion
// insertData()
//   .catch(console.error)
//   .finally(() => process.exit(0));

// await db.insert(skills).values([
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "RAG",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 3,
//   },
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "LangChain",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "Generative AI",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },

//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "Machine Learning",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "Deep Learning",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "Natural Language Processing",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },
//   {
//     candidateId: "b528eede-e8cc-43c8-948a-1c9d17a1950c",
//     name: "NLP",
//     category: "Programming",
//     proficiency: "intermediate",
//     yearsOfExperience: 2,
//   },
// ]);

// const userId = "user_2xwI2BhQ2sJu58esPjXM4CVcmjL"; //  pranav
const userId = "user_2xwI2BhQ2sJu58esPjXM4CVcmjL"; // not pranav

await db.delete(recruiterProfiles).where(eq(recruiterProfiles.userId, userId));

const candidate = await db
  .select()
  .from(candidateProfiles)
  .where(eq(candidateProfiles.userId, userId));
// skills

if (candidate[0]!.id) {
  await db.delete(skills).where(eq(skills.candidateId, candidate[0]!.id));
}

await db.delete(candidateProfiles).where(eq(candidateProfiles.userId, userId));
await db.delete(users).where(eq(users.userId, userId));

console.log(`Deleted user ${userId}`);

process.exit(0);
