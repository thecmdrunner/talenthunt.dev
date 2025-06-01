"use client";

import { Button } from "@/components/ui/button";
import { useTracking } from "@/lib/hooks/use-tracking";
import { supabaseBrowserClient } from "@/lib/supabase/browser";
import { api } from "@/trpc/react";
import { CheckCircle, Upload, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UploadResumeProps {
  onComplete: (resumeUrl: string) => void;
  currentStep: number;
  totalSteps: number;
}

const ACCEPTED_FILE_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function UploadResume({
  onComplete,
  currentStep,
  totalSteps,
}: UploadResumeProps) {
  const { trackResumeUploaded, trackButtonClicked, trackFeatureUsed } =
    useTracking();

  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [isContinuing, setIsContinuing] = useState(false);

  const supabase = supabaseBrowserClient();

  const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } =
    api.services.getResumeUploadUrl.useMutation({
      onError: (error) => {
        console.error(error);
        toast.error(error.message ?? "Failed to prepare upload");
      },
    });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error("Please upload a PDF file only");
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const toastId = toast.loading(
        "Uploading resume, please don't close this screen.",
      );

      try {
        // Get presigned URL
        const { presigned, resumeUrl: returnedResumeUrl } =
          await getPresignedUrl({
            fileName: file.name,
            fileType: file.type,
          });

        if (!presigned) {
          throw new Error("Failed to get upload URL");
        }

        // Upload to Supabase
        const uploadResult = await supabase.storage
          .from("resumes")
          .uploadToSignedUrl(presigned.path, presigned.token, file, {
            contentType: file.type,
          });

        if (uploadResult.error) {
          console.error({ uploadError: uploadResult.error as unknown });
          throw new Error("Could not upload resume, please try again!");
        }

        setIsResumeUploaded(true);
        setUploadedFileName(file.name);
        setResumeUrl(returnedResumeUrl);
        toast.success("Resume uploaded successfully!");
        toast.dismiss(toastId);

        // Track resume upload
        trackResumeUploaded(file.size, file.type);
        trackFeatureUsed("resume_upload", "onboarding");
        onComplete(returnedResumeUrl);
      } catch (error) {
        console.error(error);
        toast.dismiss(toastId);
        toast.error(
          error instanceof Error
            ? error.message
            : "Upload failed, please try again!",
        );
      }
    },
    [supabase],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        void handleFileUpload(files[0]!);
      }
    },
    [handleFileUpload],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        void handleFileUpload(e.target.files[0]!);
      }
    },
    [handleFileUpload],
  );

  const isLoading = isGettingUrl;

  const handleContinue = () => {
    trackButtonClicked("continue_after_resume_upload", "onboarding");
    onComplete(resumeUrl);
  };

  return (
    <div className="relative">
      {/* Enhanced Geometric Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/15 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[250px] w-[250px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/15 to-blue-500/10 blur-3xl"></div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" fill="none">
          <path
            d="M50 100L150 60L250 120L350 80L450 150L550 110L650 180"
            stroke="rgba(96,165,250,0.1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M80 200L180 160L280 220L380 180L480 250L580 210"
            stroke="rgba(147,197,253,0.08)"
            strokeWidth="1"
            fill="none"
          />
          
          <circle cx="50" cy="100" r="4" fill="rgba(96,165,250,0.3)" className="animate-pulse" />
          <circle cx="150" cy="60" r="5" fill="rgba(59,130,246,0.4)" />
          <circle cx="250" cy="120" r="3" fill="rgba(147,197,253,0.25)" className="animate-pulse" />
        </svg>

        <div className="absolute top-1/4 left-1/6 h-3 w-3 animate-bounce rounded-full bg-blue-300/30"></div>
        <div className="absolute top-1/2 right-1/5 h-2 w-2 rotate-45 animate-pulse bg-blue-400/25"></div>
        <div className="absolute bottom-1/4 left-1/2 h-1.5 w-1.5 animate-ping rounded-full bg-blue-300/40"></div>
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column - Enhanced Text with blue theme */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-8 shadow-xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-20 w-20 opacity-10">
            <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
              <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="2" />
              <circle cx="50" cy="50" r="15" stroke="currentColor" fill="currentColor" opacity="0.3" />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/40">
                  <Sparkles className="h-6 w-6 text-blue-300" />
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Upload Your Resume
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/80 text-lg">We use your resume to:</p>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                    <span>Quickly understand your background</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                    <span>Pre-fill your profile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                    <span>Recommend the best-fit opportunities</span>
                  </li>
                </ul>
                
                <div className="relative overflow-hidden rounded-lg border border-blue-500/30 bg-blue-700/30 p-4 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-500/5"></div>
                  <p className="relative z-10 text-sm text-blue-200">
                    📄 PDF only, max 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Upload UI with blue theme */}
        <div className="space-y-6">
          <div
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 backdrop-blur-xl ${
              isDragOver
                ? "border-blue-400 bg-blue-600/30 shadow-xl"
                : isResumeUploaded
                  ? "border-green-400/60 bg-gradient-to-br from-green-700/40 to-green-800/60 shadow-xl"
                  : "border-blue-400/40 bg-gradient-to-br from-blue-800/40 to-blue-900/60 shadow-xl hover:border-blue-300/60 hover:bg-blue-700/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Geometric decoration */}
            <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
              <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                {isResumeUploaded ? (
                  <circle cx="50" cy="50" r="40" stroke="currentColor" fill="currentColor" opacity="0.3" />
                ) : (
                  <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" fill="none" strokeWidth="1" />
                )}
              </svg>
            </div>

            <div className="relative z-10">
              {isResumeUploaded ? (
                <div className="space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-green-300 text-lg">
                      ✓ {uploadedFileName} uploaded successfully
                    </p>
                    <p className="text-white/70 mt-2">Ready to analyze your experience</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/30 backdrop-blur-sm border border-blue-400/40">
                    <Upload className="h-8 w-8 text-blue-300" />
                  </div>
                  <div>
                    <p className="mb-3 text-xl text-white font-medium">
                      Drop your resume here
                    </p>
                    <p className="text-white/60 text-lg">or</p>
                  </div>
                  <Button
                    className="relative bg-white text-blue-900 hover:bg-blue-50 font-medium py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                    disabled={isLoading}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      disabled={isLoading}
                    />
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-900 border-t-transparent"></div>
                        Preparing...
                      </>
                    ) : (
                      "Choose File"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isResumeUploaded && (
            <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-6 shadow-xl backdrop-blur-xl">
              <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
                  <rect x="20" y="20" width="60" height="60" stroke="currentColor" fill="none" strokeWidth="1" rx="10" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={async () => {
                    setIsContinuing(true);
                    try {
                      void handleContinue();
                    } finally {
                      setIsContinuing(false);
                    }
                  }}
                  disabled={isContinuing}
                >
                  {isContinuing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Analyzing resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Continue
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
