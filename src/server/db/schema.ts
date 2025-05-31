// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `100x-hack-2025_${name}`);

// User types
export const USER_TYPES = ["candidate", "recruiter"] as const;
export const VERIFICATION_STATUS = ["pending", "approved", "rejected"] as const;
export const WORK_TYPE = [
  "full-time",
  "part-time",
  "contract",
  "freelance",
  "internship",
] as const;
export const EXPERIENCE_LEVEL = [
  "entry",
  "junior",
  "mid",
  "senior",
  "lead",
  "principal",
] as const;
export const SKILL_PROFICIENCY = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const userProfiles = createTable(
  "user",
  (d) => ({
    userId: d.text().primaryKey(),
    email: d.varchar({ length: 256 }).notNull().unique(),
    userType: d
      .varchar({ length: 20 })
      .notNull()
      .$type<(typeof USER_TYPES)[number]>(),

    // Verification badges
    linkedinVerified: d.boolean().default(false).notNull(),
    githubVerified: d.boolean().default(false).notNull(),

    // Social profiles
    githubUsername: d.varchar({ length: 256 }),
    linkedinEmail: d.varchar({ length: 256 }),
    linkedinUrl: d.varchar({ length: 500 }),

    // Pro subscription
    proExpiresAt: d
      .timestamp({ withTimezone: true })
      .default(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 1 month from creation

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_email_idx").on(t.email),
    index("user_type_idx").on(t.userType),
    index("user_github_username_idx").on(t.githubUsername),
    index("user_linkedin_email_idx").on(t.linkedinEmail),
  ],
);

export const candidateProfiles = createTable(
  "candidate_profile",
  (d) => ({
    id: d.text().primaryKey(),
    userId: d
      .text()
      .notNull()
      .references(() => userProfiles.userId),

    // Basic info
    firstName: d.varchar({ length: 100 }),
    lastName: d.varchar({ length: 100 }),
    title: d.varchar({ length: 200 }), // e.g., "Senior Full Stack Engineer"
    bio: d.text(),

    // Location
    location: d.varchar({ length: 200 }),
    timezone: d.varchar({ length: 50 }),
    isRemoteOpen: d.boolean().default(true),

    // Work preferences
    workTypes: d.text().array(), // ['full-time', 'contract']
    experienceLevel: d
      .varchar({ length: 20 })
      .$type<(typeof EXPERIENCE_LEVEL)[number]>(),
    yearsOfExperience: d.integer(),
    expectedSalaryMin: d.integer(),
    expectedSalaryMax: d.integer(),
    salaryCurrency: d.varchar({ length: 3 }).default("USD"),

    // Resume & verification
    resumeUrl: d.varchar({ length: 500 }),
    resumeText: d.text(), // Extracted text from resume
    verificationStatus: d
      .varchar({ length: 20 })
      .default("pending")
      .$type<(typeof VERIFICATION_STATUS)[number]>(),

    // Scoring
    totalScore: d.integer().default(0),
    skillScore: d.integer().default(0),
    experienceScore: d.integer().default(0),
    outreachCount: d.integer().default(0),

    // Availability
    isActive: d.boolean().default(true),
    isOpenToWork: d.boolean().default(true),
    lastActiveAt: d.timestamp({ withTimezone: true }).defaultNow(),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("candidate_user_id_idx").on(t.userId),
    index("candidate_location_idx").on(t.location),
    index("candidate_experience_level_idx").on(t.experienceLevel),
    index("candidate_verification_status_idx").on(t.verificationStatus),
    index("candidate_total_score_idx").on(t.totalScore),
    index("candidate_is_active_idx").on(t.isActive),
  ],
);

export const recruiterProfiles = createTable(
  "recruiter_profile",
  (d) => ({
    id: d.text().primaryKey(),
    userId: d
      .text()
      .notNull()
      .references(() => userProfiles.userId),

    // Basic info
    firstName: d.varchar({ length: 100 }),
    lastName: d.varchar({ length: 100 }),
    title: d.varchar({ length: 200 }), // e.g., "Senior Talent Acquisition Specialist"

    // Company info
    companyName: d.varchar({ length: 200 }),
    companyUrl: d.varchar({ length: 500 }),
    companySize: d.varchar({ length: 50 }), // e.g., "11-50", "51-200"
    industry: d.varchar({ length: 100 }),

    // Contact
    phoneNumber: d.varchar({ length: 20 }),

    // Verification
    isCompanyVerified: d.boolean().default(false),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("recruiter_user_id_idx").on(t.userId),
    index("recruiter_company_name_idx").on(t.companyName),
  ],
);

export const projects = createTable(
  "project",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    title: d.varchar({ length: 200 }).notNull(),
    description: d.text(),
    longDescription: d.text(),

    // Links
    githubUrl: d.varchar({ length: 500 }),
    liveUrl: d.varchar({ length: 500 }),
    demoUrl: d.varchar({ length: 500 }),

    // Media
    imageUrls: d.text().array().default([]),
    videoUrl: d.varchar({ length: 500 }),

    // Technologies
    technologies: d.text().array().default([]),

    // Dates
    startDate: d.date(),
    endDate: d.date(),

    // Status
    isFeatured: d.boolean().default(false),
    isPublic: d.boolean().default(true),
    displayOrder: d.integer().default(0),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: d
      .timestamp({ withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("project_candidate_id_idx").on(t.candidateId),
    index("project_featured_idx").on(t.isFeatured),
    index("project_display_order_idx").on(t.displayOrder),
  ],
);

export const skills = createTable(
  "skill",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    name: d.varchar({ length: 100 }).notNull(),
    category: d.varchar({ length: 50 }), // e.g., "programming", "framework", "tool", "soft-skill"
    proficiency: d
      .varchar({ length: 20 })
      .$type<(typeof SKILL_PROFICIENCY)[number]>(),
    yearsOfExperience: d.integer(),

    // Verification
    isVerified: d.boolean().default(false),
    verificationSource: d.varchar({ length: 100 }), // e.g., "github", "certification", "manual"

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("skill_candidate_id_idx").on(t.candidateId),
    index("skill_name_idx").on(t.name),
    index("skill_category_idx").on(t.category),
  ],
);

export const workExperience = createTable(
  "work_experience",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    company: d.varchar({ length: 200 }).notNull(),
    position: d.varchar({ length: 200 }).notNull(),
    description: d.text(),

    // Dates
    startDate: d.date().notNull(),
    endDate: d.date(),
    isCurrent: d.boolean().default(false),

    // Location
    location: d.varchar({ length: 200 }),
    isRemote: d.boolean().default(false),

    // Technologies used
    technologies: d.text().array().default([]),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("experience_candidate_id_idx").on(t.candidateId),
    index("experience_company_idx").on(t.company),
  ],
);

export const education = createTable(
  "education",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    institution: d.varchar({ length: 200 }).notNull(),
    degree: d.varchar({ length: 200 }),
    fieldOfStudy: d.varchar({ length: 200 }),
    description: d.text(),

    // Dates
    startDate: d.date(),
    endDate: d.date(),

    // GPA/Grade
    gpa: d.varchar({ length: 20 }),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [index("education_candidate_id_idx").on(t.candidateId)],
);

export const verificationQuestions = createTable(
  "verification_question",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    question: d.text().notNull(),
    questionType: d.varchar({ length: 50 }), // e.g., "technical", "experience", "project"
    expectedAnswer: d.text(), // Optional for AI comparison

    // Response
    videoResponseUrl: d.varchar({ length: 500 }),
    textResponse: d.text(),
    responseTimestamp: d.timestamp({ withTimezone: true }),

    // Evaluation
    isAnswered: d.boolean().default(false),
    score: d.integer(), // 1-10
    aiEvaluation: d.text(),
    humanReview: d.text(),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("verification_candidate_id_idx").on(t.candidateId),
    index("verification_answered_idx").on(t.isAnswered),
  ],
);

export const searchQueries = createTable(
  "search_query",
  (d) => ({
    id: d.text().primaryKey(),
    recruiterId: d
      .text()
      .notNull()
      .references(() => recruiterProfiles.id),

    query: d.text().notNull(),
    filters: d.jsonb(), // Store complex filter objects
    resultCount: d.integer().default(0),

    // AI processing
    processedQuery: d.text(), // LLM processed version
    extractedSkills: d.text().array().default([]),
    extractedLocation: d.varchar({ length: 200 }),
    extractedExperienceLevel: d.varchar({ length: 20 }),
    extractedWorkType: d.text().array().default([]),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("search_recruiter_id_idx").on(t.recruiterId),
    index("search_created_at_idx").on(t.createdAt),
  ],
);

export const candidateOutreach = createTable(
  "candidate_outreach",
  (d) => ({
    id: d.text().primaryKey(),
    recruiterId: d
      .text()
      .notNull()
      .references(() => recruiterProfiles.id),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),
    searchQueryId: d.text().references(() => searchQueries.id),

    // Email details
    subject: d.varchar({ length: 300 }).notNull(),
    emailContent: d.text().notNull(),
    personalizedContent: d.text(), // AI-generated personalized section

    // Status
    status: d.varchar({ length: 20 }).default("draft"), // draft, sent, delivered, opened, replied
    sentAt: d.timestamp({ withTimezone: true }),

    // Response tracking
    candidateResponse: d.text(),
    responseAt: d.timestamp({ withTimezone: true }),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("outreach_recruiter_id_idx").on(t.recruiterId),
    index("outreach_candidate_id_idx").on(t.candidateId),
    index("outreach_status_idx").on(t.status),
  ],
);

export const featuredCandidates = createTable(
  "featured_candidate",
  (d) => ({
    id: d.text().primaryKey(),
    candidateId: d
      .text()
      .notNull()
      .references(() => candidateProfiles.id),

    category: d.varchar({ length: 100 }), // e.g., "frontend", "backend", "ai-ml", "devops"
    reason: d.text(), // Why they're featured

    // Display
    displayOrder: d.integer().default(0),
    isActive: d.boolean().default(true),

    // Duration
    startDate: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    endDate: d.timestamp({ withTimezone: true }),

    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("featured_candidate_id_idx").on(t.candidateId),
    index("featured_category_idx").on(t.category),
    index("featured_active_idx").on(t.isActive),
    index("featured_display_order_idx").on(t.displayOrder),
  ],
);

// Relations
export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  candidateProfile: one(candidateProfiles, {
    fields: [userProfiles.userId],
    references: [candidateProfiles.userId],
  }),
  recruiterProfile: one(recruiterProfiles, {
    fields: [userProfiles.userId],
    references: [recruiterProfiles.userId],
  }),
}));

export const candidateProfilesRelations = relations(
  candidateProfiles,
  ({ one, many }) => ({
    user: one(userProfiles, {
      fields: [candidateProfiles.userId],
      references: [userProfiles.userId],
    }),
    projects: many(projects),
    skills: many(skills),
    workExperience: many(workExperience),
    education: many(education),
    verificationQuestions: many(verificationQuestions),
    outreach: many(candidateOutreach),
    featured: many(featuredCandidates),
  }),
);

export const recruiterProfilesRelations = relations(
  recruiterProfiles,
  ({ one, many }) => ({
    user: one(userProfiles, {
      fields: [recruiterProfiles.userId],
      references: [userProfiles.userId],
    }),
    searchQueries: many(searchQueries),
    outreach: many(candidateOutreach),
  }),
);

export const projectsRelations = relations(projects, ({ one }) => ({
  candidate: one(candidateProfiles, {
    fields: [projects.candidateId],
    references: [candidateProfiles.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  candidate: one(candidateProfiles, {
    fields: [skills.candidateId],
    references: [candidateProfiles.id],
  }),
}));

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
  candidate: one(candidateProfiles, {
    fields: [workExperience.candidateId],
    references: [candidateProfiles.id],
  }),
}));

export const educationRelations = relations(education, ({ one }) => ({
  candidate: one(candidateProfiles, {
    fields: [education.candidateId],
    references: [candidateProfiles.id],
  }),
}));

export const verificationQuestionsRelations = relations(
  verificationQuestions,
  ({ one }) => ({
    candidate: one(candidateProfiles, {
      fields: [verificationQuestions.candidateId],
      references: [candidateProfiles.id],
    }),
  }),
);

export const searchQueriesRelations = relations(
  searchQueries,
  ({ one, many }) => ({
    recruiter: one(recruiterProfiles, {
      fields: [searchQueries.recruiterId],
      references: [recruiterProfiles.id],
    }),
    outreach: many(candidateOutreach),
  }),
);

export const candidateOutreachRelations = relations(
  candidateOutreach,
  ({ one }) => ({
    recruiter: one(recruiterProfiles, {
      fields: [candidateOutreach.recruiterId],
      references: [recruiterProfiles.id],
    }),
    candidate: one(candidateProfiles, {
      fields: [candidateOutreach.candidateId],
      references: [candidateProfiles.id],
    }),
    searchQuery: one(searchQueries, {
      fields: [candidateOutreach.searchQueryId],
      references: [searchQueries.id],
    }),
  }),
);

export const featuredCandidatesRelations = relations(
  featuredCandidates,
  ({ one }) => ({
    candidate: one(candidateProfiles, {
      fields: [featuredCandidates.candidateId],
      references: [candidateProfiles.id],
    }),
  }),
);
