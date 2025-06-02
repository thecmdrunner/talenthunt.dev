"use client";

import { Button } from "@/components/ui/button";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { Camera, CheckCircle, Clock, Square, Video, X } from "lucide-react";
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

  const { data: user } = api.user.getOrCreateUser.useQuery();

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
      }, 1000); // Give user 2 seconds to see the success message
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700">
      {/* Enhanced Geometric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Blue Gradient Shapes */}
        <div className="absolute top-10 left-10 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/15 to-blue-600/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/12 to-blue-500/8 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-400/18 to-blue-600/12 blur-3xl"></div>

        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(90deg, rgba(96,165,250,0.2) 1px, transparent 1px),
              linear-gradient(rgba(96,165,250,0.2) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Advanced SVG Geometric Patterns */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1400 1000"
          fill="none"
        >
          {/* Connection Network */}
          <path
            d="M50 150L200 80L350 200L500 120L650 250L800 180L950 300L1100 220L1250 350"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100 300L250 230L400 350L550 270L700 400L850 330L1000 450L1150 370"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Geometric Nodes */}
          <circle
            cx="200"
            cy="80"
            r="6"
            fill="rgba(96,165,250,0.4)"
            className="animate-pulse"
          />
          <circle cx="500" cy="120" r="8" fill="rgba(59,130,246,0.5)" />
          <circle
            cx="800"
            cy="180"
            r="5"
            fill="rgba(147,197,253,0.3)"
            className="animate-pulse"
          />

          {/* Geometric Shapes */}
          <polygon
            points="200,400 250,350 300,400 250,450"
            stroke="rgba(96,165,250,0.15)"
            strokeWidth="1"
            fill="rgba(59,130,246,0.08)"
          />
          <polygon
            points="600,500 650,450 700,500 650,550"
            stroke="rgba(147,197,253,0.12)"
            strokeWidth="1"
            fill="rgba(96,165,250,0.06)"
          />
        </svg>

        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 left-1/5 h-4 w-4 animate-bounce rounded-full bg-blue-300/40"></div>
        <div className="absolute top-1/3 right-1/4 h-3 w-3 rotate-45 animate-pulse bg-blue-400/30"></div>
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-300/50"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Main Content Card with Glassmorphism */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-800/40 to-blue-900/60 p-12 shadow-2xl backdrop-blur-xl">
            {/* Geometric Background Elements */}
            <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full text-blue-300"
              >
                <polygon
                  points="50,10 90,50 50,90 10,50"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-24 opacity-10">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full text-blue-300"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="relative z-10 space-y-8">
              {/* Header Section */}
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/30 backdrop-blur-sm">
                  <Video className="h-10 w-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">
                    Tell Us About Yourself
                  </h2>
                  <p className="text-lg leading-relaxed text-white/80">
                    Record a short video (up to 60 seconds) to share who you
                    are, what you're passionate about, and what you're looking
                    for.
                  </p>
                </div>

                {user?.candidateProfile?.onboardingData?.questions && (
                  <div className="rounded-xl border border-blue-400/30 bg-blue-600/20 p-4 backdrop-blur-sm">
                    <div className="space-y-2">
                      {user.candidateProfile.onboardingData.questions.map(
                        (question, index) => (
                          <div
                            key={question}
                            className="flex items-start gap-3 text-blue-200"
                          >
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/30 text-xs font-semibold">
                              {index + 1}
                            </span>
                            <span className="text-sm">{question}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600/20 px-4 py-2 text-blue-300 backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                  Step 3 of 4
                </div>
              </div>

              {/* Main Content Area */}
              <div className="space-y-8">
                {/* Start Recording Button */}
                {!recordedBlob && !isRecording && !videoUploaded && (
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-6 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
                      onClick={handleStartRecording}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div className="relative z-10 flex items-center gap-3">
                        <Camera className="h-6 w-6" />
                        Start Recording
                      </div>
                    </Button>
                  </div>
                )}

                {/* Live Recording View */}
                {isRecording && (
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <h3 className="text-2xl font-semibold text-white">
                        Recording...
                      </h3>
                      <p className="flex items-center justify-center gap-2 text-white/70">
                        <Clock className="h-4 w-4" />
                        Time: {recordingTimeFormatted} / 1:00
                      </p>
                    </div>

                    {/* Live Video Preview */}
                    <div className="relative mx-auto max-w-lg">
                      <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-800/20 backdrop-blur-sm">
                        <video
                          ref={liveVideoRef}
                          autoPlay
                          muted
                          playsInline
                          className="w-full bg-black/40"
                          style={{ maxHeight: "400px" }}
                        />

                        {/* Recording Indicator Overlay */}
                        <div className="absolute top-4 left-4 flex items-center gap-3 rounded-full bg-red-500/90 px-4 py-2 backdrop-blur-sm">
                          <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                          <span className="text-sm font-semibold text-white">
                            REC
                          </span>
                        </div>

                        {/* Timer Overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 backdrop-blur-sm">
                          <span className="font-mono text-lg text-white">
                            {recordingTimeFormatted}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        className="group relative overflow-hidden rounded-xl border border-red-400/30 bg-red-600/20 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-red-600/30"
                        onClick={handleStopRecording}
                      >
                        <div className="relative z-10 flex items-center gap-3">
                          <Square className="h-5 w-5" />
                          Stop Recording
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Recording Preview */}
                {recordedBlob && previewUrl && !videoUploaded && (
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <h3 className="text-2xl font-semibold text-white">
                        Preview Your Video
                      </h3>
                      <p className="text-white/70">
                        Review your recording before uploading
                      </p>
                    </div>

                    <div className="relative mx-auto max-w-lg">
                      <div className="overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-800/20 backdrop-blur-sm">
                        <video
                          src={previewUrl}
                          controls
                          className="w-full bg-black/40"
                          style={{ maxHeight: "400px" }}
                        >
                          Your browser does not support video playback.
                        </video>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        size="lg"
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-2xl"
                        onClick={handleUploadRecorded}
                        disabled={isUploading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div className="relative z-10 flex items-center gap-3">
                          {isUploading ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Camera className="h-5 w-5" />
                              Upload Video
                            </>
                          )}
                        </div>
                      </Button>

                      <Button
                        size="lg"
                        className="group relative overflow-hidden rounded-xl border border-blue-400/30 bg-blue-600/20 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-blue-600/30"
                        onClick={handleDiscardRecording}
                        disabled={isUploading}
                      >
                        <div className="relative z-10 flex items-center gap-3">
                          <X className="h-5 w-5" />
                          Record Again
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Success State */}
                {videoUploaded && (
                  <div className="relative overflow-hidden rounded-2xl border border-green-400/30 bg-green-600/20 p-8 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full text-green-300"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="30"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                        />
                        <path
                          d="M35,50 L45,60 L65,40"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-4 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-400/30 bg-green-600/30 backdrop-blur-sm">
                        <CheckCircle className="h-8 w-8 text-green-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Video Uploaded Successfully!
                      </h3>
                      <p className="text-green-200">
                        Your introduction video has been saved. Proceeding to
                        final step...
                      </p>
                    </div>
                  </div>
                )}

                {/* Tips Section */}
                {!isRecording && !recordedBlob && !videoUploaded && (
                  <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-blue-700/30 p-8 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full text-blue-300"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className="mb-4 text-xl font-semibold text-white">
                        Tips for a great video:
                      </h3>
                      <ul className="space-y-3 text-sm text-white/80">
                        {[
                          "Keep it under 60 seconds",
                          "Look directly at the camera",
                          "Speak clearly about your background",
                          "Mention what you're looking for",
                          "Be authentic and smile!",
                        ].map((tip, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
