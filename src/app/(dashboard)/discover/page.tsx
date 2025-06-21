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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  ArrowRight,
  CheckIcon,
  ChevronsUpDown,
  LucideBuilding2,
  LucideCheckCircle2,
  LucideDownload,
  LucideGlobe,
  LucideHandshake,
  LucideMap,
  LucideSettings2,
  LucideSortDesc,
  MapPin,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import React, { useEffect, useRef, useState } from "react";
import { CandidateSheetContent } from "./candidate-sheet";

// Define proper types for candidates
type CandidateFromSearch = NonNullable<
  ReturnType<typeof api.ai.searchCandidates.useMutation>["data"]
>["candidates"][0];
type CandidateFromRAG = NonNullable<
  ReturnType<typeof api.ai.discoverCandidates.useMutation>["data"]
>["candidates"][0];

// Unified candidate type that includes all possible fields
type Candidate = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  yearsOfExperience: number | null;
  skills: string[];
  workExperience: Array<{
    company: string;
    position: string;
    startDate: Date | null;
    endDate: Date | null;
    isCurrent: boolean | null;
  }>;
  totalScore: number | null;
  isOpenToWork: boolean | null;
  expectedSalaryMin: number | null;
  expectedSalaryMax: number | null;
  salaryCurrency: string | null;
  isRemoteOpen: boolean | null;
  workTypes: string[] | null;
  resumeUrl: string | null;
  githubUsername: string | null;
  linkedinEmail: string | null;
  linkedinUrl: string | null;
  parsedGithubUrl: string | null;
  parsedLinkedinUrl: string | null;

  // Fields that may or may not exist depending on source
  matchScore?: number; // From traditional search
  vectorSimilarity?: number; // From RAG search
  source: "search" | "rag";
};

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

// Data for comboboxes
const roleOptions = [
  { label: "Frontend Developer", value: "frontend-developer" },
  { label: "Backend Developer", value: "backend-developer" },
  { label: "Full Stack Developer", value: "full-stack-developer" },
  { label: "Mobile Developer", value: "mobile-developer" },
  { label: "DevOps Engineer", value: "devops-engineer" },
  { label: "Data Scientist", value: "data-scientist" },
  { label: "AI/ML Engineer", value: "ai-ml-engineer" },
  { label: "Product Manager", value: "product-manager" },
  { label: "UI/UX Designer", value: "ui-ux-designer" },
  { label: "QA Engineer", value: "qa-engineer" },
];

const skillOptions = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "AWS", value: "aws" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Redis", value: "redis" },
  { label: "GraphQL", value: "graphql" },
  { label: "REST API", value: "rest-api" },
  { label: "TensorFlow", value: "tensorflow" },
  { label: "PyTorch", value: "pytorch" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "AI", value: "ai" },
  { label: "Comfy UI", value: "comfy-ui" },
  { label: "Figma", value: "figma" },
  { label: "Adobe Creative Suite", value: "adobe-creative-suite" },
];

