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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ArrowRight, LucideChevronDown, Plus, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { CandidateSheetContent, getMatchLevel } from "./candidate-sheet";

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
    trackFilterApplied,
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

  const handleFilterSelect = (filterType: string, value: string) => {
    trackFilterApplied(filterType, value);
  };

  const isSearchActive = Boolean(searchQuery && naturalLanguageQuery.data);
  const jobAttributes = naturalLanguageQuery.data;
  const candidates = searchCandidates.data?.candidates ?? [];

  return (
    <div className="relative flex items-center gap-2 px-4 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="relative">
              <div className="mb-2 text-left">
                <span className="text-muted-foreground">
                  I&apos;m looking for a...
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
                      d="M13.666 8.964c-.857-.236-1.356-.615-1.527-1.4 0-.095-.084-.172-.187-.172s-.187.077-.187.171c-.257.786-.67 1.244-1.528 1.401-.103 0-.187.077-.187.171 0 .095.084.172.187.172.857.235 1.357.614 1.528 1.4 0 .095.084.171.187.171s.187-.076.187-.171c.257-.786.67-1.243 1.527-1.4.104 0 .187-.077.187-.172 0-.094-.083-.171-.187-.171-.187Z"
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
                      placeholder="product engineer more than 4 years exp"
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
                {(naturalLanguageQuery.isPending ||
                  searchCandidates.isPending) && (
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
                          ? "AI is analyzing your query..."
                          : "Searching for matching candidates..."}
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
          {isSearchActive && jobAttributes && (
            <div className="max-w-4xl space-y-6 rounded-xl bg-white/80 p-6 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
                  I&apos;m looking for a
                </span>

                {jobAttributes.newJob.role && (
                  <Select value={jobAttributes.newJob.role}>
                    <Button
                      asChild
                      variant={"secondary"}
                      className="relative cursor-pointer border-none text-2xl font-medium shadow-none"
                    >
                      <SelectTrigger>
                        <SelectValue>{jobAttributes.newJob.role}</SelectValue>
                      </SelectTrigger>
                    </Button>
                    <SelectContent>
                      <SelectItem value={jobAttributes.newJob.role}>
                        {jobAttributes.newJob.role}
                      </SelectItem>
                      {jobAttributes.newJob.similarRoles?.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Skills */}
              {jobAttributes.newJob.skills &&
                jobAttributes.newJob.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-slate-500">who knows</span>
                    {jobAttributes.newJob.skills.map((skill) => (
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

              {/* Experience */}
              {jobAttributes.pastExperience?.duration && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {jobAttributes.pastExperience.duration.filter}{" "}
                    <Badge
                      variant="outline"
                      className="group relative border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 shadow-sm transition-all hover:scale-105"
                    >
                      {jobAttributes.pastExperience.duration.years
                        ? `${jobAttributes.pastExperience.duration.years} years`
                        : jobAttributes.pastExperience.duration.years
                          ? `${jobAttributes.pastExperience.duration.years} years`
                          : null}{" "}
                      <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                    </Badge>{" "}
                    of experience
                  </span>
                </div>
              )}

              {/* Location */}
              {(jobAttributes.newJob.location?.city ??
                jobAttributes.newJob.location?.country) && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">📍</span>
                  <Badge
                    variant="outline"
                    className="group relative border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 shadow-sm transition-all hover:scale-105"
                  >
                    {[
                      jobAttributes.newJob.location.city,
                      jobAttributes.newJob.location.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                    <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                  </Badge>

                  {jobAttributes.newJob.location?.type && (
                    <Select value={jobAttributes.newJob.location.type}>
                      <Button
                        asChild
                        size={"sm"}
                        variant={"outline"}
                        className="group relative !h-6 py-0 text-xs shadow-sm transition-all hover:scale-105"
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {jobAttributes.newJob.location.type}
                          </SelectValue>
                        </SelectTrigger>
                      </Button>
                      <SelectContent>
                        <SelectItem value={jobAttributes.newJob.location.type}>
                          {jobAttributes.newJob.location.type}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              {/* Availability */}
              {jobAttributes.newJob.joiningNotice?.immediate && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">available</span>
                  <Badge
                    variant="outline"
                    className="group relative border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-sm transition-all hover:scale-105"
                  >
                    Immediate Joining
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 border-t pt-4">
                <button
                  onClick={clearSearch}
                  className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Add more filters
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

        {/* Candidates Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {isSearchActive ? "Top candidates" : "Featured candidates"}
            </h2>
            {candidates.length > 0 && (
              <div className="text-muted-foreground text-sm">
                {searchCandidates.data?.total} candidates found
              </div>
            )}
          </div>

          {naturalLanguageQuery.isPending || searchCandidates.isPending ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card
                  key={i}
                  className="group animate-pulse transition-all duration-300"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Avatar skeleton */}
                      <Skeleton className="mx-auto h-16 w-16 rounded-full" />

                      {/* Name and title skeleton */}
                      <div className="space-y-2 text-center">
                        <Skeleton className="mx-auto h-4 w-32" />
                        <Skeleton className="mx-auto h-3 w-24" />
                      </div>

                      {/* Skills skeleton */}
                      <div className="flex flex-wrap justify-center gap-1">
                        <Skeleton className="h-5 w-12 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>

                      {/* Experience skeleton */}
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>

                      {/* Match score skeleton */}
                      <div className="border-t pt-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : candidates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {candidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => handleCandidateView(candidate)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Avatar */}
                      <Avatar className="mx-auto h-16 w-16">
                        {/* <AvatarImage
                          src={`https://thispersondoesnotexist.com/?w=${candidate.firstName}-${candidate.lastName}-${Math.random()}`}
                          alt={`${candidate.firstName} ${candidate.lastName}`}
                        /> */}
                        <AvatarFallback className="flex items-center justify-center rounded-full bg-gray-100">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50">
                            <span className="text-xl font-semibold text-blue-600">
                              {candidate.firstName?.[0] ?? "?"}
                              {candidate.lastName?.[0] ?? ""}
                            </span>
                          </div>
                        </AvatarFallback>
                      </Avatar>

                      {/* Name and title */}
                      <div className="space-y-2 text-center">
                        <h3 className="font-semibold text-gray-900">
                          {candidate.firstName && candidate.lastName
                            ? `${candidate.firstName} ${candidate.lastName}`
                            : "Anonymous Candidate"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {candidate.title ?? "Professional"}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap justify-center gap-1">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Experience */}
                      <div className="space-y-1 text-sm text-gray-600">
                        {candidate.yearsOfExperience && (
                          <p>{candidate.yearsOfExperience} years experience</p>
                        )}
                        {candidate.location && <p>📍 {candidate.location}</p>}
                        {candidate.workExperience[0] && (
                          <p className="truncate">
                            @ {candidate.workExperience[0].company}
                          </p>
                        )}
                      </div>

                      {/* Match score */}
                      <div className="border-t pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Match</span>
                          <Badge
                            variant={
                              getMatchLevel(candidate.matchScore).variant
                            }
                            className={`${getMatchLevel(candidate.matchScore).color} text-xs`}
                          >
                            {getMatchLevel(candidate.matchScore).icon}{" "}
                            {getMatchLevel(candidate.matchScore).label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Placeholder avatar */}
                      <div className="bg-muted mx-auto h-16 w-16 rounded-full" />

                      {/* Placeholder content */}
                      <div className="space-y-2 text-center">
                        <div className="bg-muted mx-auto h-4 w-3/4 rounded" />
                        <div className="bg-muted mx-auto h-3 w-1/2 rounded" />
                      </div>

                      {/* Placeholder skills */}
                      <div className="flex flex-wrap justify-center gap-1">
                        <div className="bg-muted h-5 w-12 rounded" />
                        <div className="bg-muted h-5 w-16 rounded" />
                        <div className="bg-muted h-5 w-10 rounded" />
                      </div>

                      {/* Placeholder metrics */}
                      <div className="space-y-1">
                        <div className="bg-muted h-3 w-full rounded" />
                        <div className="bg-muted h-3 w-2/3 rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
