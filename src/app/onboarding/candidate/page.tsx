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
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = api.user.getOrCreateUser.useQuery();

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
    onSettled: () => {
      void refetchUser();
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
        const verificationStatus = user?.candidateProfile?.verificationStatus;
        const isApproved = user?.candidateProfile?.onboardingCompletedAt;
        const approvedAt = user?.candidateProfile?.approvedAt;
        const rejectedAt = user?.candidateProfile?.rejectedAt;

        if (isApproved) {
          // Approved and ready to go
          return (
            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <div className="text-2xl">🎉</div>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  Welcome to the Platform!
                </h2>
                <p className="mb-4 text-gray-600">
                  Congratulations! Your profile has been approved and
                  you&apos;re now visible to recruiters.
                </p>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-medium text-green-900">
                    ✅ Application Status: Approved
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your profile is now live and recruiters can discover and
                    contact you.
                  </p>
                  {approvedAt && (
                    <p className="mt-2 text-xs text-gray-500">
                      Approved on {new Date(approvedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-3 font-medium text-gray-900">
                  What&apos;s next?
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Start receiving job opportunities from recruiters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Update your profile anytime from the dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Set your availability and job preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Browse and apply to featured opportunities
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
        } else if (verificationStatus === "rejected") {
          // Application was rejected
          return (
            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <div className="text-2xl">❌</div>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  Application Not Approved
                </h2>
                <p className="mb-4 text-gray-600">
                  Unfortunately, your application doesn&apos;t meet our current
                  requirements.
                </p>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-medium text-red-900">
                    ❌ Application Status: Not Approved
                  </h4>
                  <p className="text-sm text-gray-600">
                    Please review your profile and consider resubmitting with
                    updated information.
                  </p>
                  {rejectedAt && (
                    <p className="mt-2 text-xs text-gray-500">
                      Reviewed on {new Date(rejectedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-orange-50 p-6">
                <h4 className="mb-3 font-medium text-gray-900">
                  What can you do?
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    Review and update your profile information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    Re-record your introduction video with more detail
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    Ensure your video shows professional intent
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                    Contact support if you believe this was an error
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => window.location.reload()}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          );
        } else {
          // Still under review (pending)
          return (
            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-blue-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <div className="text-2xl">⏳</div>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  Profile Under Review
                </h2>
                <p className="mb-4 text-gray-600">
                  Your profile has been submitted and our team is reviewing your
                  application.
                </p>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h4 className="mb-2 font-medium text-yellow-900">
                    ⏳ Application Status: Under Review
                  </h4>
                  <p className="text-sm text-gray-600">
                    {verificationStatus === "pending"
                      ? "Our team is manually reviewing your profile for quality assurance."
                      : "Your application is being processed by our AI system."}
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
    }
  }, [
    currentStep,
    handleContinueToStep2,
    handleContinueToStep3,
    handleComplete,
    router,
    user,
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
