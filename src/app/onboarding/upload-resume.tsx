"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowserClient } from "@/lib/supabase/browser";
import { api } from "@/trpc/react";
import { Check, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface UploadResumeProps {
  onContinue: (resumeUrl: string) => Promise<void> | void;
}

const ACCEPTED_FILE_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function UploadResume({ onContinue }: UploadResumeProps) {
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
    [getPresignedUrl, supabase],
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

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Left Column - Text */}
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Upload Your Resume
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">We use your resume to:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Quickly understand your background
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Pre-fill your profile
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Recommend the best-fit opportunities
              </li>
            </ul>
            <p className="text-sm text-gray-500">(PDF only, max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Right Column - Upload UI */}
      <div className="space-y-6">
        <div
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : isResumeUploaded
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-blue-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isResumeUploaded ? (
            <div className="space-y-4">
              <Check className="mx-auto h-12 w-12 text-green-500" />
              <div>
                <p className="font-medium text-green-700">
                  ✓ {uploadedFileName} uploaded successfully
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="mb-2 text-lg text-gray-700">
                  Drop your resume here
                </p>
                <p className="text-gray-500">or</p>
              </div>
              <Button
                variant="outline"
                className="relative"
                disabled={isLoading}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  disabled={isLoading}
                />
                {isLoading ? "Preparing..." : "Choose File"}
              </Button>
            </div>
          )}
        </div>

        {isResumeUploaded && (
          <Button
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={async () => {
              setIsContinuing(true);
              try {
                await onContinue(resumeUrl);
              } finally {
                setIsContinuing(false);
              }
            }}
            disabled={isContinuing}
          >
            {isContinuing ? "Analyzing resume..." : "Continue"}
          </Button>
        )}
      </div>
    </div>
  );
}
