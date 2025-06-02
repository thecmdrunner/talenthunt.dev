import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

// Configuration for embeddings
export const EMBEDDING_CONFIG = {
  MODEL: "text-embedding-3-small", // OpenAI's embedding model
  DIMENSIONS: 1536, // text-embedding-3-small produces 1536-dimensional vectors
  MAX_CHUNK_SIZE: 8000, // Max tokens per embedding call
} as const;

/**
 * Generate embeddings for text using AI SDK with OpenAI provider
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Clean and prepare text
    const cleanText = text.trim().slice(0, EMBEDDING_CONFIG.MAX_CHUNK_SIZE);

    if (!cleanText) {
      throw new Error("Empty text provided for embedding generation");
    }

    console.log(
      `📊 Generating embedding for text (${cleanText.length} chars)...`,
    );

    const result = await embed({
      model: openai.embedding(EMBEDDING_CONFIG.MODEL),
      value: cleanText,
    });

    console.log(
      `✅ Embedding generated: ${result.embedding.length} dimensions`,
    );
    return result.embedding;
  } catch (error) {
    console.error("❌ Failed to generate embedding:", error);
    throw new Error(
      `Failed to generate embedding: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vector dimensions must match");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i]! * b[i]!;
    normA += a[i]! * a[i]!;
    normB += b[i]! * b[i]!;
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

/**
 * Prepare resume text for embedding generation
 * Combines various resume fields into a comprehensive text representation
 */
export function prepareResumeTextForEmbedding(
  resumeText: string,
  parsedData?: {
    role?: string;
    skills?: string;
    experience?: string;
    location?: string;
    summary?: string;
  },
): string {
  const sections: string[] = [];

  // Add parsed structured data first (highest priority)
  if (parsedData?.role) {
    sections.push(`Role: ${parsedData.role}`);
  }

  if (parsedData?.skills) {
    sections.push(`Skills: ${parsedData.skills}`);
  }

  if (parsedData?.experience) {
    sections.push(`Experience: ${parsedData.experience}`);
  }

  if (parsedData?.location) {
    sections.push(`Location: ${parsedData.location}`);
  }

  if (parsedData?.summary) {
    sections.push(`Summary: ${parsedData.summary}`);
  }

  // Add the full resume text
  if (resumeText?.trim()) {
    sections.push(`Full Resume: ${resumeText.trim()}`);
  }

  const combinedText = sections.join("\n\n");

  // Truncate if too long
  return combinedText.slice(0, EMBEDDING_CONFIG.MAX_CHUNK_SIZE);
}

/**
 * Prepare job search query for embedding generation
 */
export function prepareJobQueryForEmbedding(jobAttributes: {
  role?: string;
  skills?: string[];
  location?: { country?: string; city?: string };
  experienceLevel?: string;
  description?: string;
}): string {
  const sections: string[] = [];

  if (jobAttributes.role) {
    sections.push(`Looking for: ${jobAttributes.role}`);
  }

  if (jobAttributes.skills && jobAttributes.skills.length > 0) {
    sections.push(`Required skills: ${jobAttributes.skills.join(", ")}`);
  }

  if (jobAttributes.location?.country || jobAttributes.location?.city) {
    const locationParts = [
      jobAttributes.location.city,
      jobAttributes.location.country,
    ].filter(Boolean);
    sections.push(`Location: ${locationParts.join(", ")}`);
  }

  if (jobAttributes.experienceLevel) {
    sections.push(`Experience level: ${jobAttributes.experienceLevel}`);
  }

  if (jobAttributes.description) {
    sections.push(`Description: ${jobAttributes.description}`);
  }

  return sections.join(". ");
}
