"use client";

import { Button } from "@/components/ui/button";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { useTracking } from "@/lib/hooks/use-tracking";
import { useUser } from "@clerk/nextjs";
import { Camera, Play, Square, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface IntroduceYourselfProps {
  onComplete: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function IntroduceYourself({
  onComplete,
  currentStep,
  totalSteps,
}: IntroduceYourselfProps) {
  const {
    trackProfileUpdated,
    trackButtonClicked,
    trackExternalLinkClicked,
    trackFeatureUsed,
  } = useTracking();
  const { user } = useUser();
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement>(null);

  const {
    isRecording,
    recordedBlob,
    recordingTimeFormatted,
    timeRemainingFormatted,
    isUploading,
    currentStream,
    startRecording,
    stopRecording,
    uploadRecordedVideo,
    resetRecording,
  } = useVideoRecording();

  // Set up live preview when stream becomes available
  useEffect(() => {
    if (currentStream && liveVideoRef.current && isRecording) {
      liveVideoRef.current.srcObject = currentStream;
    }
  }, [currentStream, isRecording]);

  const handleStartRecording = useCallback(async () => {
    // Reset any previous recording
    if (recordedBlob) {
      resetRecording();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }

    trackButtonClicked("start_video_recording", "onboarding");
    trackFeatureUsed("video_introduction", "onboarding");
    await startRecording();
  }, [
    startRecording,
    recordedBlob,
    resetRecording,
    previewUrl,
    trackButtonClicked,
    trackFeatureUsed,
  ]);

  const handleStopRecording = useCallback(() => {
    trackButtonClicked("stop_video_recording", "onboarding");
    stopRecording();
  }, [stopRecording, trackButtonClicked]);

  const handleUploadRecorded = useCallback(async () => {
    trackButtonClicked("upload_video_introduction", "onboarding");
    const videoUrl = await uploadRecordedVideo();
    if (videoUrl) {
      setVideoUploaded(true);
      trackProfileUpdated("video_introduction");
      // Automatically progress to next step after upload
      setTimeout(() => {
        onComplete();
      }, 2000); // Give user 2 seconds to see the success message
    }
  }, [
    uploadRecordedVideo,
    onComplete,
    trackButtonClicked,
    trackProfileUpdated,
  ]);

  // Create preview URL when recording is done
  const createPreview = useCallback(() => {
    if (recordedBlob && !previewUrl) {
      const url = URL.createObjectURL(recordedBlob);
      setPreviewUrl(url);
    }
  }, [recordedBlob, previewUrl]);

  // Auto-create preview when blob is available
  useEffect(() => {
    if (recordedBlob && !previewUrl) {
      createPreview();
    }
  }, [recordedBlob, previewUrl, createPreview]);

  const handleDiscardRecording = useCallback(() => {
    trackButtonClicked("discard_video_recording", "onboarding");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    resetRecording();
  }, [previewUrl, resetRecording, trackButtonClicked]);

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
        <div className="text-sm text-gray-500">Step 3 of 4</div>
      </div>

      <div className="space-y-8">
        {/* Start Recording Button */}
        {!recordedBlob && !isRecording && !videoUploaded && (
          <div className="flex justify-center">
            <Button
              size="lg"
              className="rounded-lg bg-blue-600 hover:bg-blue-700"
              onClick={handleStartRecording}
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Recording
            </Button>
          </div>
        )}

        {/* Live Recording View */}
        {isRecording && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Recording...
              </h3>
              <p className="text-sm text-gray-600">
                Time: {recordingTimeFormatted} / 1:00
              </p>
            </div>

            {/* Live Video Preview */}
            <div className="relative mx-auto max-w-md">
              <video
                ref={liveVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full rounded-lg border border-gray-200 bg-gray-100"
                style={{ maxHeight: "400px" }}
              />

              {/* Recording Indicator Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-white">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                <span className="text-xs font-medium">REC</span>
              </div>

              {/* Timer Overlay */}
              <div className="bg-opacity-60 absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-1 text-white">
                <span className="font-mono text-sm">
                  {recordingTimeFormatted}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
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
          </div>
        )}

        {/* Recording Preview */}
        {recordedBlob && previewUrl && !videoUploaded && (
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
                    <Camera className="mr-2 h-5 w-5" />
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

        {/* Simple Success State */}
        {videoUploaded && (
          <div className="rounded-xl bg-green-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 font-medium text-green-900">
              Video Uploaded Successfully!
            </h3>
            <p className="text-sm text-green-700">
              Your introduction video has been saved. Proceeding to final
              step...
            </p>
          </div>
        )}

        {/* Tips section - only show when not uploaded */}
        {!videoUploaded && (
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
        )}
      </div>
    </div>
  );
}
