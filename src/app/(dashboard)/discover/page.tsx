"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { CandidateSheetContent, getMatchLevel } from "./candidate-sheet";

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
          <div className="space-y-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {isSearchActive ? "Top candidates" : "Featured candidates"}
              </h2>
              {candidates.length > 0 && (
                <div className="text-sm">
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
                            <p>
                              {candidate.yearsOfExperience} years experience
                            </p>
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

          {/* Right - search filters */}
          {isSearchActive && jobAttributes && (
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-4 rounded-3xl border-0 bg-white/95 shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Role Selection */}
                  <div className="mb-8">
                    <h3 className="mb-6 text-2xl font-bold text-purple-600">
                      I'm looking for a
                    </h3>
                    <Select value={jobAttributes.newJob.role || undefined}>
                      <Button
                        variant="outline"
                        className="h-auto w-full justify-between rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                        asChild
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {jobAttributes.newJob.role || "Select role"}
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
                  <div className="mb-8">
                    <h4 className="mb-4 text-lg font-medium text-gray-600">
                      who knows
                    </h4>
                    <div className="mb-4 flex flex-wrap gap-3">
                      {jobAttributes.newJob.skills?.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="group cursor-pointer rounded-2xl border-2 border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                        >
                          {skill}
                          <X
                            className="ml-2 h-4 w-4 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add skill removal logic here
                            }}
                          />
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-auto rounded-2xl border-2 border-dashed border-purple-300 px-4 py-2 text-purple-600 hover:bg-purple-50"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Experience */}
                  {jobAttributes.pastExperience?.duration && (
                    <div className="mb-8">
                      <h4 className="mb-4 text-lg font-medium text-gray-600">
                        with experience
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
                          className="w-full justify-between rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-center font-medium text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {jobAttributes.pastExperience.duration.years
                                ? `${jobAttributes.pastExperience.duration.years} years`
                                : "Select experience"}
                            </SelectValue>
                            {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
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
                    <div className="mb-8">
                      <h4 className="mb-4 text-lg font-medium text-gray-600">
                        located in
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <Command>
                          <CommandInput placeholder="Search locations..." />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem value="New York, USA">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                New York, USA
                              </CommandItem>
                              <CommandItem value="London, UK">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                London, UK
                              </CommandItem>
                              <CommandItem value="San Francisco, USA">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                San Francisco, USA
                              </CommandItem>
                              <CommandItem value="Bangalore, India">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                Bangalore, India
                              </CommandItem>
                              <CommandItem value="Toronto, Canada">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                Toronto, Canada
                              </CommandItem>
                              <CommandItem value="Berlin, Germany">
                                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                Berlin, Germany
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>

                        {jobAttributes.newJob.location?.type && (
                          <Select
                            value={
                              jobAttributes.newJob.location.type || undefined
                            }
                          >
                            <Button
                              asChild
                              variant="outline"
                              className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base font-medium text-gray-800 hover:border-purple-300 hover:bg-purple-50"
                            >
                              <SelectTrigger>
                                <SelectValue className="!capitalize">
                                  <span className="flex items-center gap-2 capitalize">
                                    {
                                      locationTypes.find(
                                        (type) =>
                                          type.value ===
                                          jobAttributes.newJob.location.type,
                                      )?.icon
                                    }
                                    {jobAttributes.newJob.location.type}
                                  </span>
                                </SelectValue>
                              </SelectTrigger>
                            </Button>
                            <SelectContent>
                              {locationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.icon} {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Filters */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-purple-600">
                      Add more filters
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {additionalFilters.map((filter) => (
                        <Button
                          key={filter.value}
                          variant="outline"
                          className="rounded-2xl border-2 border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50"
                          onClick={() => {
                            // Add filter selection logic here
                          }}
                        >
                          + {filter.label}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        className="rounded-2xl border-2 border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50"
                        onClick={clearSearch}
                      >
                        + Clear filters
                      </Button>
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
