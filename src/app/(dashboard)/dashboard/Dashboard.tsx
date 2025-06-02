"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTracking } from "@/lib/hooks/use-tracking";
import { type RouterOutputs } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Search,
  Star,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type TabValue = "candidate" | "recruiter";

export default function Dashboard({
  user,
}: {
  user: RouterOutputs["user"]["getOrCreateUser"];
}) {
  const { trackPageVisited } = useTracking();

  const { user: clerkUser } = useUser();

  const isCandidateOnboarded = !!user?.candidateProfile?.onboardingCompletedAt;
  const isRecruiterOnboarded = !!user?.recruiterProfile?.onboardingCompletedAt;
  const hasBothProfiles = isCandidateOnboarded && isRecruiterOnboarded;

  // Track page visit
  useEffect(() => {
    trackPageVisited(
      "dashboard",
      hasBothProfiles
        ? "both_profiles"
        : isCandidateOnboarded
          ? "candidate"
          : isRecruiterOnboarded
            ? "recruiter"
            : "no_profile",
    );
  }, [
    trackPageVisited,
    hasBothProfiles,
    isCandidateOnboarded,
    isRecruiterOnboarded,
  ]);

  const [tabValue, setTabValue] = useState<TabValue>("candidate");

  if (!isCandidateOnboarded && !isRecruiterOnboarded) {
    return (
      <div className="relative min-h-screen overflow-hidden">
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

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16">
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
            <CardContent className="relative z-10 py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl">
                <User className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-white">
                Welcome to Your Career Hub
              </h1>
              <p className="mb-8 text-lg text-white/80">
                Choose your journey and unlock opportunities in the world of
                talent.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group cursor-pointer border border-blue-400/30 bg-blue-700/30 backdrop-blur-sm transition-all hover:border-blue-300/50 hover:shadow-lg">
                  <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full text-blue-300"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <CardContent className="relative z-10 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/20 backdrop-blur-sm group-hover:bg-blue-200/30">
                      <Target className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      I&apos;m Looking for Opportunities
                    </h3>
                    <p className="mb-4 text-white/70">
                      Build your profile and get discovered by top recruiters
                    </p>
                    <Button
                      asChild
                      className="w-full bg-white font-medium text-blue-900 hover:bg-blue-50"
                    >
                      <Link href="/onboarding/candidate">
                        Get Started as Candidate
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer border border-blue-400/30 bg-blue-700/30 backdrop-blur-sm transition-all hover:border-blue-300/50 hover:shadow-lg">
                  <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full text-blue-300"
                    >
                      <polygon
                        points="50,20 80,50 50,80 20,50"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <CardContent className="relative z-10 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/20 backdrop-blur-sm group-hover:bg-blue-200/30">
                      <Search className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      I&apos;m Hiring Talent
                    </h3>
                    <p className="mb-4 text-white/70">
                      Find and connect with the perfect candidates
                    </p>
                    <Button
                      asChild
                      className="w-full bg-white font-medium text-blue-900 hover:bg-blue-50"
                    >
                      <Link href="/onboarding/recruiter">
                        Get Started as Recruiter
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Welcome back {clerkUser?.fullName ?? ""}! 👋
            </h1>

            {/* <div className="flex gap-2">
              <button
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors",
                  tabValue === "candidate"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "border border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30",
                )}
                onClick={() => setTabValue("candidate")}
              >
                <Target className="h-4 w-4" />
                Profile Analytics
              </button>
              <button
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors",
                  tabValue === "recruiter"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "border border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30",
                )}
                onClick={() => setTabValue("recruiter")}
              >
                <Search className="h-4 w-4" />
                Recruiter Analytics
              </button>
            </div> */}
          </div>
        </div>

        {hasBothProfiles ? (
          <Tabs
            value={tabValue}
            className="w-full"
            onValueChange={(value) => setTabValue(value as TabValue)}
          >
            <TabsContent value="candidate">
              <CandidateDashboard user={user} />
            </TabsContent>

            <TabsContent value="recruiter">
              <RecruiterDashboard user={user} />
            </TabsContent>
          </Tabs>
        ) : isCandidateOnboarded ? (
          <CandidateDashboard user={user} />
        ) : (
          <RecruiterDashboard user={user} />
        )}
      </div>
    </div>
  );
}

function CandidateDashboard({
  user,
}: {
  user: RouterOutputs["user"]["getOrCreateUser"];
}) {
  if (!user) return;
  const currentStep = user.candidateProfile.currentStep;
  const maxSteps = 3;
  const progressPercentage = (currentStep / maxSteps) * 100;
  const isComplete = currentStep >= maxSteps;

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Profile Progress */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl lg:col-span-2">
        <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
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
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/20 backdrop-blur-sm">
              <User className="h-4 w-4 text-blue-300" />
            </div>
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">
                Progress
              </span>
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                )}
                <span className="text-sm font-bold text-white">
                  {currentStep}/{maxSteps}
                </span>
              </div>
            </div>

            <div className="h-3 w-full rounded-full bg-blue-900/40">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={isComplete ? "text-green-400" : "text-white/70"}>
                {isComplete
                  ? "🎉 Profile complete! You're discoverable by recruiters."
                  : "Complete your profile to get discovered by top recruiters"}
              </span>
              {!isComplete && (
                <Button
                  size="sm"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                >
                  Continue Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon
              points="50,20 80,50 50,80 20,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <TrendingUp className="h-4 w-4 text-green-400" />
            Profile Views
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">127</div>
          <p className="text-sm text-white/70">+12% from last week</p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              rx="10"
            />
          </svg>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="h-4 w-4 text-blue-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-blue-700/40 p-3 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  Profile viewed by TechCorp
                </p>
                <p className="text-xs text-white/60">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-blue-800/40 p-3 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Skills updated</p>
                <p className="text-xs text-white/60">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Matches */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
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
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Briefcase className="h-4 w-4 text-blue-400" />
            Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="rounded-lg border border-blue-500/30 bg-blue-700/40 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Senior Developer</h4>
                <Badge className="border border-blue-400/30 bg-blue-100/20 text-blue-300">
                  95% match
                </Badge>
              </div>
              <p className="text-sm text-white/70">TechStartup Inc.</p>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-50">
              View All Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Endorsements */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
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
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Star className="h-4 w-4 text-yellow-400" />
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {user.candidateProfile.parsedResumeData?.skills ? (
              user.candidateProfile.parsedResumeData.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0)
                .map((skill) => (
                  <Badge
                    key={skill}
                    className="border border-blue-400/30 bg-blue-100/20 text-blue-300 backdrop-blur-sm"
                  >
                    {skill}
                  </Badge>
                ))
            ) : (
              <p className="text-sm text-white/70">
                Complete your profile to showcase your skills
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecruiterDashboard({
  user,
}: {
  user: RouterOutputs["user"]["getOrCreateUser"];
}) {
  if (!user) return;
  const currentStep = user.recruiterProfile.currentStep;
  const maxSteps = 2;
  const progressPercentage = (currentStep / maxSteps) * 100;
  const isComplete = currentStep >= maxSteps;

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Profile Setup */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl lg:col-span-2">
        <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon
              points="50,10 90,50 50,90 10,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            />
            <polygon
              points="50,25 75,50 50,75 25,50"
              stroke="currentColor"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-4 left-4 h-2 w-2 animate-pulse rounded-full bg-blue-300/40"></div>
        <div className="absolute right-6 bottom-6 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>

        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Recruiter Dashboard</div>
              <div className="text-sm font-normal text-blue-200">
                Build your hiring presence
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/90">
                Profile Completion
              </span>
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-medium text-green-400">
                      Complete
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-medium text-amber-400">
                      In Progress
                    </span>
                  </div>
                )}
                <span className="text-sm font-bold text-white">
                  {currentStep}/{maxSteps}
                </span>
              </div>
            </div>

            <div className="relative h-3 w-full overflow-hidden rounded-full bg-blue-900/40">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div
            className={`rounded-lg p-4 backdrop-blur-sm ${
              isComplete
                ? "border border-green-400/30 bg-green-500/20"
                : "border border-amber-400/30 bg-amber-500/20"
            }`}
          >
            <div className="flex items-start gap-3">
              {isComplete ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/30">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/30">
                  <Target className="h-4 w-4 text-amber-400" />
                </div>
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isComplete ? "text-green-300" : "text-amber-300"
                  }`}
                >
                  {isComplete
                    ? "🚀 Your recruiter profile is ready!"
                    : "📋 Complete your setup to unlock full features"}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    isComplete ? "text-green-400/80" : "text-amber-400/80"
                  }`}
                >
                  {isComplete
                    ? "Start discovering and connecting with top talent"
                    : "Add company details and preferences to get started"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!isComplete && (
            <div className="pt-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
              >
                <Link href="/onboarding/recruiter">
                  <User className="mr-2 h-4 w-4" />
                  Complete Profile Setup
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Credits */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <Search className="h-4 w-4 text-green-400" />
            Search Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">47</div>
          <p className="text-sm text-white/70">remaining this month</p>
        </CardContent>
      </Card>

      {/* AI Candidate Search Campaign Banner */}
      <Card className="relative max-w-sm overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl lg:col-span-2">
        <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-purple-300">
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-1 backdrop-blur-sm">
          <span className="text-xs font-medium text-purple-300">
            ✨ AI Powered
          </span>
        </div>
        <CardHeader className="relative z-10 pt-12">
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              <Search className="h-4 w-4 text-white" />
            </div>
            AI Candidate Search
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">
              Find candidates with natural language
            </p>
            <p className="text-xs text-white/70">
              &ldquo;Find senior React developers in San Francisco with startup
              experience&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
            <span>Semantic matching</span>
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
            <span>Skills analysis</span>
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
            <span>Culture fit</span>
          </div>

          {/* Top Match Preview */}
          <div className="rounded-lg border border-purple-400/30 bg-purple-700/30 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Top Match</h4>
              <Badge className="border border-purple-400/30 bg-purple-100/20 text-purple-300">
                97%
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-white">Sarah Chen</p>
                <p className="text-sm text-white/70">Senior React Developer</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:from-purple-600 hover:to-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Start AI Search
            </Button>
            {/* <Button
              variant="outline"
              className="border-purple-400/30 bg-purple-700/20 text-white hover:bg-purple-600/30"
            >
              <Target className="mr-2 h-4 w-4" />
              View All Matches
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
