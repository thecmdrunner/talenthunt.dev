"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ArrowRight, Search, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user already has a profile, redirect them
  if (
    user?.candidateProfile?.onboardingCompletedAt ||
    user?.recruiterProfile?.onboardingCompletedAt
  ) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Choose Your Path
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100 md:text-xl">
            Whether you&apos;re looking for your next opportunity or seeking top
            talent, we&apos;ll help you get there with AI-powered matching.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Candidate Card */}
          <Card className="hover:shadow-3xl transform border-0 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                I&apos;m Looking for a Job
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Showcase your skills and get discovered by top recruiters
              </p>

              <div className="mb-8 space-y-4 text-left">
                {[
                  "Connect LinkedIn & GitHub profiles",
                  "Upload resume and showcase projects",
                  "Get verified and featured",
                  "Receive personalized job opportunities",
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link
                  href="/onboarding/candidate"
                  className="group flex w-full items-center gap-2 bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
                >
                  Join as Candidate
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recruiter Card */}
          <Card className="hover:shadow-3xl transform border-0 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Search className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                I&apos;m Looking to Hire
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Find perfect candidates using AI-powered natural language search
              </p>

              <div className="mb-8 space-y-4 text-left">
                {[
                  "Search with natural language queries",
                  "Access verified candidate profiles",
                  "Auto-screen and rank candidates",
                  "Launch personalized outreach campaigns",
                ].map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link
                  href="/onboarding/recruiter"
                  className="group flex w-full items-center gap-2 bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
                >
                  Start Hiring
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-blue-100">
            Already have an account? You can change your role anytime in
            settings.
          </p>
        </div>
      </div>
    </div>
  );
}