const locationOptions = [
  { label: "New York, NY", value: "new-york-ny" },
  { label: "San Francisco, CA", value: "san-francisco-ca" },
  { label: "Los Angeles, CA", value: "los-angeles-ca" },
  { label: "Seattle, WA", value: "seattle-wa" },
  { label: "Chicago, IL", value: "chicago-il" },
  { label: "Boston, MA", value: "boston-ma" },
  { label: "Austin, TX", value: "austin-tx" },
  { label: "Denver, CO", value: "denver-co" },
  { label: "London, UK", value: "london-uk" },
  { label: "Berlin, Germany", value: "berlin-germany" },
  { label: "Amsterdam, Netherlands", value: "amsterdam-netherlands" },
  { label: "Toronto, Canada", value: "toronto-canada" },
  { label: "Sydney, Australia", value: "sydney-australia" },
  { label: "Tokyo, Japan", value: "tokyo-japan" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangalore, India", value: "bangalore-india" },
  { label: "Mumbai, India", value: "mumbai-india" },
  { label: "Delhi, India", value: "delhi-india" },
  { label: "Remote", value: "remote" },
];

// Sort options for candidates
const sortOptions = [
  { label: "Match Score", value: "match-score" },
  { label: "Experience", value: "experience" },
  { label: "Location", value: "location" },
  { label: "Name", value: "name" },
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
    defaultValue: "",
  });

  // Ref to track if we're initializing filters from AI data
  const isInitializingFilters = useRef(false);

  // State for selected candidate sheet
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  // Filter states
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");

  // Combobox states
  const [roleComboOpen, setRoleComboOpen] = useState(false);
  const [skillComboOpen, setSkillComboOpen] = useState(false);
  const [locationComboOpen, setLocationComboOpen] = useState(false);

  // Sort state
  const [sortBy, setSortBy] = useState<string>("match-score");

  // Use tRPC mutation for AI-powered query processing
  const naturalLanguageQuery = api.ai.naturalLanguageQuery.useMutation();

  // Use tRPC mutation for traditional candidate search
  const searchCandidates = api.ai.searchCandidates.useMutation();

  // Use tRPC mutation for RAG-based candidate discovery
  const discoverCandidates = api.ai.discoverCandidates.useMutation();

  // Merge candidates from both sources
  const mergedCandidates: Candidate[] = [
    ...(discoverCandidates.data?.candidates.map((c) => ({
      ...c,
      source: "rag" as const,
      matchScore: undefined,
      vectorSimilarity: c.vectorSimilarity,
    })) ?? []),
    ...(searchCandidates.data?.candidates.map((c) => ({
      ...c,
      source: "search" as const,
      matchScore: c.matchScore,
      vectorSimilarity: undefined,
    })) ?? []),
  ];

  // Remove duplicates by ID and prioritize search results over RAG results
  const uniqueCandidates = mergedCandidates.reduce((acc, candidate) => {
    const existingIndex = acc.findIndex((c) => c.id === candidate.id);
    if (existingIndex === -1) {
      acc.push(candidate);
    } else {
      // If search result exists, keep it; otherwise replace with RAG result
      if (candidate.source === "search") {
        acc[existingIndex] = candidate;
      }
    }

    return acc;
  }, [] as Candidate[]);

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

  // Search for candidates when natural language query completes (initial search)
  useEffect(() => {
    if (naturalLanguageQuery.data) {
      // Trigger both traditional search and RAG-based discovery simultaneously
      searchCandidates.mutate(naturalLanguageQuery.data);

      // Set flag to indicate we're initializing filters
      isInitializingFilters.current = true;
      discoverCandidates.mutate({
        query: searchQuery,
        limit: 20,
      });

      // Initialize filters from AI-extracted data if not already set
      if (!selectedRole && naturalLanguageQuery.data.newJob.role) {
        setSelectedRole(naturalLanguageQuery.data.newJob.role);
      }
      if (
        selectedSkills.length === 0 &&
        naturalLanguageQuery.data.newJob.skills
      ) {
        setSelectedSkills(naturalLanguageQuery.data.newJob.skills);
      }
      if (
        !selectedLocation &&
        (naturalLanguageQuery.data.newJob.location?.city ||
          naturalLanguageQuery.data.newJob.location?.country)
      ) {
        setSelectedLocation(
          naturalLanguageQuery.data.newJob.location?.city ??
            naturalLanguageQuery.data.newJob.location?.country ??
            "",
        );
      }
      if (
        !selectedExperience &&
        naturalLanguageQuery.data.pastExperience?.duration?.years
      ) {
        setSelectedExperience(
          `${naturalLanguageQuery.data.pastExperience.duration.years} years`,
        );
      }
    }

    // Reset flag after initialization
    setTimeout(() => {
      isInitializingFilters.current = false;
    }, 100);
  }, [
    naturalLanguageQuery.data,
    selectedRole,
    selectedSkills.length,
    selectedLocation,
    selectedExperience,
    searchQuery,
  ]);

  // Search for candidates when filters change (but only if we have initial data and not initializing)
  useEffect(() => {
    if (
      naturalLanguageQuery.data &&
      isSearchActive &&
      !isInitializingFilters.current
    ) {
      // Create updated job attributes with current filter values
      const updatedJobAttributes = {
        ...naturalLanguageQuery.data,
        newJob: {
          ...naturalLanguageQuery.data.newJob,
          role: selectedRole || naturalLanguageQuery.data.newJob.role,
          skills:
            selectedSkills.length > 0
              ? selectedSkills
              : naturalLanguageQuery.data.newJob.skills,
          location: {
            ...naturalLanguageQuery.data.newJob.location,
            city:
              selectedLocation ||
              naturalLanguageQuery.data.newJob.location?.city,
            country:
              selectedLocation ||
              naturalLanguageQuery.data.newJob.location?.country,
          },
        },
        pastExperience: {
          ...naturalLanguageQuery.data.pastExperience,
          duration: {
            ...naturalLanguageQuery.data.pastExperience?.duration,
            years: selectedExperience
              ? parseInt(selectedExperience.split(" ")[0] ?? "0")
              : naturalLanguageQuery.data.pastExperience?.duration?.years,
          },
        },
      };

      searchCandidates.mutate(updatedJobAttributes);
    }
  }, [selectedRole, selectedSkills, selectedLocation, selectedExperience]);

  const clearSearch = () => {
    void setSearchQuery("");
    naturalLanguageQuery.reset();
    searchCandidates.reset();
    discoverCandidates.reset();
    setSelectedRole("");
    setSelectedSkills([]);
    setSelectedLocation("");
    setSelectedExperience("");
    trackButtonClicked("clear_search", "discover_page");
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove),
    );
  };

  // Sorting function
  const sortCandidates = (
    candidates: Candidate[],
    sortBy: string,
  ): Candidate[] => {
    if (!candidates || candidates.length === 0) return [];

    return [...candidates].sort((a, b) => {
      switch (sortBy) {
        case "match-score":
          // For RAG candidates, use vectorSimilarity; for search candidates, use matchScore
          const scoreA =
            a.source === "rag"
              ? (a.vectorSimilarity ?? 0)
              : (a.matchScore ?? 0);
          const scoreB =
            b.source === "rag"
              ? (b.vectorSimilarity ?? 0)
              : (b.matchScore ?? 0);
          return scoreB - scoreA; // Highest first
        case "experience":
          return (b.yearsOfExperience ?? 0) - (a.yearsOfExperience ?? 0); // Most experienced first
        case "location":
          const locationA = a.location ?? "";
          const locationB = b.location ?? "";
          return locationA.localeCompare(locationB); // Alphabetical
        case "name":
          const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
          const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim();
          return nameA.localeCompare(nameB); // Alphabetical
        default:
          return 0;
      }
    });
  };

  const handleCandidateView = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    const score =
      candidate.source === "rag"
        ? (candidate.vectorSimilarity ?? 0)
        : (candidate.matchScore ?? 0);
    trackCandidateViewed(candidate.id, score);
  };

  const isSearchActive = Boolean(searchQuery && naturalLanguageQuery.data);
  const jobAttributes = naturalLanguageQuery.data;
  const candidates = sortCandidates(uniqueCandidates, sortBy);

  const isLoading =
    naturalLanguageQuery.isPending ||
    searchCandidates.isPending ||
    discoverCandidates.isPending;

  const getDisplayScore = (candidate: Candidate): number => {
    return candidate.source === "rag"
      ? Math.round((candidate.vectorSimilarity ?? 0) * 100)
      : (candidate.matchScore ?? 0);
  };

  const prepareCandidateForSheet = (candidate: Candidate) => {
    return {
      ...candidate,
      matchScore: getDisplayScore(candidate),
    };
  };

  return (
    <div className="relative flex items-center gap-2 px-4 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Search Section */}

        <AnimatePresence mode="sync">
          <React.Fragment>
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
                        placeholder="React  Developer, with 2+ years of experience, open to work in Bangalore"
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

                  {/* <AnimatePresence mode="sync"> */}

                  {/* </AnimatePresence> */}
                </div>
              </div>

              {/* Suggested Filters (only show when no active search) */}
              {!isSearchActive && (
                <motion.div className="flex flex-wrap justify-center gap-2">
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
                </motion.div>
              )}
            </div>

            {naturalLanguageQuery.isPending || searchCandidates.isPending ? (
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
            ) : (
              // Candidates Section
              <div className="flex flex-col gap-4 rounded-lg p-3 xl:flex-row">
                {/* Left - search filters */}
                <div className="w-80 flex-shrink-0">
                  {isSearchActive && jobAttributes && (
                    <Card
                      id="filters-card"
                      className="sticky top-6 bg-white py-0 shadow-md"
                    >
                      <CardContent className="flex flex-col gap-y-4 p-4">
                        <div className="border-b pb-4">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="flex items-center font-semibold text-gray-900">
                              <LucideSettings2 className="mr-2 h-4 w-4" />{" "}
                              Filters
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              onClick={clearSearch}
                            >
                              Reset
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            {
                              [
                                selectedRole || jobAttributes?.newJob?.role,
                                selectedSkills.length > 0
                                  ? selectedSkills.length
                                  : jobAttributes?.newJob?.skills?.length,
                                selectedExperience ||
                                  jobAttributes?.pastExperience?.duration
                                    ?.years,
                                (selectedLocation ||
                                  jobAttributes?.newJob?.location?.city) ??
                                  jobAttributes?.newJob?.location?.country,
                                jobAttributes?.newJob?.location?.type,
                              ].filter(Boolean).length
                            }{" "}
                            filters applied
                          </p>
                          {/* <p className="text-sm text-gray-500">
                            {searchCandidates.data?.total || candidates.length}{" "}
                            candidates found
                          </p> */}
                        </div>

                        {/* Role Selection */}
                        <div className="">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">
                            Role
                          </h4>
                          <Popover
                            open={roleComboOpen}
                            onOpenChange={setRoleComboOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={roleComboOpen}
                                // border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50
                                className="h-auto w-full justify-between rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                              >
                                {selectedRole
                                  ? (roleOptions.find(
                                      (role) => role.value === selectedRole,
                                    )?.label ?? jobAttributes.newJob.role)
                                  : (jobAttributes.newJob.role ??
                                    "Select role")}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search roles..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No role found.</CommandEmpty>
                                  <CommandGroup>
                                    {/* Current role from AI if available */}
                                    {jobAttributes?.newJob?.role &&
                                      !selectedRole && (
                                        <CommandItem
                                          value={jobAttributes?.newJob?.role}
                                          onSelect={(currentValue) => {
                                            setSelectedRole(currentValue);
                                            setRoleComboOpen(false);
                                          }}
                                        >
                                          {jobAttributes?.newJob?.role}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto",
                                              selectedRole ===
                                                jobAttributes?.newJob?.role
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      )}
                                    {/* Similar roles from AI */}
                                    {jobAttributes?.newJob?.similarRoles?.map(
                                      (role) => (
                                        <CommandItem
                                          key={role}
                                          value={role}
                                          onSelect={(currentValue) => {
                                            setSelectedRole(
                                              currentValue === selectedRole
                                                ? ""
                                                : currentValue,
                                            );
                                            setRoleComboOpen(false);
                                          }}
                                        >
                                          {role}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto",
                                              selectedRole === role
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ),
                                    )}
                                    {/* Predefined role options */}
                                    {roleOptions.map((role) => (
                                      <CommandItem
                                        key={role.value}
                                        value={role.value}
                                        onSelect={(currentValue) => {
                                          setSelectedRole(
                                            currentValue === selectedRole
                                              ? ""
                                              : currentValue,
                                          );
                                          setRoleComboOpen(false);
                                        }}
                                      >
                                        {role.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto",
                                            selectedRole === role.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Skills */}
                        <div className="">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">
                            Skills
                          </h4>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {/* AI-extracted skills */}
                            {jobAttributes?.newJob?.skills?.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="group rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                              >
                                {skill}
                                <X
                                  className="ml-1 h-3 w-3 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeSkill(skill);
                                  }}
                                />
                              </Badge>
                            ))}
                            {/* User-selected skills */}
                            {selectedSkills
                              .filter(
                                (skill) =>
                                  !jobAttributes?.newJob?.skills?.includes(
                                    skill,
                                  ),
                              )
                              .map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="group rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
                                >
                                  {skillOptions.find((s) => s.value === skill)
                                    ?.label ?? skill}
                                  <X
                                    className="ml-1 h-3 w-3 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeSkill(skill);
                                    }}
                                  />
                                </Badge>
                              ))}
                          </div>

                          <Popover
                            open={skillComboOpen}
                            onOpenChange={setSkillComboOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={skillComboOpen}
                                className="h-auto w-full rounded-md border border-dashed border-blue-100 bg-white px-3 py-1.5 text-sm text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                              >
                                <Plus className="mr-1 h-3 w-3" />
                                Add skill
                                <ChevronsUpDown className="ml-auto opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search skills..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No skill found.</CommandEmpty>
                                  <CommandGroup>
                                    {skillOptions
                                      .filter(
                                        (skill) =>
                                          !selectedSkills.includes(
                                            skill.value,
                                          ) &&
                                          !jobAttributes?.newJob?.skills?.includes(
                                            skill.label,
                                          ),
                                      )
                                      .map((skill) => (
                                        <CommandItem
                                          key={skill.value}
                                          value={skill.value}
                                          onSelect={(currentValue) => {
                                            addSkill(currentValue);
                                            setSkillComboOpen(false);
                                          }}
                                        >
                                          {skill.label}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto",
                                              selectedSkills.includes(
                                                skill.value,
                                              )
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Experience */}
                        <div className="">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">
                            Experience
                          </h4>
                          <Select
                            value={
                              selectedExperience ||
                              (jobAttributes.pastExperience?.duration?.years
                                ? `${jobAttributes.pastExperience.duration.years ?? "0-1"} years`
                                : "0-1 years")
                            }
                            onValueChange={setSelectedExperience}
                          >
                            <Button
                              asChild
                              variant="outline"
                              className="h-auto w-full justify-between rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                            >
                              <SelectTrigger>
                                <SelectValue>
                                  {selectedExperience ||
                                    (jobAttributes.pastExperience?.duration
                                      ?.years
                                      ? `${jobAttributes.pastExperience.duration.years} years`
                                      : "Select experience")}
                                </SelectValue>
                              </SelectTrigger>
                            </Button>
                            <SelectContent>
                              <SelectItem value="0-1 years">
                                0-1 years
                              </SelectItem>
                              <SelectItem value="2-3 years">
                                2-3 years
                              </SelectItem>
                              <SelectItem value="4-5 years">
                                4-5 years
                              </SelectItem>
                              <SelectItem value="6+ years">6+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Location */}
                        <div className="">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">
                            Location
                          </h4>
                          <Popover
                            open={locationComboOpen}
                            onOpenChange={setLocationComboOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={locationComboOpen}
                                className="mb-2 h-auto w-full justify-between rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                              >
                                <div className="flex items-center">
                                  <MapPin className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
                                  {selectedLocation
                                    ? (locationOptions.find(
                                        (loc) => loc.value === selectedLocation,
                                      )?.label ??
                                      jobAttributes.newJob.location?.city ??
                                      jobAttributes.newJob.location?.country)
                                    : (jobAttributes.newJob.location?.city ??
                                      jobAttributes.newJob.location?.country ??
                                      "Select location")}
                                </div>
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search locations..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No location found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {/* Current location from AI if available */}
                                    {(jobAttributes.newJob.location?.city ??
                                      jobAttributes.newJob.location?.country) &&
                                      !selectedLocation && (
                                        <CommandItem
                                          value={
                                            jobAttributes.newJob.location
                                              ?.city ??
                                            jobAttributes.newJob.location
                                              ?.country ??
                                            ""
                                          }
                                          onSelect={(currentValue) => {
                                            setSelectedLocation(currentValue);
                                            setLocationComboOpen(false);
                                          }}
                                        >
                                          {jobAttributes.newJob.location
                                            ?.city ??
                                            jobAttributes.newJob.location
                                              ?.country}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto",
                                              selectedLocation ===
                                                (jobAttributes.newJob.location
                                                  ?.city ??
                                                  jobAttributes.newJob.location
                                                    ?.country)
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      )}
                                    {/* Predefined location options */}
                                    {locationOptions.map((location) => (
                                      <CommandItem
                                        key={location.value}
                                        value={location.value}
                                        onSelect={(currentValue) => {
                                          setSelectedLocation(
                                            currentValue === selectedLocation
                                              ? ""
                                              : currentValue,
                                          );
                                          setLocationComboOpen(false);
                                        }}
                                      >
                                        {location.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto",
                                            selectedLocation === location.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {/* Location Type */}
                          {(jobAttributes.newJob.location?.type ??
                            selectedLocation) && (
                            <Select
                              value={
                                jobAttributes.newJob.location?.type ?? undefined
                              }
                              onValueChange={(value) => {
                                // Update location type - you can add state for this if needed
                              }}
                            >
                              <Button
                                asChild
                                variant="outline"
                                className="h-auto w-full justify-between rounded-md border border-blue-100 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:border-blue-300 hover:bg-blue-50"
                              >
                                <SelectTrigger>
                                  <SelectValue>
                                    <div className="flex items-center">
                                      {jobAttributes.newJob.location?.type &&
                                        locationTypes.find(
                                          (type) =>
                                            type.value ===
                                            jobAttributes.newJob.location?.type,
                                        )?.icon}
                                      <span className="ml-1.5 capitalize">
                                        {jobAttributes.newJob.location?.type ??
                                          "Select work type"}
                                      </span>
                                    </div>
                                  </SelectValue>
                                </SelectTrigger>
                              </Button>
                              <SelectContent>
                                {locationTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
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

                        <Button
                          variant="default"
                          className="rounded-md px-4 py-2 text-sm font-medium"
                          onClick={() => {
                            trackButtonClicked(
                              "export_candidates",
                              "discover_page",
                            );
                            // Add export functionality here
                            console.log("Exporting candidates");

                            console.log(candidates);

                            // Export candidates to CSV
                            const csvContent = [
                              [
                                "Name",
                                "Email",
                                "Location",
                                "Years of Experience",
                                "Skills",
                                "Resume URL",
                                "Expected Salary Range",
                              ],
                              ...candidates.map((candidate) => [
                                `${candidate.firstName} ${candidate.lastName}`,
                                candidate.linkedinEmail ?? "",
                                candidate.location
                                  ? `"${candidate.location}"`
                                  : "",
                                candidate.yearsOfExperience ?? "",
                                `"${candidate.skills.join(", ")}"`,
                                candidate.resumeUrl ?? "",
                                `${candidate.expectedSalaryMin} - ${candidate.expectedSalaryMax} ${candidate.salaryCurrency}`,
                              ]),
                            ]
                              .map((row) => row.join(","))
                              .join("\n");

                            const blob = new Blob([csvContent], {
                              type: "text/csv",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "candidates.csv";
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <LucideDownload /> Export
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right - candidates view */}
                <div className="space-y-6">
                  {/* Header Section */}

                  <div className="flex items-center justify-end gap-2">
                    {candidates.length > 0 && (
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <Button asChild variant={"outline"}>
                          <SelectTrigger className="w-40 rounded-md px-3 py-1 text-sm">
                            <LucideSortDesc />

                            <SelectValue>
                              {
                                sortOptions.find(
                                  (option) => option.value === sortBy,
                                )?.label
                              }
                            </SelectValue>
                          </SelectTrigger>
                        </Button>

                        <SelectContent>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {isLoading ? (
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
                        const matchPercentage = getDisplayScore(candidate) + 25;

                        const matchType =
                          index < 3
                            ? "Great"
                            : index < 6
                              ? "Potential"
                              : "Poor";
                        const matchColor =
                          index < 3
                            ? "bg-gradient-to-tr from-emerald-500 to-cyan-500"
                            : index < 6
                              ? "bg-gradient-to-tr from-orange-500 to-orange-600"
                              : "bg-gradient-to-tr from-red-500 to-red-600";

                        return (
                          <Card
                            key={candidate.id}
                            className="group cursor-pointer overflow-hidden border bg-white py-0 shadow-md transition-all duration-200 hover:shadow-lg"
                            onClick={() => handleCandidateView(candidate)}
                          >
                            <CardContent className="p-0">
                              {/* Card Header with Match Score */}
                              <div className="group relative flex h-9 items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-1">
                                <div className="absolute left-2 flex items-center gap-2">
                                  {/* <Badge
                              className={`${matchColor} rounded-md px-2 py-0.5 text-xs font-medium text-white`}
                            >
                              {matchPercentage}%
                            </Badge> */}
                                  <span
                                    className={`rounded-md px-2 py-0.5 text-xs font-medium text-white ${matchColor}`}
                                  >
                                    {matchType} Match
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 h-7 w-7 rounded-full p-0"
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
                                    className="text-gray-400 group-hover:text-blue-600"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </Button>
                              </div>

                              {/* Card Content */}
                              <div className="flex flex-col p-4">
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
                                    <h3 className="mb-1 flex items-center gap-1 text-lg leading-tight font-semibold text-gray-900">
                                      {candidate.firstName && candidate.lastName
                                        ? `${candidate.firstName} ${candidate.lastName}`
                                        : "Anonymous Candidate"}{" "}
                                      {index < 3 && (
                                        <LucideCheckCircle2 className="h-5 w-5 fill-green-500 stroke-white" />
                                      )}
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
                                <div className="mb-4 flex flex-col gap-2 text-sm">
                                  {candidate.yearsOfExperience && (
                                    <div className="flex items-center gap-2 text-gray-700">
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
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      <span>
                                        {candidate.yearsOfExperience} years
                                      </span>
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

                                  {candidate.location && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
                                      <span>{candidate.location}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto flex items-center gap-2">
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
                    <div className="grid hidden grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              </div>
            )}
          </React.Fragment>
        </AnimatePresence>
      </div>

      {/* Candidate Detail Sheet */}
      <Sheet
        open={!!selectedCandidate}
        onOpenChange={(open) => !open && setSelectedCandidate(null)}
      >
        <SheetContent className="w-[400px] overflow-y-auto px-4 py-4 sm:w-[540px]">
          {selectedCandidate && (
            <CandidateSheetContent
              selectedCandidate={prepareCandidateForSheet(selectedCandidate)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
