import { parsedResumeDataSchema } from "@/types/resume";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import PDFParser from "pdf2json";

const resumeUrl =
  "https://oxsvqazfnvlbysyadhcs.supabase.co/storage/v1/object/public/resumes/user_2xonsyoTLKUBd3VVioz0hDlSZ7j/1748776603978_resume.pdf";

// Extract text from PDF using pdf2json
async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
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
                      extractedText += decodeURIComponent(run.T) + " ";
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
const resumeBlob = await fetch(resumeUrl).then((res) => res.arrayBuffer());
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

process.exit(0);
