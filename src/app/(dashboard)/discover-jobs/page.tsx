"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { JobSearchPreferences } from "@/types/jobs";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  LucideChevronDown,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

// Mock data for demonstration
const suggestedFilters = [
  { type: "type", label: "remote", value: "remote" },
  { type: "type", label: "hybrid", value: "hybrid" },
  { type: "type", label: "onsite", value: "onsite" },
  { type: "level", label: "senior", value: "senior" },
  { type: "level", label: "mid-level", value: "mid-level" },
  { type: "level", label: "entry-level", value: "entry-level" },
];

const additionalFilters = [
  { type: "benefits", label: "benefits", value: "benefits" },
  { type: "company-size", label: "company size", value: "company-size" },
  { type: "industry", label: "industry", value: "industry" },
];

export default function DiscoverJobsPage() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue:
      "looking for a senior frontend developer role with React and TypeScript, remote work, competitive salary in a startup",
  });

  // Use tRPC mutation for AI-powered query processing
  const naturalLanguageQuery = api.ai.naturalLanguageQuery.useMutation();

  // Use tRPC mutation for job search
  const searchJobs = api.ai.searchJobs.useMutation();

  console.log("job query", naturalLanguageQuery.data);
  console.log("jobs", searchJobs.data);

  // Process search query on page load or when searchQuery changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      // Trigger AI extraction
      naturalLanguageQuery.mutate({ query: searchQuery });
    }
  }, []);

  // Search for jobs when natural language query completes
  useEffect(() => {
    if (naturalLanguageQuery.data) {
      // Trigger job search with the extracted job preferences
      searchJobs.mutate(naturalLanguageQuery.data.newJob);
    }
  }, [naturalLanguageQuery.data, searchJobs]);

  const clearSearch = () => {
    void setSearchQuery("");
    naturalLanguageQuery.reset();
    searchJobs.reset();
  };

  const isSearchActive = Boolean(searchQuery && naturalLanguageQuery.data);
  const jobPreferences: JobSearchPreferences | undefined =
    naturalLanguageQuery.data;
  const jobs = searchJobs.data?.jobs ?? [];

  return (
    <div className="relative flex items-center gap-2 px-4 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="relative">
              <div className="mb-2 text-left">
                <span className="text-muted-foreground">
                  I&apos;m looking for...
                </span>
              </div>
              <div className="flex gap-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    naturalLanguageQuery.mutate({ query: searchQuery });
                  }}
                  className="group overflow- relative flex-1 rounded-2xl p-[1px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1/2 left-4 z-20 h-6 w-6 -translate-y-1/2"
                  >
                    <path
                      d="M16.296 2.043c.407 1.817 1.284 2.716 3.317 3.089.14 0 .255.104.255.233s-.114.233-.255.233c-1.982.373-2.909 1.218-3.315 3.081a.246.246 0 0 1-.243.18.245.245 0 0 1-.245-.191c-.407-1.818-1.28-2.697-3.313-3.07-.14 0-.254-.104-.254-.233s.114-.233.254-.233c1.982-.373 2.91-1.223 3.317-3.087a.247.247 0 0 1 .241-.175c.117 0 .212.074.241.173Z"
                      fill="url(#_3085173834__a)"
                    />
                    <path
                      d="M15.094 17.436A7.5 7.5 0 1 1 10 4.046v1.503A6 6 0 1 0 16.446 11h1.504a7.466 7.466 0 0 1-1.46 5.003l4.25 4.25a1 1 0 0 1-1.414 1.414l-4.232-4.231Z"
                      fill="url(#_3085173834__b)"
                    />
                    <path
                      d="M13.666 8.964c-.857-.236-1.356-.615-1.527-1.4 0-.095-.084-.172-.187-.172s-.187.077-.187.171c-.257.786-.67 1.244-1.528 1.401-.103 0-.187.077-.187.171 0 .095.084.172.187.172.857.235 1.357.614 1.528 1.4 0 .095.084.171.187.171s.187-.076.187-.171c.257-.786.67-1.243 1.527-1.4.104 0 .187-.077.187-.172 0-.094-.083-.171-.187-.171Z"
                      fill="url(#_3085173834__c)"
                    />
                    <defs>
                      <linearGradient
                        id="_3085173834__a"
                        x1="-6.063"
                        y1="11.915"
                        x2="13.914"
                        y2="29.878"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#03A5AB" />
                        <stop offset={1} stopColor="#8B3DFF" />
                      </linearGradient>
                      <linearGradient
                        id="_3085173834__b"
                        x1="-6.063"
                        y1="11.915"
                        x2="13.914"
                        y2="29.878"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#03A5AB" />
                        <stop offset={1} stopColor="#8B3DFF" />
                      </linearGradient>
                      <linearGradient
                        id="_3085173834__c"
                        x1="-6.063"
                        y1="11.915"
                        x2="13.914"
                        y2="29.878"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#03A5AB" />
                        <stop offset={1} stopColor="#8B3DFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="relative z-10 rounded-[14px] bg-white">
                    <Input
                      id="search-input"
                      spellCheck={false}
                      placeholder="senior backend engineer, remote, $150k+"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-xl py-9 pr-16 pl-13 text-lg font-light"
                      disabled={naturalLanguageQuery.isPending}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      variant={"default"}
                      className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 rounded-full bg-purple-500 hover:brightness-90"
                      disabled={
                        naturalLanguageQuery.isPending ||
                        !searchQuery ||
                        searchQuery.length < 2
                      }
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="absolute inset-0 h-full w-full rounded-[14px] bg-gradient-to-r from-cyan-600 to-violet-600 text-white opacity-30 grayscale transition-all duration-300 group-focus-within:opacity-100 group-focus-within:grayscale-0 group-hover:opacity-100 group-hover:grayscale-0 hover:from-cyan-700 hover:to-violet-700"></div>
                  <div className="absolute inset-0 h-full w-full rounded-[14px] bg-gradient-to-r from-cyan-600 to-violet-600 text-white opacity-30 transition-all duration-300 group-focus-within:blur-xs group-hover:blur-xs hover:from-cyan-700 hover:to-violet-700"></div>
                </form>
              </div>
              {naturalLanguageQuery.error && (
                <div className="mt-2 text-sm text-red-600">
                  Error processing query. Please try again.
                </div>
              )}
              <AnimatePresence mode="wait">
                {(naturalLanguageQuery.isPending || searchJobs.isPending) && (
                  <motion.div
                    key="loading-animation"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "100px" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-4 space-y-3"
                  >
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-indigo-600" />
                      <span className="animate-pulse">
                        {naturalLanguageQuery.isPending
                          ? "AI is analyzing your job preferences..."
                          : "Searching for matching job opportunities..."}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 animate-pulse rounded-full" />
                      <Skeleton className="h-6 w-32 animate-pulse rounded-full" />
                      <Skeleton className="h-6 w-24 animate-pulse rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative flex w-max items-center">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-cyan-50 to-violet-50 px-6 py-3 shadow-sm",
                "text-2xl font-semibold text-black",
                "transition-all",
              )}
              style={{
                borderImage:
                  "linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%) 1",
                borderWidth: "2px",
                background: "linear-gradient(90deg, #ecfeff 0%, #f5f3ff 100%)",
              }}
            >
              <span className="flex items-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="mr-2 h-7 w-7 text-cyan-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M16 7.5L17.5 13.5L23.5 15L17.5 16.5L16 22.5L14.5 16.5L8.5 15L14.5 13.5L16 7.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="15"
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
                <span className="text-2xl font-medium text-black">AI</span>
              </span>
            </div>
            <span
              className={cn(
                "absolute -top-4 left-1/2 z-10 -translate-x-1/2",
                "rounded-full bg-violet-500 px-5 py-1.5 text-base font-semibold text-white shadow-lg",
                "border-2 border-white",
              )}
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                letterSpacing: "0.01em",
              }}
            >
              New
            </span>
            <span
              className="pointer-events-none absolute top-1/2 -right-10 h-6 w-6 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-400 to-transparent opacity-60 blur-[6px]"
              aria-hidden="true"
            />
          </div>

          {/* Active Search Display */}
          {isSearchActive && jobPreferences && (
            <div className="max-w-4xl space-y-6 rounded-xl bg-white/80 p-6 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
                  I&apos;m looking for
                </span>

                {jobPreferences.desiredRole && (
                  <Select value={jobPreferences.desiredRole}>
                    <Button
                      asChild
                      variant={"secondary"}
                      className="relative cursor-pointer border-none text-2xl font-medium shadow-none"
                    >
                      <SelectTrigger>
                        <SelectValue>{jobPreferences.desiredRole}</SelectValue>
                      </SelectTrigger>
                    </Button>
                    <SelectContent>
                      <SelectItem value={jobPreferences.desiredRole}>
                        {jobPreferences.desiredRole}
                      </SelectItem>
                      {jobPreferences.similarRoles?.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Required Skills */}
              {jobPreferences.requiredSkills &&
                jobPreferences.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-slate-500">
                      with skills in
                    </span>
                    {jobPreferences.requiredSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="group relative border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 shadow-sm transition-all hover:scale-105"
                      >
                        {skill}
                        <button className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 p-0 shadow-sm transition-transform hover:scale-110"
                    >
                      <Plus className="h-3.5 w-3.5 text-blue-700" />
                    </Button>
                  </div>
                )}

              {/* Experience Level */}
              {jobPreferences.experienceLevel && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    experience level
                  </span>
                  <Badge
                    variant="outline"
                    className="group relative border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 shadow-sm transition-all hover:scale-105"
                  >
                    {jobPreferences.experienceLevel}
                    <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                  </Badge>
                </div>
              )}

              {/* Salary Range */}
              {jobPreferences.salaryRange && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">salary range</span>
                  <Badge
                    variant="outline"
                    className="group relative border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm transition-all hover:scale-105"
                  >
                    {jobPreferences.salaryRange.min &&
                    jobPreferences.salaryRange.max
                      ? `${jobPreferences.salaryRange.currency ?? ""} ${jobPreferences.salaryRange.min.toLocaleString()}-${jobPreferences.salaryRange.max.toLocaleString()}`
                      : jobPreferences.salaryRange.min
                        ? `${jobPreferences.salaryRange.currency ?? ""} ${jobPreferences.salaryRange.min.toLocaleString()}+`
                        : jobPreferences.salaryRange.max
                          ? `${jobPreferences.salaryRange.currency ?? ""} up to ${jobPreferences.salaryRange.max.toLocaleString()}`
                          : "Salary specified"}
                    <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                  </Badge>
                </div>
              )}

              {/* Location & Remote */}
              {((jobPreferences.locations &&
                jobPreferences.locations?.length > 0) ??
                jobPreferences.remotePreference) && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">📍</span>
                  {jobPreferences.locations &&
                    jobPreferences.locations?.length > 0 && (
                      <Badge
                        variant="outline"
                        className="group relative border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 shadow-sm transition-all hover:scale-105"
                      >
                        {jobPreferences.locations.join(", ")}
                        <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                      </Badge>
                    )}

                  {jobPreferences.remotePreference && (
                    <Select value={jobPreferences.remotePreference}>
                      <Button
                        asChild
                        size={"sm"}
                        variant={"outline"}
                        className="group relative !h-6 py-0 text-xs shadow-sm transition-all hover:scale-105"
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {jobPreferences.remotePreference}
                          </SelectValue>
                        </SelectTrigger>
                      </Button>
                      <SelectContent>
                        <SelectItem value={jobPreferences.remotePreference}>
                          {jobPreferences.remotePreference}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              {/* Company Preferences */}
              {jobPreferences.companyPreferences && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">at</span>
                  {jobPreferences.companyPreferences.size && (
                    <Badge
                      variant="outline"
                      className="group relative border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-sm transition-all hover:scale-105"
                    >
                      {jobPreferences.companyPreferences.size} company
                    </Badge>
                  )}
                  {jobPreferences.companyPreferences.industries &&
                    jobPreferences.companyPreferences.industries?.length >
                      0 && (
                      <Badge
                        variant="outline"
                        className="group relative border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 shadow-sm transition-all hover:scale-105"
                      >
                        {jobPreferences.companyPreferences.industries.join(
                          ", ",
                        )}
                      </Badge>
                    )}
                </div>
              )}

              <div className="flex items-center gap-3 border-t pt-4">
                <button
                  onClick={clearSearch}
                  className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Clear search
                </button>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                {additionalFilters.map((filter) => (
                  <Badge
                    key={filter.value}
                    variant="outline"
                    className="cursor-pointer border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 shadow-sm transition-all hover:scale-105"
                  >
                    + {filter.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Filters (only show when no active search) */}
          {!isSearchActive && (
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSearchQuery(searchQuery + " " + filter.label)
                  }
                  className="rounded-full"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Jobs Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {isSearchActive ? "Matching jobs" : "Featured opportunities"}
            </h2>
            {jobs.length > 0 && (
              <div className="text-muted-foreground text-sm">
                {searchJobs.data?.total} jobs found
              </div>
            )}
          </div>

          {naturalLanguageQuery.isPending || searchJobs.isPending ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="group animate-pulse transition-all duration-300"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Company logo skeleton */}
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>

                      {/* Job title skeleton */}
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>

                      {/* Tags skeleton */}
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                      </div>

                      {/* Salary and location skeleton */}
                      <div className="space-y-2 border-t pt-4">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Company info */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-50">
                          <Building2 className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {job.company}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {job.companySize && `${job.companySize} • `}
                            {job.industry}
                          </p>
                        </div>
                      </div>

                      {/* Job title and description */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        {job.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                            {job.description}
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {job.type && (
                          <Badge variant="secondary" className="text-xs">
                            <Briefcase className="mr-1 h-3 w-3" />
                            {job.type}
                          </Badge>
                        )}
                        {job.experienceLevel && (
                          <Badge variant="secondary" className="text-xs">
                            {job.experienceLevel}
                          </Badge>
                        )}
                        {job.remote && (
                          <Badge variant="secondary" className="text-xs">
                            {job.remote}
                          </Badge>
                        )}
                      </div>

                      {/* Required skills */}
                      {job.requiredSkills && job.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills
                            .slice(0, 3)
                            .map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {job.requiredSkills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.requiredSkills.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Footer info */}
                      <div className="space-y-2 border-t pt-4 text-sm text-gray-600">
                        {job.salary && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span>
                              {job.salary.min && job.salary.max
                                ? `${job.salary.currency ?? "$"}${job.salary.min.toLocaleString()}-${job.salary.max.toLocaleString()}`
                                : job.salary.min
                                  ? `${job.salary.currency ?? "$"}${job.salary.min.toLocaleString()}+`
                                  : job.salary.max
                                    ? `Up to ${job.salary.currency ?? "$"}${job.salary.max.toLocaleString()}`
                                    : "Competitive"}
                            </span>
                          </div>
                        )}
                        {job.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.postedDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isSearchActive ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No jobs found matching your criteria.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Try adjusting your search terms or preferences.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Placeholder company */}
                      <div className="flex items-start gap-4">
                        <div className="bg-muted h-12 w-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="bg-muted h-4 w-3/4 rounded" />
                          <div className="bg-muted h-3 w-1/2 rounded" />
                        </div>
                      </div>

                      {/* Placeholder title */}
                      <div className="space-y-2">
                        <div className="bg-muted h-5 w-full rounded" />
                        <div className="bg-muted h-3 w-2/3 rounded" />
                      </div>

                      {/* Placeholder tags */}
                      <div className="flex flex-wrap gap-1">
                        <div className="bg-muted h-5 w-16 rounded" />
                        <div className="bg-muted h-5 w-20 rounded" />
                        <div className="bg-muted h-5 w-12 rounded" />
                      </div>

                      {/* Placeholder footer */}
                      <div className="space-y-2 border-t pt-4">
                        <div className="bg-muted h-3 w-32 rounded" />
                        <div className="bg-muted h-3 w-24 rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
