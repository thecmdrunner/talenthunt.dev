"use client";

import { Button } from "@/components/ui/button";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { Camera, Play, Square, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface IntroduceYourselfProps {
  onComplete: () => void;
}

export default function IntroduceYourself({
  onComplete,
}: IntroduceYourselfProps) {
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isRecording,
    recordedBlob,
    recordingTimeFormatted,
    timeRemainingFormatted,
    isUploading,
    startRecording,
    stopRecording,
    uploadRecordedVideo,
    handleFileUpload,
    resetRecording,
  } = useVideoRecording();

  const handleStartRecording = useCallback(async () => {
    // Reset any previous recording
    if (recordedBlob) {
      resetRecording();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
    await startRecording();
  }, [startRecording, recordedBlob, resetRecording, previewUrl]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  const handleUploadRecorded = useCallback(async () => {
    const videoUrl = await uploadRecordedVideo();
    if (videoUrl) {
      setVideoUploaded(true);
    }
  }, [uploadRecordedVideo]);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const videoUrl = await handleFileUpload(file);
        if (videoUrl) {
          setVideoUploaded(true);
        }
      }
      // Reset input
      event.target.value = "";
    },
    [handleFileUpload],
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Create preview URL when recording is done
  const createPreview = useCallback(() => {
    if (recordedBlob && !previewUrl) {
      const url = URL.createObjectURL(recordedBlob);
      setPreviewUrl(url);
    }
  }, [recordedBlob, previewUrl]);

  // Auto-create preview when blob is available
  if (recordedBlob && !previewUrl) {
    createPreview();
  }

  const handleDiscardRecording = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    resetRecording();
  }, [previewUrl, resetRecording]);

  const canComplete = videoUploaded;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Tell Us About Yourself
        </h2>
        <p className="text-gray-600">
          Record a short video (up to 60 seconds) to share who you are, what
          you&apos;re passionate about, and what you&apos;re looking for.
        </p>
        <div className="text-sm text-gray-500">Step 3 of 3</div>
      </div>

      <div className="space-y-8">
        {/* Recording Controls */}
        {!recordedBlob && !isRecording && (
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-lg bg-blue-600 hover:bg-blue-700"
              onClick={handleStartRecording}
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Recording
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-lg"
              onClick={handleUploadClick}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Video
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Recording in progress */}
        {isRecording && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <div className="h-6 w-6 animate-pulse rounded-full bg-red-500"></div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">Recording...</p>
              <p className="text-sm text-gray-600">
                Time: {recordingTimeFormatted} / 1:00
              </p>
              <p className="text-xs text-gray-500">
                Remaining: {timeRemainingFormatted}
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleStopRecording}
            >
              <Square className="mr-2 h-5 w-5" />
              Stop Recording
            </Button>
          </div>
        )}

        {/* Recording preview */}
        {recordedBlob && previewUrl && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Preview Your Video
              </h3>
              <p className="text-sm text-gray-600">
                Review your recording before uploading
              </p>
            </div>

            <div className="relative mx-auto max-w-md">
              <video
                src={previewUrl}
                controls
                className="w-full rounded-lg border border-gray-200"
                style={{ maxHeight: "400px" }}
              >
                Your browser does not support video playback.
              </video>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-lg bg-blue-600 hover:bg-blue-700"
                onClick={handleUploadRecorded}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Video
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-lg"
                onClick={handleDiscardRecording}
                disabled={isUploading}
              >
                <X className="mr-2 h-5 w-5" />
                Record Again
              </Button>
            </div>
          </div>
        )}

        {/* Success state */}
        {videoUploaded && (
          <div className="rounded-xl bg-green-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-medium text-green-900">
              Video Uploaded Successfully!
            </h3>
            <p className="text-sm text-green-700">
              Your introduction video has been saved to your profile.
            </p>
          </div>
        )}

        {/* Tips section */}
        <div className="rounded-xl bg-blue-50 p-6">
          <h3 className="mb-3 font-medium text-gray-900">
            Tips for a great video:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Keep it under 60 seconds
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Look directly at the camera
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Speak clearly about your background
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Mention what you&apos;re looking for
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Be authentic and smile!
            </li>
          </ul>
        </div>

        {/* Complete profile button */}
        <Button
          size="lg"
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
          onClick={onComplete}
          disabled={!canComplete}
        >
          {canComplete ? "Complete Profile" : "Upload a video to continue"}
        </Button>
      </div>
    </div>
  );
}
