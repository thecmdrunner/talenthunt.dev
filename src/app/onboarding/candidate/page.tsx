"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import CompleteProfile from "../complete-profile";
import IntroduceYourself from "../introduce-yourself";
import UploadResume from "../upload-resume";

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();

  // useEffect(() => {
  //   // Redirect if user doesn't have a candidate profile or has completed onboarding
  //   if (!isLoading && user) {
  //     if (!user.candidateProfile) {
  //       router.push("/onboarding");
  //     } else if (user.candidateProfile.currentStep > 3) {
  //       router.push("/dashboard");
  //     }
  //   }
  // }, [user, isLoading]);

  const currentStep = (user?.candidateProfile?.currentStep ?? 0) + 1;
  const steps = [
    "Upload Resume",
    "Complete Profile",
    "Introduce Yourself",
    "Completed Profile",
  ];

  const nextCandidateStepMutation = api.user.nextCandidateStep.useMutation({
    onSuccess: () => {
      // router.refresh();
      window.location.reload();
    },
    onError: (error) => {
      console.error("Failed to update step:", error);
      toast.error("Failed to update step");
    },
  });

  const parseResumeMutation = api.ai.parseResume.useMutation({
    onError: (error) => {
      console.error("Failed to parse resume:", error);
      toast.error("Failed to parse resume, but you can still continue");
    },
  });

  const handleContinueToStep2 = useCallback(
    async (resumeUrl: string) => {
      const loadingToast = toast.loading("Analyzing your resume...");

      let parsedData = null;

      try {
        // Parse the resume first
        parsedData = await parseResumeMutation.mutateAsync({ resumeUrl });

        toast.dismiss(loadingToast);
        toast.success("Resume analyzed successfully!");
      } catch (error) {
        toast.dismiss(loadingToast);
        // Continue even if parsing fails
        console.error("Resume parsing failed:", error);
      }

      // Update the step and store parsed data regardless of parsing success
      nextCandidateStepMutation.mutate({
        resumeUrl,
        parsedResumeData: parsedData ?? undefined,
      });
    },
    [parseResumeMutation, nextCandidateStepMutation],
  );

  const handleContinueToStep3 = useCallback(() => {
    nextCandidateStepMutation.mutate({});
  }, [nextCandidateStepMutation]);

  const handleComplete = useCallback(() => {
    nextCandidateStepMutation.mutate({});
    // router.push("/dashboard");
  }, [nextCandidateStepMutation]);

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
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <div className="text-2xl">🎉</div>
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Profile Complete!
              </h2>
              <p className="mb-4 text-gray-600">
                Your profile has been submitted and is now under review.
              </p>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h4 className="mb-2 font-medium text-gray-900">
                  Application Status: Under Review
                </h4>
                <p className="text-sm text-gray-600">
                  Our team is reviewing your profile. You&apos;ll be notified
                  once approved and ready to connect with recruiters.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-6">
              <h4 className="mb-3 font-medium text-gray-900">
                What happens next?
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  Profile review typically takes 1-2 business days
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  You&apos;ll receive an email notification when approved
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  Once approved, recruiters can discover and contact you
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  You can update your profile anytime from the dashboard
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
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
