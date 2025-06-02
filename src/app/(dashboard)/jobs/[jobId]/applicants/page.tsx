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
  Calendar,
  Clock,
  FileText,
  Filter,
  MapPin,
  MoreVertical,
  Search,
  ThumbsDown,
  ThumbsUp,
  Users,
  Video,
  BriefcaseIcon,
  Code,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock data - replace with actual data fetching
const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    appliedAt: "2 days ago",
    status: "new",
    targetRole: "Senior Frontend Developer",
    location: "San Francisco, CA",
    yearsOfExperience: 5,
    skills: ["React", "TypeScript", "Node.js"],
    hasVideo: true,
    hasResume: true,
    videoUrl: "/videos/sarah-intro.mp4",
    resumeUrl: "/resumes/sarah-johnson.pdf",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    appliedAt: "3 days ago",
    status: "reviewing",
    targetRole: "Frontend Developer",
    location: "Remote",
    yearsOfExperience: 3,
    skills: ["React", "JavaScript", "CSS"],
    hasVideo: true,
    hasResume: true,
    videoUrl: "/videos/michael-intro.mp4",
    resumeUrl: "/resumes/michael-chen.pdf",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    appliedAt: "5 days ago",
    status: "shortlisted",
    targetRole: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    yearsOfExperience: 6,
    skills: ["React", "TypeScript", "Redux"],
    hasVideo: true,
    hasResume: true,
    videoUrl: "/videos/emily-intro.mp4",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
  },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interviewed", label: "Interviewed" },
  { value: "rejected", label: "Rejected" },
];

const experienceOptions = [
  { value: "all", label: "All Experience" },
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" },
];

export default function ApplicantsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");

  // Filter applicants based on search and filters
  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;

    const matchesExperience = experienceFilter === "all" || 
      (experienceFilter === "0-2" && applicant.yearsOfExperience <= 2) ||
      (experienceFilter === "3-5" && applicant.yearsOfExperience >= 3 && applicant.yearsOfExperience <= 5) ||
      (experienceFilter === "5+" && applicant.yearsOfExperience > 5);

    return matchesSearch && matchesStatus && matchesExperience;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="border-0 bg-blue-500/20 text-blue-300">New</Badge>;
      case "reviewing":
        return <Badge className="border-0 bg-yellow-500/20 text-yellow-300">Reviewing</Badge>;
      case "shortlisted":
        return <Badge className="border-0 bg-green-500/20 text-green-300">Shortlisted</Badge>;
      case "interviewed":
        return <Badge className="border-0 bg-purple-500/20 text-purple-300">Interviewed</Badge>;
      case "rejected":
        return <Badge className="border-0 bg-red-500/20 text-red-300">Rejected</Badge>;
      default:
        return null;
    }
  };

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
                  <Users className="relative z-10 h-7 w-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Applicants</h1>
              </div>
              <p className="text-xl text-white/80">
                Senior Frontend Developer • {filteredApplicants.length} applicants
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
              label: "Total Applicants",
              value: mockApplicants.length.toString(),
              icon: Users,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "New This Week",
              value: mockApplicants.filter(a => a.status === "new").length.toString(),
              icon: Clock,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Shortlisted",
              value: mockApplicants.filter(a => a.status === "shortlisted").length.toString(),
              icon: ThumbsUp,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "With Videos",
              value: mockApplicants.filter(a => a.hasVideo).length.toString(),
              icon: Video,
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

            <div className="relative z-10 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-white/60" />
                <Input
                  placeholder="Search by name, email, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-blue-400/30 bg-blue-700/30 py-3 pl-12 text-white placeholder:text-white/60 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                  {statusOptions.map((option) => (
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
                <SelectTrigger className="w-[160px] rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
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
            </div>
          </div>
        </motion.div>

        {/* Applicant Cards */}
        <div className="space-y-6">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border border-blue-400/30 bg-gradient-to-br from-blue-800/60 to-blue-900/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60 hover:shadow-3xl">
                  <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
                    <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                      <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
                      <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>

                  <CardContent className="relative z-10 p-8">
                    <div className="flex items-start justify-between">
                      {/* Applicant Info */}
                      <div className="space-y-4 flex-1">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-semibold text-white">{applicant.name}</h3>
                            {getStatusBadge(applicant.status)}
                          </div>
                          <p className="mt-1 text-white/60">{applicant.email}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-blue-300" />
                            <span className="text-white">{applicant.targetRole}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-300" />
                            {applicant.yearsOfExperience} years experience
                          </div>
                          {applicant.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-300" />
                              {applicant.location}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-300" />
                            Applied {applicant.appliedAt}
                          </div>
                        </div>

                        <div>
                          <p className="mb-3 text-sm font-medium text-white/80 flex items-center gap-2">
                            <Code className="h-4 w-4 text-blue-300" />
                            Top Skills
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                className="border border-blue-400/30 bg-blue-600/20 text-blue-200 hover:bg-blue-600/30"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/60 hover:bg-blue-600/20 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex items-center justify-between border-t border-blue-400/20 pt-6">
                      <div className="flex gap-3">
                        {applicant.hasVideo && (
                          <Button
                            variant="outline"
                            className="rounded-xl border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30 hover:text-white"
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Watch Introduction
                          </Button>
                        )}
                        {applicant.hasResume && (
                          <Button
                            variant="outline"
                            className="rounded-xl border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30 hover:text-white"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </Button>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="rounded-xl border-red-400/30 bg-red-600/20 text-red-300 hover:bg-red-600/30 hover:text-red-300"
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                          <span className="relative z-10 flex items-center">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Shortlist
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border border-blue-400/30 bg-blue-800/40 backdrop-blur-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="mb-4 h-12 w-12 text-white/40" />
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    No applicants found
                  </h3>
                  <p className="text-white/60">
                    Try adjusting your search terms or filters to find more results.
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