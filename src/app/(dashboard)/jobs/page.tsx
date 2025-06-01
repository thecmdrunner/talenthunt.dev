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
import {
  Clock,
  Edit,
  Filter,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active and draft job listings
          </p>
        </div>
        <Button
          className="bg-slate-900 text-white hover:bg-slate-800"
          onClick={() => router.push("/jobs/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search jobs by title or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Job Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockJobs.map((job) => (
          <Card key={job.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge
                      variant={getStatusBadgeVariant(job.status)}
                      className={cn(
                        job.status === "active" &&
                          "bg-green-100 text-green-800 hover:bg-green-100",
                      )}
                    >
                      {formatStatus(job.status)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Posted {job.postedAt}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{job.workType}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{job.applicationCount} applicants</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Expires: In {job.expiresIn}</span>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <p className="mb-2 text-sm font-medium">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="mr-2 h-4 w-4" />
                  View Applicants
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-slate-900 hover:bg-slate-800"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Find Candidates
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
