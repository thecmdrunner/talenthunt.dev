"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTracking } from "@/lib/hooks/use-tracking";
import { cn } from "@/lib/utils";
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
  Users,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type TabValue = "candidate" | "recruiter";

export default function Dashboard({
  user,
}: {
  user: RouterOutputs["user"]["getOrCreateUser"];
}) {
  const { trackPageVisited, trackOnboardingStarted, trackTabSwitched } =
    useTracking();

  const { user: clerkUser } = useUser();

  const isCandidateOnboarded = !!user?.candidateProfile.onboardingCompletedAt;
  const isRecruiterOnboarded = !!user?.recruiterProfile.onboardingCompletedAt;
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
            <div className="flex items-center space-x-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <div className="absolute inset-2 rounded-lg border border-white/20"></div>
                <Brain className="relative z-10 h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">TalentHunt</span>
            </div>
          </div>
        </nav>

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
                    <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                      <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
                    </svg>
                  </div>
                  <CardContent className="relative z-10 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/20 group-hover:bg-blue-200/30 backdrop-blur-sm">
                      <Target className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                    I&apos;m Looking for Opportunities
                  </h3>
                    <p className="mb-4 text-white/70">
                    Build your profile and get discovered by top recruiters
                  </p>
                    <Button asChild className="w-full bg-white text-blue-900 hover:bg-blue-50 font-medium">
                    <Link href="/onboarding/candidate">
                      Get Started as Candidate
                    </Link>
                  </Button>
                </CardContent>
              </Card>

                <Card className="group cursor-pointer border border-blue-400/30 bg-blue-700/30 backdrop-blur-sm transition-all hover:border-blue-300/50 hover:shadow-lg">
                  <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                    <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                      <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" fill="none" strokeWidth="2" />
                    </svg>
                  </div>
                  <CardContent className="relative z-10 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/20 group-hover:bg-blue-200/30 backdrop-blur-sm">
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
                      className="w-full bg-white text-blue-900 hover:bg-blue-50 font-medium"
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
          <div className="flex items-center space-x-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <div className="absolute inset-2 rounded-lg border border-white/20"></div>
              <Brain className="relative z-10 h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TalentHunt</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
            <h1 className="mb-2 text-3xl font-bold text-white">
            Welcome back {clerkUser?.fullName ?? ""}! 👋
          </h1>

          <div className="flex gap-2">
            <button
              className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm",
                tabValue === "candidate"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "bg-blue-600/20 text-white hover:bg-blue-600/30 border border-blue-400/30",
              )}
              onClick={() => setTabValue("candidate")}
            >
              <Target className="h-4 w-4" />
              Profile Analytics
            </button>
            <button
              className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm",
                tabValue === "recruiter"
                    ? "bg-white text-blue-900 shadow-sm"
                    : "bg-blue-600/20 text-white hover:bg-blue-600/30 border border-blue-400/30",
              )}
              onClick={() => setTabValue("recruiter")}
            >
              <Search className="h-4 w-4" />
              Recruiter Analytics
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCandidateOnboarded && (
              <Badge className="bg-blue-100/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
              <Target className="mr-1 h-3 w-3" />
            </Badge>
          )}
          {isRecruiterOnboarded && (
              <Badge className="bg-blue-100/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
              <Search className="mr-1 h-3 w-3" />
            </Badge>
          )}
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
      {/* Profile Progress */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl lg:col-span-2">
        <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
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
              <span className="text-sm font-medium text-white/80">Progress</span>
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
                <Button size="sm" className="bg-white text-blue-900 hover:bg-blue-50">
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
            <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" fill="none" strokeWidth="1" />
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
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" fill="none" strokeWidth="1" rx="10" />
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
            <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
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
                <Badge className="bg-blue-100/20 text-blue-300 border border-blue-400/30">
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
            <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1" />
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
            {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
              <Badge
                key={skill}
                className="bg-blue-100/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm"
              >
                {skill}
              </Badge>
            ))}
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
      {/* Profile Setup */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl lg:col-span-2">
        <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="2" />
            <polygon points="50,25 75,50 50,75 25,50" stroke="currentColor" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/20 backdrop-blur-sm">
              <User className="h-4 w-4 text-blue-300" />
            </div>
            Recruiter Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">Setup Progress</span>
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
                  ? "🚀 Ready to find amazing candidates!"
                  : "Complete setup to start searching for candidates"}
              </span>
              {!isComplete && (
                <Button size="sm" className="bg-white text-blue-900 hover:bg-blue-50">
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Credits */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="1" />
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

      {/* Candidate Search */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" fill="none" strokeWidth="1" rx="10" />
          </svg>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Search className="h-4 w-4 text-blue-400" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <p className="text-sm text-white/70">
            Use natural language to find the perfect candidates.
          </p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
            Start AI Search
          </Button>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" fill="none" strokeWidth="1" />
          </svg>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-4 w-4 text-blue-400" />
            Active Outreach
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="rounded-lg border border-green-500/30 bg-green-500/20 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">React Developers</span>
                <Badge className="bg-green-100/20 text-green-300 border border-green-400/30">Active</Badge>
              </div>
              <p className="text-sm text-white/70">12 contacts, 3 responses</p>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-50">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
          </svg>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="h-4 w-4 text-orange-400" />
            Top Matches
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-700/40 p-3 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-white">Sarah Chen</p>
                <p className="text-sm text-white/70">Senior React Developer</p>
              </div>
              <Badge className="bg-blue-100/20 text-blue-300 border border-blue-400/30">97%</Badge>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-50">
              View All Candidates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
