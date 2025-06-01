CREATE TABLE "job_application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jobId" uuid DEFAULT gen_random_uuid(),
	"candidateId" uuid DEFAULT gen_random_uuid(),
	"coverLetter" text,
	"customResumeUrl" varchar(500),
	"status" varchar(20) DEFAULT 'pending',
	"recruiterNotes" text,
	"rating" integer,
	"interviewScheduledAt" timestamp with time zone,
	"interviewNotes" text,
	"lastContactAt" timestamp with time zone,
	"nextFollowUpAt" timestamp with time zone,
	"appliedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewedAt" timestamp with time zone,
	"rejectedAt" timestamp with time zone,
	"hiredAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiterId" uuid DEFAULT gen_random_uuid(),
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"requirements" text,
	"responsibilities" text,
	"location" varchar(200),
	"isRemote" boolean DEFAULT false,
	"workType" varchar(20) NOT NULL,
	"experienceLevel" varchar(20),
	"salaryMin" integer,
	"salaryMax" integer,
	"salaryCurrency" varchar(3) DEFAULT 'USD',
	"equity" varchar(100),
	"benefits" text[] DEFAULT '{}',
	"requiredSkills" text[] DEFAULT '{}',
	"niceToHaveSkills" text[] DEFAULT '{}',
	"yearsOfExperience" integer,
	"applicationDeadline" timestamp with time zone,
	"maxApplications" integer,
	"autoReject" boolean DEFAULT false,
	"status" varchar(20) DEFAULT 'draft',
	"applicationCount" integer DEFAULT 0,
	"viewCount" integer DEFAULT 0,
	"companyName" varchar(200),
	"companyLogo" varchar(500),
	"companyDescription" text,
	"slug" varchar(300),
	"isUrgent" boolean DEFAULT false,
	"isFeatured" boolean DEFAULT false,
	"publishedAt" timestamp with time zone,
	"expiresAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_jobId_job_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_candidateId_candidate_profile_id_fk" FOREIGN KEY ("candidateId") REFERENCES "public"."candidate_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_recruiterId_recruiter_profile_id_fk" FOREIGN KEY ("recruiterId") REFERENCES "public"."recruiter_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_application_job_id_idx" ON "job_application" USING btree ("jobId");--> statement-breakpoint
CREATE INDEX "job_application_candidate_id_idx" ON "job_application" USING btree ("candidateId");--> statement-breakpoint
CREATE INDEX "job_application_status_idx" ON "job_application" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_application_applied_at_idx" ON "job_application" USING btree ("appliedAt");--> statement-breakpoint
CREATE INDEX "job_application_unique_idx" ON "job_application" USING btree ("jobId","candidateId");--> statement-breakpoint
CREATE INDEX "job_recruiter_id_idx" ON "job" USING btree ("recruiterId");--> statement-breakpoint
CREATE INDEX "job_status_idx" ON "job" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_location_idx" ON "job" USING btree ("location");--> statement-breakpoint
CREATE INDEX "job_work_type_idx" ON "job" USING btree ("workType");--> statement-breakpoint
CREATE INDEX "job_experience_level_idx" ON "job" USING btree ("experienceLevel");--> statement-breakpoint
CREATE INDEX "job_published_at_idx" ON "job" USING btree ("publishedAt");--> statement-breakpoint
CREATE INDEX "job_expires_at_idx" ON "job" USING btree ("expiresAt");--> statement-breakpoint
CREATE INDEX "job_featured_idx" ON "job" USING btree ("isFeatured");--> statement-breakpoint
CREATE INDEX "job_slug_idx" ON "job" USING btree ("slug");