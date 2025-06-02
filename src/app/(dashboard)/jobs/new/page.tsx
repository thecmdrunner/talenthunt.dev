"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import * as z from "zod";

const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required").max(200),
  location: z.string().min(1, "Location is required").max(200),
  experienceLevel: z.enum([
    "entry",
    "junior",
    "mid",
    "senior",
    "lead",
    "principal",
  ]),
  workType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ]),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  salaryCurrency: z.string().default("USD"),
  isRemote: z.boolean().default(false),
  urgency: z.string().max(500),
  description: z
    .string()
    .min(50, "Job description must be at least 50 characters")
    .max(5000),
  responsibilities: z.string().max(3000).optional(),
  requirements: z.string().max(3000).optional(),
  requiredSkills: z
    .array(z.string())
    .min(1, "At least one required skill is needed"),
  niceToHaveSkills: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  companyName: z.string().max(200).optional(),
  companyDescription: z.string().max(1000).optional(),
  applicationDeadline: z.string().optional(),
  maxApplications: z.number().min(1).max(1000).optional(),
  equity: z.string().max(100).optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "principal", label: "Principal" },
];

const workTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const suggestedSkills = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "Kubernetes",
  "LangChain",
  "RAG",
  "Machine Learning",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Next.js",
  "Vue.js",
  "Angular",
  "Go",
  "Rust",
  "Java",
  "C++",
  "DevOps",
  "CI/CD",
  "Terraform",
];

const commonBenefits = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401(k)",
  "Stock Options",
  "Remote Work",
  "Flexible Hours",
  "Unlimited PTO",
  "Learning Budget",
  "Gym Membership",
  "Free Meals",
  "Commuter Benefits",
];

