import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import fs from "fs/promises";
import { z } from "zod";

const data = {
  roles: [
    // All engineering roles
    "Software Engineer",
    "Data Scientist",
    "Mobile Developer",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "DevOps Engineer",
    "Product Engineer",
    "AI/ML Engineer",
    "GenAI Engineer",
  ],
  companies: "Faang, startups, India, EU and US based",
  location:
    "SF, NYC, CA, NY, London, Paris, Berlin, Amsterdam, Munich, Zurich, Vienna, Zurich, Munich, Berlin, Paris, London, NYC, SF, CA, NY, India",
  description: "We are looking for a Software Engineer to join our team.",
  skills: [
    "Typescript",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "Fastify",
    "MongoDB",
    "Supabase",
    "Vercel",
    "Netfify",
    "Tailwind CSS",
    "Shadcn UI",
    "Next.js",
    "Python",
    "Java",
    "C++",
    "C#",
    "C",
    "Go",
    "Rust",
    "Laravel PHP",
    "Ruby on Rails",
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "Dart",
    "Flask",
    // Observability & Monitoring
    "Grafana",
    "Prometheus",
    "New Relic",
    "Datadog",
    // AI/ML
    "TensorFlow",
    "PyTorch",
    "Keras",
    "OpenAI",
    "LangChain",
    // Cloud & DevOps
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "GCP",
    "Azure",
    // Databases
    "PostgreSQL",
    "Redis",
    "Elasticsearch",
    "Cassandra",
    "Neo4j",
    // Message Queues
    "Apache Kafka",
    "RabbitMQ",

    // Web Technologies
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Deno",
    "Bun",
    "Supabase",
    "Vercel",
    "Netlify",
    "Cloudflare",
    "Prisma",
    "tRPC",
    "GraphQL",
    "REST",
    "WebSockets",
    "WebAssembly",
    "Vite",
    "Webpack",
    "Rollup",
    "esbuild",
    "Turborepo",

    // Programming Languages
    "Rust",
    "Zig",
    "Go",
    "Elixir",
    "Haskell",
  ],
};

const result = streamObject({
  //   model: openrouter("sarvamai/sarvam-m:free"),
  model: openrouter("google/gemini-2.0-flash-001"),

  system: [
    "You are a helpful assistant that can extracts attributes from a job description for recruiter's ideal job requirement. Make sure to include all relevant attributes in the response.",

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
  ].join("\n"),

  schema: z.object({
    resumes: z
      .object({
        pastExperience: z
          .array(
            z.object({
              company: z.string().describe("Company name"),
              location: z.string().describe("Work location"),
              role: z.string().describe("Job title/role"),
              projects: z
                .array(
                  z.object({
                    name: z.string().describe("Project name"),
                    description: z.string().describe("Project description"),
                    link: z.string().describe("Project link (can be mock)"),
                  }),
                )
                .describe("Project details"),
              duration: z.object({
                startDate: z.string().describe("Start date of employment"),
                endDate: z.string().describe("End date of employment"),
              }),
            }),
          )
          .min(1)
          .max(4)
          .describe("Array of past work experiences"),

        education: z
          .object({
            degree: z.string().describe("Degree"),
            field: z.string().describe("Field of study"),
            institution: z.string().describe("Institution"),
            location: z.string().describe("Location"),
          })
          .describe("Education"),
      })
      .array(),
  }),

  messages: [
    {
      role: "user",
      content: `Generate 25 job descriptions for the following roles: ${JSON.stringify(data)}`,
    },
  ],
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}

const resumes = await result.object;

await fs.writeFile("dev-resumes.json", JSON.stringify(resumes, null, 2));
