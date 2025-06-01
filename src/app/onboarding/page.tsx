"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { Search, Target, User, Brain, Sparkles, ArrowRight } from "lucide-react";
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
        !!userData.candidateProfile.onboardingCompletedAt;
      const isRecruiterOnboarded =
        !!userData.recruiterProfile.onboardingCompletedAt;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Enhanced Geometric Background - matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Geometric Shapes with consistent blue colors */}
        <div className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400/18 to-blue-600/12 blur-3xl"></div>
        
        {/* Consistent blue geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px),
              linear-gradient(rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Advanced SVG Geometric Patterns with blue consistency */}
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 1400 1000" fill="none">
          {/* Connection Network in consistent blues */}
          <path d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350" 
                stroke="rgba(96,165,250,0.15)" strokeWidth="2" fill="none" />
          <path d="M100 300L250 230L400 350L550 270L700 400L850 330L1000 450L1150 370" 
                stroke="rgba(147,197,253,0.12)" strokeWidth="1.5" fill="none" />

          {/* Blue geometric nodes */}
          <circle cx="50" cy="150" r="6" fill="rgba(96,165,250,0.4)" className="animate-pulse" />
          <circle cx="200" cy="80" r="8" fill="rgba(59,130,246,0.5)" />
          <circle cx="350" cy="200" r="5" fill="rgba(147,197,253,0.3)" className="animate-pulse" />
          <circle cx="500" cy="120" r="7" fill="rgba(96,165,250,0.4)" />
          
          {/* Blue geometric shapes */}
          <polygon points="200,400 250,350 300,400 250,450" 
                   stroke="rgba(96,165,250,0.15)" strokeWidth="1" fill="rgba(59,130,246,0.08)" />
          <polygon points="600,500 650,450 700,500 650,550" 
                   stroke="rgba(147,197,253,0.12)" strokeWidth="1" fill="rgba(96,165,250,0.06)" />
        </svg>

        {/* Floating blue geometric elements */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-300/50 rounded-full animate-ping"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-2 border border-white/20 rounded-lg"></div>
              <Brain className="w-7 h-7 text-white relative z-10" />
            </div>
            <span className="text-white text-2xl font-bold">TalentHunt</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden border border-blue-400/30">
                <div className="absolute inset-3 border border-white/20 rounded-xl"></div>
                <Sparkles className="w-8 h-8 text-white relative z-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Path
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full"></div>
              </span>
          </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking for your next opportunity or seeking top talent, 
              we'll help you get there with AI-powered matching.
            </p>
            {/* Geometric underline */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
        </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Candidate Card - matching landing page style */}
            <Card className="bg-gradient-to-br from-blue-800/60 to-blue-900/80 backdrop-blur-xl border border-blue-400/40 hover:border-blue-300/60 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
              {/* Geometric pattern overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>

              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden border border-blue-400/30">
                    <div className="absolute inset-3 border border-white/20 rounded-lg"></div>
                    <User className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">I'm Looking for a Job</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                Showcase your skills and get discovered by top recruiters
              </p>
                </div>

                <ul className="space-y-4 mb-8">
                {[
                  "Connect LinkedIn & GitHub profiles",
                  "Upload resume and showcase projects",
                  "Get verified and featured",
                  "Receive personalized job opportunities",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-blue-300 rounded-full mr-4 flex-shrink-0 animate-pulse"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/onboarding/candidate" onClick={handleCandidateStart} className="block">
                  <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Join as Candidate <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </Button>
                </Link>
            </CardContent>
          </Card>

            {/* Recruiter Card - matching landing page style */}
            <Card className="bg-gradient-to-br from-blue-700/60 to-blue-900/80 backdrop-blur-xl border border-blue-400/40 hover:border-blue-300/60 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
              {/* Different geometric pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300">
                  <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" fill="none" strokeWidth="2"/>
                  <polygon points="50,35 65,50 50,65 35,50" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>

              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden border border-blue-400/30">
                    <div className="absolute inset-3 border border-white/20 rounded-lg"></div>
                    <Search className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">I'm Looking to Hire</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                Find perfect candidates using AI-powered natural language search
              </p>
                </div>

                <ul className="space-y-4 mb-8">
                {[
                  "Search with natural language queries",
                  "Access verified candidate profiles",
                  "Auto-screen and rank candidates",
                  "Launch personalized outreach campaigns",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white/90">
                      <div className="w-2 h-2 bg-blue-300 rounded-full mr-4 flex-shrink-0 animate-pulse"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/onboarding/recruiter" onClick={handleRecruiterStart} className="block">
                  <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Start Hiring <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </Button>
                </Link>
            </CardContent>
          </Card>
        </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-white/60 text-sm">
              Already have an account? You can change your role anytime in settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
