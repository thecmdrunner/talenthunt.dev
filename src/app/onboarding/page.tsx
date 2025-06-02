"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Brain, Search, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { trackPageVisited, trackOnboardingStarted, trackButtonClicked } =
    useTracking();

  const { data: userData } = api.user.getOrCreateUser.useQuery();

  // Track page visit
  useEffect(() => {
    trackPageVisited("onboarding_selection");
  }, [trackPageVisited]);

  useEffect(() => {
    if (userData) {
      const isCandidateOnboarded =
        !!userData.candidateProfile?.onboardingCompletedAt;
      const isRecruiterOnboarded =
        !!userData.recruiterProfile?.onboardingCompletedAt;

      if (isCandidateOnboarded || isRecruiterOnboarded) {
        router.push("/dashboard");
      }
    }
  }, [userData, router]);

  const handleCandidateStart = () => {
    trackOnboardingStarted("candidate");
    trackButtonClicked("start_candidate_onboarding", "onboarding_selection");
  };

  const handleRecruiterStart = () => {
    trackOnboardingStarted("recruiter");
    trackButtonClicked("start_recruiter_onboarding", "onboarding_selection");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Starting Geometric Components - matching landing page */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-32 overflow-hidden">
        {/* Top geometric border */}
        <div className="absolute top-0 right-0 left-0 h-1 animate-pulse bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400"></div>

        {/* Geometric shapes at the top */}
        <div className="absolute top-4 left-10 h-8 w-8 rotate-45 animate-spin border-2 border-blue-300/30"></div>
        <div className="absolute top-6 right-20 h-6 w-6 animate-bounce rounded-full bg-blue-400/20"></div>
        <div className="absolute top-8 left-1/4 h-4 w-4 rotate-12 animate-pulse bg-blue-300/40"></div>
        <div className="absolute top-4 right-1/3 h-2 w-10 bg-gradient-to-r from-blue-400/30 to-transparent"></div>
        <div className="absolute top-12 left-1/2 h-6 w-6 animate-ping rounded-full border border-blue-300/25"></div>

        {/* Geometric lines */}
        <svg
          className="absolute top-0 h-32 w-full"
          viewBox="0 0 1200 120"
          fill="none"
        >
          <path
            d="M0,40 Q300,20 600,40 T1200,40"
            stroke="rgba(96,165,250,0.2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,60 Q400,40 800,60 T1200,60"
            stroke="rgba(147,197,253,0.15)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Enhanced Sophisticated Geometric Background - matching landing page exactly */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Geometric Shapes with consistent blue colors */}
        <div className="absolute top-10 left-10 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-400/18 to-blue-600/12 blur-3xl"></div>

        {/* Consistent blue geometric grid pattern */}
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

        {/* Advanced SVG Geometric Patterns with blue consistency */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1400 1000"
          fill="none"
        >
          {/* Connection Network in consistent blues */}
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
          <path
            d="M150 500L300 430L450 550L600 470L750 600L900 530L1050 650"
            stroke="rgba(59,130,246,0.1)"
            strokeWidth="1"
            fill="none"
          />

          {/* Blue geometric nodes */}
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
          <circle cx="500" cy="120" r="7" fill="rgba(96,165,250,0.4)" />
          <circle
            cx="650"
            cy="250"
            r="6"
            fill="rgba(59,130,246,0.4)"
            className="animate-pulse"
          />

          {/* Blue geometric shapes */}
          <polygon
            points="200,400 250,350 300,400 250,450"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="1"
            fill="rgba(59,130,246,0.08)"
          />
          <polygon
            points="600,500 650,450 700,500 650,550"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1"
            fill="rgba(96,165,250,0.06)"
          />
          <polygon
            points="1000,300 1050,250 1100,300 1050,350"
            stroke="rgba(96,165,250,0.12)"
            strokeWidth="1"
            fill="rgba(59,130,246,0.05)"
          />
        </svg>

        {/* Floating blue geometric elements */}
        <div className="absolute top-1/4 left-1/5 h-4 w-4 animate-bounce rounded-full bg-blue-300/40"></div>
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-300/50"></div>
        <div className="absolute top-2/3 right-1/3 h-3 w-3 animate-bounce bg-blue-200/30"></div>
        <div className="absolute right-1/5 bottom-1/4 h-2 w-8 rotate-12 bg-gradient-to-r from-blue-300/20 to-transparent"></div>
      </div>

      {/* Navigation Header - matching landing page */}
      <nav className="relative z-10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <div className="absolute inset-2 rounded-lg border border-white/20"></div>
              <Brain className="relative z-10 h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TalentHunt</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <div className="w-full max-w-6xl">
          {/* Enhanced Header Section */}
          <div className="mb-16 text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
                <div className="absolute inset-4 rounded-2xl border border-white/20"></div>
                <Sparkles className="relative z-10 h-10 w-10 text-white" />
                <div className="absolute -inset-2 animate-pulse rounded-3xl border border-blue-400/20"></div>
              </div>
            </div>

            <h1 className="mb-8 text-6xl leading-tight font-bold text-white md:text-7xl">
              Choose Your{" "}
              <span className="relative overflow-visible">
                <span className="bg-gradient-to-tr from-blue-300 to-cyan-100 bg-clip-text text-transparent">
                  Path
                </span>
                <svg
                  className="absolute right-0 -bottom-5 w-full overflow-visible"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,2 Q50,8 100,2"
                    transform="scale(1, -1)"
                    className="fill-none stroke-blue-300 stroke-[3]"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute right-1/4 -bottom-6 left-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              </span>
          </h1>

            <p className="mx-auto mb-12 max-w-4xl text-2xl leading-relaxed text-white/80">
              Whether you're looking for your next opportunity or seeking top
              talent, we'll help you get there with AI-powered matching.
            </p>

            {/* Enhanced geometric underline */}
            <div className="flex justify-center">
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            {/* Enhanced Candidate Card - perfect landing page match */}
            <Card className="group hover:shadow-3xl relative overflow-hidden rounded-3xl border border-blue-400/40 bg-gradient-to-br from-blue-800/60 to-blue-900/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60">
              {/* Enhanced geometric pattern overlay */}
              <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-300"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="15"
                    stroke="currentColor"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="3"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="70"
                    cy="30"
                    r="3"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="30"
                    cy="70"
                    r="3"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="3"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </svg>
        </div>

              {/* Additional geometric elements */}
              <div className="absolute bottom-0 left-0 h-24 w-24 opacity-5">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(96,165,250,0.3) 1px, transparent 1px)`,
                    backgroundSize: "8px 8px",
                  }}
                ></div>
              </div>

              <CardContent className="relative z-10 p-10">
                <div className="mb-10 text-center">
                  <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-4 rounded-2xl border border-white/20"></div>
                    <Users className="relative z-10 h-12 w-12 text-white" />
                    <div className="absolute -inset-1 animate-pulse rounded-3xl border border-blue-400/20"></div>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold text-white">
                    I'm Looking for a Job
              </h2>
                  <p className="text-xl leading-relaxed text-white/80">
                Showcase your skills and get discovered by top recruiters
              </p>
                </div>

                <ul className="mb-10 space-y-5">
                {[
                  "Connect LinkedIn & GitHub profiles",
                  "Upload resume and showcase projects",
                  "Get verified and featured",
                  "Receive personalized job opportunities",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-lg text-white/90"
                    >
                      <div className="mr-4 h-3 w-3 flex-shrink-0 animate-pulse rounded-full bg-blue-300"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/onboarding/candidate"
                  onClick={handleCandidateStart}
                  className="block"
                >
                  <Button className="group relative w-full overflow-hidden rounded-2xl bg-white py-6 text-xl font-bold text-blue-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Join as Candidate <ArrowRight className="ml-3 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
            </CardContent>
          </Card>

            {/* Enhanced Recruiter Card - perfect landing page match */}
            <Card className="group hover:shadow-3xl relative overflow-hidden rounded-3xl border border-blue-400/40 bg-gradient-to-br from-blue-700/60 to-blue-900/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60">
              {/* Enhanced different geometric pattern */}
              <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-300"
                >
                  <polygon
                    points="50,15 85,50 50,85 15,50"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                  <polygon
                    points="50,25 75,50 50,75 25,50"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="50,35 65,50 50,65 35,50"
                    stroke="currentColor"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle
                    cx="30"
                    cy="20"
                    r="2"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="70"
                    cy="20"
                    r="2"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="80"
                    cy="70"
                    r="2"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <circle
                    cx="20"
                    cy="70"
                    r="2"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Additional geometric elements */}
              <div className="absolute bottom-0 left-0 h-24 w-24 opacity-5">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `conic-gradient(from 45deg, rgba(96,165,250,0.3), transparent, rgba(96,165,250,0.3))`,
                    backgroundSize: "12px 12px",
                  }}
                ></div>
              </div>

              <CardContent className="relative z-10 p-10">
                <div className="mb-10 text-center">
                  <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-4 rounded-2xl border border-white/20"></div>
                    <Search className="relative z-10 h-12 w-12 text-white" />
                    <div className="absolute -inset-1 animate-pulse rounded-3xl border border-blue-400/20"></div>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold text-white">
                    I'm Looking to Hire
              </h2>
                  <p className="text-xl leading-relaxed text-white/80">
                    Find perfect candidates using AI-powered natural language
                    search
                  </p>
                </div>

                <ul className="mb-10 space-y-5">
                {[
                  "Search with natural language queries",
                  "Access verified candidate profiles",
                  "Auto-screen and rank candidates",
                  "Launch personalized outreach campaigns",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-lg text-white/90"
                    >
                      <div className="mr-4 h-3 w-3 flex-shrink-0 animate-pulse rounded-full bg-blue-300"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/onboarding/recruiter"
                  onClick={handleRecruiterStart}
                  className="block"
                >
                  <Button className="group relative w-full overflow-hidden rounded-2xl bg-white py-6 text-xl font-bold text-blue-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Start Hiring <ArrowRight className="ml-3 h-5 w-5" />
                    </span>
                  </Button>
                </Link>
            </CardContent>
          </Card>
        </div>

          {/* Enhanced Footer Note */}
          <div className="mt-16 text-center">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -inset-4 rounded-2xl border border-blue-400/10"></div>
              <p className="relative z-10 text-lg text-white/60">
            Already have an account? You can change your role anytime in
            settings.
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
