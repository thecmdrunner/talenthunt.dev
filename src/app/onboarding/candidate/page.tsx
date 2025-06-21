"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Brain, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import CompleteProfile from "../complete-profile";
import IntroduceYourself from "../introduce-yourself";
import ProfileReview from "../profile-review";
import UploadResume from "../upload-resume";

const toastId = "candidate-onboarding";

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = api.user.getOrCreateUser.useQuery();

  const currentStep = (user?.candidateProfile?.currentStep ?? 0) + 1;
  const steps = [
    "Upload Resume",
    "Complete Profile",
    "Introduce Yourself",
    "Completed Profile",
  ];

  const nextCandidateStepMutation = api.user.nextCandidateStep.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error("Failed to update step:", error);
      toast.error("Failed to update step");
    },
    onSettled: () => {
      void refetchUser();
    },
  });

  const parseResumeMutation = api.ai.parseResume.useMutation({
    onError: (error) => {
      console.error("Failed to parse resume:", error);
      toast.error("Failed to parse resume, but you can still continue", {
        id: toastId,
      });
    },
  });

  const handleContinueToStep2 = useCallback(async (resumeUrl: string) => {
    const loadingToast = toast.loading("Analyzing your resume...", {
      id: toastId,
    });
    let parsedData = null;

    try {
      parsedData = await parseResumeMutation.mutateAsync({ resumeUrl });
      toast.dismiss(loadingToast);
      toast.success("Resume analyzed successfully!", {
        id: toastId,
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Resume parsing failed:", error);
    }

    nextCandidateStepMutation.mutate({
      resumeUrl,
      parsedResumeData: parsedData ?? undefined,
    });
  }, []);

  const handleContinueToStep3 = useCallback(() => {
    nextCandidateStepMutation.mutate({});
  }, [nextCandidateStepMutation]);

  const handleComplete = useCallback(() => {
    nextCandidateStepMutation.mutate({});
  }, [nextCandidateStepMutation]);

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <UploadResume
            onComplete={async (resumeUrl) => {
              await handleContinueToStep2(resumeUrl);
            }}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      case 2:
        return (
          <CompleteProfile
            onComplete={() => {
              handleContinueToStep3();
            }}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      case 3:
        return (
          <IntroduceYourself
            onComplete={handleComplete}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      default:
        return <ProfileReview user={user ?? { candidateProfile: undefined }} />;
    }
  }, [currentStep, steps.length, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-300"></div>
          <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border border-blue-400/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Enhanced Geometric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>

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
          <path
            d="M100 300L250 230L400 350L550 270L700 400L850 330L1000 450L1150 370"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1.5"
            fill="none"
          />

          <circle
            cx="50"
            cy="150"
            r="6"
            fill="rgba(96,165,250,0.4)"
            className="animate-pulse"
          />
          <circle cx="200" cy="80" r="8" fill="rgba(59,130,246,0.5)" />
          <circle
            cx="350"
            cy="200"
            r="5"
            fill="rgba(147,197,253,0.3)"
            className="animate-pulse"
          />
        </svg>

        <div className="absolute top-1/4 left-1/5 h-4 w-4 animate-bounce rounded-full bg-blue-300/40"></div>
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-300/50"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <div className="absolute inset-2 rounded-lg border border-white/20"></div>
              <Brain className="relative z-10 h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TalentHunt</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Progress Header */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
                <div className="absolute inset-3 rounded-xl border border-white/20"></div>
                <Sparkles className="relative z-10 h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white">
              Complete Your Candidate Profile
            </h1>
            <div className="flex justify-center">
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    index + 1 < currentStep
                      ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg"
                      : index + 1 === currentStep
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                        : "border-2 border-blue-400/30 bg-blue-600/20 text-white/60 backdrop-blur-sm"
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    index + 1
                  )}
                  {index + 1 === currentStep && (
                    <div className="absolute -inset-1 animate-pulse rounded-full border border-blue-300/50"></div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-1 w-24 rounded-full transition-all duration-500 ${
                      index + 1 < currentStep
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-blue-400/20 backdrop-blur-sm"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xl text-white/80">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
            </p>
          </div>
        </div>

        {/* Enhanced Content Card */}
        <Card className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(96,165,250,0.15) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>
          <CardContent className="relative z-10 p-12">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
