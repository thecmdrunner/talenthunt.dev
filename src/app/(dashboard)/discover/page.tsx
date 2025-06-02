"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import {
  ArrowRight,
  LucideBuilding2,
  LucideGlobe,
  LucideHandshake,
  LucideMap,
  MapPin,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { CandidateSheetContent } from "./candidate-sheet";

const locationTypes = [
  {
    label: "Remote",
    value: "remote",
    icon: <LucideGlobe />,
  },
  {
    label: "On-site",
    value: "on-site",
    icon: <LucideBuilding2 />,
  },
  {
    label: "Hybrid",
    value: "hybrid",
    icon: <LucideMap />,
  },

  {
    label: "Contract",
    value: "contract",
    icon: <LucideHandshake />,
  },
  {
    label: "Freelance",
    value: "freelance",
    icon: <LucideHandshake />,
  },
];

// Mock data for demonstration
const suggestedFilters = [
  { type: "role", label: "ai", value: "ai" },
  { type: "ui", label: "comfy ui", value: "comfy-ui" },
  { type: "stack", label: "full stack", value: "full-stack" },
  { type: "stack", label: "backend", value: "backend" },
  { type: "employment", label: "full-time", value: "full-time" },
  { type: "employment", label: "contract", value: "contract" },
];

const additionalFilters = [
  { type: "demographic", label: "gender", value: "gender" },
  { type: "experience", label: "experience level", value: "experience" },
  { type: "location", label: "location", value: "location" },
];

// Convert match score to intuitive match level

