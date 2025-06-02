"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTracking } from "@/lib/hooks/use-tracking";
import { type RouterOutputs } from "@/trpc/react";
import {
  Building,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  VerifiedIcon,
} from "lucide-react";
import Image from "next/image";

export function getMatchLevel(score: number) {
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

export const CandidateSheetContent = ({
  selectedCandidate,
}: {
  selectedCandidate: RouterOutputs["ai"]["searchCandidates"]["candidates"][0];
}) => {
  const {
    trackButtonClicked,
    trackContactInfoViewed,
    trackExternalLinkClicked,
  } = useTracking();

  const handleExternalLink = (
    linkType: "linkedin" | "github" | "portfolio",
    candidateId?: string,
  ) => {
    trackExternalLinkClicked(linkType, candidateId);
  };

  const handleContactView = (candidateId: string) => {
    trackContactInfoViewed(candidateId);
  };

  return (
    <>
      <SheetHeader>
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-semibold text-white">
            {selectedCandidate?.firstName?.[0] ?? "?"}
            {selectedCandidate?.lastName?.[0] ?? ""}
          </div>
          <div>
            <SheetTitle className="text-left">
              {selectedCandidate?.firstName && selectedCandidate?.lastName
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
              variant={getMatchLevel(selectedCandidate.matchScore).variant}
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          {selectedCandidate?.bio && (
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                {selectedCandidate?.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            {selectedCandidate?.yearsOfExperience && (
              <Badge
                variant="secondary"
                className="border-border w-full border px-3 py-1.5 text-sm font-medium transition-all duration-200"
              >
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-gray-700">
                  {selectedCandidate?.yearsOfExperience} years exp
                </span>
              </Badge>
            )}

            {selectedCandidate?.location && (
              <Badge
                variant="secondary"
                className="border-border w-full border px-3 py-1.5 text-sm font-medium transition-all duration-200"
              >
                {/* <MapPin className="h-5 w-5 text-red-500" /> */}
                📍
                <span className="font-medium text-gray-700">
                  {selectedCandidate?.location}
                </span>
              </Badge>
            )}
            {selectedCandidate?.isRemoteOpen && (
              <Badge
                variant="secondary"
                className="border-border w-full border px-3 py-1.5 text-sm font-medium transition-all duration-200"
              >
                <ExternalLink className="h-5 w-5" />
                <span className="font-medium">Open to remote</span>
              </Badge>
            )}

            <Badge
              variant="secondary"
              className="border-border w-full border px-3 py-1.5 text-sm font-medium transition-all duration-200"
            >
              <VerifiedIcon className="h-5 w-5" />
              <span className="font-medium">Verified</span>
            </Badge>
          </div>
        </div>

        {selectedCandidate?.workTypes && (
          <>
            <h3 className="text-lg leading-0 font-semibold text-gray-900">
              Work Types
            </h3>

            <div className="col-span-2 flex flex-wrap gap-2">
              {selectedCandidate.workTypes.map(
                (workType: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                  >
                    <Building className="mr-1 h-3 w-3" />
                    {workType}
                  </Badge>
                ),
              )}
            </div>
          </>
        )}

        {/* Skills */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCandidate?.skills.map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="border-border border px-3 py-1.5 text-sm font-medium transition-all duration-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social Links */}
        {(selectedCandidate?.githubUsername ??
          selectedCandidate?.linkedinUrl ??
          selectedCandidate?.parsedGithubUrl ??
          selectedCandidate?.parsedLinkedinUrl) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
            <div className="grid gap-3">
              {/* GitHub from username */}
              {selectedCandidate?.githubUsername && (
                <a
                  href={`https://github.com/${selectedCandidate.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md"
                  onClick={() =>
                    handleExternalLink(
                      "github",
                      selectedCandidate.githubUsername ?? undefined,
                    )
                  }
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                    {/* <Github className="h-5 w-5" /> */}
                    <Image
                      width={100}
                      height={100}
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt="GitHub"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">GitHub</div>
                    <div className="text-sm text-gray-500">
                      @{selectedCandidate.githubUsername}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600" />
                </a>
              )}

              {/* GitHub from parsed resume */}
              {!selectedCandidate?.githubUsername &&
                selectedCandidate?.parsedGithubUrl && (
                  <a
                    href={selectedCandidate.parsedGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-900 hover:shadow-md"
                    onClick={() =>
                      handleExternalLink(
                        "github",
                        selectedCandidate.parsedGithubUrl ?? undefined,
                      )
                    }
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white transition-colors group-hover:bg-gray-800">
                      <Github className="h-5 w-5" />
                      {/* <Image
                        width={100}
                        height={100}
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub"
                        className="object-cover object-center"
                      /> */}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">GitHub</div>
                      <div className="text-sm text-gray-500">View profile</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600" />
                  </a>
                )}

              {/* LinkedIn from URL */}
              {selectedCandidate?.linkedinUrl && (
                <a
                  href={selectedCandidate.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-50/50 p-4 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md"
                  onClick={() =>
                    handleExternalLink(
                      "linkedin",
                      selectedCandidate.linkedinUrl ?? undefined,
                    )
                  }
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors">
                    {/* <Linkedin className="h-5 w-5" /> */}
                    <Image
                      width={100}
                      height={100}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png"
                      alt="LinkedIn"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">LinkedIn</div>
                    <div className="text-sm text-blue-600">
                      Professional profile
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-blue-400 transition-colors group-hover:text-blue-600" />
                </a>
              )}

              {/* LinkedIn from parsed resume */}
              {!selectedCandidate?.linkedinUrl &&
                selectedCandidate?.parsedLinkedinUrl && (
                  <a
                    href={selectedCandidate.parsedLinkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-50/50 p-4 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md"
                    onClick={() =>
                      handleExternalLink(
                        "linkedin",
                        selectedCandidate.parsedLinkedinUrl ?? undefined,
                      )
                    }
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors group-hover:bg-blue-700">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">LinkedIn</div>
                      <div className="text-sm text-blue-600">
                        Professional profile
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-400 transition-colors group-hover:text-blue-600" />
                  </a>
                )}

              {/* LinkedIn Email */}
              {selectedCandidate?.linkedinEmail &&
                !selectedCandidate?.linkedinUrl &&
                !selectedCandidate?.parsedLinkedinUrl && (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500 text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-sm text-gray-600">
                        {selectedCandidate.linkedinEmail}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {selectedCandidate?.workExperience.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
            <div className="space-y-3">
              {selectedCandidate?.workExperience.map(
                (
                  work: (typeof selectedCandidate.workExperience)[0],
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                  >
                    {/* Timeline dot for visual hierarchy */}
                    <div className="absolute top-6 -left-2 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm" />

                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                            {work.position}
                          </h4>
                          {work.isCurrent && (
                            <Badge
                              variant="default"
                              className="border-green-200 bg-green-100 text-xs font-medium text-green-800"
                            >
                              Current
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <p className="font-medium text-gray-700">
                            {work.company}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
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
                      </div>
                    </div>

                    {/* Add subtle gradient background for current role */}
                    {work.isCurrent && (
                      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-green-50/50 to-blue-50/50" />
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Salary Expectations */}
        {(selectedCandidate?.expectedSalaryMin ??
          selectedCandidate?.expectedSalaryMax) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Salary Expectations
            </h3>
            <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-sm">
              {/* Decorative background pattern */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-100/40" />
              <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-teal-100/40" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                  <span className="text-lg font-bold">$</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedCandidate?.salaryCurrency ?? "USD"}
                    </span>
                    <span className="text-3xl font-black text-emerald-600">
                      {selectedCandidate?.expectedSalaryMin
                        ? `${selectedCandidate?.expectedSalaryMin.toLocaleString()}`
                        : "Flexible"}
                    </span>
                    {selectedCandidate?.expectedSalaryMax &&
                      selectedCandidate?.expectedSalaryMin && (
                        <>
                          <span className="text-xl font-semibold text-gray-500">
                            -
                          </span>
                          <span className="text-3xl font-black text-emerald-600">
                            {selectedCandidate?.expectedSalaryMax.toLocaleString()}
                          </span>
                        </>
                      )}
                    {selectedCandidate?.expectedSalaryMax &&
                      !selectedCandidate?.expectedSalaryMin && (
                        <>
                          <span className="text-lg font-medium text-gray-600">
                            up to
                          </span>
                          <span className="text-3xl font-black text-emerald-600">
                            {selectedCandidate?.expectedSalaryMax.toLocaleString()}
                          </span>
                        </>
                      )}
                    {!selectedCandidate?.expectedSalaryMax &&
                      selectedCandidate?.expectedSalaryMin && (
                        <span className="text-2xl font-bold text-gray-400">
                          +
                        </span>
                      )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-emerald-700">
                    per year
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Take Action</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-12 flex-1 bg-gradient-to-r from-blue-600 to-blue-700 font-semibold shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
              onClick={() => handleContactView(selectedCandidate.id)}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact
            </Button>
            <Button
              variant="outline"
              className="h-12 flex-1 border-2 border-gray-300 font-semibold shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md"
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
              <ExternalLink className="mr-2 h-5 w-5" />
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
