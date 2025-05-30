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
import { ArrowRight, LucideChevronDown, Plus } from "lucide-react";
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

interface ParsedSearch {
  role?: string;
  skills: string[];
  employment?: string;
  salary?: string;
  rawQuery: string;
}

function parseSearchQuery(query: string): ParsedSearch {
  const skills: string[] = [];
  let role: string | undefined;
  let employment: string | undefined;
  let salary: string | undefined;

  // Extract common tech skills
  const techSkills = [
    "nextjs",
    "next.js",
    "tailwind",
    "react",
    "typescript",
    "node",
    "python",
  ];
  techSkills.forEach((skill) => {
    if (query.toLowerCase().includes(skill)) {
      skills.push(skill);
    }
  });

  // Extract employment type
  if (
    query.toLowerCase().includes("fulltime") ||
    query.toLowerCase().includes("full-time")
  ) {
    employment = "fulltime";
  }
  if (query.toLowerCase().includes("contract")) {
    employment = "contract";
  }

  // Extract role
  if (
    query.toLowerCase().includes("dev") ||
    query.toLowerCase().includes("developer")
  ) {
    role = "Fullstack Developer";
  }

  // Extract salary (simple pattern matching)
  const salaryMatch = query.match(/(\d+)\s*lpa/i);
  if (salaryMatch) {
    salary = `Rs. ${salaryMatch[1]} LPA`;
  }

  return { role, skills, employment, salary, rawQuery: query };
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [inputValue, setInputValue] = useState(searchQuery);
  const [parsedSearch, setParsedSearch] = useState<ParsedSearch | null>(null);

  // Process search query on page load or when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      setParsedSearch(parseSearchQuery(searchQuery));
      setInputValue(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setInputValue("");
    setParsedSearch(null);
  };

  const isSearchActive = Boolean(searchQuery && parsedSearch);

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="space-y-6">
        <div className="space-y-4 text-center">
          <div className="max-w-2xl">
            <div className="relative">
              <div className="mb-2 text-left">
                <span className="text-muted-foreground">
                  I'm looking for a...
                </span>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="dev nextjs tailwind fulltime 10lpa"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="py-3 pr-12 text-lg"
                  />
                  <Button
                    onClick={handleSearch}
                    size="sm"
                    className="absolute top-1 right-1 h-8 w-8 p-0"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Search Display */}
        {isSearchActive && parsedSearch && (
          <div className="max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
                I&apos;m looking for a
              </span>

              {parsedSearch.role && (
                <Select value={parsedSearch.role}>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="relative cursor-pointer border-none text-2xl font-medium shadow-none"
                  >
                    <SelectTrigger>
                      <SelectValue>{parsedSearch.role}</SelectValue>
                    </SelectTrigger>
                  </Button>
                  <SelectContent>
                    <SelectItem value={parsedSearch.role}>
                      {parsedSearch.role}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}

              {parsedSearch.employment && (
                <Select value={parsedSearch.employment}>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="relative cursor-pointer border-none text-2xl font-medium shadow-none"
                  >
                    <SelectTrigger>
                      <SelectValue>{parsedSearch.employment}</SelectValue>
                    </SelectTrigger>
                  </Button>
                  <SelectContent>
                    <SelectItem value={parsedSearch.employment}>
                      {parsedSearch.employment}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {parsedSearch.skills.length > 0 && (
                <>
                  <span className="text-sm text-slate-500">who knows</span>
                  {parsedSearch.skills.map((skill) => (
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
                </>
              )}
            </div>

            {parsedSearch.salary && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">salary range</span>
                <Badge
                  variant="outline"
                  className="group relative border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm transition-all hover:scale-105"
                >
                  {parsedSearch.salary}
                  <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
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
                onClick={() => setInputValue(inputValue + " " + filter.label)}
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
        <h2 className="text-2xl font-bold">
          {isSearchActive ? "Top candidates" : "Featured candidates"}
        </h2>

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
      </div>
    </div>
  );
}
