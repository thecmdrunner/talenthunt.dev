"use client";

import { supabaseBrowserClient } from "@/lib/supabase/browser";
import { api } from "@/trpc/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const MAX_RECORDING_TIME = 60 * 1000; // 60 seconds in milliseconds
const ACCEPTED_MIME_TYPES = [
  "video/webm",
  "video/mp4",
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8",
];

export const useVideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const stopRecordingRef = useRef<(() => void) | null>(null);

  const supabase = supabaseBrowserClient();

  const { mutateAsync: getVideoUploadUrl } =
    api.services.getVideoUploadUrl.useMutation({
      onError: (error) => {
        console.error("Failed to get upload URL:", error);
        toast.error("Failed to prepare upload");
      },
    });

  const { mutateAsync: saveIntroVideo } = api.user.saveIntroVideo.useMutation({
    onError: (error) => {
      console.error("Failed to save video:", error);
      toast.error("Failed to save video");
    },
  });

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop stream
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
        setCurrentStream(null);
      }

      toast.success("Recording stopped!");
    }
  }, [isRecording, currentStream]);

  // Update the ref whenever stopRecording changes
  stopRecordingRef.current = stopRecording;

  const startTimer = useCallback(() => {
    recordingStartTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - recordingStartTimeRef.current;
      setRecordingTime(elapsed);

      if (elapsed >= MAX_RECORDING_TIME) {
        // Use the ref to call the latest version
        if (stopRecordingRef.current) {
          stopRecordingRef.current();
        }
      }
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const getSupportedMimeType = useCallback(() => {
    for (const mimeType of ACCEPTED_MIME_TYPES) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        return mimeType;
      }
    }
    return "video/webm"; // fallback
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: true,
      });

      setCurrentStream(stream);
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 2500000, // 2.5 Mbps for good quality
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();

      toast.success("Recording started!");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error(
        "Failed to start recording. Please check camera permissions.",
      );
    }
  }, [getSupportedMimeType, startTimer]);

  const uploadVideo = useCallback(
    async (videoBlob: Blob): Promise<string | null> => {
      if (!videoBlob) {
        toast.error("No video to upload");
        return null;
      }

      setIsUploading(true);
      const uploadToastId = toast.loading("Uploading video...");

      try {
        // Generate a filename
        const timestamp = Date.now();
        const mimeType = videoBlob.type;
        const extension = mimeType.includes("mp4") ? "mp4" : "webm";
        const fileName = `intro_video_${timestamp}.${extension}`;

        // Get presigned upload URL
        const { presigned, videoUrl } = await getVideoUploadUrl({
          fileName,
          fileType: mimeType,
        });

        // Upload to Supabase
        const uploadResult = await supabase.storage
          .from("videos")
          .uploadToSignedUrl(presigned.path, presigned.token, videoBlob, {
            contentType: mimeType,
          });

        if (uploadResult.error) {
          console.error("Upload error:", uploadResult.error);
          throw new Error("Failed to upload video");
        }

        // Save video URL to database
        await saveIntroVideo({ videoUrl });

        toast.dismiss(uploadToastId);
        toast.success(
          "Video uploaded successfully! Your profile will be reviewed.",
        );

        return videoUrl;
      } catch (error) {
        console.error("Upload failed:", error);
        toast.dismiss(uploadToastId);
        toast.error(
          error instanceof Error
            ? error.message
            : "Upload failed, please try again!",
        );
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [getVideoUploadUrl, saveIntroVideo, supabase],
  );

  const uploadRecordedVideo = useCallback(async () => {
    if (recordedBlob) {
      return await uploadVideo(recordedBlob);
    }
    return null;
  }, [recordedBlob, uploadVideo]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        toast.error("Please upload a video file");
        return null;
      }

      // Validate file size (max 50MB)
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("Video file must be less than 50MB");
        return null;
      }

      return await uploadVideo(file);
    },
    [uploadVideo],
  );

  const resetRecording = useCallback(() => {
    setRecordedBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];

    // Stop any active stream
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      setCurrentStream(null);
    }
  }, [currentStream]);

  const formatTime = useCallback((timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const timeRemaining = MAX_RECORDING_TIME - recordingTime;
  const timeRemainingFormatted = formatTime(timeRemaining);
  const recordingTimeFormatted = formatTime(recordingTime);

  return {
    // State
    isRecording,
    recordedBlob,
    recordingTime,
    recordingTimeFormatted,
    timeRemaining,
    timeRemainingFormatted,
    isUploading,
    maxRecordingTime: MAX_RECORDING_TIME,
    currentStream, // Return the current stream for live preview

    // Actions
    startRecording,
    stopRecording,
    uploadRecordedVideo,
    handleFileUpload,
    resetRecording,
  };
};
