"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Sparkles, User, Code, MapPin, Github, Linkedin, Loader2 } from "lucide-react";

interface CompleteProfileProps {
  onComplete: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function CompleteProfile({ onComplete }: CompleteProfileProps) {
  const { trackProfileUpdated, trackButtonClicked, trackOnboardingCompleted } =
    useTracking();

  const { data: parsedData, isLoading: isLoadingParsedData } =
    api.user.getParsedResumeData.useQuery();

  const [formData, setFormData] = useState({
    name: "",
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
        name: parsedData.fullName ?? prev.name,
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

  const isFormValid = formData.name && formData.role && formData.skills && formData.experience;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track profile completion
    trackProfileUpdated("complete_profile");
    trackButtonClicked("complete_profile_submission", "onboarding");

    // ... existing code ...

    // After successful completion
    trackOnboardingCompleted("candidate");
    onComplete();
  };

  // Track field updates
  const handleFieldUpdate = (field: string) => {
    trackProfileUpdated(field);
  };

  if (isLoadingParsedData) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
        {/* Enhanced Geometric Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Large Blue Gradient Shapes */}
          <div className="absolute top-10 left-10 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
          <div className="absolute right-10 bottom-20 h-[350px] w-[350px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>
          
          {/* Geometric Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px),
                linear-gradient(rgba(96,165,250,0.2) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* SVG Geometric Patterns */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1400 1000"
            fill="none"
          >
            <path
              d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350"
              stroke="rgba(96,165,250,0.15)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="200"
              cy="80"
              r="6"
              fill="rgba(96,165,250,0.4)"
              className="animate-pulse"
            />
            <circle cx="500" cy="120" r="8" fill="rgba(59,130,246,0.5)" />
            <circle
              cx="800"
              cy="180"
              r="5"
              fill="rgba(147,197,253,0.3)"
              className="animate-pulse"
            />
          </svg>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            {/* Loading Card with Glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 shadow-2xl backdrop-blur-xl">
              {/* Geometric Decoration */}
              <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
                  <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
              
              <div className="relative z-10 space-y-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">
            Complete Your Profile
          </h2>
                  <p className="text-white/80 text-lg">Loading your parsed resume data...</p>
                </div>
                
          <div className="flex justify-center">
                  <div className="relative">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-300/20 border-t-blue-300"></div>
                    <div className="absolute inset-2 animate-pulse rounded-full bg-blue-400/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Enhanced Geometric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Blue Gradient Shapes */}
        <div className="absolute top-10 left-10 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-400/18 to-blue-600/12 blur-3xl"></div>

        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px),
              linear-gradient(rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Advanced SVG Geometric Patterns */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1400 1000"
          fill="none"
        >
          {/* Connection Network */}
          <path
            d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100 300L250 230L400 350L550 270L700 400L850 330L1000 450L1150 370"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Geometric Nodes */}
          <circle
            cx="200"
            cy="80"
            r="6"
            fill="rgba(96,165,250,0.4)"
            className="animate-pulse"
          />
          <circle cx="500" cy="120" r="8" fill="rgba(59,130,246,0.5)" />
          <circle
            cx="800"
            cy="180"
            r="5"
            fill="rgba(147,197,253,0.3)"
            className="animate-pulse"
          />

          {/* Geometric Shapes */}
          <polygon
            points="200,400 250,350 300,400 250,450"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="1"
            fill="rgba(59,130,246,0.08)"
          />
          <polygon
            points="600,500 650,450 700,500 650,550"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1"
            fill="rgba(96,165,250,0.06)"
          />
        </svg>

        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/5 h-4 w-4 animate-bounce rounded-full bg-blue-300/40"></div>
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-300/50"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Main Form Card with Glassmorphism */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 shadow-2xl backdrop-blur-xl">
            {/* Geometric Background Elements */}
            <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
              <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-24 opacity-10">
              <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
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
          Complete Your Profile
        </h2>
                  <p className="text-white/80 text-lg leading-relaxed">
          Tell us more about your skills, preferences, and experience so we can
          match you better.
        </p>
                </div>

        {parsedData && Object.values(parsedData).some((value) => value) && (
                  <div className="rounded-xl border border-blue-400/30 bg-blue-600/20 p-4 backdrop-blur-sm">
                    <p className="text-blue-200 flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      We've pre-filled some fields based on your resume. Feel free to review and edit them.
            </p>
          </div>
        )}

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600/20 px-4 py-2 text-blue-300 backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                  Step 2 of 4
                </div>
      </div>

              {/* Form Fields */}
      <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex items-center gap-2 text-white font-medium">
                    <User className="h-4 w-4 text-blue-300" />
                    Name
          </Label>
                  <div className="relative">
          <Input
            id="name"
            placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
            value={formData.name}
            onChange={(e) => {
              handleInputChange("name", e.target.value);
              handleFieldUpdate("name");
            }}
          />
                  </div>
        </div>

                {/* Role Field */}
                <div className="space-y-3">
                  <Label htmlFor="role" className="flex items-center gap-2 text-white font-medium">
                    <User className="h-4 w-4 text-blue-300" />
                    Role you're targeting
          </Label>
                  <div className="relative">
          <Input
            id="role"
            placeholder="e.g. Frontend Developer, Product Manager"
                      className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
            value={formData.role}
            onChange={(e) => {
              handleInputChange("role", e.target.value);
              handleFieldUpdate("role");
            }}
          />
                  </div>
        </div>

                {/* Skills Field */}
                <div className="space-y-3">
                  <Label htmlFor="skills" className="flex items-center gap-2 text-white font-medium">
                    <Code className="h-4 w-4 text-blue-300" />
            Top 3 skills
          </Label>
                  <div className="relative">
          <Input
            id="skills"
            placeholder="e.g. React, TypeScript, Node.js"
                      className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
            value={formData.skills}
            onChange={(e) => {
              handleInputChange("skills", e.target.value);
              handleFieldUpdate("skills");
            }}
          />
                  </div>
        </div>

                {/* Experience and Location Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="experience" className="flex items-center gap-2 text-white font-medium">
                      <Sparkles className="h-4 w-4 text-blue-300" />
              Years of experience
            </Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 3"
                      className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
              value={formData.experience}
              onChange={(e) => {
                handleInputChange("experience", e.target.value);
                handleFieldUpdate("experience");
              }}
            />
          </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="flex items-center gap-2 text-white font-medium">
                      <MapPin className="h-4 w-4 text-blue-300" />
                      Preferred location
                      <span className="text-white/60 text-sm">(optional)</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g. San Francisco, Remote"
                      className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
              value={formData.location}
              onChange={(e) => {
                handleInputChange("location", e.target.value);
                handleFieldUpdate("location");
              }}
            />
          </div>
        </div>

                {/* GitHub URL */}
                <div className="space-y-3">
                  <Label htmlFor="github" className="flex items-center gap-2 text-white font-medium">
                    <Github className="h-4 w-4 text-blue-300" />
            GitHub URL
          </Label>
          <Input
            id="github"
            placeholder="https://github.com/yourusername"
                    className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
            value={formData.githubUrl}
            onChange={(e) => {
              handleInputChange("githubUrl", e.target.value);
              handleFieldUpdate("githubUrl");
            }}
          />
        </div>

                {/* LinkedIn URL */}
                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="flex items-center gap-2 text-white font-medium">
                    <Linkedin className="h-4 w-4 text-blue-300" />
            LinkedIn URL
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
            value={formData.linkedinUrl}
            onChange={(e) => {
              handleInputChange("linkedinUrl", e.target.value);
              handleFieldUpdate("linkedinUrl");
            }}
          />
        </div>

                {/* Submit Button */}
                <div className="pt-4">
        <Button
          size="lg"
                    className={`group relative w-full overflow-hidden rounded-xl py-6 text-lg font-semibold transition-all duration-300 ${
                      isFormValid
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
                        : "bg-blue-700/30 text-white/60 cursor-not-allowed"
                    }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
          Continue
                    </div>
        </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
