import { useUser } from "@clerk/nextjs";
import { usePostHog } from "posthog-js/react";

export const useTracking = () => {
  const posthog = usePostHog();
  const { user } = useUser();

  const track = (
    eventName: string,
    properties?: Record<string, string | number | boolean | null | undefined>,
  ) => {
    posthog?.capture(eventName, {
      ...properties,
      user_id: user?.id,
      user_email: user?.emailAddresses?.[0]?.emailAddress,
      timestamp: new Date().toISOString(),
    });
  };

  // User Journey Events
  const trackSignUp = (method: string) => {
    track("user_signed_up", { method });
  };

  const trackOnboardingStarted = (type: "candidate" | "recruiter") => {
    track("onboarding_started", { user_type: type });
  };

  const trackOnboardingCompleted = (type: "candidate" | "recruiter") => {
    track("onboarding_completed", { user_type: type });
  };

  const trackProfileUpdated = (section: string) => {
    track("profile_updated", { section });
  };

  // Search & Discovery Events
  const trackSearch = (query: string, type: "natural_language" | "filter") => {
    track("search_performed", {
      query,
      search_type: type,
      query_length: query.length,
    });
  };

  const trackCandidateViewed = (candidateId: string, matchScore?: number) => {
    track("candidate_viewed", {
      candidate_id: candidateId,
      match_score: matchScore,
    });
  };

  const trackFilterApplied = (filterType: string, filterValue: string) => {
    track("filter_applied", {
      filter_type: filterType,
      filter_value: filterValue,
    });
  };

  // File & Resume Events
  const trackResumeUploaded = (fileSize: number, fileType: string) => {
    track("resume_uploaded", {
      file_size: fileSize,
      file_type: fileType,
    });
  };

  const trackResumeDownloaded = (candidateId: string) => {
    track("resume_downloaded", { candidate_id: candidateId });
  };

  // Navigation Events
  const trackPageVisited = (pageName: string, section?: string) => {
    track("page_visited", {
      page_name: pageName,
      section,
    });
  };

  const trackTabSwitched = (fromTab: string, toTab: string) => {
    track("tab_switched", {
      from_tab: fromTab,
      to_tab: toTab,
    });
  };

  // Action Events
  const trackButtonClicked = (buttonName: string, location: string) => {
    track("button_clicked", {
      button_name: buttonName,
      location,
    });
  };

  const trackFeatureUsed = (featureName: string, context?: string) => {
    track("feature_used", {
      feature_name: featureName,
      context,
    });
  };

  // Contact & Communication Events
  const trackContactInfoViewed = (candidateId: string) => {
    track("contact_info_viewed", { candidate_id: candidateId });
  };

  const trackExternalLinkClicked = (
    linkType: "linkedin" | "github" | "portfolio",
    candidateId?: string,
  ) => {
    track("external_link_clicked", {
      link_type: linkType,
      candidate_id: candidateId,
    });
  };

  return {
    track,
    trackSignUp,
    trackOnboardingStarted,
    trackOnboardingCompleted,
    trackProfileUpdated,
    trackSearch,
    trackCandidateViewed,
    trackFilterApplied,
    trackResumeUploaded,
    trackResumeDownloaded,
    trackPageVisited,
    trackTabSwitched,
    trackButtonClicked,
    trackFeatureUsed,
    trackContactInfoViewed,
    trackExternalLinkClicked,
  };
};
