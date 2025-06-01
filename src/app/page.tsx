"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Briefcase, Search, ArrowRight, CheckCircle, Zap, Target, Globe, Brain, Users, Sparkles, Linkedin, Github, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [activeView, setActiveView] = useState<"hire" | "find">("hire");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Starting Geometric Components */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        {/* Top geometric border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 animate-pulse"></div>
        
        {/* Geometric shapes at the top */}
        <div className="absolute top-4 left-10 w-8 h-8 border-2 border-blue-300/30 rotate-45 animate-spin"></div>
        <div className="absolute top-6 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-8 left-1/4 w-4 h-4 bg-blue-300/40 rotate-12 animate-pulse"></div>
        <div className="absolute top-4 right-1/3 w-10 h-2 bg-gradient-to-r from-blue-400/30 to-transparent"></div>
        <div className="absolute top-12 left-1/2 w-6 h-6 border border-blue-300/25 rounded-full animate-ping"></div>
        
        {/* Geometric lines */}
        <svg className="absolute top-0 w-full h-32" viewBox="0 0 1200 120" fill="none">
          <path d="M0,40 Q300,20 600,40 T1200,40" stroke="rgba(96,165,250,0.2)" strokeWidth="1" fill="none" />
          <path d="M0,60 Q400,40 800,60 T1200,60" stroke="rgba(147,197,253,0.15)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Enhanced Sophisticated Geometric Background */}
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
          <path d="M150 500L300 430L450 550L600 470L750 600L900 530L1050 650" 
                stroke="rgba(59,130,246,0.1)" strokeWidth="1" fill="none" />

          {/* Blue geometric nodes */}
          <circle cx="50" cy="150" r="6" fill="rgba(96,165,250,0.4)" className="animate-pulse" />
          <circle cx="200" cy="80" r="8" fill="rgba(59,130,246,0.5)" />
          <circle cx="350" cy="200" r="5" fill="rgba(147,197,253,0.3)" className="animate-pulse" />
          <circle cx="500" cy="120" r="7" fill="rgba(96,165,250,0.4)" />
          <circle cx="650" cy="250" r="6" fill="rgba(59,130,246,0.4)" className="animate-pulse" />

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

      {/* Navigation with consistent blue theme */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-2 border border-white/20 rounded-lg"></div>
              <Brain className="w-7 h-7 text-white relative z-10" />
            </div>
            <span className="text-white text-2xl font-bold">TalentHunt</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-white/80 hover:text-white transition-colors font-medium relative">
              Features
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 hover:w-full"></div>
            </Link>
            <Link href="#pricing" className="text-white/80 hover:text-white transition-colors font-medium relative">
              Pricing
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 hover:w-full"></div>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-white border border-blue-400/30 font-medium px-6 py-2 rounded-full backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Get Started</span>
            </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Geometry and consistent blues */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Toggle Buttons with blue consistency */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <Button 
            onClick={() => setActiveView("hire")}
            className={`${
              activeView === "hire"
                ? "bg-white text-blue-900 shadow-lg"
                : "bg-blue-600/20 text-white border border-blue-400/30 hover:bg-blue-600/30"
            } font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Hire Talent</span>
          </Button>
          <Button 
            onClick={() => setActiveView("find")}
            className={`${
              activeView === "find"
                ? "bg-white text-blue-900 shadow-lg"
                : "bg-blue-600/20 text-white border border-blue-400/30 hover:bg-blue-600/30"
            } font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Briefcase className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Find Work</span>
          </Button>
        </div>

        {/* Feature Badge with blue consistency */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <Badge className="bg-blue-600/20 text-white border border-blue-400/30 px-6 py-3 rounded-full font-medium text-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5"></div>
              <Sparkles className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">{activeView === "hire" ? "AI-Powered Talent Matching" : "AI-Powered Job Matching"}</span>
            </Badge>
            <div className="absolute -inset-2 border border-blue-400/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Main Headline with consistent blue underline */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the perfect{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                {activeView === "hire" ? "talent" : "opportunity"}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full"></div>
              <div className="absolute -bottom-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          </span>
        </h1>
          <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            TalentHunt is an AI-powered platform. Connect top talent with leading companies through intelligent
            matching.
          </p>
        </div>

        {/* Enhanced Search Bar with blue consistency */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-blue-500/5 rounded-3xl blur-xl"></div>
          <div className="relative flex items-center">
            <div className="absolute left-6 z-10">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder={
                activeView === "hire"
                  ? "Find senior AI engineers with LangChain + RAG experience in San Francisco..."
                  : "Search for remote product manager roles in SaaS startups..."
              }
              className="w-full pl-16 pr-32 py-8 text-xl bg-white/95 backdrop-blur-sm border-0 rounded-2xl focus:ring-2 focus:ring-blue-300/50 text-gray-800 placeholder:text-gray-500 shadow-2xl"
            />
            <Button className="absolute right-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg">
              Search
            </Button>
          </div>
        </div>

        {/* Stats with blue geometric separators */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-white/80 mb-20">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">10,000+ verified developers</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent mx-4"></div>
            </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">500+ companies hiring</span>
            </div>
          <div className="hidden md:flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent mx-4"></div>
            </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">90% faster hiring</span>
          </div>
        </div>
            </div>

      {/* Enhanced Search Interface Demo Card with blue consistency */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-24">
        <Card className="bg-gradient-to-br from-blue-800/40 to-blue-900/60 backdrop-blur-xl border border-blue-400/30 shadow-2xl rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(96,165,250,0.15) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <CardContent className="p-8 relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
              <div className="flex-1 bg-blue-800/60 backdrop-blur-sm rounded-lg px-4 py-2 ml-4 border border-blue-500/30">
                <span className="text-blue-200 text-sm">talenthunt.dev/search</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-800/80 to-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300">
                  <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1"/>
                </svg>
              </div>
              
              <div className="text-center mb-8 relative z-10">
                <p className="text-white/90 text-xl mb-6 font-medium">What kind of talent are you looking for?</p>

                <div className="bg-blue-700/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/5"></div>
                  <p className="text-white text-lg mb-4 relative z-10">
                    Senior GenAI engineers with LangChain + RAG experience in Europe...
                  </p>

                  <div className="flex justify-center mb-4 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-2 border border-white/20 rounded-full"></div>
                      <div className="w-6 h-6 bg-white rounded-full relative z-10"></div>
                    </div>
          </div>
        </div>

                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Search</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
            </div>

      {/* Enhanced Welcome Cards with perfect blue consistency */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden border border-blue-400/30">
              <div className="absolute inset-3 border border-white/20 rounded-xl"></div>
              <Sparkles className="w-8 h-8 text-white relative z-10" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to TalentHunt.dev</h2>
          <p className="text-xl text-white/80">Choose your path to get started</p>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>
              </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Enhanced Job Seeker Card with blue consistency */}
          <Card className="bg-gradient-to-br from-blue-800/60 to-blue-900/80 backdrop-blur-xl border border-blue-400/40 hover:border-blue-300/60 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
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
                  <Users className="w-10 h-10 text-white relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">I'm Looking for a Job</h3>
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

              <Link href="/onboarding/candidate" className="block">
                <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Join as Candidate <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Recruiter Card with blue consistency */}
          <Card className="bg-gradient-to-br from-blue-700/60 to-blue-900/80 backdrop-blur-xl border border-blue-400/40 hover:border-blue-300/60 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
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
                <h3 className="text-2xl font-bold text-white mb-4">I'm Looking to Hire</h3>
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

              <Link href="/onboarding/recruiter" className="block">
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
          </div>

      {/* Enhanced Features Section with blue consistency */}
      <div id="features" className="relative z-10 bg-gradient-to-b from-blue-800/50 to-blue-900/80 backdrop-blur-sm border-t border-blue-400/20">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose TalentHunt?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Advanced AI technology meets human expertise for the future of hiring
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: "AI Verification", desc: "Every profile verified by AI" },
              { icon: Target, title: "Smart Matching", desc: "Precision candidate ranking" },
              { icon: Zap, title: "Lightning Fast", desc: "90% reduction in hiring time" },
              { icon: Globe, title: "Global Reach", desc: "Access worldwide talent pool" },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-blue-700/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `conic-gradient(from 45deg, rgba(96,165,250,0.2), transparent, rgba(96,165,250,0.2))`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden border border-blue-400/30">
                    <div className="absolute inset-2 border border-white/20 rounded-lg"></div>
                    <feature.icon className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Verification Section with blue consistency */}
      <div className="relative z-10 bg-gradient-to-b from-blue-900/80 to-blue-800/60 backdrop-blur-sm border-t border-blue-400/20">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Verified Talent, Verified Quality</h2>
          <p className="max-w-3xl mx-auto text-xl text-white/80 mb-16">
            Our verification process ensures you connect with authentic, qualified professionals
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-blue-700/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300">
                  <rect x="20" y="20" width="60" height="60" stroke="currentColor" fill="none" strokeWidth="2" rx="10"/>
                  <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="w-20 h-20 bg-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform border border-blue-400/30">
                  <Linkedin className="w-12 h-12 text-blue-200" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">LinkedIn Verified</h3>
                <p className="text-white/80">
                  All users verify their professional identity through LinkedIn authentication
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-700/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2"/>
                  <path d="M35,50 L50,35 L65,50 L50,65 Z" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="w-20 h-20 bg-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform border border-blue-400/30">
                  <Github className="w-12 h-12 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">GitHub Verified</h3>
                <p className="text-white/80">
                  Developers showcase verified projects and contributions from GitHub
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Final CTA with blue consistency */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative">
          <div className="absolute -inset-8 border border-blue-400/10 rounded-3xl"></div>
          <div className="absolute -inset-4 border border-blue-400/20 rounded-2xl"></div>
          
          <h2 className="text-5xl font-bold text-white mb-6 relative z-10">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-white/80 mb-12 relative z-10">Join 500+ companies already using TalentHunt</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/recruiter/signup">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Start Free Trial</span>
              </Button>
            </Link>
            <Button className="bg-blue-600/20 text-white border-2 border-blue-400/30 hover:bg-blue-600/30 font-bold px-12 py-6 rounded-2xl text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Schedule Demo</span>
            </Button>
                    </div>
                    </div>
                  </div>

      {/* Enhanced Footer with perfect blue consistency */}
      <footer className="relative z-10 bg-gradient-to-b from-blue-900/90 to-blue-950/95 backdrop-blur-sm border-t border-blue-400/20">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-2 border border-white/20 rounded-lg"></div>
                  <Brain className="w-7 h-7 text-white relative z-10" />
                </div>
                <span className="text-white text-2xl font-bold">TalentHunt</span>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                AI-powered talent matching for the modern workforce. Connect top talent with leading companies through intelligent matching.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" }
                ].map((social, index) => (
                  <Link key={index} href={social.href} className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm relative overflow-hidden group border border-blue-400/30">
                    <div className="absolute inset-2 border border-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <social.icon className="w-5 h-5 text-white relative z-10" />
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
                ]
              },
              {
                title: "Company", 
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                  { name: "Press", href: "/press" },
                  { name: "Partners", href: "/partners" },
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-bold text-lg mb-6 relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors font-medium relative group">
                        <span className="relative z-10">{link.name}</span>
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
                    </div>
            ))}

                    <div>
              <h4 className="text-white font-bold text-lg mb-6 relative">
                Support
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </h4>
              <ul className="space-y-4 mb-8">
                {[
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Status", href: "/status" },
                  { name: "Security", href: "/security" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors font-medium relative group">
                      <span className="relative z-10">{link.name}</span>
                      <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                {[
                  { icon: Mail, text: "hello@talenthunt.dev" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white/70 group">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <contact.icon className="w-4 h-4 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <span className="text-sm group-hover:text-white transition-colors">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-blue-400/20 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-white/60">
                <p>&copy; 2024 TalentHunt.dev. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                      <span className="relative z-10">{item}</span>
                      <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse relative z-10"></div>
                  <span className="relative z-10">All Systems Operational</span>
                </Badge>
          </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