export default function NewJobPage() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [niceToHaveInput, setNiceToHaveInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema) as Resolver<JobFormValues>,
    defaultValues: {
      title: "",
      location: "",
      experienceLevel: "mid",
      workType: "full-time",
      salaryCurrency: "USD",
      isRemote: false,
      urgency: "",
      description: "",
      responsibilities: "",
      requirements: "",
      requiredSkills: [],
      niceToHaveSkills: [],
      benefits: [],
      companyName: "",
      companyDescription: "",
      equity: "",
      yearsOfExperience: 3,
      applicationDeadline: "",
      maxApplications: 1000,
      salaryMax: 160000,
      salaryMin: 120000,
    } satisfies JobFormValues,
  });

  const { watch, setValue } = form;
  const requiredSkills = watch("requiredSkills") || [];
  const niceToHaveSkills = watch("niceToHaveSkills") || [];
  const benefits = watch("benefits") || [];

  const addSkill = (skill: string, type: "required" | "niceToHave") => {
    const currentSkills =
      type === "required" ? requiredSkills : niceToHaveSkills;
    if (!currentSkills.includes(skill)) {
      setValue(type === "required" ? "requiredSkills" : "niceToHaveSkills", [
        ...currentSkills,
        skill,
      ]);
    }
    if (type === "required") {
      setSkillInput("");
    } else {
      setNiceToHaveInput("");
    }
  };

  const removeSkill = (skill: string, type: "required" | "niceToHave") => {
    const currentSkills =
      type === "required" ? requiredSkills : niceToHaveSkills;
    setValue(
      type === "required" ? "requiredSkills" : "niceToHaveSkills",
      currentSkills.filter((s) => s !== skill),
    );
  };

  const addBenefit = (benefit: string) => {
    if (!benefits.includes(benefit)) {
      setValue("benefits", [...benefits, benefit]);
    }
    setBenefitInput("");
  };

  const removeBenefit = (benefit: string) => {
    setValue(
      "benefits",
      benefits.filter((b) => b !== benefit),
    );
  };

  const onSubmit = (data: JobFormValues) => {
    console.log(data);
    // Here you would typically send the data to your API
    // For now, let's just navigate back to jobs page
    router.push("/jobs");
  };

  return (
    <div className="relative min-h-screen">
      {/* Geometric Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Geometric Shapes */}
        <div className="absolute top-10 -left-20 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute top-40 -right-10 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(96,165,250,0.15) 1px, transparent 1px),
                linear-gradient(rgba(96,165,250,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-7xl flex-col-reverse justify-between gap-x-3 gap-y-6 pb-40 lg:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-3xl space-y-8"
          >
            {/* Section 1: Basic Job Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Basic Job Information
                </h2>
                <p className="text-white/70">
                  Define the core details of the position
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Senior Frontend Developer"
                            {...field}
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., San Francisco, CA or Remote"
                            {...field}
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Experience Level
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-400/30 bg-blue-700/30 text-white">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-blue-400/30 bg-blue-800/95 text-white backdrop-blur-xl">
                            {experienceLevels.map((level) => (
                              <SelectItem
                                key={level.value}
                                value={level.value}
                                className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                              >
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Employment Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-400/30 bg-blue-700/30 text-white">
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-blue-400/30 bg-blue-800/95 text-white backdrop-blur-xl">
                            {workTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Years of Experience Required
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="3"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isRemote"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-y-0 space-x-3 pt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-blue-400/50 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            Remote Position
                          </FormLabel>
                          <FormDescription className="text-white/60">
                            Candidates can work from anywhere
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Job Details */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Job Details
                </h2>
                <p className="text-white/70">
                  Describe the role and what you&apos;re looking for
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                          className="min-h-[150px] border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Minimum 50 characters required
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Key Responsibilities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the main responsibilities and day-to-day tasks..."
                          className="min-h-[120px] border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Requirements & Qualifications
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the must-have qualifications, certifications, or experience..."
                          className="min-h-[120px] border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 3: Technical Requirements */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Technical Requirements
                </h2>
                <p className="text-white/70">
                  Specify the technical skills and technologies needed
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                {/* Required Skills */}
                <div className="space-y-4">
                  <Label className="text-white">
                    Required Skills & Technologies
                  </Label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a required skill or technology"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && skillInput.trim()) {
                          e.preventDefault();
                          addSkill(skillInput.trim(), "required");
                        }
                      }}
                      className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        skillInput.trim() &&
                        addSkill(skillInput.trim(), "required")
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {requiredSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="default"
                          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, "required")}
                            className="ml-2 hover:text-blue-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-sm text-white/70">
                      Suggested skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((skill) => !requiredSkills.includes(skill))
                        .slice(0, 12)
                        .map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="cursor-pointer hover:bg-slate-100"
                            onClick={() => addSkill(skill, "required")}
                          >
                            + {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Nice-to-Have Skills */}
                <div className="space-y-4">
                  <Label className="text-white">Nice-to-Have Skills</Label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a nice-to-have skill"
                      value={niceToHaveInput}
                      onChange={(e) => setNiceToHaveInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && niceToHaveInput.trim()) {
                          e.preventDefault();
                          addSkill(niceToHaveInput.trim(), "niceToHave");
                        }
                      }}
                      className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        niceToHaveInput.trim() &&
                        addSkill(niceToHaveInput.trim(), "niceToHave")
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {niceToHaveSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {niceToHaveSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, "niceToHave")}
                            className="ml-2 hover:text-purple-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Compensation & Benefits */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Compensation & Benefits
                </h2>
                <p className="text-white/70">
                  Define the compensation package and perks
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white">Salary Range</Label>
                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name="salaryMin"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="120000"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined,
                                  )
                                }
                                className="border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span className="text-white/70">-</span>
                      <FormField
                        control={form.control}
                        name="salaryMax"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="160000"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined,
                                  )
                                }
                                className="border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="equity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Equity Range (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 0.1% - 0.5%"
                            {...field}
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <Label className="text-white">Benefits & Perks</Label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a benefit or perk"
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && benefitInput.trim()) {
                          e.preventDefault();
                          addBenefit(benefitInput.trim());
                        }
                      }}
                      className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        benefitInput.trim() && addBenefit(benefitInput.trim())
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {benefits.map((benefit) => (
                        <Badge
                          key={benefit}
                          variant="secondary"
                          className="bg-green-100 text-green-800 hover:bg-green-100"
                        >
                          {benefit}
                          <button
                            type="button"
                            onClick={() => removeBenefit(benefit)}
                            className="ml-2 hover:text-green-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-sm text-white/70">
                      Common benefits:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {commonBenefits
                        .filter((benefit) => !benefits.includes(benefit))
                        .slice(0, 8)
                        .map((benefit) => (
                          <Badge
                            key={benefit}
                            variant="secondary"
                            className="cursor-pointer hover:bg-slate-100"
                            onClick={() => addBenefit(benefit)}
                          >
                            + {benefit}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Company Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Company Information
                </h2>
                <p className="text-white/70">
                  Tell candidates about your company
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
                          {...field}
                          className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Company Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your company, mission, and culture..."
                          className="min-h-[100px] border-blue-400/30 bg-blue-700/30 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Help candidates understand your company better
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 6: Application Settings */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  Application Settings
                </h2>
                <p className="text-white/70">
                  Control how candidates apply to this position
                </p>
              </div>

              <div className="space-y-6 rounded-xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Application Deadline
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            id="applicationDeadline"
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20 [&::-webkit-calendar-picker-indicator]:invert"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxApplications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Maximum Applications
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 100"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              )
                            }
                            className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                          />
                        </FormControl>
                        <FormDescription className="text-white/60">
                          Limit the number of applications you receive
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Hiring Urgency
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Immediate need, flexible timeline, etc."
                          {...field}
                          className="border-blue-400/30 bg-blue-100/0 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                        />
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Let candidates know how urgent this hire is
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant={"secondary"}
                className="group relative max-w-sm flex-1 overflow-hidden rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Post Job
                </span>
              </Button>
            </div>
          </form>
        </Form>

        {/* AI Tip */}
        <div className="sticky top-0 right-0 z-10">
          <div className="w-max rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <h3 className="text-base font-semibold text-white">
                Tips for Better Job Posts
              </h3>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-blue-400/30" />

              {/* Roadmap items */}
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Technical Requirements",
                    description: "State the technical experience required",
                  },
                  {
                    number: "02",
                    title: "Soft Skills",
                    description: "Include soft skills",
                  },
                  {
                    number: "03",
                    title: "Experience Level",
                    description:
                      "Prefer experience level over years of experience",
                  },
                  {
                    number: "04",
                    title: "Daily Responsibilities",
                    description:
                      "List key responsibilities and day-to-day tasks",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    {/* Number circle */}
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white">
                      {item.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h4 className="mb-1 text-sm font-medium text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
