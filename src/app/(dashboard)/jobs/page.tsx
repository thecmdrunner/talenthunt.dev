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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  Briefcase,
  Clock,
  Edit,
  Globe,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data - replace with actual data fetching
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    status: "active" as const,
    postedAt: "2 weeks ago",
    location: "San Francisco, CA",
    workType: "Full-time",
    applicationCount: 24,
    expiresIn: "4 weeks",
    requiredSkills: ["React", "TypeScript", "CSS", "HTML", "Redux"],
  },
  {
    id: "2",
    title: "Machine Learning Engineer",
    status: "active" as const,
    postedAt: "1 week ago",
    location: "Remote",
    workType: "Full-time",
    applicationCount: 18,
    expiresIn: "5 weeks",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
  },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "paused", label: "Paused" },
  { value: "closed", label: "Closed" },
  { value: "expired", label: "Expired" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const router = useRouter();
  const { data: user } = api.user.getOrCreateUser.useQuery();

  // Filter jobs based on search query, status, and type
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;

    const matchesType =
      typeFilter === "all" ||
      job.workType.toLowerCase().replace("-", "-") === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "paused":
        return "outline";
      case "closed":
        return "destructive";
      case "expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Geometric Shapes */}
        <div className="absolute top-10 left-10 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>

        {/* Grid Pattern */}
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

        {/* SVG Geometric Patterns */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1400 1000"
          fill="none"
        >
          <path
            d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="200" cy="80" r="8" fill="rgba(59,130,246,0.5)" />
          <circle
            cx="650"
            cy="250"
            r="6"
            fill="rgba(59,130,246,0.4)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-start justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <div className="absolute inset-2 rounded-lg border border-white/20"></div>
                <Briefcase className="relative z-10 h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Job Postings</h1>
            </div>
            <p className="text-xl text-white/80">
              Manage your active and draft job listings
            </p>
          </div>
          <Button
            asChild
            className="group relative overflow-hidden rounded-xl bg-white px-6 py-3 font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
          >
            {user?.recruiterProfile.onboardingCompletedAt && (
              <Link href="/jobs/new">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="relative z-10 flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </span>
              </Link>
            )}
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative rounded-2xl border border-blue-400/30 bg-blue-800/40 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>

            <div className="relative z-10 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-white/60" />
                <Input
                  placeholder="Search jobs by title or skills..."
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

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px] rounded-xl border-blue-400/30 bg-blue-700/30 text-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="border-blue-400/30 bg-blue-800/95 backdrop-blur-xl">
                  {typeOptions.map((option) => (
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

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid gap-4 md:grid-cols-4"
        >
          {[
            {
              icon: Briefcase,
              label:
                searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Filtered Jobs"
                  : "Total Jobs",
              value:
                searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? filteredJobs.length.toString()
                  : "12",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Users,
              label: "Total Applicants",
              value: filteredJobs
                .reduce((sum, job) => sum + job.applicationCount, 0)
                .toString(),
              color: "from-blue-600 to-blue-700",
            },
            {
              icon: Target,
              label: "Active Jobs",
              value: filteredJobs
                .filter((job) => job.status === "active")
                .length.toString(),
              color: "from-green-500 to-green-600",
            },
            {
              icon: Globe,
              label: "Views This Week",
              value: "1.2k",
              color: "from-purple-500 to-purple-600",
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
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Job Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="group hover:shadow-3xl relative overflow-hidden border border-blue-400/30 bg-gradient-to-br from-blue-800/60 to-blue-900/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-blue-300/60">
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

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">
                            {job.title}
                          </h3>
                          <Badge
                            className={cn(
                              "border-0",
                              job.status === "active" &&
                                "bg-green-500/20 text-green-300",
                            )}
                          >
                            <div className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-current"></div>
                            {formatStatus(job.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60">
                          Posted {job.postedAt}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/60 hover:bg-blue-600/20 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/60 hover:bg-red-500/20 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    {/* Job Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPin className="h-4 w-4 text-blue-300" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="h-4 w-4 text-blue-300" />
                        <span>{job.workType}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/70">
                        <Users className="h-4 w-4 text-blue-300" />
                        <span className="font-medium text-white">
                          {job.applicationCount}
                        </span>{" "}
                        applicants
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="h-4 w-4 text-blue-300" />
                        <span>Expires in {job.expiresIn}</span>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

                    {/* Required Skills */}
                    <div>
                      <p className="mb-3 text-sm font-medium text-white/80">
                        Required Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            className="border border-blue-400/30 bg-blue-600/20 text-blue-200 hover:bg-blue-600/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl border-blue-400/30 bg-blue-600/20 text-white hover:bg-blue-600/30 hover:text-white"
                        onClick={() =>
                          router.push(`/jobs/${job.id}/applicants`)
                        }
                      >
                        <Users className="mr-2 h-4 w-4" />
                        View Applicants
                      </Button>
                      <Button
                        className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
                        onClick={() => router.push("/discover")}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Find Candidates
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
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="mb-4 h-12 w-12 text-white/40" />
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    No jobs found
                  </h3>
                  <p className="text-white/60">
                    Try adjusting your search terms or filters to find more
                    results.
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
