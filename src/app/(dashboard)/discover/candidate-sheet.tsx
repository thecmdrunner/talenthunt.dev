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
  MapPin,
} from "lucide-react";

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
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">About</h3>
          {selectedCandidate?.bio && (
            <p className="text-sm text-gray-600">{selectedCandidate?.bio}</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {selectedCandidate?.yearsOfExperience && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{selectedCandidate?.yearsOfExperience} years exp</span>
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
            {selectedCandidate?.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary">
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
                        selectedCandidate.parsedLinkedinUrl ?? undefined,
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
                        <p className="text-sm text-gray-600">{work.company}</p>
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
            <h3 className="text-lg font-semibold">Salary Expectations</h3>
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
  );
};
