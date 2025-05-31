"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface CompleteProfileProps {
  onContinue: () => void;
}

export default function CompleteProfile({ onContinue }: CompleteProfileProps) {
  const [formData, setFormData] = useState({
    role: "",
    skills: "",
    experience: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.role && formData.skills && formData.experience;

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
        <div className="text-sm text-gray-500">Step 2 of 3</div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role">Role you&apos;re targeting</Label>
          <Input
            id="role"
            placeholder="e.g. Frontend Developer, Product Manager"
            className="rounded-lg"
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Top 3 skills</Label>
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
            <Label htmlFor="experience">Years of experience</Label>
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
            <Label htmlFor="location">Preferred location (optional)</Label>
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
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            placeholder="https://github.com/yourusername"
            className="rounded-lg"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange("githubUrl", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
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
