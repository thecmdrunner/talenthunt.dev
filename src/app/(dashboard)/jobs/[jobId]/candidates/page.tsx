"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  BriefcaseIcon,
  Calendar,
  Clock,
  Code,
  FileText,
  MapPin,
  MoreVertical,
  Search,
  Send,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock data - replace with actual data fetching from candidate profiles
const mockCandidates = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    targetRole: "Frontend Developer",
    location: "San Francisco, CA",
    yearsOfExperience: 4,
    skills: ["React", "Vue.js", "TypeScript"],
    hasVideo: true,
    hasResume: true,
    profileCompletedAt: "1 week ago",
    githubUrl: "https://github.com/alexthompson",
    linkedinUrl: "https://linkedin.com/in/alexthompson",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    targetRole: "Senior Frontend Developer",
    location: "Remote",
    yearsOfExperience: 7,
    skills: ["React", "TypeScript", "GraphQL"],
    hasVideo: true,
    hasResume: true,
    profileCompletedAt: "3 days ago",
    githubUrl: "https://github.com/priyapatel",
    linkedinUrl: null,
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james.wilson@email.com",
    targetRole: "Full Stack Developer",
    location: "Austin, TX",
    yearsOfExperience: 5,
    skills: ["React", "Node.js", "MongoDB"],
    hasVideo: true,
    hasResume: true,
    profileCompletedAt: "2 weeks ago",
    githubUrl: null,
    linkedinUrl: "https://linkedin.com/in/jameswilson",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    targetRole: "Frontend Engineer",
    location: "San Francisco, CA",
    yearsOfExperience: 3,
    skills: ["React", "JavaScript", "CSS"],
    hasVideo: true,
    hasResume: true,
    profileCompletedAt: "5 days ago",
    githubUrl: "https://github.com/mariagarcia",
    linkedinUrl: "https://linkedin.com/in/mariagarcia",
  },
];

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "frontend", label: "Frontend Developer" },
  { value: "senior-frontend", label: "Senior Frontend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "frontend-engineer", label: "Frontend Engineer" },
];

const experienceOptions = [
  { value: "all", label: "All Experience" },
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" },
];

const locationOptions = [
  { value: "all", label: "All Locations" },
  { value: "remote", label: "Remote" },
  { value: "san-francisco", label: "San Francisco, CA" },
  { value: "austin", label: "Austin, TX" },
];

export default function FindCandidatesPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Filter candidates based on search and filters
  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesRole = roleFilter === "all" || 
      (roleFilter === "frontend" && candidate.targetRole.toLowerCase().includes("frontend")) ||
      (roleFilter === "senior-frontend" && candidate.targetRole.toLowerCase().includes("senior frontend")) ||
      (roleFilter === "fullstack" && candidate.targetRole.toLowerCase().includes("full stack")) ||
      (roleFilter === "frontend-engineer" && candidate.targetRole.toLowerCase().includes("frontend engineer"));

    const matchesExperience = experienceFilter === "all" || 
      (experienceFilter === "0-2" && candidate.yearsOfExperience <= 2) ||
      (experienceFilter === "3-5" && candidate.yearsOfExperience >= 3 && candidate.yearsOfExperience <= 5) ||
      (experienceFilter === "5+" && candidate.yearsOfExperience > 5);

    const matchesLocation = locationFilter === "all" ||
      (locationFilter === "remote" && candidate.location.toLowerCase() === "remote") ||
      (locationFilter === "san-francisco" && candidate.location.includes("San Francisco")) ||
      (locationFilter === "austin" && candidate.location.includes("Austin"));

    return matchesSearch && matchesRole && matchesExperience && matchesLocation;
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Geometric Background Elements */}
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/jobs")}
            className="mb-4 text-white/60 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <div className="absolute inset-2 rounded-lg border border-white/20"></div>
                  <Sparkles className="relative z-10 h-7 w-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Find Candidates</h1>
              </div>
              <p className="text-xl text-white/80">
                Discover qualified candidates for Senior Frontend Developer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 md:grid-cols-4"
        >
          {[
            {
              label: "Available Candidates",
              value: mockCandidates.length.toString(),
              icon: Users,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "New This Week",
              value: mockCandidates.filter(c => c.profileCompletedAt.includes("days") || c.profileCompletedAt.includes("week")).length.toString(),
              icon: Clock,
              color: "from-green-500 to-green-600",
            },
            {
              label: "With Videos",
              value: mockCandidates.filter(c => c.hasVideo).length.toString(),
              icon: Video,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Active Profiles",
              value: mockCandidates.length.toString(),
              icon: Sparkles,
              color: "from-orange-500 to-orange-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border border-blue-400/30 bg-blue-800/40 backdrop-blur-xl transition-all duration-300 hover:border-blue-300/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative rounded-2xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>

            <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative lg:col-span-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-white/60" />
                <Input
                  placeholder="Search by name or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-blue-400/30 bg-blue-700/30 py-3 pl-12 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                  {roleOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
                  <SelectValue placeholder="All Experience" />
                </SelectTrigger>
                <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                  {experienceOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                  {locationOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-blue-700/50 focus:bg-blue-700/50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Candidate Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border border-blue-400/30 bg-gradient-to-br from-blue-800/60 to-blue-900/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60 hover:shadow-3xl">
                  <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                    <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                      <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
                      <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>

                  <CardContent className="relative z-10 p-6">
                    <div className="space-y-4">
                      {/* Candidate Info */}
                      <div>
                        <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
                        <p className="mt-1 text-white/60">{candidate.email}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-white/70">
                          <BriefcaseIcon className="h-4 w-4 text-blue-300" />
                          <span className="text-white">{candidate.targetRole}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="h-4 w-4 text-blue-300" />
                          {candidate.yearsOfExperience} years exp
                        </div>
                        {candidate.location && (
                          <div className="flex items-center gap-2 text-white/70">
                            <MapPin className="h-4 w-4 text-blue-300" />
                            {candidate.location}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="h-4 w-4 text-blue-300" />
                          Active {candidate.profileCompletedAt}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="mb-2 text-sm font-medium text-white/80 flex items-center gap-2">
                          <Code className="h-4 w-4 text-blue-300" />
                          Top Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              className="border border-blue-400/30 bg-blue-600/20 text-blue-200 hover:bg-blue-600/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      {(candidate.githubUrl || candidate.linkedinUrl) && (
                        <div className="flex gap-2 pt-2">
                          {candidate.githubUrl && (
                            <a
                              href={candidate.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-300 hover:text-blue-200 underline"
                            >
                              GitHub
                            </a>
                          )}
                          {candidate.linkedinUrl && (
                            <a
                              href={candidate.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-300 hover:text-blue-200 underline"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        {candidate.hasVideo && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-xl border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30 hover:text-white"
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Watch Intro
                          </Button>
                        )}
                        {candidate.hasResume && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-xl border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30 hover:text-white"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </Button>
                        )}
                      </div>

                      <Button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full"
            >
              <Card className="border border-blue-400/30 bg-blue-800/40 backdrop-blur-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="mb-4 h-12 w-12 text-white/40" />
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    No candidates found
                  </h3>
                  <p className="text-white/60">
                    Try adjusting your search criteria to find more candidates.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 