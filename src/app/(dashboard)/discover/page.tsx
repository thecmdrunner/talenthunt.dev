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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useTracking } from "@/lib/hooks/use-tracking";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  ArrowRight,
  Building,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  LucideChevronDown,
  Mail,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

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
function getMatchLevel(score: number) {
  if (score >= 85) {
    return {
      label: "Perfect",
      variant: "default" as const,
      color: "bg-green-500 text-white",
      icon: "🎯",
    };
  } else if (score >= 75) {
    return {
      label: "Strong",
      variant: "default" as const,
      color: "bg-blue-500 text-white",
      icon: "⭐",
    };
  } else if (score >= 65) {
    return {
      label: "Good",
      variant: "secondary" as const,
      color: "bg-purple-500 text-white",
      icon: "💪",
    };
  } else if (score >= 50) {
    return {
      label: "Decent",
      variant: "secondary" as const,
      color: "bg-orange-500 text-white",
      icon: "👍",
    };
  } else if (score >= 35) {
    return {
      label: "Potential",
      variant: "outline" as const,
      color: "bg-yellow-500 text-white",
      icon: "🤔",
    };
  } else {
    return {
      label: "Basic",
      variant: "outline" as const,
      color: "bg-gray-500 text-white",
      icon: "📋",
    };
  }
}

