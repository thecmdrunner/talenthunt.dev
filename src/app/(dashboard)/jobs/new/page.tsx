"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Search, Sparkles, X } from "lucide-react";
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
    setSkillInput("");
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
      <div className="relative container mx-auto flex flex-col-reverse gap-x-3 gap-y-6 lg:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-2xl space-y-6"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Job Title</FormLabel>
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
                    <FormLabel className="text-slate-700">Location</FormLabel>
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

            {/* Salary and Urgency */}
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
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Urgency</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How urgent is this hire?"
                        {...field}
                        className="border-slate-200 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Description */}
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
                      placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                      className="min-h-[120px] border-slate-200 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Required Skills */}
            <div className="space-y-4">
              <Label className="text-slate-700">
                Required Skills & Technologies
              </Label>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill or technology"
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
                    skillInput.trim() && addSkill(skillInput.trim(), "required")
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
                <p className="mb-2 text-sm text-slate-600">Suggested skills:</p>
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

            {/* Additional Details */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">
                      Years of Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined,
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
                <p className="mb-2 text-sm text-slate-600">Common benefits:</p>
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

            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-800">
                Company Information
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              </div>

              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">
                      Company Description (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of your company..."
                        className="border-slate-200 bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Remote Work & Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-800">
                Work Preferences
              </h3>

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-slate-700">
                        This is a remote position
                      </FormLabel>
                      <FormDescription>
                        Candidates can work from anywhere
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxApplications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">
                      Maximum Applications (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 100"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined,
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
                Explore First
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>

        {/* AI Tip */}

        <div className="sticky top-0 z-10">
          <Card className="h-max border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 py-0">
            <CardContent className="p-4">
              <div className="flex flex-col items-start">
                <h4 className="mb-1 flex items-center gap-3 font-medium text-blue-900">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  AI Tip
                </h4>
                <p className="text-sm text-blue-800">
                  Be specific about your requirements.
                  <br /> Include both technical skills and soft skills you
                  value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