export default function DiscoverPage() {
  const {
    trackPageVisited,
    trackSearch,
    trackCandidateViewed,
    trackButtonClicked,
  } = useTracking();

  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue:
      "i want a next js dev experienced in AI apps and has over 2 years of experience and is open to work in Banglore",
  });

  // State for selected candidate sheet
  const [selectedCandidate, setSelectedCandidate] = useState<
    (typeof candidates)[0] | null
  >(null);

  // Use tRPC mutation for AI-powered query processing
  const naturalLanguageQuery = api.ai.naturalLanguageQuery.useMutation();

  // Use tRPC mutation for candidate search
  const searchCandidates = api.ai.searchCandidates.useMutation();

  // Track page visit
  useEffect(() => {
    trackPageVisited("discover");
  }, [trackPageVisited]);

  // Process search query on page load or when searchQuery changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      // Trigger AI extraction
      naturalLanguageQuery.mutate({ query: searchQuery });
      // Track the search
      trackSearch(searchQuery, "natural_language");
    }
  }, []);

  // Search for candidates when natural language query completes
  useEffect(() => {
    if (naturalLanguageQuery.data) {
      // Trigger candidate search with the extracted job attributes
      searchCandidates.mutate(naturalLanguageQuery.data);
    }
  }, [naturalLanguageQuery.data]);

  const clearSearch = () => {
    void setSearchQuery("");
    naturalLanguageQuery.reset();
    searchCandidates.reset();
    trackButtonClicked("clear_search", "discover_page");
  };

  const handleCandidateView = (candidate: (typeof candidates)[0]) => {
    setSelectedCandidate(candidate);
    trackCandidateViewed(candidate.id, candidate.matchScore);
  };

  const isSearchActive = Boolean(searchQuery && naturalLanguageQuery.data);
  const jobAttributes = naturalLanguageQuery.data;
  const candidates = searchCandidates.data?.candidates ?? [];

  return (
    <div className="relative flex items-center gap-2 px-4 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="mx-auto max-w-2xl space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-white">
                Find Your Perfect Candidate
              </h1>
              <p className="text-xl text-white/80">
                Describe exactly who you&apos;re looking for
              </p>
            </div>

            <div className="relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  naturalLanguageQuery.mutate({ query: searchQuery });
                }}
                className="relative w-full"
              >
                <div className="relative flex items-center">
                  <div className="absolute left-5 z-20">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <Input
                    id="search-input"
                    spellCheck={false}
                    placeholder="i want a next js dev experienced in AI apps and has over 2 years of experience"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-white py-7 pr-24 pl-14 text-lg shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                    disabled={naturalLanguageQuery.isPending}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-3 z-20 rounded-full bg-blue-600 p-3 hover:bg-blue-700"
                    disabled={
                      naturalLanguageQuery.isPending ||
                      !searchQuery ||
                      searchQuery.length < 2
                    }
                  >
                    <ArrowRight className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </form>

              {naturalLanguageQuery.error && (
                <div className="mt-2 text-sm text-red-400">
                  Error processing query. Please try again.
                </div>
              )}

              <AnimatePresence mode="wait">
                {(naturalLanguageQuery.isPending ||
                  searchCandidates.isPending) && (
                  <motion.div
                    key="loading-animation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6"
                  >
                    <div className="mx-auto max-w-xl rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                      {/* Header */}
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              AI Analysis
                            </div>
                            <div className="text-sm text-white/60">
                              Processing your requirements
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="h-8 w-8 rounded-full border-2 border-blue-500/30 border-t-blue-500"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>

                      {/* Filter Categories */}
                      <div className="grid gap-4">
                        {[
                          {
                            icon: "👨‍💻",
                            label: "Role",
                            color: "violet",
                            width: "w-32",
                            delay: 0.1,
                          },
                          {
                            icon: "🛠️",
                            label: "Skills",
                            color: "blue",
                            width: "w-40",
                            delay: 0.2,
                            multiple: true,
                          },
                          {
                            icon: "📈",
                            label: "Experience",
                            color: "emerald",
                            width: "w-24",
                            delay: 0.3,
                          },
                          {
                            icon: "📍",
                            label: "Location",
                            color: "orange",
                            width: "w-36",
                            delay: 0.4,
                          },
                        ].map((filter, index) => (
                          <motion.div
                            key={filter.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: filter.delay }}
                            className="group relative rounded-lg bg-white/5 p-4 hover:bg-white/[0.07]"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-${filter.color}-500/10`}
                                >
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: index * 0.3,
                                    }}
                                  >
                                    {filter.icon}
                                  </motion.div>
                                </div>
                                <span className="font-medium text-white/80">
                                  {filter.label}
                                </span>
                              </div>
                              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            </div>

                            {filter.multiple ? (
                              <div className="flex gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className={`h-2 flex-1 animate-pulse rounded-full bg-${filter.color}-500/20`}
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "100%" }}
                                    transition={{
                                      delay: filter.delay + i * 0.2,
                                      duration: 0.5,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <motion.div
                                className={`h-2 ${filter.width} animate-pulse rounded-full bg-${filter.color}-500/20`}
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: filter.width }}
                                transition={{
                                  delay: filter.delay,
                                  duration: 0.5,
                                }}
                              />
                            )}

                            <motion.div
                              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: filter.delay,
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                        <span>Analyzing requirements...</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                          <span>Please wait</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

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

        {/* Candidates Section */}
        <div className="flex flex-col gap-4 xl:flex-row">
          {/* Left - candidates view */}
          <div className="space-y-6">
            {/* Header Section */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isSearchActive ? "Top Candidates" : "Featured Candidates"}
                  </h2>
                  {candidates.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {searchCandidates.data?.total || candidates.length}{" "}
                      candidates found
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm">
                      <option>Match Score</option>
                      <option>Experience</option>
                      <option>Location</option>
                    </select>
                  </div>
                  <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Export
                  </button>
                </div>
              </div>
            </div>

            {naturalLanguageQuery.isPending || searchCandidates.isPending ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card
                    key={i}
                    className="animate-pulse transition-all duration-300"
                    style={{
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-40" />
                          </div>
                          <Skeleton className="h-6 w-6" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                          <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-10 flex-1" />
                          <Skeleton className="h-10 w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : candidates.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {candidates.map((candidate, index) => {
                  const matchPercentage = Math.round(
                    candidate.matchScore * 100,
                  );
                  const matchType =
                    matchPercentage >= 70
                      ? "Decent"
                      : matchPercentage >= 50
                        ? "Potential"
                        : "Poor";
                  const matchColor =
                    matchPercentage >= 70
                      ? "bg-orange-500"
                      : matchPercentage >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500";

                  return (
                    <Card
                      key={candidate.id}
                      className="group cursor-pointer overflow-hidden border-0 bg-white py-0 shadow-md transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleCandidateView(candidate)}
                    >
                      <CardContent className="p-0">
                        {/* Card Header with Match Score */}
                        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`${matchColor} rounded-md px-2 py-0.5 text-xs font-medium text-white`}
                            >
                              {matchPercentage}%
                            </Badge>
                            <span className="text-sm font-medium text-gray-700">
                              {matchType} Match
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-full p-0"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </Button>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          {/* Avatar and Header */}
                          <div className="mb-4 flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-14 w-14 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                                <AvatarFallback className="bg-transparent text-base font-bold text-white">
                                  {candidate.firstName?.[0] ?? "?"}
                                  {candidate.lastName?.[0] ?? ""}
                                </AvatarFallback>
                              </Avatar>
                              {/* Online indicator */}
                              <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="mb-1 text-lg leading-tight font-semibold text-gray-900">
                                {candidate.firstName && candidate.lastName
                                  ? `${candidate.firstName} ${candidate.lastName}`
                                  : "Anonymous Candidate"}
                              </h3>
                              <p className="text-sm leading-tight text-gray-600">
                                {candidate.title ?? "Professional"}
                              </p>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1.5">
                              {candidate.skills
                                .slice(0, 3)
                                .map((skill, skillIndex) => (
                                  <Badge
                                    key={skillIndex}
                                    variant="secondary"
                                    className="rounded-md border-0 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 capitalize"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {candidate.skills.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="rounded-md border-0 bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"
                                >
                                  +{candidate.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                            {candidate.yearsOfExperience && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg
                                  className="h-3.5 w-3.5 flex-shrink-0 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{candidate.yearsOfExperience} years</span>
                              </div>
                            )}
                            {candidate.location && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-red-500" />
                                <span>{candidate.location}</span>
                              </div>
                            )}
                            {candidate.workExperience[0] && (
                              <div className="col-span-2 flex items-center gap-2 text-gray-700">
                                <svg
                                  className="h-3.5 w-3.5 flex-shrink-0 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  />
                                </svg>
                                <span>
                                  {candidate.workExperience[0].company}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button
                              className="flex-1 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCandidateView(candidate);
                              }}
                            >
                              View Profile
                            </Button>
                            <Button
                              variant="outline"
                              className="rounded-md border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle contact action
                              }}
                            >
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : isSearchActive ? (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">
                  No candidates found matching your criteria.
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Try adjusting your search terms or requirements.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="group cursor-pointer transition-shadow hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="bg-muted h-6 w-20 rounded-full" />
                        <div className="flex items-start gap-4">
                          <div className="bg-muted h-12 w-12 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="bg-muted h-5 w-32 rounded" />
                            <div className="bg-muted h-4 w-40 rounded" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="bg-muted h-6 w-16 rounded-full" />
                          <div className="bg-muted h-6 w-20 rounded-full" />
                          <div className="bg-muted h-6 w-12 rounded-full" />
                        </div>
                        <div className="space-y-2">
                          <div className="bg-muted h-4 w-full rounded" />
                          <div className="bg-muted h-4 w-3/4 rounded" />
                        </div>
                        <div className="flex gap-2">
                          <div className="bg-muted h-10 flex-1 rounded" />
                          <div className="bg-muted h-10 w-20 rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right - search filters */}
          {isSearchActive && jobAttributes && (
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-6 border-0 bg-white py-0 shadow-md">
                <CardContent className="p-0">
                  <div className="border-b border-gray-100 p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        onClick={clearSearch}
                      >
                        Reset
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {
                        [
                          jobAttributes.newJob.role,
                          jobAttributes.newJob.skills?.length,
                          jobAttributes.pastExperience?.duration?.years,
                          jobAttributes.newJob.location?.city ??
                            jobAttributes.newJob.location?.country,
                          jobAttributes.newJob.location?.type,
                        ].filter(Boolean).length
                      }{" "}
                      filters applied
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div className="border-b border-gray-100 p-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-500">
                      Role
                    </h4>
                    <Select value={jobAttributes.newJob.role ?? undefined}>
                      <Button
                        variant="outline"
                        className="h-auto w-full justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                        asChild
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {jobAttributes.newJob.role ?? "Select role"}
                          </SelectValue>
                        </SelectTrigger>
                      </Button>
                      <SelectContent>
                        {jobAttributes.newJob.role && (
                          <SelectItem value={jobAttributes.newJob.role}>
                            {jobAttributes.newJob.role}
                          </SelectItem>
                        )}
                        {jobAttributes.newJob.similarRoles?.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skills */}
                  <div className="border-b border-gray-100 p-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-500">
                      Skills
                    </h4>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {jobAttributes.newJob.skills?.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="group rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          {skill}
                          <X
                            className="ml-1 h-3 w-3 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add skill removal logic here
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-auto w-full rounded-md border border-dashed border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add skill
                    </Button>
                  </div>

                  {/* Experience */}
                  {jobAttributes.pastExperience?.duration && (
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-500">
                        Experience
                      </h4>
                      <Select
                        value={
                          jobAttributes.pastExperience.duration.years
                            ? `${jobAttributes.pastExperience.duration.years} years`
                            : undefined
                        }
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="h-auto w-full justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {jobAttributes.pastExperience.duration.years
                                ? `${jobAttributes.pastExperience.duration.years} years`
                                : "Select experience"}
                            </SelectValue>
                          </SelectTrigger>
                        </Button>
                        <SelectContent>
                          <SelectItem value="0-1 years">0-1 years</SelectItem>
                          <SelectItem value="2-3 years">2-3 years</SelectItem>
                          <SelectItem value="4-5 years">4-5 years</SelectItem>
                          <SelectItem value="6+ years">6+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Location */}
                  {(jobAttributes.newJob.location?.city ??
                    jobAttributes.newJob.location?.country) && (
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-500">
                        Location
                      </h4>
                      <Button
                        variant="outline"
                        className="mb-2 h-auto w-full justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <div className="flex items-center">
                          <MapPin className="mr-1.5 h-3.5 w-3.5 text-red-500" />
                          {jobAttributes.newJob.location?.city ??
                            jobAttributes.newJob.location?.country}
                        </div>
                      </Button>
                      {jobAttributes.newJob.location?.type && (
                        <Select
                          value={
                            jobAttributes.newJob.location.type ?? undefined
                          }
                        >
                          <Button
                            asChild
                            variant="outline"
                            className="h-auto w-full justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                          >
                            <SelectTrigger>
                              <SelectValue>
                                <div className="flex items-center">
                                  {
                                    locationTypes.find(
                                      (type) =>
                                        type.value ===
                                        jobAttributes.newJob.location?.type,
                                    )?.icon
                                  }
                                  <span className="ml-1.5 capitalize">
                                    {jobAttributes.newJob.location.type}
                                  </span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                          </Button>
                          <SelectContent>
                            {locationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center">
                                  {type.icon}
                                  <span className="ml-2">{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}

                  {/* Additional Filters */}
                  <div className="p-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-500">
                      Additional Filters
                    </h4>
                    <div className="space-y-2">
                      {additionalFilters.map((filter) => (
                        <Button
                          key={filter.value}
                          variant="outline"
                          className="h-auto w-full justify-start rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            // Add filter selection logic here
                          }}
                        >
                          <Plus className="mr-2 h-3.5 w-3.5 text-gray-500" />
                          {filter.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Detail Sheet */}
      <Sheet
        open={!!selectedCandidate}
        onOpenChange={(open) => !open && setSelectedCandidate(null)}
      >
        <SheetContent className="w-[400px] overflow-y-auto px-4 py-4 sm:w-[540px]">
          {selectedCandidate && (
            <CandidateSheetContent selectedCandidate={selectedCandidate} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
