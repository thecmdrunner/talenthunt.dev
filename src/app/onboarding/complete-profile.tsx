"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

interface CompleteProfileProps {
  onContinue: () => void;
}

export default function CompleteProfile({ onContinue }: CompleteProfileProps) {
  const { data: parsedData, isLoading: isLoadingParsedData } =
    api.user.getParsedResumeData.useQuery();

  const [formData, setFormData] = useState({
    role: "",
    skills: "",
    experience: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  // Update form data when parsedData becomes available
  useEffect(() => {
    if (parsedData) {
      setFormData((prev) => ({
        ...prev,
        role: parsedData.role ?? prev.role,
        skills: parsedData.skills ?? prev.skills,
        experience: parsedData.experience ?? prev.experience,
        location: parsedData.location ?? prev.location,
        githubUrl: parsedData.githubUrl ?? prev.githubUrl,
        linkedinUrl: parsedData.linkedinUrl ?? prev.linkedinUrl,
      }));
    }
  }, [parsedData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.role && formData.skills && formData.experience;

  if (isLoadingParsedData) {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="text-gray-600">Loading your parsed resume data...</p>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="text-gray-600">
          Tell us more about your skills, preferences, and experience so we can
          match you better.
        </p>
        {parsedData && Object.values(parsedData).some((value) => value) && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm text-blue-700">
              ✨ We&apos;ve pre-filled some fields based on your resume. Feel
              free to review and edit them.
            </p>
          </div>
        )}
        <div className="text-sm text-gray-500">Step 2 of 3</div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2">
            Role you&apos;re targeting
            {parsedData?.role && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                ✨ Pre-filled from resume
              </span>
            )}
          </Label>
          <Input
            id="role"
            placeholder="e.g. Frontend Developer, Product Manager"
            className="rounded-lg"
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills" className="flex items-center gap-2">
            Top 3 skills
            {parsedData?.skills && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                ✨ Pre-filled from resume
              </span>
            )}
          </Label>
          <Input
            id="skills"
            placeholder="e.g. React, TypeScript, Node.js"
            className="rounded-lg"
            value={formData.skills}
            onChange={(e) => handleInputChange("skills", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="experience" className="flex items-center gap-2">
              Years of experience
              {parsedData?.experience && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                  ✨ Pre-filled from resume
                </span>
              )}
            </Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 3"
              className="rounded-lg"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              Preferred location (optional)
              {parsedData?.location && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                  ✨ Pre-filled from resume
                </span>
              )}
            </Label>
            <Input
              id="location"
              placeholder="e.g. San Francisco, Remote"
              className="rounded-lg"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            GitHub URL
            {parsedData?.githubUrl && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                ✨ Pre-filled from resume
              </span>
            )}
          </Label>
          <Input
            id="github"
            placeholder="https://github.com/yourusername"
            className="rounded-lg"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange("githubUrl", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            LinkedIn URL
            {parsedData?.linkedinUrl && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                ✨ Pre-filled from resume
              </span>
            )}
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            className="rounded-lg"
            value={formData.linkedinUrl}
            onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
          />
        </div>

        <Button
          size="lg"
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
          onClick={onContinue}
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
