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
import { api } from "@/trpc/react";
import { ArrowRight, LucideChevronDown, Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

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

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });

  // Use tRPC mutation for AI-powered query processing
  const extractJobAttributes = api.ai.extractJobAttributes.useMutation();

  // Process search query on page load or when searchQuery changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      // Trigger AI extraction
      extractJobAttributes.mutate({ query: searchQuery });
    }
  }, []);

  const clearSearch = () => {
    void setSearchQuery("");
    extractJobAttributes.reset();
  };

  const isSearchActive = Boolean(searchQuery && extractJobAttributes.data);
  const jobAttributes = extractJobAttributes.data;

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="space-y-6">
        <div className="space-y-4 text-center">
          <div className="max-w-2xl">
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
                    const formData = new FormData(e.target as HTMLFormElement);
                    const value = searchQuery;

                    console.log({
                      value,
                    });
                    extractJobAttributes.mutate({ query: value });
                  }}
                  className="relative flex-1"
                >
                  <Input
                    id="search-input"
                    placeholder="product engineer more than 4 years exp"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-3 pr-12 text-lg"
                    disabled={extractJobAttributes.isPending}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute top-1 right-1 h-8 w-8 cursor-pointer p-0"
                    disabled={
                      extractJobAttributes.isPending ||
                      !searchQuery ||
                      searchQuery.length < 2
                    }
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              {extractJobAttributes.isPending && (
                <div className="text-muted-foreground mt-2 text-sm">
                  Processing your query...
                </div>
              )}
              {extractJobAttributes.error && (
                <div className="mt-2 text-sm text-red-600">
                  Error processing query. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Search Display */}
        {isSearchActive && jobAttributes && (
          <div className="max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
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

              {jobAttributes.newJob.location?.type && (
                <Select value={jobAttributes.newJob.location.type}>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="relative cursor-pointer border-none text-2xl font-medium shadow-none"
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
                <span className="text-sm text-slate-500">with experience</span>
                <Badge
                  variant="outline"
                  className="group relative border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 shadow-sm transition-all hover:scale-105"
                >
                  {jobAttributes.pastExperience.duration.filter &&
                  jobAttributes.pastExperience.duration.years
                    ? `${jobAttributes.pastExperience.duration.filter} ${jobAttributes.pastExperience.duration.years} years`
                    : jobAttributes.pastExperience.duration.years
                      ? `${jobAttributes.pastExperience.duration.years} years`
                      : "Experience specified"}
                  <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                </Badge>
              </div>
            )}

            {/* Salary */}
            {jobAttributes.newJob.expectedSalary && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">salary range</span>
                <Badge
                  variant="outline"
                  className="group relative border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 shadow-sm transition-all hover:scale-105"
                >
                  {jobAttributes.newJob.expectedSalary.min &&
                  jobAttributes.newJob.expectedSalary.max
                    ? `${jobAttributes.newJob.expectedSalary.currency ?? ""} ${jobAttributes.newJob.expectedSalary.min}-${jobAttributes.newJob.expectedSalary.max}`
                    : jobAttributes.newJob.expectedSalary.min
                      ? `${jobAttributes.newJob.expectedSalary.currency ?? ""} ${jobAttributes.newJob.expectedSalary.min}+`
                      : jobAttributes.newJob.expectedSalary.max
                        ? `${jobAttributes.newJob.expectedSalary.currency ?? ""} up to ${jobAttributes.newJob.expectedSalary.max}`
                        : "Salary specified"}
                  <LucideChevronDown className="ml-1 h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
                </Badge>
              </div>
            )}

            {/* Location */}
            {jobAttributes.newJob.location?.city ??
              (jobAttributes.newJob.location?.country && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">in</span>
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
                </div>
              ))}

            {/* Availability */}
            {jobAttributes.newJob.joiningNotice && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">available</span>
                <Badge
                  variant="outline"
                  className="group relative border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 shadow-sm transition-all hover:scale-105"
                >
                  {jobAttributes.newJob.joiningNotice.immediate
                    ? "immediately"
                    : jobAttributes.newJob.joiningNotice.duration &&
                        jobAttributes.newJob.joiningNotice.unit
                      ? `in ${jobAttributes.newJob.joiningNotice.duration} ${jobAttributes.newJob.joiningNotice.unit}`
                      : "with notice period"}
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
                onClick={() => setSearchQuery(searchQuery + " " + filter.label)}
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
