CREATE TABLE "candidate_outreach" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiterId" uuid DEFAULT gen_random_uuid(),
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"searchQueryId" uuid DEFAULT gen_random_uuid(),
	"subject" varchar(300) NOT NULL,
	"emailContent" text NOT NULL,
	"personalizedContent" text,
	"status" varchar(20) DEFAULT 'draft',
	"sentAt" timestamp with time zone,
	"candidateResponse" text,
	"responseAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidate_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"currentStep" integer DEFAULT 0 NOT NULL,
	"firstName" varchar(100),
	"lastName" varchar(100),
	"title" varchar(200),
	"bio" text,
	"location" varchar(200),
	"timezone" varchar(50),
	"isRemoteOpen" boolean DEFAULT true,
	"workTypes" text[],
	"experienceLevel" varchar(20),
	"yearsOfExperience" integer,
	"expectedSalaryMin" integer,
	"expectedSalaryMax" integer,
	"salaryCurrency" varchar(3) DEFAULT 'USD',
	"resumeUrl" text,
	"resumeText" text,
	"parsedResumeData" jsonb,
	"verificationStatus" varchar(20) DEFAULT 'pending',
	"totalScore" integer DEFAULT 0,
	"skillScore" integer DEFAULT 0,
	"experienceScore" integer DEFAULT 0,
	"outreachCount" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"isOpenToWork" boolean DEFAULT true,
	"lastActiveAt" timestamp with time zone DEFAULT now(),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"institution" varchar(200) NOT NULL,
	"degree" varchar(200),
	"fieldOfStudy" varchar(200),
	"description" text,
	"startDate" date,
	"endDate" date,
	"gpa" varchar(20),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "featured_candidate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"category" varchar(100),
	"reason" text,
	"displayOrder" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"startDate" timestamp with time zone DEFAULT now() NOT NULL,
	"endDate" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"title" varchar(200) NOT NULL,
	"description" text,
	"longDescription" text,
	"githubUrl" varchar(500),
	"liveUrl" varchar(500),
	"demoUrl" varchar(500),
	"imageUrls" text[] DEFAULT '{}',
	"videoUrl" varchar(500),
	"technologies" text[] DEFAULT '{}',
	"startDate" date,
	"endDate" date,
	"isFeatured" boolean DEFAULT false,
	"isPublic" boolean DEFAULT true,
	"displayOrder" integer DEFAULT 0,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recruiter_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"currentStep" integer DEFAULT 0 NOT NULL,
	"firstName" varchar(100),
	"lastName" varchar(100),
	"title" varchar(200),
	"companyName" varchar(200),
	"companyUrl" varchar(500),
	"companySize" varchar(50),
	"industry" varchar(100),
	"phoneNumber" varchar(20),
	"isCompanyVerified" boolean DEFAULT false,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_query" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiterId" uuid DEFAULT gen_random_uuid(),
	"query" text NOT NULL,
	"filters" jsonb,
	"resultCount" integer DEFAULT 0,
	"processedQuery" text,
	"extractedSkills" text[] DEFAULT '{}',
	"extractedLocation" varchar(200),
	"extractedExperienceLevel" varchar(20),
	"extractedWorkType" text[] DEFAULT '{}',
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"category" varchar(50),
	"proficiency" varchar(20),
	"yearsOfExperience" integer,
	"isVerified" boolean DEFAULT false,
	"verificationSource" varchar(100),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"userId" text PRIMARY KEY NOT NULL,
	"githubUsername" varchar(256),
	"linkedinEmail" varchar(256),
	"linkedinUrl" varchar(500),
	"credits" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"question" text NOT NULL,
	"questionType" varchar(50),
	"expectedAnswer" text,
	"videoResponseUrl" varchar(500),
	"textResponse" text,
	"responseTimestamp" timestamp with time zone,
	"isAnswered" boolean DEFAULT false,
	"score" integer,
	"aiEvaluation" text,
	"humanReview" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"company" varchar(200) NOT NULL,
	"position" varchar(200) NOT NULL,
	"description" text,
	"startDate" date NOT NULL,
	"endDate" date,
	"isCurrent" boolean DEFAULT false,
	"location" varchar(200),
	"isRemote" boolean DEFAULT false,
	"technologies" text[] DEFAULT '{}',
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "candidate_outreach" ADD CONSTRAINT "candidate_outreach_recruiterId_recruiter_profile_id_fk" FOREIGN KEY ("recruiterId") REFERENCES "public"."recruiter_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_outreach" ADD CONSTRAINT "candidate_outreach_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_outreach" ADD CONSTRAINT "candidate_outreach_searchQueryId_search_query_id_fk" FOREIGN KEY ("searchQueryId") REFERENCES "public"."search_query"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_profile" ADD CONSTRAINT "candidate_profile_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_candidate" ADD CONSTRAINT "featured_candidate_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_profile" ADD CONSTRAINT "recruiter_profile_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_query" ADD CONSTRAINT "search_query_recruiterId_recruiter_profile_id_fk" FOREIGN KEY ("recruiterId") REFERENCES "public"."recruiter_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_question" ADD CONSTRAINT "verification_question_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "outreach_recruiter_id_idx" ON "candidate_outreach" USING btree ("recruiterId");--> statement-breakpoint
CREATE INDEX "outreach_candidate_id_idx" ON "candidate_outreach" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "outreach_status_idx" ON "candidate_outreach" USING btree ("status");--> statement-breakpoint
CREATE INDEX "candidate_user_id_idx" ON "candidate_profile" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "candidate_location_idx" ON "candidate_profile" USING btree ("location");--> statement-breakpoint
CREATE INDEX "candidate_experience_level_idx" ON "candidate_profile" USING btree ("experienceLevel");--> statement-breakpoint
CREATE INDEX "candidate_verification_status_idx" ON "candidate_profile" USING btree ("verificationStatus");--> statement-breakpoint
CREATE INDEX "candidate_total_score_idx" ON "candidate_profile" USING btree ("totalScore");--> statement-breakpoint
CREATE INDEX "candidate_is_active_idx" ON "candidate_profile" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "education_candidate_id_idx" ON "education" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "featured_candidate_id_idx" ON "featured_candidate" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "featured_category_idx" ON "featured_candidate" USING btree ("category");--> statement-breakpoint
CREATE INDEX "featured_active_idx" ON "featured_candidate" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "featured_display_order_idx" ON "featured_candidate" USING btree ("displayOrder");--> statement-breakpoint
CREATE INDEX "project_candidate_id_idx" ON "project" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "project_featured_idx" ON "project" USING btree ("isFeatured");--> statement-breakpoint
CREATE INDEX "project_display_order_idx" ON "project" USING btree ("displayOrder");--> statement-breakpoint
CREATE INDEX "recruiter_user_id_idx" ON "recruiter_profile" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "recruiter_company_name_idx" ON "recruiter_profile" USING btree ("companyName");--> statement-breakpoint
CREATE INDEX "search_recruiter_id_idx" ON "search_query" USING btree ("recruiterId");--> statement-breakpoint
CREATE INDEX "search_created_at_idx" ON "search_query" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "skill_candidate_id_idx" ON "skill" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "skill_name_idx" ON "skill" USING btree ("name");--> statement-breakpoint
CREATE INDEX "skill_category_idx" ON "skill" USING btree ("category");--> statement-breakpoint
CREATE INDEX "user_github_username_idx" ON "user" USING btree ("githubUsername");--> statement-breakpoint
CREATE INDEX "user_linkedin_email_idx" ON "user" USING btree ("linkedinEmail");--> statement-breakpoint
CREATE INDEX "verification_candidate_id_idx" ON "verification_question" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "verification_answered_idx" ON "verification_question" USING btree ("isAnswered");--> statement-breakpoint
CREATE INDEX "experience_candidate_id_idx" ON "work_experience" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "experience_company_idx" ON "work_experience" USING btree ("company");