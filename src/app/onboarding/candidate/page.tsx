"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import CompleteProfile from "../complete-profile";
import IntroduceYourself from "../introduce-yourself";
import UploadResume from "../upload-resume";

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();

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

  const updateCandidateStepMutation = api.user.updateCandidateStep.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to update step:", error);
      // Could add toast notification here if needed
    },
  });

  const handleContinueToStep2 = useCallback(
    (resumeUrl: string) => {
      updateCandidateStepMutation.mutate({
        step: 2,
        resumeUrl,
      });
    },
    [updateCandidateStepMutation],
  );

  const handleContinueToStep3 = useCallback(() => {
    updateCandidateStepMutation.mutate({
      step: 3,
    });
  }, [updateCandidateStepMutation]);

  const handleComplete = useCallback(() => {
    updateCandidateStepMutation.mutate({
      step: 4,
    });
    router.push("/dashboard");
  }, [updateCandidateStepMutation, router]);

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <UploadResume onContinue={handleContinueToStep2} />;
      case 2:
        return <CompleteProfile onContinue={handleContinueToStep3} />;
      case 3:
        return <IntroduceYourself onComplete={handleComplete} />;
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
  }, [
    currentStep,
    handleContinueToStep2,
    handleContinueToStep3,
    handleComplete,
    router,
  ]);

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
