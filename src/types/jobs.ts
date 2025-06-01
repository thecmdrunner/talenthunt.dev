import { z } from "zod";

// Schema for job attribute extraction - same as build-query.ts
export const jobAttributesSchema = z.object({
  pastExperience: z
    .object({
      duration: z
        .object({
          years: z.number().nullish().describe("Years of experience"),
          filter: z
            .enum(["equal", "more than", "less than"])
            .nullish()
            .describe(
              "Filter for n years of experience. for example, if the requirement states more than 3 years of experience, use 'more than' filter.",
            ),
        })
        .nullish()
        .optional(),

      companies: z.array(z.string()).nullish().describe("Companies worked at"),

      roles: z.array(z.string()).nullish().describe("Roles in the past"),

      locations: z
        .array(z.string())
        .nullish()
        .describe("Countries like India, US, UK, etc."),
    })
    .nullish()
    .optional()
    .describe("Past experience"),

  newJob: z.object({
    role: z.string().nullish().describe("Role"),

    similarRoles: z
      .array(z.string())
      // .optional()
      .describe(`Suggest similar roles.`),

    gender: z.enum(["Male", "Female"]).nullish().describe("Gender"),

    location: z
      .object({
        type: z.enum(["on-site", "remote", "hybrid", "contract"]).nullish(),
        country: z.string().nullish(),
        city: z.string().nullish(),
      })
      .nullish()
      .optional(),

    // expectedSalary: z
    //   .object({
    //     min: z
    //       .number()
    //       .nullish()
    //       .describe("Expected Minimum salary annually, null if not specified"),
    //     max: z
    //       .number()
    //       .nullish()
    //       .describe("Expected Maximum salary annually, null if not specified"),
    //     currency: z
    //       .string()
    //       .nullish()
    //       .describe("Currency like 'USD', 'INR' etc."),
    //   })
    //   .nullish()
    //   .optional()
    //   .describe("Expected salary"),

    joiningNotice: z
      .object({
        duration: z.number().nullish().describe("Notice period duration"),
        unit: z
          .enum(["days", "weeks", "months"])
          .nullish()
          .describe("Time unit for notice period"),
        immediate: z
          .boolean()
          .nullish()
          .describe("Whether candidate can join immediately"),
      })
      .nullish()
      .optional()
      .describe("Joining notice period"),

    skills: z.array(z.string()).optional().describe("Skills"),
  }),

  education: z
    .object({
      degree: z.string().nullish().describe("Degree"),
      field: z.string().nullish().describe("Field of study"),
      institution: z.string().nullish().describe("Institution"),
      location: z.string().nullish().describe("Location"),
    })
    .nullish()
    .optional()
    .describe("Education"),
});

// Schema for job search preferences that matches the UI expectations
export const jobSearchPreferencesSchema = z.object({
  desiredRole: z.string().nullish(),
  similarRoles: z.array(z.string()).nullish(),
  requiredSkills: z.array(z.string()).nullish(),
  experienceLevel: z.string().nullish(),
  salaryRange: z
    .object({
      min: z.number().nullish(),
      max: z.number().nullish(),
      currency: z.string().nullish(),
    })
    .nullish(),
  locations: z.array(z.string()).nullish(),
  remotePreference: z.string().nullish(),
  companyPreferences: z
    .object({
      size: z.string().nullish(),
      industries: z.array(z.string()).nullish(),
    })
    .nullish(),
});

export type JobAttributes = z.infer<typeof jobAttributesSchema>;
export type JobSearchPreferences = z.infer<typeof jobSearchPreferencesSchema>;

export const sampleJobAttributes: JobAttributes = {
  newJob: {
    role: "Software Engineer",
    similarRoles: ["Software Engineer", "Product Engineer", "Data Scientist"],
    gender: "Male",
    location: {
      type: "on-site",
      country: "India",
      city: "New Delhi",
    },
    // expectedSalary: {
    //   min: 100000,
    //   max: 150000,
    //   currency: "INR",
    // },
    joiningNotice: {
      duration: 30,
      unit: "days",
      immediate: true,
    },
    skills: ["React", "Node.js", "MongoDB"],
  },
  pastExperience: {
    duration: {
      years: 3,
      filter: "more than",
    },
    companies: ["Google", "Microsoft", "Amazon"],
    roles: ["Software Engineer", "Product Engineer", "Data Scientist"],
    locations: ["India", "United States", "United Kingdom"],
  },
  education: {
    degree: "Bachelor's in Computer Science",
    field: "Computer Science",
    institution: "University of California, Los Angeles",
    location: "Los Angeles, California",
  },
};
