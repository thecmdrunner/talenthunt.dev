import { db } from "@/server/db";
import { jobs } from "@/server/db/schema";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

const data = {
  roles: [
    // Developer roles
    "Senior Software Engineer",
    "Full Stack Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Mobile Developer",
    "DevOps Engineer",
    "AI/ML Engineer",
    "Data Engineer",
    "Site Reliability Engineer",
    "Platform Engineer",
    // Product roles
    "Product Manager",
    "Senior Product Manager",
    "Technical Product Manager",
    "Growth Product Manager",
    "Product Lead",
  ],
  b2bCompanies: [
    // US B2B
    "Salesforce",
    "ServiceNow",
    "Snowflake",
    "Databricks",
    "Datadog",
    "Twilio",
    "Stripe",
    "Slack",
    "Zoom",
    "HubSpot",
    "Atlassian",
    "Monday.com",
    "Notion",
    "Airtable",
    // India B2B
    "Zoho",
    "Freshworks",
    "Chargebee",
    "Postman",
    "BrowserStack",
    "CleverTap",
    "Hasura",
    "Yellow.ai",
  ],
  b2cCompanies: [
    // US B2C
    "Airbnb",
    "Uber",
    "DoorDash",
    "Instacart",
    "Netflix",
    "Spotify",
    "Pinterest",
    "Reddit",
    "Discord",
    "Robinhood",
    "Coinbase",
    // India B2C
    "Flipkart",
    "Swiggy",
    "Zomato",
    "Ola",
    "Paytm",
    "PhonePe",
    "CRED",
    "Nykaa",
    "Urban Company",
    "Meesho",
    "Razorpay",
  ],
  locations: {
    us: [
      "San Francisco, CA",
      "New York, NY",
      "Seattle, WA",
      "Austin, TX",
      "Boston, MA",
      "Denver, CO",
      "Remote (US)",
    ],
    india: [
      "Bengaluru",
      "Mumbai",
      "Delhi NCR",
      "Hyderabad",
      "Pune",
      "Chennai",
      "Remote (India)",
    ],
  },
};

const generatedJobs = await Promise.all(
  Array.from({ length: 100 }, async () => {
    const result = await generateObject({
      model: openrouter("google/gemini-2.0-flash-001"),

      system: `
You are a helpful assistant that generates realistic job postings for tech companies.

Guidelines:
- Create diverse, realistic job postings mixing developer and product manager roles
- Include both B2B and B2C companies from the provided lists
- Mix US and India locations appropriately
- Write compelling, professional job descriptions that reflect each company's culture
- Use realistic salary ranges based on location and seniority
- Include relevant tech stacks and methodologies for each company
- Product manager roles should mention metrics, user research, cross-functional work
- Developer roles should include specific technologies and engineering practices
`.trim(),

      schema: z.object({
        title: z.string(),
        description: z
          .string()
          .describe("2-3 paragraph overview of the role and team"),
        requirements: z
          .string()
          .describe("Bullet points of must-have qualifications"),
        responsibilities: z
          .string()
          .describe("Bullet points of key responsibilities"),

        location: z.string(),
        isRemote: z.boolean(),
        workType: z.enum([
          "full-time",
          "part-time",
          "contract",
          "freelance",
          "internship",
        ]),
        experienceLevel: z.enum([
          "entry",
          "junior",
          "mid",
          "senior",
          "lead",
          "principal",
        ]),

        salaryMin: z.number().describe("Minimum salary in USD"),
        salaryMax: z.number().describe("Maximum salary in USD"),
        salaryCurrency: z.literal("USD"),
        equity: z
          .string()
          .optional()
          .describe("Equity compensation if applicable"),
        benefits: z.array(z.string()).describe("List of benefits"),

        requiredSkills: z
          .array(z.string())
          .describe("Technical/professional skills required"),
        niceToHaveSkills: z
          .array(z.string())
          .describe("Optional but preferred skills"),
        yearsOfExperience: z
          .number()
          .describe("Minimum years of experience required"),

        companyName: z.string(),
        companyDescription: z.string().describe("Brief company overview"),

        status: z.literal("active"),
        isUrgent: z.boolean(),
        isFeatured: z.boolean(),
      }),

      messages: [
        {
          role: "user",
          content: `
Generate 30 diverse job postings with this distribution:
- 20 developer roles, 10 product manager roles
- Mix of B2B companies: ${data.b2bCompanies.join(", ")}
- Mix of B2C companies: ${data.b2cCompanies.join(", ")}
- Locations: Mix of ${data.locations.us.join(", ")} and ${data.locations.india.join(", ")}
- Vary experience levels from junior to principal
- Use realistic salary ranges (adjust for location)
- All should be full-time positions
- Make 5 of them urgent, 5 featured
`.trim(),
        },
      ],
    });

    return result.object;
  }),
);

console.log("\n\n=== Generated Jobs Summary ===");
console.log(`Total jobs: ${generatedJobs.length}`);

// Insert jobs into database
const jobsToInsert = generatedJobs.map((job) => ({
  ...job,
  publishedAt: new Date(),
  expiresAt: new Date(
    Date.now() + (30 + Math.floor(Math.random() * 60)) * 24 * 60 * 60 * 1000,
  ), // Random expiry between 1-3 months
}));

await db.insert(jobs).values(jobsToInsert);

console.log("\n✅ Successfully inserted job postings into database!");
