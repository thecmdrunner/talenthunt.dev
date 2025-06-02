"use client";

import { Button } from "@/components/ui/button";
import { useDelayedVideoReview } from "@/hooks/useDelayedVideoReview";
import { type RouterOutputs } from "@/trpc/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface ProfileReviewProps {
  user:
    | RouterOutputs["user"]["getOrCreateUser"]
    | { candidateProfile: undefined };
}

export default function ProfileReview({ user }: ProfileReviewProps) {
  const {
    reviewState,
    timeRemaining,
    isReviewing,
    isApproved,
    isRejected,
    isManualReview,
  } = useDelayedVideoReview();

  const verificationStatus = user?.candidateProfile?.verificationStatus;
  const isAlreadyApproved = user?.candidateProfile?.onboardingCompletedAt;
  const approvedAt = user?.candidateProfile?.approvedAt;
  const rejectedAt = user?.candidateProfile?.rejectedAt;

  // If already approved from database, show approved state
  if (isAlreadyApproved) {
    return (
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 text-center backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
            <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                stroke="currentColor"
                fill="currentColor"
                opacity="0.3"
              />
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
              Congratulations! Your profile has been approved and you&apos;re
              now visible to recruiters.
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-700/30 p-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
              <h4 className="relative z-10 mb-3 font-semibold text-green-300">
                ✅ Application Status: Approved
              </h4>
              <p className="relative z-10 text-white/80">
                Your profile is now live and recruiters can discover and contact
                you.
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
              <polygon
                points="50,10 90,50 50,90 10,50"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <h4 className="mb-4 text-xl font-semibold text-white">
              What&apos;s next?
            </h4>
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

        {/* Start Your Journey Button */}
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-6 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Sparkles className="h-5 w-5" />
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // If rejected from database, show rejected state
  if (verificationStatus === "rejected") {
    return (
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-800/40 to-red-900/60 p-12 text-center backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
            <svg viewBox="0 0 100 100" className="h-full w-full text-red-300">
              <polygon
                points="50,20 80,50 50,80 20,50"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-xl">
              <div className="text-3xl">❌</div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Application Not Approved
            </h2>
            <p className="mb-6 text-xl text-white/80">
              Unfortunately, your application doesn&apos;t meet our current
              requirements.
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-700/30 p-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-red-500/5"></div>
              <h4 className="relative z-10 mb-3 font-semibold text-red-300">
                ❌ Application Status: Not Approved
              </h4>
              <p className="relative z-10 text-white/80">
                Please review your profile and consider resubmitting with
                updated information.
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
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full text-orange-300"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <h4 className="mb-4 text-xl font-semibold text-white">
              What can you do&apos;?
            </h4>
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
            className="rounded-xl bg-orange-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-orange-700 hover:shadow-2xl"
            onClick={() => window.location.reload()}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }

  // Show the dynamic review state based on our hook
  if (isApproved) {
    return (
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 text-center backdrop-blur-xl">
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-xl">
              <div className="text-3xl">🎉</div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Video Approved!
            </h2>
            <p className="mb-6 text-xl text-white/80">
              Great news! Your introduction video has been approved and your
              profile is now live.
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-700/30 p-6 backdrop-blur-sm">
              <h4 className="relative z-10 mb-3 font-semibold text-green-300">
                ✅ Status: Approved
              </h4>
              <p className="relative z-10 text-white/80">
                Your profile is now visible to recruiters and you can start
                receiving opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-12 py-6 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Sparkles className="h-5 w-5" />
                <span>Go to Dashboard</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-800/40 to-red-900/60 p-12 text-center backdrop-blur-xl">
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-xl">
              <div className="text-3xl">❌</div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Video Needs Improvement
            </h2>
            <p className="mb-6 text-xl text-white/80">
              Your introduction video requires some adjustments. Please record a
              new one.
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-700/30 p-6 backdrop-blur-sm">
              <h4 className="relative z-10 mb-3 font-semibold text-red-300">
                ❌ Status: Needs Improvement
              </h4>
              <p className="relative z-10 text-white/80">
                Please record a new introduction video following our guidelines.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-xl bg-orange-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-orange-700 hover:shadow-2xl"
            onClick={() => window.location.reload()}
          >
            Record New Video
          </Button>
        </div>
      </div>
    );
  }

  // Default pending/reviewing state
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 text-center backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon
              points="50,10 90,50 50,90 10,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-xl">
            <div className="text-3xl">👥</div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">
            Profile Under Review
          </h2>
          <p className="mb-6 text-xl text-white/80">
            Thanks for submitting your profile! Our team is reviewing your
            application and introduction video.
          </p>
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-700/30 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
            <h4 className="relative z-10 mb-3 font-semibold text-yellow-300">
              👥 Status: Under Review
            </h4>
            <p className="relative z-10 text-white/80">
              Our team is carefully reviewing your profile to ensure quality. We
              will notify you once the review is complete.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-700/30 p-8 backdrop-blur-sm">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <h4 className="mb-4 text-xl font-semibold text-white">
            What happens next?
          </h4>
          <ul className="space-y-3 text-white/80">
            {[
              "Our team will review your video for authenticity and professionalism",
              "We will verify your profile information and qualifications",
              "If approved, your profile goes live and becomes visible to recruiters",
              "You&apos;ll receive email notifications about your approval status",
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
