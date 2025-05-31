/**
 * Credits cost configuration for TalentHunt.dev platform actions
 */

// Credit costs for different actions
export const CREDITS_COST = {
  // AI-powered search and analysis
  NATURAL_LANGUAGE_SEARCH: 5,
  CANDIDATE_PROFILE_ANALYSIS: 3,
  RESUME_CREDIBILITY_SCORING: 2,

  // Outreach and communication
  PERSONALIZED_EMAIL_GENERATION: 4,
  BULK_OUTREACH_CAMPAIGN: 10,
  CANDIDATE_CONTACT_INFO_ACCESS: 2,

  // Advanced features
  SKILL_MATCHING_ANALYSIS: 3,
  MARKET_INSIGHTS_REPORT: 7,
  TALENT_PIPELINE_SUGGESTIONS: 5,

  // Video screening
  VIDEO_SCREENING_ANALYSIS: 6,
  AI_INTERVIEW_INSIGHTS: 8,

  OUTREACH_ACTIONS: 10,
} as const;

type Action = keyof typeof CREDITS_COST;

// Default credits given to new users (matches schema default)
export const DEFAULT_SIGNUP_CREDITS = 50;

// Minimum credits required for certain actions
export const MINIMUM_CREDITS = {
  NATURAL_LANGUAGE_SEARCH: CREDITS_COST.NATURAL_LANGUAGE_SEARCH,
  OUTREACH_ACTIONS: CREDITS_COST.PERSONALIZED_EMAIL_GENERATION,
} satisfies Partial<Record<Action, number>>;

// Credit packages for purchasing
export const CREDIT_PACKAGES = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 100,
    price: 9.99,
    popular: false,
  },
  {
    id: "professional",
    name: "Professional Pack",
    credits: 300,
    price: 24.99,
    popular: true,
    bonus: 50, // Extra credits
  },
  {
    id: "enterprise",
    name: "Enterprise Pack",
    credits: 1000,
    price: 79.99,
    popular: false,
    bonus: 200, // Extra credits
  },
] as const;

// Error messages for insufficient credits
export const CREDIT_ERROR_MESSAGES = {
  INSUFFICIENT_CREDITS: "Insufficient credits to perform this action",
  NATURAL_LANGUAGE_SEARCH: `You need at least ${CREDITS_COST.NATURAL_LANGUAGE_SEARCH} credits to perform natural language search`,
  GENERAL_ACTION: (requiredCredits: number) =>
    `You need at least ${requiredCredits} credits to perform this action`,
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  // TTL in seconds for different cache types
  AI_RESPONSE_TTL: 7 * 24 * 60 * 60, // 7 days for AI responses
  USER_PROFILE_TTL: 60 * 60, // 1 hour for user profiles
  SEARCH_RESULTS_TTL: 30 * 60, // 30 minutes for search results

  // Cache key prefixes
  PREFIXES: {
    AI_JOB_ATTRIBUTES: "ai:job-attributes:",
    USER_CREDITS: "user:credits:",
    SEARCH_RESULTS: "search:results:",
    AI_RESUME_PARSING: "ai:resume-parsing:",
  },
} as const;
