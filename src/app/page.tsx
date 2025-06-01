"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Target,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [activeView, setActiveView] = useState<"hire" | "find">("hire");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Starting Geometric Components */}
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

      {/* Enhanced Sophisticated Geometric Background */}
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
        </svg>

        {/* Floating blue geometric elements */}
        <div className="absolute top-1/4 left-1/5 h-4 w-4 animate-bounce rounded-full bg-blue-300/40"></div>
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-300/50"></div>
      </div>

      {/* Navigation with consistent blue theme */}
      <nav className="relative z-10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <div className="absolute inset-2 rounded-lg border border-white/20"></div>
              <Brain className="relative z-10 h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TalentHunt</span>
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="#features"
              className="relative font-medium text-white/80 transition-colors hover:text-white"
            >
              Features
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-300 hover:w-full"></div>
            </Link>
            <Link
              href="#pricing"
              className="relative font-medium text-white/80 transition-colors hover:text-white"
            >
              Pricing
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-300 hover:w-full"></div>
            </Link>
            <Link href="/auth/login">
              <Button className="group relative overflow-hidden rounded-full border border-blue-400/30 bg-blue-600/20 px-6 py-2 font-medium text-white backdrop-blur-sm hover:bg-blue-600/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="relative z-10">Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Geometry and consistent blues */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24">
        {/* Toggle Buttons with blue consistency */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          <Button
            onClick={() => setActiveView("hire")}
            className={`${
              activeView === "hire"
                ? "bg-white text-blue-900 shadow-lg"
                : "border border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30"
            } group relative overflow-hidden rounded-full px-8 py-3 font-medium backdrop-blur-sm transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <Zap className="relative z-10 mr-2 h-4 w-4" />
            <span className="relative z-10">Hire Talent</span>
          </Button>
          <Button
            onClick={() => setActiveView("find")}
            className={`${
              activeView === "find"
                ? "bg-white text-blue-900 shadow-lg"
                : "border border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30"
            } group relative overflow-hidden rounded-full px-8 py-3 font-medium backdrop-blur-sm transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <Briefcase className="relative z-10 mr-2 h-4 w-4" />
            <span className="relative z-10">Find Work</span>
          </Button>
        </div>

        {/* Feature Badge with blue consistency */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <Badge className="relative overflow-hidden rounded-full border border-blue-400/30 bg-blue-600/20 px-6 py-3 text-lg font-medium text-white backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5"></div>
              <Sparkles className="relative z-10 mr-2 h-5 w-5" />
              <span className="relative z-10">
                {activeView === "hire"
                  ? "AI-Powered Talent Matching"
                  : "AI-Powered Job Matching"}
              </span>
            </Badge>
            <div className="absolute -inset-2 animate-pulse rounded-full border border-blue-400/20"></div>
          </div>
        </div>

        {/* Main Headline with consistent blue underline */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-6xl leading-tight font-bold text-white md:text-7xl">
            Find the perfect{" "}
            <span className="relative overflow-visible">
              <span className="bg-gradient-to-tr from-blue-300 to-cyan-100 bg-clip-text text-transparent">
                {activeView === "hire" ? "talent" : "opportunity"}
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
          <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-white/80">
            TalentHunt is an AI-powered platform. Connect top talent with
            leading companies through intelligent matching.
          </p>
        </div>

        {/* Enhanced Search Bar with blue consistency */}
        <div className="relative mx-auto mb-20 max-w-4xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/10 to-blue-500/5 blur-xl"></div>
          <div className="relative flex items-center">
            <div className="absolute left-6 z-10">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder={
                activeView === "hire"
                  ? "Find senior AI engineers with LangChain + RAG experience in San Francisco..."
                  : "Search for remote product manager roles in SaaS startups..."
              }
              className="w-full rounded-2xl border-0 bg-white/95 py-8 pr-32 pl-16 text-xl text-gray-800 shadow-2xl backdrop-blur-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300/50"
            />
            <Button className="absolute right-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800">
              Search
            </Button>
          </div>
        </div>

        {/* Stats with blue geometric separators */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-8 text-white/80 md:gap-12">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-300"></div>
            <span className="text-lg">10,000+ verified developers</span>
          </div>
          <div className="hidden items-center md:flex">
            <div className="mx-4 h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-300"></div>
            <span className="text-lg">500+ companies hiring</span>
          </div>
          <div className="hidden items-center md:flex">
            <div className="mx-4 h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-300"></div>
            <span className="text-lg">90% faster hiring</span>
          </div>
        </div>
      </div>

      {/* Enhanced Search Interface Demo Card with blue consistency */}
      <div className="relative z-10 mx-auto mb-24 max-w-5xl px-6">
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

          <CardContent className="relative z-10 p-8">
            <div className="mb-8 flex items-center space-x-3">
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-lg"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg"></div>
              <div className="ml-4 flex-1 rounded-lg border border-blue-500/30 bg-blue-800/60 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm text-blue-200">
                  talenthunt.dev/search
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-800/80 to-blue-900/80 p-8 backdrop-blur-sm">
              <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-300"
                >
                  <polygon
                    points="50,10 90,50 50,90 10,50"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="relative z-10 mb-8 text-center">
                <p className="mb-6 text-xl font-medium text-white/90">
                  What kind of talent are you looking for?
                </p>

                <div className="relative mb-6 overflow-hidden rounded-xl border border-blue-500/30 bg-blue-700/40 p-6 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/5"></div>
                  <p className="relative z-10 mb-4 text-lg text-white">
                    Senior GenAI engineers with LangChain + RAG experience in
                    Europe...
                  </p>

                  <div className="relative z-10 mb-4 flex justify-center">
                    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                      <div className="absolute inset-2 rounded-full border border-white/20"></div>
                      <div className="relative z-10 h-6 w-6 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <Sparkles className="relative z-10 mr-2 h-4 w-4" />
                  <span className="relative z-10">Search</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Welcome Cards with perfect blue consistency */}
      <div className="relative z-10 mx-auto mb-24 max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
              <div className="absolute inset-3 rounded-xl border border-white/20"></div>
              <Sparkles className="relative z-10 h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white">
            Welcome to TalentHunt.dev
          </h2>
          <p className="text-xl text-white/80">
            Choose your path to get started
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Enhanced Job Seeker Card with blue consistency */}
          <Card className="group hover:shadow-3xl relative overflow-hidden rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-800/60 to-blue-900/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
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

            <CardContent className="relative z-10 p-8">
              <div className="mb-8 text-center">
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-3 rounded-lg border border-white/20"></div>
                  <Users className="relative z-10 h-10 w-10 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  I'm Looking for a Job
                </h3>
                <p className="text-lg leading-relaxed text-white/80">
                  Showcase your skills and get discovered by top recruiters
                </p>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  "Connect LinkedIn & GitHub profiles",
                  "Upload resume and showcase projects",
                  "Get verified and featured",
                  "Receive personalized job opportunities",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className="mr-4 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-blue-300"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/welcome" className="block">
                <Button className="group relative w-full overflow-hidden rounded-xl bg-white py-4 font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Join as Candidate <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Recruiter Card with blue consistency */}
          <Card className="group hover:shadow-3xl relative overflow-hidden rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-700/60 to-blue-900/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
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
                <polygon
                  points="50,35 65,50 50,65 35,50"
                  stroke="currentColor"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
            </div>

            <CardContent className="relative z-10 p-8">
              <div className="mb-8 text-center">
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-3 rounded-lg border border-white/20"></div>
                  <Search className="relative z-10 h-10 w-10 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  I'm Looking to Hire
                </h3>
                <p className="text-lg leading-relaxed text-white/80">
                  Find perfect candidates using AI-powered natural language
                  search
                </p>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  "Search with natural language queries",
                  "Access verified candidate profiles",
                  "Auto-screen and rank candidates",
                  "Launch personalized outreach campaigns",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className="mr-4 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-blue-300"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/recruiter/signup" className="block">
                <Button className="group relative w-full overflow-hidden rounded-xl bg-white py-4 font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Start Hiring <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Features Section with blue consistency */}
      <div
        id="features"
        className="relative z-10 border-t border-blue-400/20 bg-gradient-to-b from-blue-800/50 to-blue-900/80 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-5xl font-bold text-white">
              Why Choose TalentHunt?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-white/80">
              Advanced AI technology meets human expertise for the future of
              hiring
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle,
                title: "AI Verification",
                desc: "Every profile verified by AI",
              },
              {
                icon: Target,
                title: "Smart Matching",
                desc: "Precision candidate ranking",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "90% reduction in hiring time",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Access worldwide talent pool",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-blue-400/30 bg-blue-700/30 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:shadow-2xl"
              >
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `conic-gradient(from 45deg, rgba(96,165,250,0.2), transparent, rgba(96,165,250,0.2))`,
                      backgroundSize: "40px 40px",
                    }}
                  ></div>
                </div>

                <CardContent className="relative z-10 p-8 text-center">
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-600/30 transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute inset-2 rounded-lg border border-white/20"></div>
                    <feature.icon className="relative z-10 h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Verification Section with blue consistency */}
      <div className="relative z-10 border-t border-blue-400/20 bg-gradient-to-b from-blue-900/80 to-blue-800/60 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mb-8 text-5xl font-bold text-white">
            Verified Talent, Verified Quality
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-xl text-white/80">
            Our verification process ensures you connect with authentic,
            qualified professionals
          </p>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card className="group relative overflow-hidden border border-blue-400/30 bg-blue-700/30 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-300"
                >
                  <rect
                    x="20"
                    y="20"
                    width="60"
                    height="60"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    rx="10"
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

              <CardContent className="relative z-10 p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/30 transition-transform group-hover:scale-105">
                  <Linkedin className="h-12 w-12 text-blue-200" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  LinkedIn Verified
                </h3>
                <p className="text-white/80">
                  All users verify their professional identity through LinkedIn
                  authentication
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-blue-400/30 bg-blue-700/30 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:shadow-2xl">
              <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
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
                  <path
                    d="M35,50 L50,35 L65,50 L50,65 Z"
                    stroke="currentColor"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </div>

              <CardContent className="relative z-10 p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/30 transition-transform group-hover:scale-105">
                  <Github className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  GitHub Verified
                </h3>
                <p className="text-white/80">
                  Developers showcase verified projects and contributions from
                  GitHub
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Final CTA with blue consistency */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="relative">
          <div className="absolute -inset-8 rounded-3xl border border-blue-400/10"></div>
          <div className="absolute -inset-4 rounded-2xl border border-blue-400/20"></div>

          <h2 className="relative z-10 mb-6 text-5xl font-bold text-white">
            Ready to Transform Your Hiring?
          </h2>
          <p className="relative z-10 mb-12 text-xl text-white/80">
            Join 500+ companies already using TalentHunt
          </p>
          <div className="relative z-10 flex flex-col justify-center gap-6 sm:flex-row">
            <Link href="/recruiter/signup">
              <Button className="group relative overflow-hidden rounded-2xl bg-white px-12 py-6 text-xl font-bold text-blue-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="relative z-10">Start Free Trial</span>
              </Button>
            </Link>
            <Button className="group relative overflow-hidden rounded-2xl border-2 border-blue-400/30 bg-blue-600/20 px-12 py-6 text-xl font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600/30">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span className="relative z-10">Schedule Demo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with perfect blue consistency */}
      <footer className="relative z-10 border-t border-blue-400/20 bg-gradient-to-b from-blue-900/90 to-blue-950/95 backdrop-blur-sm">
        <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>

        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center space-x-3">
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <div className="absolute inset-2 rounded-lg border border-white/20"></div>
                  <Brain className="relative z-10 h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  TalentHunt
                </span>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-white/70">
                AI-powered talent matching for the modern workforce. Connect top
                talent with leading companies through intelligent matching.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-blue-400/30 bg-blue-600/20 backdrop-blur-sm transition-colors hover:bg-blue-600/30"
                  >
                    <div className="absolute inset-2 rounded-md border border-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <social.icon className="relative z-10 h-5 w-5 text-white" />
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "API", href: "/api" },
                  { name: "Integrations", href: "/integrations" },
                  { name: "Enterprise", href: "/enterprise" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                  { name: "Press", href: "/press" },
                  { name: "Partners", href: "/partners" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="relative mb-6 text-lg font-bold text-white">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-transparent"></div>
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group relative font-medium text-white/70 transition-colors hover:text-white"
                      >
                        <span className="relative z-10">{link.name}</span>
                        <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="relative mb-6 text-lg font-bold text-white">
                Support
                <div className="absolute -bottom-2 left-0 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </h4>
              <ul className="mb-8 space-y-4">
                {[
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Status", href: "/status" },
                  { name: "Security", href: "/security" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group relative font-medium text-white/70 transition-colors hover:text-white"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                {[
                  { icon: Mail, text: "hello@talenthunt.dev" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-3 text-white/70"
                  >
                    <div className="flex h-5 w-5 items-center justify-center">
                      <contact.icon className="h-4 w-4 transition-colors group-hover:text-blue-300" />
                    </div>
                    <span className="text-sm transition-colors group-hover:text-white">
                      {contact.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative border-t border-blue-400/20 pt-8">
            <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>

            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex flex-col items-center space-y-2 text-white/60 md:flex-row md:space-y-0 md:space-x-6">
                <p>&copy; 2024 TalentHunt.dev. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="group relative transition-colors hover:text-white"
                    >
                      <span className="relative z-10">{item}</span>
                      <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="relative overflow-hidden border border-green-500/30 bg-green-500/20 px-3 py-1 text-green-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"></div>
                  <div className="relative z-10 mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  <span className="relative z-10">All Systems Operational</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
