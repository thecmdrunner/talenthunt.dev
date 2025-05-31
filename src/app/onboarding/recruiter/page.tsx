"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RecruiterOnboardingPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();

  useEffect(() => {
    // Redirect if user doesn't have a recruiter profile or has completed onboarding
    if (!isLoading && user) {
      if (!user.recruiterProfile) {
        router.push("/onboarding");
      } else if (user.recruiterProfile.currentStep >= 4) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentStep = user?.recruiterProfile?.currentStep ?? 0;
  const steps = [
    "Basic Information",
    "Company Details",
    "Hiring Preferences",
    "Profile Complete",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Complete Your Recruiter Profile
          </h1>

          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    index < currentStep
                      ? "bg-green-500 text-white"
                      : index === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-20 ${
                      index < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2">
            <p className="text-gray-600">
              Step {currentStep} of {steps.length}:{" "}
              {steps[currentStep - 1] || "Getting Started"}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Company information"}
              {currentStep === 3 && "Hiring preferences"}
              {currentStep >= 4 && "Profile complete!"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <p className="mb-6 text-gray-600">
                {currentStep === 1 &&
                  "Let's start with your basic information and role as a recruiter."}
                {currentStep === 2 &&
                  "Tell us about your company to help candidates understand your organization."}
                {currentStep === 3 &&
                  "Set your hiring preferences and the types of roles you typically recruit for."}
                {currentStep >= 4 &&
                  "Your recruiter profile is now complete and you can start searching for candidates!"}
              </p>

              <div className="mb-4 text-4xl">
                {currentStep === 1 && "👋"}
                {currentStep === 2 && "🏢"}
                {currentStep === 3 && "🎯"}
                {currentStep >= 4 && "🎉"}
              </div>

              <Button
                size="lg"
                onClick={() => {
                  if (currentStep >= 4) {
                    router.push("/dashboard");
                  } else {
                    // For now, just show a placeholder
                    alert(`Step ${currentStep} form would go here`);
                  }
                }}
              >
                {currentStep >= 4 ? "Go to Dashboard" : "Continue Setup"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip for now option */}
        {currentStep < 4 && (
          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              Skip for now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
