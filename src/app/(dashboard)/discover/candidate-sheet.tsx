"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useTracking } from "@/lib/hooks/use-tracking";
import { cn, formatShortNumber } from "@/lib/utils";
import { api, type RouterOutputs } from "@/trpc/react";
import {
  Building,
  Calendar,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  VerifiedIcon,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function getMatchLevel(score: number) {
  const matchPercentage = Math.round(score * 100);

  if (matchPercentage >= 70) {
    return {
      label: "Great",
      variant: "default" as const,
      color: "bg-gradient-to-tr from-emerald-300 to-cyan-300 text-emerald-900",
      icon: "🎯",
    };
  } else if (matchPercentage >= 50) {
    return {
      label: "Potential",
      variant: "secondary" as const,
      color: "bg-gradient-to-tr from-orange-300 to-orange-300 text-orange-900",
      icon: "👍",
    };
  } else {
    return {
      label: "Poor",
      variant: "outline" as const,
      color: "bg-gradient-to-tr from-red-300 to-red-300 text-red-900",
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

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  const [isEmailPopoverOpen, setIsEmailPopoverOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // tRPC mutation for generating personalized email
  const generateEmail = api.ai.generatePersonalizedEmail.useMutation();

  const handleContactView = (candidateId: string) => {
    trackContactInfoViewed(candidateId);
    // Generate email when contact is viewed
    if (!generateEmail.data && !generateEmail.isPending) {
      generateEmail.mutate({
        candidateId,
        searchQuery,
      });
    }
    setIsEmailPopoverOpen(true);
  };

  const handleCopyEmail = async () => {
    if (generateEmail.data) {
      const emailContent = `Subject: ${generateEmail.data.subject}\n\n${generateEmail.data.body}`;
      await navigator.clipboard.writeText(emailContent);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
      trackButtonClicked("copy_email", "candidate_detail");
    }
  };

  const handleExternalLink = (
    linkType: "linkedin" | "github" | "portfolio",
    candidateId?: string,
  ) => {
    trackExternalLinkClicked(linkType, candidateId);
  };

  return (
    <>
      <SheetHeader>
        <div
          onClick={() => {
            void navigator.clipboard.writeText(selectedCandidate.id);
          }}
          className="flex items-center space-x-4"
        >
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
        <div className="w-max rounded-full border px-3.5 py-2">
          <div className="flex items-center justify-between">
            {/* <span className="text-sm font-medium">Match</span> */}
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  Math.round(selectedCandidate.matchScore * 100) >= 70
                    ? "bg-gradient-to-tr from-emerald-500 to-cyan-500"
                    : Math.round(selectedCandidate.matchScore * 100) >= 50
                      ? "bg-gradient-to-tr from-orange-100 to-orange-100"
                      : "bg-gradient-to-tr from-red-100 to-red-100"
                }`}
              ></div>
              <span className="text-sm font-medium">
                {Math.round(selectedCandidate.matchScore * 100) >= 70
                  ? "Great"
                  : Math.round(selectedCandidate.matchScore * 100) >= 50
                    ? "Potential"
                    : "Poor"}{" "}
                Match
              </span>
              {/* <span className="text-xs text-gray-500">
                ({Math.round(selectedCandidate.matchScore)}%)
              </span> */}
            </div>
          </div>
          {/* <div className="mt-2 text-xs text-gray-500">
                    Based on skills, experience, and role alignment
                  </div> */}
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          {selectedCandidate?.bio && (
            <div className="border-border rounded-xl border bg-neutral-50/50 p-4">
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

        {/* Contact Actions */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Popover
              open={isEmailPopoverOpen}
              onOpenChange={setIsEmailPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  className="h-12 flex-1 bg-gradient-to-r from-blue-600 to-blue-700 font-semibold shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                  onClick={() => handleContactView(selectedCandidate.id)}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                className="w-[500px] p-0"
                align="center"
              >
                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        AI-Generated Personalized Email
                      </h3>
                      <p className="text-sm text-gray-500">
                        Based on {selectedCandidate.firstName}&apos;s profile
                        and your search
                      </p>
                    </div>
                  </div>

                  {generateEmail.isPending && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Sparkles className="h-4 w-4 animate-pulse text-blue-500" />
                        <span>AI is crafting a personalized email...</span>
                      </div>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  )}

                  {generateEmail.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-600">
                        Failed to generate email. Please try again.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          generateEmail.mutate({
                            candidateId: selectedCandidate.id,
                            searchQuery,
                          })
                        }
                      >
                        Retry
                      </Button>
                    </div>
                  )}

                  {generateEmail.data && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Subject:
                        </label>
                        <div className="mt-1 rounded-md border bg-gray-50 p-3 text-sm">
                          {generateEmail.data.subject}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email Body:
                        </label>
                        <Textarea
                          className="mt-1 min-h-[120px] resize-none"
                          value={generateEmail.data.body}
                          readOnly
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleCopyEmail}
                          variant="outline"
                          className="flex-1"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {emailCopied ? "Copied!" : "Copy Email"}
                        </Button>
                        <Button
                          onClick={() => {
                            const emailContent = `mailto:${selectedCandidate.linkedinEmail ?? ""}?subject=${encodeURIComponent(generateEmail.data.subject)}&body=${encodeURIComponent(generateEmail.data.body)}`;
                            window.open(emailContent);
                            trackButtonClicked(
                              "send_email",
                              "candidate_detail",
                            );
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Open in Email
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
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

        {selectedCandidate?.workTypes && (
          <>
            <h3 className="mt-10 text-lg leading-0 font-semibold text-gray-900">
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
          <section className="space-y-3">
            <h3 className="text-base font-semibold tracking-tight text-gray-900">
              Experience
            </h3>
            <ol className="relative border-l border-gray-200">
              {selectedCandidate.workExperience.map(
                (
                  work: (typeof selectedCandidate.workExperience)[0],
                  index: number,
                ) => (
                  <li key={index} className="mb-6 ml-4 last:mb-0">
                    <div className="absolute -left-2.5 mt-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                    <div
                      className={cn(
                        "relative rounded-lg px-0 py-2 transition-colors",
                        work.isCurrent &&
                          "bg-gradient-to-r from-green-50/60 to-blue-50/40",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {work.position}
                        </span>
                        {work.isCurrent && (
                          <span className="ml-1 rounded border border-green-200 bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                        <Building className="h-4 w-4 text-gray-300" />
                        <span className="font-normal">{work.company}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {work.startDate
                            ? new Date(work.startDate).getFullYear()
                            : "Unknown"}
                          {" – "}
                          {work.isCurrent
                            ? "Present"
                            : work.endDate
                              ? new Date(work.endDate).getFullYear()
                              : "Unknown"}
                        </span>
                      </div>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </section>
        )}

        {/* Salary Expectations */}
        {(selectedCandidate?.expectedSalaryMin ??
          selectedCandidate?.expectedSalaryMax) && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Salary Expectations
            </h3>
            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
              {/* Minimal gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-emerald-50/15" />

              <div className="relative flex items-center gap-4">
                {/* Compact icon */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
                  <span className="text-xs font-semibold text-white">$</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      {selectedCandidate?.salaryCurrency ?? "USD"}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {selectedCandidate?.expectedSalaryMin
                        ? formatShortNumber(selectedCandidate.expectedSalaryMin)
                        : "Flexible"}
                    </span>
                    {selectedCandidate?.expectedSalaryMax &&
                      selectedCandidate?.expectedSalaryMin && (
                        <>
                          <span className="text-sm font-medium text-gray-400">
                            –
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            {formatShortNumber(
                              selectedCandidate.expectedSalaryMax,
                            )}
                          </span>
                        </>
                      )}
                    {selectedCandidate?.expectedSalaryMax &&
                      !selectedCandidate?.expectedSalaryMin && (
                        <>
                          <span className="text-xs font-medium text-gray-500">
                            up to
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            {formatShortNumber(
                              selectedCandidate.expectedSalaryMax,
                            )}
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
      </div>
    </>
  );
};
