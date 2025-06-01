"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTracking } from "@/lib/hooks/use-tracking";
import { type RouterOutputs } from "@/trpc/react";
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
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard({
  user,
}: {
  user: RouterOutputs["user"]["getOrCreateUser"];
}) {
  const { trackPageVisited, trackOnboardingStarted, trackTabSwitched } =
    useTracking();

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

  if (!isCandidateOnboarded && !isRecruiterOnboarded) {
    return (
      <div className="z-[2] min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Card className="border-0 shadow-xl">
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <User className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                Welcome to Your Career Hub
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                Choose your journey and unlock opportunities in the world of
                talent.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group cursor-pointer border-2 border-transparent transition-all hover:border-blue-500 hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      I&apos;m Looking for Opportunities
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Build your profile and get discovered by top recruiters
                    </p>
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => trackOnboardingStarted("candidate")}
                    >
                      <Link href="/onboarding/candidate">
                        Get Started as Candidate
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group cursor-pointer border-2 border-transparent transition-all hover:border-purple-500 hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200">
                      <Search className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      I&apos;m Hiring Talent
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Find and connect with the perfect candidates
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-purple-500 text-purple-600 hover:bg-purple-500"
                      onClick={() => trackOnboardingStarted("recruiter")}
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
    <div className="z-[2] min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-2">
            {isCandidateOnboarded && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Target className="mr-1 h-3 w-3" />
                Candidate
              </Badge>
            )}
            {isRecruiterOnboarded && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700"
              >
                <Search className="mr-1 h-3 w-3" />
                Recruiter
              </Badge>
            )}
          </div>
        </div>

        {hasBothProfiles ? (
          <Tabs defaultValue="candidate" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="candidate"
                className="flex items-center gap-2"
                onClick={() => trackTabSwitched("recruiter", "candidate")}
              >
                <Target className="h-4 w-4" />
                Candidate View
              </TabsTrigger>
              <TabsTrigger
                value="recruiter"
                className="flex items-center gap-2"
                onClick={() => trackTabSwitched("candidate", "recruiter")}
              >
                <Search className="h-4 w-4" />
                Recruiter View
              </TabsTrigger>
            </TabsList>

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Profile Progress */}
      <Card className="border-0 shadow-lg lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm font-bold">
                  {currentStep}/{maxSteps}
                </span>
              </div>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={isComplete ? "text-green-600" : "text-gray-600"}>
                {isComplete
                  ? "🎉 Profile complete! You're discoverable by recruiters."
                  : "Complete your profile to get discovered by top recruiters"}
              </span>
              {!isComplete && (
                <Button size="sm" variant="outline">
                  Continue Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Profile Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">127</div>
          <p className="text-sm text-gray-600">+12% from last week</p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Profile viewed by TechCorp
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <div className="h-2 w-2 rounded-full bg-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">Skills updated</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Matches */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-purple-500" />
            Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Senior Developer</h4>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  95% match
                </Badge>
              </div>
              <p className="text-sm text-gray-600">TechStartup Inc.</p>
            </div>
            <Button variant="outline" className="w-full">
              View All Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Endorsements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Profile Setup */}
      <Card className="border-0 shadow-lg lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            Recruiter Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Setup Progress</span>
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm font-bold">
                  {currentStep}/{maxSteps}
                </span>
              </div>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={isComplete ? "text-green-600" : "text-gray-600"}>
                {isComplete
                  ? "🚀 Ready to find amazing candidates!"
                  : "Complete setup to start searching for candidates"}
              </span>
              {!isComplete && (
                <Button size="sm" variant="outline">
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Credits */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Search className="h-4 w-4 text-green-500" />
            Search Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">47</div>
          <p className="text-sm text-gray-600">remaining this month</p>
        </CardContent>
      </Card>

      {/* Candidate Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-500" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Use natural language to find the perfect candidates.
          </p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Start AI Search
          </Button>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            Active Outreach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">React Developers</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600">12 contacts, 3 responses</p>
            </div>
            <Button variant="outline" className="w-full">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4 text-orange-500" />
            Top Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="flex-1">
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-gray-600">Senior React Developer</p>
              </div>
              <Badge variant="secondary">97%</Badge>
            </div>
            <Button variant="outline" className="w-full">
              View All Candidates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
