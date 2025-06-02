ALTER TABLE "candidate_profile" ADD COLUMN "resumeEmbedding" text;--> statement-breakpoint
ALTER TABLE "candidate_profile" ADD COLUMN "resumeEmbeddingModel" varchar(100) DEFAULT 'text-embedding-3-small';--> statement-breakpoint
ALTER TABLE "candidate_profile" ADD COLUMN "resumeEmbeddingCreatedAt" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "candidate_resume_embedding_idx" ON "candidate_profile" USING btree ("resumeEmbeddingCreatedAt");