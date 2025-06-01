import { parsedResumeDataSchema } from "@/types/resume";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";

const resumeUrl =
  "https://oxsvqazfnvlbysyadhcs.supabase.co/storage/v1/object/public/resumes/user_2xonsyoTLKUBd3VVioz0hDlSZ7j/1748776603978_resume.pdf";

const resumeBlob = await fetch(resumeUrl).then((res) => res.arrayBuffer());
const pdfBuffer = Buffer.from(resumeBlob);

// Generate object using either extracted text or PDF file
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

process.exit(0);