export default function DiscoverPage() {
  const {
    trackPageVisited,
    trackSearch,
    trackCandidateViewed,
    trackFilterApplied,
    trackButtonClicked,
    trackContactInfoViewed,
    trackExternalLinkClicked,
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

  const handleContactView = (candidateId: string) => {
    trackContactInfoViewed(candidateId);
  };

  const handleExternalLink = (
    linkType: "linkedin" | "github" | "portfolio",
    candidateId?: string,
  ) => {
    trackExternalLinkClicked(linkType, candidateId);
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
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xl font-semibold text-white">
                        {candidate.firstName?.[0] ?? "?"}
                        {candidate.lastName?.[0] ?? ""}
                      </div>

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
            <>
              <SheetHeader>
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-semibold text-white">
                    {selectedCandidate?.firstName?.[0] ?? "?"}
                    {selectedCandidate?.lastName?.[0] ?? ""}
                  </div>
                  <div>
                    <SheetTitle className="text-left">
                      {selectedCandidate?.firstName &&
                      selectedCandidate?.lastName
                        ? `${selectedCandidate?.firstName} ${selectedCandidate?.lastName}`
                        : "Anonymous Candidate"}
                    </SheetTitle>
                    <SheetDescription className="text-left">
                      {selectedCandidate?.title ?? "Professional"}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Match Score */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Match</span>
                    <Badge
                      variant={
                        getMatchLevel(selectedCandidate.matchScore).variant
                      }
                      className={`${getMatchLevel(selectedCandidate.matchScore).color} text-sm`}
                    >
                      {getMatchLevel(selectedCandidate.matchScore).icon}{" "}
                      {getMatchLevel(selectedCandidate.matchScore).label}
                    </Badge>
                  </div>
                  {/* <div className="mt-2 text-xs text-gray-500">
                    Based on skills, experience, and role alignment
                  </div> */}
                </div>

                {/* Basic Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">About</h3>
                  {selectedCandidate?.bio && (
                    <p className="text-sm text-gray-600">
                      {selectedCandidate?.bio}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedCandidate?.yearsOfExperience && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {selectedCandidate?.yearsOfExperience} years exp
                        </span>
                      </div>
                    )}
                    {selectedCandidate?.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{selectedCandidate?.location}</span>
                      </div>
                    )}
                    {selectedCandidate?.isRemoteOpen && (
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-gray-500" />
                        <span>Open to remote</span>
                      </div>
                    )}
                    {selectedCandidate?.workTypes &&
                      selectedCandidate?.workTypes.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span>{selectedCandidate?.workTypes.join(", ")}</span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate?.skills.map(
                      (skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                {/* Social Links */}
                {(selectedCandidate?.githubUsername ??
                  selectedCandidate?.linkedinUrl ??
                  selectedCandidate?.parsedGithubUrl ??
                  selectedCandidate?.parsedLinkedinUrl) && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {/* GitHub from username */}
                      {selectedCandidate?.githubUsername && (
                        <a
                          href={`https://github.com/${selectedCandidate.githubUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                          onClick={() =>
                            handleExternalLink(
                              "github",
                              selectedCandidate.githubUsername ?? undefined,
                            )
                          }
                        >
                          <Github className="h-5 w-5" />
                          <span className="text-sm">GitHub</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}

                      {/* GitHub from parsed resume */}
                      {!selectedCandidate?.githubUsername &&
                        selectedCandidate?.parsedGithubUrl && (
                          <a
                            href={selectedCandidate.parsedGithubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                            onClick={() =>
                              handleExternalLink(
                                "github",
                                selectedCandidate.parsedGithubUrl ?? undefined,
                              )
                            }
                          >
                            <Github className="h-5 w-5" />
                            <span className="text-sm">GitHub</span>
                            <ExternalLink className="h-3 w-3 opacity-60" />
                          </a>
                        )}

                      {/* LinkedIn from URL */}
                      {selectedCandidate?.linkedinUrl && (
                        <a
                          href={selectedCandidate.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                          onClick={() =>
                            handleExternalLink(
                              "linkedin",
                              selectedCandidate.linkedinUrl ?? undefined,
                            )
                          }
                        >
                          <Linkedin className="h-5 w-5 text-blue-600" />
                          <span className="text-sm">LinkedIn</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}

                      {/* LinkedIn from parsed resume */}
                      {!selectedCandidate?.linkedinUrl &&
                        selectedCandidate?.parsedLinkedinUrl && (
                          <a
                            href={selectedCandidate.parsedLinkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                            onClick={() =>
                              handleExternalLink(
                                "linkedin",
                                selectedCandidate.parsedLinkedinUrl ??
                                  undefined,
                              )
                            }
                          >
                            <Linkedin className="h-5 w-5 text-blue-600" />
                            <span className="text-sm">LinkedIn</span>
                            <ExternalLink className="h-3 w-3 opacity-60" />
                          </a>
                        )}

                      {/* LinkedIn Email */}
                      {selectedCandidate?.linkedinEmail &&
                        !selectedCandidate?.linkedinUrl &&
                        !selectedCandidate?.parsedLinkedinUrl && (
                          <div className="flex items-center gap-2 rounded-lg border bg-gray-50 p-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {selectedCandidate.linkedinEmail}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {selectedCandidate?.workExperience.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                    <div className="space-y-4">
                      {selectedCandidate?.workExperience.map(
                        (
                          work: (typeof selectedCandidate.workExperience)[0],
                          index: number,
                        ) => (
                          <div key={index} className="rounded-lg border p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h4 className="font-medium">{work.position}</h4>
                                <p className="text-sm text-gray-600">
                                  {work.company}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {work.startDate
                                    ? new Date(work.startDate).getFullYear()
                                    : "Unknown"}{" "}
                                  -{" "}
                                  {work.isCurrent
                                    ? "Present"
                                    : work.endDate
                                      ? new Date(work.endDate).getFullYear()
                                      : "Unknown"}
                                </p>
                              </div>
                              {work.isCurrent && (
                                <Badge variant="outline" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Salary Expectations */}
                {(selectedCandidate?.expectedSalaryMin ??
                  selectedCandidate?.expectedSalaryMax) && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Salary Expectations
                    </h3>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm">
                        {selectedCandidate?.salaryCurrency ?? "USD"}{" "}
                        {selectedCandidate?.expectedSalaryMin
                          ? `${selectedCandidate?.expectedSalaryMin.toLocaleString()}`
                          : "Flexible"}
                        {selectedCandidate?.expectedSalaryMax &&
                        selectedCandidate?.expectedSalaryMin
                          ? ` - ${selectedCandidate?.expectedSalaryMax.toLocaleString()}`
                          : selectedCandidate?.expectedSalaryMax
                            ? ` up to ${selectedCandidate?.expectedSalaryMax.toLocaleString()}`
                            : "+"}{" "}
                        per year
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleContactView(selectedCandidate.id)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        trackButtonClicked("view_resume", "candidate_detail");
                        // Open resume in new tab
                        if (
                          "resumeUrl" in selectedCandidate &&
                          selectedCandidate.resumeUrl &&
                          typeof selectedCandidate.resumeUrl === "string"
                        ) {
                          window.open(
                            selectedCandidate.resumeUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        } else {
                          // Fallback - could show a toast or alert
                          alert("Resume not available for this candidate");
                        }
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
