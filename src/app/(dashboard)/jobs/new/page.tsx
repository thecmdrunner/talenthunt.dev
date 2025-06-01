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
import { Plus, Search, X } from "lucide-react";
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
    <div className="min-h-screen">
      <div className="relative flex w-full max-w-7xl flex-col-reverse justify-between gap-x-3 gap-y-6 pb-40 lg:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-3xl space-y-8"
          >
            {/* Section 1: Basic Job Information */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-slate-900">
                  Basic Job Information
                </h2>
                <p className="text-sm text-slate-600">
                  Define the core details of the position
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Job Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Senior Frontend Developer"
                            {...field}
                            className="border-slate-200 bg-white"
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
                        <FormLabel className="text-slate-700">
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., San Francisco, CA or Remote"
                            {...field}
                            className="border-slate-200 bg-white"
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
                        <FormLabel className="text-slate-700">
                          Experience Level
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-200 bg-white">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
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
                        <FormLabel className="text-slate-700">
                          Employment Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-200 bg-white">
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {workTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
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
                        <FormLabel className="text-slate-700">
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
                            className="border-slate-200 bg-white"
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
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-slate-700">
                            Remote Position
                          </FormLabel>
                          <FormDescription>
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
                <h2 className="text-xl font-semibold text-slate-900">
                  Job Details
                </h2>
                <p className="text-sm text-slate-600">
                  Describe the role and what you&apos;re looking for
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                          className="min-h-[150px] border-slate-200 bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
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
                      <FormLabel className="text-slate-700">
                        Key Responsibilities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the main responsibilities and day-to-day tasks..."
                          className="min-h-[120px] border-slate-200 bg-white"
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
                      <FormLabel className="text-slate-700">
                        Requirements & Qualifications
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List the must-have qualifications, certifications, or experience..."
                          className="min-h-[120px] border-slate-200 bg-white"
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
                <h2 className="text-xl font-semibold text-slate-900">
                  Technical Requirements
                </h2>
                <p className="text-sm text-slate-600">
                  Specify the technical skills and technologies needed
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                {/* Required Skills */}
                <div className="space-y-4">
                  <Label className="text-slate-700">
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
                      className="border-slate-200 bg-white"
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
                    <p className="mb-2 text-sm text-slate-600">
                      Suggested skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((skill) => !requiredSkills.includes(skill))
                        .slice(0, 12)
                        .map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
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
                  <Label className="text-slate-700">Nice-to-Have Skills</Label>

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
                      className="border-slate-200 bg-white"
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
                <h2 className="text-xl font-semibold text-slate-900">
                  Compensation & Benefits
                </h2>
                <p className="text-sm text-slate-600">
                  Define the compensation package and perks
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Salary Range</Label>
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
                                className="border-slate-200 bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span className="text-slate-500">-</span>
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
                                className="border-slate-200 bg-white"
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
                        <FormLabel className="text-slate-700">
                          Equity Range (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 0.1% - 0.5%"
                            {...field}
                            className="border-slate-200 bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <Label className="text-slate-700">Benefits & Perks</Label>

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
                      className="border-slate-200 bg-white"
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
                    <p className="mb-2 text-sm text-slate-600">
                      Common benefits:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {commonBenefits
                        .filter((benefit) => !benefits.includes(benefit))
                        .slice(0, 8)
                        .map((benefit) => (
                          <Badge
                            key={benefit}
                            variant="outline"
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
                <h2 className="text-xl font-semibold text-slate-900">
                  Company Information
                </h2>
                <p className="text-sm text-slate-600">
                  Tell candidates about your company
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
                          {...field}
                          className="border-slate-200 bg-white"
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
                      <FormLabel className="text-slate-700">
                        Company Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your company, mission, and culture..."
                          className="min-h-[100px] border-slate-200 bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
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
                <h2 className="text-xl font-semibold text-slate-900">
                  Application Settings
                </h2>
                <p className="text-sm text-slate-600">
                  Control how candidates apply to this position
                </p>
              </div>

              <div className="border-border space-y-6 rounded-lg border bg-slate-50 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Application Deadline
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="border-slate-200 bg-white"
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
                        <FormLabel className="text-slate-700">
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
                            className="border-slate-200 bg-white"
                          />
                        </FormControl>
                        <FormDescription>
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
                      <FormLabel className="text-slate-700">
                        Hiring Urgency
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Immediate need, flexible timeline, etc."
                          {...field}
                          className="border-slate-200 bg-white"
                        />
                      </FormControl>
                      <FormDescription>
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
                className="flex-1 border border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
              >
                Find Candidates
                <Search className="ml-2 h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // Save as draft functionality
                  console.log("Saving as draft...");
                }}
              >
                Save as Draft
              </Button>
            </div>
          </form>
        </Form>

        {/* AI Tip */}
        <div className="sticky top-0 right-0 z-10">
          <div className="border-border rounded-xl border bg-slate-50 p-6">
            <div className="mb-6 flex items-center gap-3">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
                <Sparkles className="h-5 w-5" />
              </div> */}
              <h3 className="text-base font-semibold text-gray-900">
                Tips for Better Job Posts
              </h3>
            </div>

            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />

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
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-white">
                      {item.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h4 className="mb-1 text-sm font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
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
