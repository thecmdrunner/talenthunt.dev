"use client";

import { api } from "@/trpc/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useDelayedVideoReview = () => {
  const [reviewState, setReviewState] = useState<
    "pending" | "reviewing" | "approved" | "rejected" | "manual_review"
  >("pending");
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [hasStartedReview, setHasStartedReview] = useState(false);

  const { data: user, refetch: refetchUser } =
    api.user.getOrCreateUser.useQuery();

  const { mutateAsync: reviewVideo } = api.ai.reviewCandidateVideo.useMutation({
    onError: (error) => {
      console.error("Failed to review video:", error);
      setReviewState("manual_review");
      toast.error("Review failed. Your profile is under manual review.");
    },
  });

  const startDelayedReview = useCallback(async () => {
    if (hasStartedReview) return;
    setHasStartedReview(true);

    // Find the intro video URL from the user data
    const videoUrl = user?.candidateProfile?.introVideoUrl;

    if (!videoUrl) {
      console.error("No intro video URL found");
      setReviewState("manual_review");
      toast.error("No video found. Please contact support.");
      return;
    }

    // Start countdown
    let remaining = 10;
    const countdownInterval = setInterval(() => {
      remaining -= 1;
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(countdownInterval);
        void triggerReview(videoUrl);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [hasStartedReview, user?.candidateProfile?.introVideoUrl]);

  const triggerReview = useCallback(
    async (videoUrl: string) => {
      setReviewState("reviewing");
      toast.loading("Reviewing your application...", { id: "video-review" });

      try {
        const reviewResult = await reviewVideo({ videoUrl });

        toast.dismiss("video-review");

        if (reviewResult.autoApproved) {
          setReviewState("approved");
          toast.success("🎉 Video approved! Your profile is now live!");
          // Refetch user data to get updated profile
          void refetchUser();
        } else if (reviewResult.approved) {
          setReviewState("manual_review");
          toast.success("Video uploaded! Your profile is under manual review.");
        } else {
          setReviewState("rejected");
          toast.error("Video needs improvement. Please try recording again.");
        }
      } catch (error) {
        console.error("Review failed:", error);
        setReviewState("manual_review");
        toast.dismiss("video-review");
        toast.success("Video uploaded! Your profile is under review.");
      }
    },
    [reviewVideo, refetchUser],
  );

  // Auto-start the review process when the hook is used
  useEffect(() => {
    if (user?.candidateProfile?.introVideoUrl && !hasStartedReview) {
      void startDelayedReview();
    }
  }, [
    user?.candidateProfile?.introVideoUrl,
    startDelayedReview,
    hasStartedReview,
  ]);

  const resetReview = useCallback(() => {
    setReviewState("pending");
    setTimeRemaining(10);
    setHasStartedReview(false);
  }, []);

  return {
    reviewState,
    timeRemaining,
    isReviewing: reviewState === "reviewing",
    isApproved: reviewState === "approved",
    isRejected: reviewState === "rejected",
    isManualReview: reviewState === "manual_review",
    resetReview,
  };
};
