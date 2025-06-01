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
      {/* Enhanced Sophisticated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Geometric Shapes */}
        <div className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-300/15 to-purple-400/10 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-500/15 blur-3xl"></div>
        
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Advanced SVG Geometric Patterns */}
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 1400 1000" fill="none">
          {/* Connection Network */}
          <path d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350" 
                stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M100 300L250 230L400 350L550 270L700 400L850 330L1000 450L1150 370" 
                stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
          <path d="M150 500L300 430L450 550L600 470L750 600L900 530L1050 650" 
                stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

          {/* Geometric Nodes */}
          <circle cx="50" cy="150" r="6" fill="rgba(147,197,253,0.4)" className="animate-pulse" />
          <circle cx="200" cy="80" r="8" fill="rgba(96,165,250,0.5)" />
          <circle cx="350" cy="200" r="5" fill="rgba(147,197,253,0.3)" className="animate-pulse" />
          <circle cx="500" cy="120" r="7" fill="rgba(59,130,246,0.4)" />
          <circle cx="650" cy="250" r="6" fill="rgba(147,197,253,0.4)" className="animate-pulse" />
          <circle cx="800" cy="180" r="9" fill="rgba(96,165,250,0.5)" />
          <circle cx="950" cy="300" r="5" fill="rgba(147,197,253,0.3)" />
          <circle cx="1100" cy="220" r="7" fill="rgba(59,130,246,0.4)" className="animate-pulse" />

          {/* Complex Geometric Shapes */}
          <polygon points="200,400 250,350 300,400 250,450" 
                   stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(59,130,246,0.05)" />
          <polygon points="600,500 650,450 700,500 650,550" 
                   stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(96,165,250,0.03)" />
          <polygon points="1000,300 1050,250 1100,300 1050,350" 
                   stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(147,197,253,0.04)" />

          {/* Hexagonal Patterns */}
          <polygon points="400,600 430,580 460,600 460,640 430,660 400,640" 
                   stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <polygon points="800,400 830,380 860,400 860,440 830,460 800,440" 
                   stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

          {/* Flowing Lines */}
          <path d="M0,200 Q200,150 400,200 T800,200" 
                stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
          <path d="M0,600 Q300,550 600,600 T1200,600" 
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
        </svg>

        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-200/50 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 border border-blue-300/30 rotate-12 animate-spin"></div>
        <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-indigo-300/40 rounded-full animate-bounce"></div>
      </div>

      {/* Navigation with Geometric Accent */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
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
            <Link href="/auth/login">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-6 py-2 rounded-full backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Geometry */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Toggle Buttons with Geometric Accents */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <Button
            onClick={() => setActiveView("hire")}
            className={`${
              activeView === "hire"
                ? "bg-white text-blue-900 shadow-lg"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            } font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Hire Talent</span>
          </Button>
          <Button
            onClick={() => setActiveView("find")}
            className={`${
              activeView === "find"
                ? "bg-white text-blue-900 shadow-lg"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            } font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Briefcase className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Find Work</span>
          </Button>
        </div>

        {/* Feature Badge with Geometric Frame */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <Badge className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-medium text-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
              <Sparkles className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">{activeView === "hire" ? "AI-Powered Talent Matching" : "AI-Powered Job Matching"}</span>
            </Badge>
            {/* Geometric Frame */}
            <div className="absolute -inset-2 border border-white/10 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Headline with Geometric Underline */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the perfect{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
                {activeView === "hire" ? "talent" : "opportunity"}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-white rounded-full"></div>
              {/* Geometric accent lines */}
              <div className="absolute -bottom-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            </span>
          </h1>
          <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            TalentHunt is an AI-powered platform. Connect top talent with leading companies through intelligent
            matching.
          </p>
        </div>

        {/* Enhanced Search Bar with Geometric Elements */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          {/* Geometric backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl blur-xl"></div>
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
            <Button className="absolute right-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg">
              Search
            </Button>
          </div>
        </div>

        {/* Stats with Geometric Separators */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-white/80 mb-20">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">10,000+ verified developers</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-4"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">500+ companies hiring</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-4"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
            <span className="text-lg">90% faster hiring</span>
          </div>
        </div>
      </div>

      {/* Enhanced Search Interface Demo Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-24">
        <Card className="bg-gradient-to-br from-blue-800/40 to-blue-900/60 backdrop-blur-xl border border-blue-400/30 shadow-2xl rounded-3xl overflow-hidden relative">
          {/* Geometric background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <CardContent className="p-8 relative z-10">
            {/* Browser-like header with geometric elements */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
              <div className="flex-1 bg-blue-900/60 backdrop-blur-sm rounded-lg px-4 py-2 ml-4 border border-blue-500/20">
                <span className="text-blue-200 text-sm">talenthunt.dev/search</span>
              </div>
            </div>

            {/* Enhanced search interface content */}
            <div className="bg-gradient-to-br from-blue-900/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden">
              {/* Subtle geometric pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" fill="none" strokeWidth="1"/>
                </svg>
              </div>
              
              <div className="text-center mb-8 relative z-10">
                <p className="text-white/90 text-xl mb-6 font-medium">What kind of talent are you looking for?</p>

                {/* Enhanced search input area */}
                <div className="bg-blue-800/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
                  <p className="text-white text-lg mb-4 relative z-10">
                    Senior GenAI engineers with LangChain + RAG experience in Europe...
                  </p>

                  {/* Enhanced geometric element */}
                  <div className="flex justify-center mb-4 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-2 border border-white/20 rounded-full"></div>
                      <div className="w-6 h-6 bg-white rounded-full relative z-10"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced search button */}
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Search</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Welcome Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-2 border border-white/30 rounded-xl"></div>
              <Sparkles className="w-8 h-8 text-white relative z-10" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to TalentHunt.dev</h2>
          <p className="text-xl text-white/80">Choose your path to get started</p>
          {/* Geometric underline */}
          <div className="flex justify-center mt-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Enhanced Job Seeker Card */}
          <Card className="bg-gradient-to-br from-blue-800/60 to-blue-900/80 backdrop-blur-xl border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
            {/* Geometric pattern overlay */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2"/>
                <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-3 border border-white/30 rounded-lg"></div>
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

              <Link href="/welcome" className="block">
                <Button className="w-full bg-white text-blue-900 hover:bg-white/90 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Join as Candidate <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enhanced Recruiter Card */}
          <Card className="bg-gradient-to-br from-blue-700/60 to-indigo-900/80 backdrop-blur-xl border border-indigo-400/30 hover:border-indigo-300/50 transition-all duration-300 group shadow-2xl hover:shadow-3xl rounded-2xl overflow-hidden relative">
            {/* Different geometric pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" fill="none" strokeWidth="2"/>
                <polygon points="50,35 65,50 50,65 35,50" stroke="currentColor" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-3 border border-white/30 rounded-lg"></div>
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
                    <div className="w-2 h-2 bg-indigo-300 rounded-full mr-4 flex-shrink-0 animate-pulse"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/recruiter/signup" className="block">
                <Button className="w-full bg-white text-indigo-900 hover:bg-white/90 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Start Hiring <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div id="features" className="relative z-10 bg-gradient-to-b from-blue-900/50 to-blue-950/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose TalentHunt?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Advanced AI technology meets human expertise for the future of hiring
            </p>
            {/* Geometric accent */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: "AI Verification", desc: "Every profile verified by AI", color: "green" },
              { icon: Target, title: "Smart Matching", desc: "Precision candidate ranking", color: "purple" },
              { icon: Zap, title: "Lightning Fast", desc: "90% reduction in hiring time", color: "yellow" },
              { icon: Globe, title: "Global Reach", desc: "Access worldwide talent pool", color: "blue" },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                {/* Geometric background for each card */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `conic-gradient(from 45deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1))`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                    <div className="absolute inset-2 border border-white/30 rounded-lg"></div>
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

      {/* Enhanced Verification Section */}
      <div className="relative z-10 bg-gradient-to-b from-blue-950/80 to-blue-900/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Verified Talent, Verified Quality</h2>
          <p className="max-w-3xl mx-auto text-xl text-white/80 mb-16">
            Our verification process ensures you connect with authentic, qualified professionals
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group">
              {/* LinkedIn-themed geometric pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
                  <rect x="20" y="20" width="60" height="60" stroke="currentColor" fill="none" strokeWidth="2" rx="10"/>
                  <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-12 h-12 text-blue-300" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">LinkedIn Verified</h3>
                <p className="text-white/80">
                  All users verify their professional identity through LinkedIn authentication
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group">
              {/* GitHub-themed geometric pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2"/>
                  <path d="M35,50 L50,35 L65,50 L50,65 Z" stroke="currentColor" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
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

      {/* Enhanced Final CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative">
          {/* Geometric frame */}
          <div className="absolute -inset-8 border border-white/5 rounded-3xl"></div>
          <div className="absolute -inset-4 border border-white/10 rounded-2xl"></div>
          
          <h2 className="text-5xl font-bold text-white mb-6 relative z-10">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-white/80 mb-12 relative z-10">Join 500+ companies already using TalentHunt</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/recruiter/signup">
              <Button className="bg-white text-blue-900 hover:bg-white/90 font-bold px-12 py-6 rounded-2xl text-xl shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Start Free Trial</span>
              </Button>
            </Link>
            <Button className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 font-bold px-12 py-6 rounded-2xl text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Schedule Demo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Geometric Elements */}
      <footer className="relative z-10 bg-gradient-to-b from-blue-950/90 to-slate-900/95 backdrop-blur-sm border-t border-white/10">
        {/* Geometric top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Enhanced Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
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
                  <Link key={index} href={social.href} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-2 border border-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <social.icon className="w-5 h-5 text-white relative z-10" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Link Sections */}
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

            {/* Enhanced Support & Contact */}
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

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-white/10 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
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
