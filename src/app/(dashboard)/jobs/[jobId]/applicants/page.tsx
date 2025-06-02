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
  Building2,
  Calendar,
  Eye,
  Filter,
  MapPin,
  Search,
  Star,
  User,
  UserCheck,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock data based on what we collect
const mockApplicants = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    skills: ["React", "TypeScript", "Redux"],
    location: "San Francisco, CA",
    experience: "6 years experience",
    appliedAt: "2 hours ago",
    status: "new" as const,
  },
  {
    id: "2", 
    firstName: "Michael",
    lastName: "Chen",
    skills: ["JavaScript", "CSS", "Node.js"],
    location: "Mountain View, CA",
    experience: "5 years experience",
    appliedAt: "1 day ago",
    status: "reviewed" as const,
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    skills: ["Vue.js", "TypeScript", "GraphQL"],
    location: "Austin, TX",
    experience: "4 years experience",
    appliedAt: "3 days ago",
    status: "new" as const,
  },
];

// Mock job data
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  postedAt: "2 weeks ago",
  status: "active" as const,
};

export default function ApplicantsPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter applicants
  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch = 
      searchQuery.trim() === "" ||
      `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Geometric Background */}
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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="text-white/70 hover:bg-blue-600/20 hover:text-white"
            onClick={() => router.push('/jobs')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border border-blue-400/30 bg-gradient-to-br from-blue-800/60 to-blue-900/80 backdrop-blur-xl">
            <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
              <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" stroke="currentColor" fill="none" strokeWidth="1" />
              </svg>
            </div>
            
            <CardContent className="relative z-10 p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">{mockJob.title}</h1>
                    <Badge className="bg-green-500/20 text-green-300">
                      <div className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-current"></div>
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{mockJob.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mockJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {mockJob.postedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30"
                  >
                    Edit Job
                  </Button>
                  <Button
                    className="bg-white text-blue-900 hover:bg-blue-50"
                    onClick={() => router.push('/discover')}
                  >
                    Find Candidates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 md:grid-cols-4"
        >
          {[
            { icon: Users, label: "Total Applicants", value: "24", color: "from-blue-500 to-blue-600" },
            { icon: Eye, label: "Profile Views", value: "156", color: "from-purple-500 to-purple-600" },
            { icon: Star, label: "Shortlisted", value: "8", color: "from-yellow-500 to-yellow-600" },
            { icon: UserCheck, label: "Interviews", value: "3", color: "from-green-500 to-green-600" },
          ].map((stat, index) => (
            <Card 
              key={index}
              className="border border-blue-400/30 bg-blue-800/40 backdrop-blur-xl"
            >
              <CardContent className="p-6">
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

        {/* Applicants Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-blue-400/30 bg-blue-800/40 backdrop-blur-xl">
            <CardHeader className="border-b border-blue-400/30">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Applicants ({filteredApplicants.length})
                </h2>
                <div className="flex items-center gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] border-blue-400/30 bg-blue-700/30 text-white">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                      <SelectItem value="all" className="text-white hover:bg-blue-700/50">All Status</SelectItem>
                      <SelectItem value="new" className="text-white hover:bg-blue-700/50">New</SelectItem>
                      <SelectItem value="reviewed" className="text-white hover:bg-blue-700/50">Reviewed</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <Input
                      placeholder="Search applicants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-[300px] border-blue-400/30 bg-blue-700/30 pl-10 text-white placeholder:text-white/60"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-blue-400/20">
                {filteredApplicants.map((applicant, index) => (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-6 hover:bg-blue-700/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                          {applicant.firstName[0]}{applicant.lastName[0]}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-white">
                              {applicant.firstName} {applicant.lastName}
                            </h3>
                            {applicant.status === "new" && (
                              <Badge className="bg-blue-500/20 text-blue-300">
                                New
                              </Badge>
                            )}
                            {applicant.status === "reviewed" && (
                              <Badge className="bg-purple-500/20 text-purple-300">
                                Reviewed
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{applicant.experience}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {applicant.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                className="border border-blue-400/30 bg-blue-600/20 text-blue-200"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-white/60">
                            Applied {applicant.appliedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          className="border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30"
                        >
                          View Profile
                        </Button>
                        <Button className="bg-white text-blue-900 hover:bg-blue-50">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 