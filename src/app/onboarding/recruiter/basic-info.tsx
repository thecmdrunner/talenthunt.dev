"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface BasicInfoProps {
  onContinue: () => void;
}

export default function BasicInfo({ onContinue }: BasicInfoProps) {
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
    firstName: user?.recruiterProfile?.firstName || "",
    lastName: user?.recruiterProfile?.lastName || "",
    title: user?.recruiterProfile?.title || "",
    phoneNumber: user?.recruiterProfile?.phoneNumber || "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.title.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateRecruiterMutation.mutate({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      title: formData.title.trim(),
      phoneNumber: formData.phoneNumber.trim() || undefined,
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <div className="mb-4 text-4xl">👋</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          Let's start with your basic information and role as a recruiter.
        </p>
        <div className="text-sm text-gray-500">Step 1 of 3</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="e.g. +1 (555) 123-4567"
            className="rounded-lg"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
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
