import { createStandardCacheKey, withCache } from "@/lib/cache";
import {
  CACHE_CONFIG,
  CREDITS_COST,
  CREDIT_ERROR_MESSAGES,
} from "@/lib/constants";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { candidateProfiles, users, workExperience } from "@/server/db/schema";
import { jobAttributesSchema, sampleJobAttributes } from "@/types/jobs";
import { parsedResumeDataSchema } from "@/types/resume";
import { groq } from "@ai-sdk/groq";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { TRPCError } from "@trpc/server";
import { generateObject } from "ai";
import { and, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import PDFParser from "pdf2json";
import { z } from "zod";

const systemPrompt = [
  "You are a helpful assistant that can extracts attributes from a job description for recruiter's ideal job requirement in JSON format. Make sure to include all relevant attributes in the response.",

  `For example, if the requirement is 'Product developer', suggest relevant well-known roles like: ${[
    "Software Engineer",
    "Product Engineer",
    "Data Scientist",
    "Product Manager",
    "Product Owner",
    "Product Analyst",
    "Product Designer",

    "Mobile Developer",
  ].join(", ")}`,

  `Example set of skills for an effective search filter: ${[
    "React",
    "Next.js",
    "Node.js",
    "Bun",
    "Vercel",
    "Netlify",
    "Supabase",
    "Tailwind",
    "Shadcn",
    "Shadcn UI",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "iOS",
    "Android",
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "Java",

    "Comfy UI",

    "Replicate",
    "OpenAI",
    "Anthropic",
    "Claude",
    "Gemini",
    "Llama",
    "Grok",
    "Groq",
    "Pinecone",
    "Qdrant",

    "Amazon Web Services",
    "Google Cloud Platform",
    "Microsoft Azure",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",

    "Figma",
    "Photoshop",
    "Premiere Pro",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "Linux",
  ].join(", ")}`,

  `Example of the JSON output: ${JSON.stringify(sampleJobAttributes)}`,
].join("\n");

const videoReviewSchema = z.object({
  approved: z.boolean(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  feedback: z.string().optional(),
  concerns: z.array(z.string()).optional(),
});

export const aiRouter = createTRPCRouter({
  reviewCandidateVideo: protectedProcedure
    .input(
      z.object({
        videoUrl: z.string().url(),
        candidateId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { videoUrl } = input;
      const userId = ctx.session.userId;

      console.log(`🎥 Starting video review for user: ${userId}`);

      try {
        // Get candidate profile
        const candidateProfile = await ctx.db.query.candidateProfiles.findFirst(
          {
            where: eq(candidateProfiles.userId, userId),
          },
        );

        if (!candidateProfile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Candidate profile not found",
          });
        }

        // Download video for analysis
        console.log("📥 Downloading video for AI analysis...");
        const videoResponse = await fetch(videoUrl);
        if (!videoResponse.ok) {
          throw new Error("Failed to download video");
        }

        const videoBuffer = await videoResponse.arrayBuffer();
        const videoData = Buffer.from(videoBuffer);

        console.log(
          `📱 Video downloaded: ${(videoData.length / 1024 / 1024).toFixed(2)}MB`,
        );

        // Use Gemini Flash to analyze the video
        const result = await generateObject({
          model: openrouter("google/gemini-2.0-flash-001"),

          schema: videoReviewSchema,
          system: `You are an expert HR professional reviewing candidate introduction videos for a tech talent platform. 

Your job is to evaluate whether this candidate should be approved for the platform based on their video introduction.

APPROVAL CRITERIA:
✅ APPROVE if the candidate:
- Speaks clearly and professionally about their background
- Mentions relevant technical skills or experience  
- Shows genuine personality and enthusiasm
- Appears to be a real person (not AI-generated or fake)
- Video quality is reasonable (doesn't need to be perfect)
- Speaks about career goals or what they're looking for
- Shows basic communication skills suitable for professional environment

❌ REJECT if the candidate:
- Video is clearly fake, AI-generated, or not a real person
- Contains inappropriate content (offensive language, inappropriate background)
- Is completely unrelated to professional introduction (random content)
- Shows clear signs of being spam or malicious
- Person appears intoxicated or unprofessional
- Video is corrupted or completely unintelligible

IMPORTANT GUIDELINES:
- Be lenient with accents, nervousness, or imperfect English
- Don't reject based on video quality alone unless completely unusable
- Focus on authenticity and professional intent, not perfection
- Consider that candidates may be nervous or new to video introductions
- Approve unless there are clear red flags

Provide confidence score (0-1) and detailed reasoning for your decision.`,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Please review this candidate introduction video and determine if they should be approved for our tech talent platform. Focus on authenticity, professionalism, and genuine career intent.",
                },
                {
                  type: "file",
                  mimeType:
                    videoResponse.headers.get("content-type") ?? "video/mp4",
                  data: videoData,
                },
              ],
            },
          ],
        });

        const review = result.object;
        console.log("🤖 AI Review Result:", review);

        // Update candidate profile based on AI decision
        if (review.approved && review.confidence >= 0.7) {
          // Approve the candidate
          const approvalTime = new Date(Date.now() + 5 * 60 * 1000);
          await ctx.db
            .update(candidateProfiles)
            .set({
              onboardingCompletedAt: approvalTime,
              approvedAt: approvalTime,
              verificationStatus: "approved",
            })
            .where(eq(candidateProfiles.id, candidateProfile.id));

          console.log(
            `✅ Candidate ${userId} approved and onboarding completed`,
          );
        } else {
          // Keep as pending for manual review if confidence is low or rejected
          const updateData: {
            verificationStatus: "pending" | "rejected";
            rejectedAt?: Date;
          } = {
            verificationStatus: review.approved ? "pending" : "rejected",
          };

          // Set rejectedAt timestamp if actually rejected
          if (!review.approved) {
            updateData.rejectedAt = new Date(Date.now() + 5 * 60 * 1000);
          }

          await ctx.db
            .update(candidateProfiles)
            .set(updateData)
            .where(eq(candidateProfiles.id, candidateProfile.id));

          console.log(
            `⏳ Candidate ${userId} marked for manual review or rejected`,
          );
        }

        return {
          approved: review.approved,
          confidence: review.confidence,
          reasoning: review.reasoning,
          feedback: review.feedback,
          autoApproved: review.approved && review.confidence >= 0.7,
          status:
            review.approved && review.confidence >= 0.7
              ? "approved"
              : review.approved
                ? "pending_manual_review"
                : "rejected",
        };
      } catch (error) {
        console.error("❌ Video review failed:", error);

        // On error, mark as pending for manual review
        const candidateProfile = await ctx.db.query.candidateProfiles.findFirst(
          {
            where: eq(candidateProfiles.userId, userId),
          },
        );

        if (candidateProfile) {
          await ctx.db
            .update(candidateProfiles)
            .set({ verificationStatus: "pending" })
            .where(eq(candidateProfiles.id, candidateProfile.id));
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Failed to review video. Your application has been marked for manual review.",
        });
      }
    }),

  naturalLanguageQuery: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1, "Query cannot be empty"),
      }),
    )
    .output(jobAttributesSchema)
    .mutation(async ({ input, ctx }) => {
      const { query } = input;
      const userId = ctx.session.userId;

      console.log({ query, userId });

      // Create cache key for this query
      const cacheKey = createStandardCacheKey(
        CACHE_CONFIG.PREFIXES.AI_JOB_ATTRIBUTES,
        query,
      );

      // Use the cache helper with AI processing callback
      const result = await withCache({
        key: cacheKey,
        ttlSeconds: CACHE_CONFIG.AI_RESPONSE_TTL,

        callback: async () => {
          // This callback will only run on cache miss
          console.log("Cache miss - processing with AI and deducting credits");

          // Check if user has sufficient credits
          const user = await ctx.db.query.users.findFirst({
            where: eq(users.userId, userId),
          });

          if (!user) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }

          const requiredCredits = CREDITS_COST.NATURAL_LANGUAGE_SEARCH;

          if (user.credits < requiredCredits) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: CREDIT_ERROR_MESSAGES.NATURAL_LANGUAGE_SEARCH,
            });
          }

          try {
            // Deduct credits first (optimistic deduction)
            await ctx.db
              .update(users)
              .set({
                credits: sql`${users.credits} - ${requiredCredits}`,
              })
              .where(eq(users.userId, userId));

            console.log(
              `Credits deducted: ${requiredCredits}. Processing with AI...`,
            );

            const aiResult = await generateObject({
              //   model: openrouter("sarvamai/sarvam-m:free"),
              // model: openrouter("google/gemini-2.0-flash-001"),
              // model: openrouter("meta-llama/llama-4-scout"),
              // model: groq("llama-3.3-70b-versatile"),
              model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),

              mode: "json",
              system: systemPrompt,
              schema: jobAttributesSchema,
              messages: [
                {
                  role: "user",
                  content: query,
                },
              ],
            });

            console.log("AI processing successful");
            return aiResult.object;
          } catch (error) {
            // If AI processing fails, refund the credits
            await ctx.db
              .update(users)
              .set({
                credits: sql`${users.credits} + ${requiredCredits}`,
              })
              .where(eq(users.userId, userId));

            console.error("Error extracting job attributes:", error);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to extract job attributes from query",
            });
          }
        },
      });

      // Log whether this was a cache hit or miss
      if (result.servedCache) {
        // artificial delay to simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 400));

        console.log(
          "Returning result (cache hit = no credits deducted, cache miss = credits deducted)",
        );
      }

      return result.data;
    }),

  parseResume: publicProcedure
    .input(z.object({ resumeUrl: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { resumeUrl } = input;
      const userId = ctx.session.userId;

      console.log({ resumeUrl });

      const result = await withCache({
        key: createStandardCacheKey(
          CACHE_CONFIG.PREFIXES.AI_RESUME_PARSING,
          [userId, resumeUrl].join(":"),
        ),
        callback: async () => {
          // Extract text from PDF using pdf2json
          async function extractTextFromPdf(
            pdfBuffer: Buffer,
          ): Promise<string> {
            return new Promise((resolve, reject) => {
              const pdfParser = new PDFParser();

              // pdfParser.on("pdfParser_dataError", (errData: any) => {
              //   console.error("PDF parsing error:", errData.parserError);
              //   reject(
              //     new Error(`Failed to parse PDF: ${errData.parserError}`),
              //   );
              // });

              pdfParser.on("pdfParser_dataReady", (pdfData) => {
                try {
                  // Extract text from all pages
                  let extractedText = "";

                  if (pdfData.Pages) {
                    for (const page of pdfData.Pages) {
                      if (page.Texts) {
                        for (const text of page.Texts) {
                          if (text.R) {
                            for (const run of text.R) {
                              if (run.T) {
                                // Decode URI component and add space
                                extractedText +=
                                  decodeURIComponent(run.T) + " ";
                              }
                            }
                          }
                        }
                      }
                      extractedText += "\n"; // Add line break between pages
                    }
                  }

                  resolve(extractedText.trim());
                } catch (error) {
                  console.error(`Failed to extract text:`, error);
                  reject(new Error(`Failed to extract text`));
                }
              });

              // Parse the PDF buffer
              pdfParser.parseBuffer(pdfBuffer);
            });
          }

          // Fetch and extract text from resume
          const resumeBlob = await fetch(resumeUrl).then((res) =>
            res.arrayBuffer(),
          );
          const pdfBuffer = Buffer.from(resumeBlob);

          console.log("📄 Extracting text from PDF...");
          const extractedText = await extractTextFromPdf(pdfBuffer);
          console.log("✅ Text extracted successfully");
          console.log(
            "📝 Extracted text preview:",
            extractedText.substring(0, 200) + "...",
          );

          // Prefer extracted text over raw PDF for better performance and reliability
          const useExtractedText = true;

          // Generate object using extracted text
          const result = await generateObject({
            model: openrouter("openai/gpt-4o"),
            system:
              "You are a helpful assistant that extracts candidate's information from a resume. Extract the most relevant role/title, top skills, years of experience, location preferences, and any social media profiles mentioned. If a field is not mentioned, do not include it in the response. Do not return placeholder values or example values in the response. like github.com/example or linkedin.com/example",

            schema: parsedResumeDataSchema,
            messages: [
              {
                role: "user",
                content: useExtractedText
                  ? [
                      {
                        type: "text",
                        text: `Parse this resume text and extract the profile information. Focus on extracting the current/target role, top skills, years of experience, location, and any GitHub/LinkedIn URLs mentioned.

Resume text:
${extractedText}`,
                      },
                    ]
                  : [
                      {
                        type: "text",
                        text: "Parse this resume and extract the profile information. Focus on extracting the current/target role, top skills, years of experience, location, and any GitHub/LinkedIn URLs mentioned.",
                      },
                      {
                        type: "file",
                        mimeType: "application/pdf",
                        data: pdfBuffer,
                        filename: "resume.pdf",
                      },
                    ],
              },
            ],
          });

          console.log("\n📄 Extracted Resume Data:");
          console.log(JSON.stringify(result.object, null, 2));

          return result.object;
        },
      });

      console.log(result.data);

      return result.data;
    }),

  searchCandidates: protectedProcedure
    .input(jobAttributesSchema)
    .output(
      z.object({
        candidates: z.array(
          z.object({
            id: z.string(),
            firstName: z.string().nullable(),
            lastName: z.string().nullable(),
            title: z.string().nullable(),
            bio: z.string().nullable(),
            location: z.string().nullable(),
            yearsOfExperience: z.number().nullable(),
            skills: z.array(z.string()),
            workExperience: z.array(
              z.object({
                company: z.string(),
                position: z.string(),
                startDate: z.date().nullable(),
                endDate: z.date().nullable(),
                isCurrent: z.boolean().nullable(),
              }),
            ),
            totalScore: z.number().nullable(),
            isOpenToWork: z.boolean().nullable(),
            expectedSalaryMin: z.number().nullable(),
            expectedSalaryMax: z.number().nullable(),
            salaryCurrency: z.string().nullable(),
            isRemoteOpen: z.boolean().nullable(),
            workTypes: z.array(z.string()).nullable(),
            matchScore: z.number(), // Calculated match score based on criteria
            // Social links from user table
            githubUsername: z.string().nullable(),
            linkedinEmail: z.string().nullable(),
            linkedinUrl: z.string().nullable(),
            // Social links from parsed resume data
            parsedGithubUrl: z.string().nullable(),
            parsedLinkedinUrl: z.string().nullable(),
          }),
        ),
        total: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { newJob, pastExperience } = input;

      console.log("🔍 Searching candidates with criteria:", input);

      // Build the where conditions based on job attributes
      const whereConditions: any[] = [
        eq(candidateProfiles.verificationStatus, "approved"),
        eq(candidateProfiles.isActive, true),
        eq(candidateProfiles.isOpenToWork, true),
      ];

      // Filter by experience years if specified
      if (pastExperience?.duration?.years && pastExperience?.duration?.filter) {
        const years = pastExperience.duration.years;
        const filter = pastExperience.duration.filter;

        if (filter === "more than") {
          whereConditions.push(gte(candidateProfiles.yearsOfExperience, years));
        } else if (filter === "less than") {
          whereConditions.push(lte(candidateProfiles.yearsOfExperience, years));
        } else if (filter === "equal") {
          whereConditions.push(eq(candidateProfiles.yearsOfExperience, years));
        }
      }

      // Filter by location if specified
      if (newJob.location?.country || newJob.location?.city) {
        const locationFilters = [];
        if (newJob.location.country) {
          locationFilters.push(
            ilike(candidateProfiles.location, `%${newJob.location.country}%`),
          );
        }
        if (newJob.location.city) {
          locationFilters.push(
            ilike(candidateProfiles.location, `%${newJob.location.city}%`),
          );
        }
        if (locationFilters.length > 0) {
          whereConditions.push(or(...locationFilters));
        }
      }

      // Filter by work type preferences if specified
      if (
        newJob.location?.type &&
        ["remote", "on-site", "hybrid"].includes(newJob.location.type)
      ) {
        if (newJob.location.type === "remote") {
          whereConditions.push(eq(candidateProfiles.isRemoteOpen, true));
        }
        // For on-site and hybrid, we'll include all candidates as most are flexible
      }

      // Query candidates with related data
      const candidatesQuery = await ctx.db.query.candidateProfiles.findMany({
        where: and(...whereConditions),
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          title: true,
          bio: true,
          location: true,
          yearsOfExperience: true,
          totalScore: true,
          isOpenToWork: true,
          expectedSalaryMin: true,
          expectedSalaryMax: true,
          salaryCurrency: true,
          isRemoteOpen: true,
          workTypes: true,
          parsedResumeData: true, // Include parsed resume data for skills and social links
        },
        with: {
          user: {
            columns: {
              githubUsername: true,
              linkedinEmail: true,
              linkedinUrl: true,
            },
          },
          skills: {
            columns: {
              name: true,
              proficiency: true,
              yearsOfExperience: true,
            },
          },
          workExperience: {
            columns: {
              company: true,
              position: true,
              startDate: true,
              endDate: true,
              isCurrent: true,
            },
            orderBy: [desc(workExperience.startDate)],
            limit: 3, // Only get last 3 work experiences
          },
        },
        limit: 50, // Limit to 50 candidates for performance
        orderBy: [desc(candidateProfiles.totalScore)],
      });

      // Calculate match scores for each candidate
      const candidatesWithScores = candidatesQuery.map((candidate) => {
        let matchScore = 0;
        const maxScore = 100;

        // Collect all skills from multiple sources
        const candidateSkillsFromTable = candidate.skills.map((s) =>
          s.name.toLowerCase(),
        );

        // Extract skills from parsedResumeData if available
        const parsedSkills: string[] = [];
        if (candidate.parsedResumeData?.skills) {
          // Skills are comma-separated in parsedResumeData
          const skillsFromResume = candidate.parsedResumeData.skills
            .split(",")
            .map((skill) => skill.trim().toLowerCase())
            .filter(Boolean);
          parsedSkills.push(...skillsFromResume);
        }

        // Combine all candidate skills (remove duplicates)
        const allCandidateSkills = [
          ...new Set([...candidateSkillsFromTable, ...parsedSkills]),
        ];

        // Score based on skills match
        if (newJob.skills && newJob.skills.length > 0) {
          const requiredSkills = newJob.skills.map((s) => s.toLowerCase());

          const matchingSkills = requiredSkills.filter((skill) =>
            allCandidateSkills.some(
              (candidateSkill) =>
                candidateSkill.includes(skill) ||
                skill.includes(candidateSkill),
            ),
          );

          const skillScore =
            (matchingSkills.length / requiredSkills.length) * 40;
          matchScore += skillScore;

          // Bonus points for having more skills than required
          if (matchingSkills.length > requiredSkills.length * 0.8) {
            matchScore += 5; // Extra points for comprehensive skill match
          }
        } else {
          matchScore += 20; // Base score if no specific skills required
        }

        // Score based on role/title match (check both current title and parsed resume role)
        let roleMatchFound = false;

        if (newJob.role) {
          const roleWords = newJob.role.toLowerCase().split(" ");

          // Check current title
          if (candidate.title) {
            const titleWords = candidate.title.toLowerCase().split(" ");
            const titleMatches = roleWords.some((roleWord) =>
              titleWords.some(
                (titleWord) =>
                  titleWord.includes(roleWord) || roleWord.includes(titleWord),
              ),
            );

            if (titleMatches) {
              matchScore += 20;
              roleMatchFound = true;
            }
          }

          // Check parsed resume role if title didn't match
          if (!roleMatchFound && candidate.parsedResumeData?.role) {
            const parsedRoleWords = candidate.parsedResumeData.role
              .toLowerCase()
              .split(" ");
            const parsedRoleMatches = roleWords.some((roleWord) =>
              parsedRoleWords.some(
                (parsedRoleWord) =>
                  parsedRoleWord.includes(roleWord) ||
                  roleWord.includes(parsedRoleWord),
              ),
            );

            if (parsedRoleMatches) {
              matchScore += 15; // Slightly less points for parsed role match
              roleMatchFound = true;
            }
          }

          // Check similar roles if no direct match found
          if (!roleMatchFound && newJob.similarRoles) {
            const titleWords = candidate.title?.toLowerCase().split(" ") || [];
            const parsedRoleWords =
              candidate.parsedResumeData?.role?.toLowerCase().split(" ") || [];
            const allRoleWords = [...titleWords, ...parsedRoleWords];

            const similarRoleMatch = newJob.similarRoles.some((similarRole) =>
              allRoleWords.some((roleWord) =>
                similarRole
                  .toLowerCase()
                  .split(" ")
                  .some(
                    (simRoleWord) =>
                      roleWord.includes(simRoleWord) ||
                      simRoleWord.includes(roleWord),
                  ),
              ),
            );
            if (similarRoleMatch) {
              matchScore += 15;
              roleMatchFound = true;
            }
          }
        }

        if (!roleMatchFound) {
          matchScore += 10; // Base score if no role requirement or match
        }

        // Score based on experience level match
        if (pastExperience?.duration?.years && candidate.yearsOfExperience) {
          const requiredYears = pastExperience.duration.years;
          const candidateYears = candidate.yearsOfExperience;

          if (
            pastExperience.duration.filter === "more than" &&
            candidateYears >= requiredYears
          ) {
            matchScore += 25;
          } else if (
            pastExperience.duration.filter === "less than" &&
            candidateYears <= requiredYears
          ) {
            matchScore += 25;
          } else if (
            pastExperience.duration.filter === "equal" &&
            Math.abs(candidateYears - requiredYears) <= 1
          ) {
            matchScore += 25;
          } else {
            // Partial score based on how close they are
            const difference = Math.abs(candidateYears - requiredYears);
            const partialScore = Math.max(0, 25 - difference * 5);
            matchScore += partialScore;
          }
        } else {
          matchScore += 15; // Base score if no experience requirement
        }

        // Score based on location preference (check both current location and parsed location)
        if (newJob.location?.country) {
          let locationMatch = false;

          if (
            candidate.location &&
            candidate.location
              .toLowerCase()
              .includes(newJob.location.country.toLowerCase())
          ) {
            locationMatch = true;
          }

          if (
            !locationMatch &&
            candidate.parsedResumeData?.location &&
            candidate.parsedResumeData.location
              .toLowerCase()
              .includes(newJob.location.country.toLowerCase())
          ) {
            locationMatch = true;
          }

          if (locationMatch) {
            matchScore += 10;
          }
        }

        // Score based on availability
        if (newJob.joiningNotice?.immediate && candidate.isOpenToWork) {
          matchScore += 5;
        }

        // Transform the candidate data to match the expected output schema
        return {
          id: candidate.id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          title: candidate.title,
          bio: candidate.bio,
          location: candidate.location,
          yearsOfExperience: candidate.yearsOfExperience,
          skills: allCandidateSkills, // Return all skills (from table + parsed resume)
          workExperience: candidate.workExperience.map((we) => ({
            company: we.company,
            position: we.position,
            startDate: we.startDate ? new Date(we.startDate) : null,
            endDate: we.endDate ? new Date(we.endDate) : null,
            isCurrent: we.isCurrent,
          })),
          totalScore: candidate.totalScore,
          isOpenToWork: candidate.isOpenToWork,
          expectedSalaryMin: candidate.expectedSalaryMin,
          expectedSalaryMax: candidate.expectedSalaryMax,
          salaryCurrency: candidate.salaryCurrency,
          isRemoteOpen: candidate.isRemoteOpen,
          workTypes: candidate.workTypes,
          matchScore: Math.min(matchScore, maxScore), // Cap at 100
          // Social links from user table
          githubUsername: candidate.user.githubUsername,
          linkedinEmail: candidate.user.linkedinEmail,
          linkedinUrl: candidate.user.linkedinUrl,
          // Social links from parsed resume data
          parsedGithubUrl: candidate.parsedResumeData?.githubUrl ?? null,
          parsedLinkedinUrl: candidate.parsedResumeData?.linkedinUrl ?? null,
        };
      });

      // Sort by match score descending
      candidatesWithScores.sort((a, b) => b.matchScore - a.matchScore);

      console.log(
        `✅ Found ${candidatesWithScores.length} matching candidates`,
      );

      return {
        candidates: candidatesWithScores,
        total: candidatesWithScores.length,
      };
    }),
});
