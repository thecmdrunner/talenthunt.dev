"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Check, Brain, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
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
      toast.error("Failed to parse resume, but you can still continue");
    },
  });

  const handleContinueToStep2 = useCallback(
    async (resumeUrl: string) => {
      const loadingToast = toast.loading("Analyzing your resume...");
      let parsedData = null;

      try {
        parsedData = await parseResumeMutation.mutateAsync({ resumeUrl });
        toast.dismiss(loadingToast);
        toast.success("Resume analyzed successfully!");
      } catch (error) {
        toast.dismiss(loadingToast);
        console.error("Resume parsing failed:", error);
      }

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
          return (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 text-center backdrop-blur-xl">
                <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                    <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
                    <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-xl">
                    <div className="text-3xl">🎉</div>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-white">
                    Welcome to the Platform!
                  </h2>
                  <p className="mb-6 text-xl text-white/80">
                    Congratulations! Your profile has been approved and you're now visible to recruiters.
                  </p>
                  <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-700/30 p-6 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
                    <h4 className="relative z-10 mb-3 font-semibold text-green-300">
                      ✅ Application Status: Approved
                    </h4>
                    <p className="relative z-10 text-white/80">
                      Your profile is now live and recruiters can discover and contact you.
                    </p>
                    {approvedAt && (
                      <p className="relative z-10 mt-3 text-sm text-white/60">
                        Approved on {new Date(approvedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-700/30 p-8 backdrop-blur-sm">
                <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                    <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h4 className="mb-4 text-xl font-semibold text-white">What's next?</h4>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Start receiving job opportunities from recruiters",
                      "Update your profile anytime from the dashboard",
                      "Set your availability and job preferences",
                      "Browse and apply to featured opportunities",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        } else if (verificationStatus === "rejected") {
          return (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-800/40 to-red-900/60 p-12 text-center backdrop-blur-xl">
                <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-red-300">
                    <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-xl">
                    <div className="text-3xl">❌</div>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-white">Application Not Approved</h2>
                  <p className="mb-6 text-xl text-white/80">
                    Unfortunately, your application doesn't meet our current requirements.
                  </p>
                  <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-700/30 p-6 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-red-500/5"></div>
                    <h4 className="relative z-10 mb-3 font-semibold text-red-300">
                      ❌ Application Status: Not Approved
                    </h4>
                    <p className="relative z-10 text-white/80">
                      Please review your profile and consider resubmitting with updated information.
                    </p>
                    {rejectedAt && (
                      <p className="relative z-10 mt-3 text-sm text-white/60">
                        Reviewed on {new Date(rejectedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-orange-400/30 bg-orange-700/30 p-8 backdrop-blur-sm">
                <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-orange-300">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h4 className="mb-4 text-xl font-semibold text-white">What can you do?</h4>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Review and update your profile information",
                      "Re-record your introduction video with more detail",
                      "Ensure your video shows professional intent",
                      "Contact support if you believe this was an error",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-orange-300"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => window.location.reload()}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 text-center backdrop-blur-xl">
                <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                    <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-xl">
                    <div className="text-3xl">⏳</div>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-white">Profile Under Review</h2>
                  <p className="mb-6 text-xl text-white/80">
                    Your profile has been submitted and our team is reviewing your application.
                  </p>
                  <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-700/30 p-6 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
                    <h4 className="relative z-10 mb-3 font-semibold text-yellow-300">
                      ⏳ Application Status: Under Review
                    </h4>
                    <p className="relative z-10 text-white/80">
                      {verificationStatus === "pending"
                        ? "Our team is manually reviewing your profile for quality assurance."
                        : "Your application is being processed by our AI system."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-700/30 p-8 backdrop-blur-sm">
                <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                  <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h4 className="mb-4 text-xl font-semibold text-white">What happens next?</h4>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Profile review typically takes 1-2 business days",
                      "You'll receive an email notification when approved",
                      "Once approved, recruiters can discover and contact you",
                      "You can update your profile anytime from the dashboard",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1400 1000" fill="none">
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
          
          <circle cx="50" cy="150" r="6" fill="rgba(96,165,250,0.4)" className="animate-pulse" />
          <circle cx="200" cy="80" r="8" fill="rgba(59,130,246,0.5)" />
          <circle cx="350" cy="200" r="5" fill="rgba(147,197,253,0.3)" className="animate-pulse" />
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
          <CardContent className="relative z-10 p-12">{renderStepContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
