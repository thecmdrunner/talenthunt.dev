"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface BasicCompanyInfoProps {
  onContinue: () => void;
}

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001-5000", label: "1001-5000 employees" },
  { value: "5000+", label: "5000+ employees" },
];

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Media & Entertainment",
  "Non-profit",
  "Government",
  "Real Estate",
  "Transportation",
  "Energy",
  "Other",
];

export default function BasicCompanyInfo({
  onContinue,
}: BasicCompanyInfoProps) {
  const { data: user } = api.user.getOrCreateUser.useQuery();
  const updateRecruiterMutation = api.user.updateRecruiterProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      onContinue();
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    },
  });

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: user?.recruiterProfile?.firstName ?? "",
    lastName: user?.recruiterProfile?.lastName ?? "",
    title: user?.recruiterProfile?.title ?? "",
    phoneNumber: user?.recruiterProfile?.phoneNumber ?? "",
    // Company Info
    companyName: user?.recruiterProfile?.companyName ?? "",
    companyUrl: user?.recruiterProfile?.companyUrl ?? "",
    companySize: user?.recruiterProfile?.companySize ?? "",
    industry: user?.recruiterProfile?.industry ?? "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.title.trim() ||
      !formData.companyName.trim() ||
      !formData.companySize ||
      !formData.industry
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateRecruiterMutation.mutate({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      title: formData.title.trim(),
      phoneNumber: formData.phoneNumber.trim() || undefined,
      companyName: formData.companyName.trim(),
      companyUrl: formData.companyUrl.trim() || undefined,
      companySize: formData.companySize,
      industry: formData.industry,
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <div className="mb-4 text-4xl">👋</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Tell us about yourself and your company
        </h2>
        <p className="text-gray-600">
          Let&apos;s start with your basic information and company details.
        </p>
        <div className="text-sm text-gray-500">Step 1 of 2</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-gray-900">
              Personal Information
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className="rounded-lg"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="rounded-lg"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g. Senior Talent Acquisition Specialist, Recruiter"
              className="rounded-lg"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="e.g. +1 (555) 123-4567"
              className="rounded-lg"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Company Information Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-medium text-gray-900">
              Company Information
            </h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              placeholder="e.g. TechCorp Inc."
              className="rounded-lg"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyUrl">Company Website (optional)</Label>
            <Input
              id="companyUrl"
              type="url"
              placeholder="e.g. https://techcorp.com"
              className="rounded-lg"
              value={formData.companyUrl}
              onChange={(e) => handleInputChange("companyUrl", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companySize">
                Company Size <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) =>
                  handleInputChange("companySize", value)
                }
                required
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleInputChange("industry", value)}
                required
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={updateRecruiterMutation.isPending}
          >
            {updateRecruiterMutation.isPending ? "Saving..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
