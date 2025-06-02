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
import { Building2, User, Sparkles } from "lucide-react";
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
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        {/* Geometric Background Elements */}
        <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon
              points="50,10 90,50 50,90 10,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 h-24 w-24 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Header Section */}
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
              <User className="h-10 w-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Tell us about yourself and your company
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                Let's start with your basic information and company details.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600/20 px-4 py-2 text-blue-300 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
              Step 1 of 2
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-400/30 pb-3">
                <User className="h-5 w-5 text-blue-300" />
                <h3 className="text-xl font-semibold text-white">
                  Personal Information
                </h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="flex items-center gap-2 text-white font-medium">
                    <span>First Name</span>
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="flex items-center gap-2 text-white font-medium">
                    <span>Last Name</span>
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="title" className="flex items-center gap-2 text-white font-medium">
                  <span>Job Title</span>
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Talent Acquisition Specialist, Recruiter"
                  className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phoneNumber" className="text-white font-medium">
                  Phone Number
                  <span className="ml-2 text-white/60 text-sm">(optional)</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="e.g. +1 (555) 123-4567"
                  className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Company Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-400/30 pb-3">
                <Building2 className="h-5 w-5 text-blue-300" />
                <h3 className="text-xl font-semibold text-white">
                  Company Information
                </h3>
              </div>

              <div className="space-y-3">
                <Label htmlFor="companyName" className="flex items-center gap-2 text-white font-medium">
                  <span>Company Name</span>
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g. TechCorp Inc."
                  className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="companyUrl" className="text-white font-medium">
                  Company Website
                  <span className="ml-2 text-white/60 text-sm">(optional)</span>
                </Label>
                <Input
                  id="companyUrl"
                  type="url"
                  placeholder="e.g. https://techcorp.com"
                  className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                  value={formData.companyUrl}
                  onChange={(e) =>
                    handleInputChange("companyUrl", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="companySize" className="flex items-center gap-2 text-white font-medium">
                    <span>Company Size</span>
                    <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      handleInputChange("companySize", value)
                    }
                    required
                  >
                    <SelectTrigger className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20 data-[placeholder]:text-white/50">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem 
                          key={size.value} 
                          value={size.value}
                          className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                        >
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="industry" className="flex items-center gap-2 text-white font-medium">
                    <span>Industry</span>
                    <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                    required
                  >
                    <SelectTrigger className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20 data-[placeholder]:text-white/50">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                      {INDUSTRIES.map((industry) => (
                        <SelectItem 
                          key={industry} 
                          value={industry}
                          className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                        >
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
                className="group relative overflow-hidden rounded-xl bg-white px-12 py-6 text-lg font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
                disabled={updateRecruiterMutation.isPending}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  {updateRecruiterMutation.isPending ? "Saving..." : "Continue"}
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
