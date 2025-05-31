"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { Camera, Check, Upload, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    // Redirect if user doesn't have a candidate profile or has completed onboarding
    if (!isLoading && user) {
      if (!user.candidateProfile) {
        router.push("/onboarding");
      } else if (user.candidateProfile.currentStep > 3) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  const currentStep = (user?.candidateProfile?.currentStep ?? 0) + 1;
  const steps = ["Upload Resume", "Complete Profile", "Introduce Yourself"];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setIsResumeUploaded(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsResumeUploaded(true);
    }
  };

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Upload Your Resume
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600">We use your resume to:</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      Quickly understand your background
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      Pre-fill your profile
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      Recommend the best-fit opportunities
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500">(PDF only, max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Right Column - Upload UI */}
            <div className="space-y-6">
              <div
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : isResumeUploaded
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-blue-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isResumeUploaded ? (
                  <div className="space-y-4">
                    <Check className="mx-auto h-12 w-12 text-green-500" />
                    <div>
                      <p className="font-medium text-green-700">
                        ✓ resume.pdf uploaded successfully
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="mb-2 text-lg text-gray-700">
                        Drop your resume here
                      </p>
                      <p className="text-gray-500">or</p>
                    </div>
                    <Button variant="outline" className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {isResumeUploaded && (
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Continue to next step logic here
                    alert("Continue to step 2");
                  }}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Complete Your Profile
              </h2>
              <p className="text-gray-600">
                Tell us more about your skills, preferences, and experience so
                we can match you better.
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Top 3 skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g. React, TypeScript, Node.js"
                  className="rounded-lg"
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Preferred location (optional)
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, Remote"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/yourusername"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="rounded-lg"
                />
              </div>

              <Button
                size="lg"
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Continue to next step logic here
                  alert("Continue to step 3");
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Tell Us About Yourself
              </h2>
              <p className="text-gray-600">
                Record a short video (up to 60 seconds) to share who you are,
                what you&apos;re passionate about, and what you&apos;re looking
                for.
              </p>
              <div className="text-sm text-gray-500">Step 3 of 3</div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-lg bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Start recording logic here
                    alert("Start recording");
                  }}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => {
                    // Upload video logic here
                    alert("Upload video");
                  }}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Upload Video
                </Button>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h3 className="mb-3 font-medium text-gray-900">
                  Tips for a great video:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Be natural
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Keep it concise
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Smile!
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Profile Complete!
            </h2>
            <p className="mb-6 text-gray-600">
              Your profile is now complete and visible to recruiters!
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        );
    }
  }, [currentStep, isDragOver, isResumeUploaded]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
            Complete Your Candidate Profile
          </h1>

          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : index + 1 === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-1 w-20 transition-colors ${
                      index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
