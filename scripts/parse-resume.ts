import { openrouter } from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import fs from "fs";
import { z } from "zod";

const result = streamObject({
  model: openrouter("google/gemini-2.0-flash-001"),
  system:
    "You are a helpful assistant that can parse resumes and extract the following information: name, email, phone, address, education, experience, skills, and projects.",

  schema: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    education: z.string(),
  }),
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is the file about?" },
        {
          type: "file",
          mimeType: "application/pdf",
          data: fs.readFileSync("/Users/thecmdrunner/Downloads/Pranav CV.pdf"),
          filename: "Pranav CV.pdf", // optional, not used by all providers
        },
      ],
    },
  ],
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
