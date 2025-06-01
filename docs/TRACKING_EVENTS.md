# PostHog Tracking Events Documentation

This document outlines all the tracking events implemented in the Talent Hunt application using PostHog.

## Event Categories

### 1. User Journey Events

#### Sign Up & Authentication

- `user_signed_up` - When a user completes registration
  - Properties: `method` (signup method)

#### Onboarding Flow

- `onboarding_started` - When user begins onboarding process
  - Properties: `user_type` ("candidate" | "recruiter")
- `onboarding_completed` - When user completes onboarding
  - Properties: `user_type` ("candidate" | "recruiter")

#### Profile Management

- `profile_updated` - When user updates any profile section
  - Properties: `section` (which part of profile was updated)

### 2. Search & Discovery Events

#### Search Actions

- `search_performed` - When user performs a search
  - Properties:
    - `query` (search query text)
    - `search_type` ("natural_language" | "filter")
    - `query_length` (character count)

#### Candidate Interactions

- `candidate_viewed` - When user opens a candidate profile
  - Properties:
    - `candidate_id` (unique identifier)
    - `match_score` (AI matching score)

#### Filtering

- `filter_applied` - When user applies search filters
  - Properties:
    - `filter_type` (type of filter)
    - `filter_value` (selected value)

### 3. File & Resume Events

#### Resume Management

- `resume_uploaded` - When candidate uploads resume
  - Properties:
    - `file_size` (bytes)
    - `file_type` (MIME type)
- `resume_downloaded` - When recruiter downloads candidate resume
  - Properties: `candidate_id`

### 4. Navigation Events

#### Page Views

- `page_visited` - Automatic page view tracking
  - Properties:
    - `page_name` (page identifier)
    - `section` (optional subsection)

#### Tab Navigation

- `tab_switched` - When user switches between tabs
  - Properties:
    - `from_tab` (previous tab)
    - `to_tab` (new tab)

### 5. User Interface Events

#### Button Interactions

- `button_clicked` - Generic button click tracking
  - Properties:
    - `button_name` (descriptive button name)
    - `location` (where button was clicked)

#### Feature Usage

- `feature_used` - When user engages with specific features
  - Properties:
    - `feature_name` (feature identifier)
    - `context` (usage context)

### 6. Communication Events

#### Contact Actions

- `contact_info_viewed` - When recruiter views candidate contact info
  - Properties: `candidate_id`

#### External Links

- `external_link_clicked` - When user clicks external links
  - Properties:
    - `link_type` ("linkedin" | "github" | "portfolio")
    - `candidate_id` (optional, if viewing candidate profile)

## Implementation Details

### Custom Hook: `useTracking`

Located in `src/lib/hooks/use-tracking.ts`, this hook provides:

- Automatic user context (user ID, email)
- Timestamp addition
- Type-safe event tracking methods
- Consistent property structure

### Key Components with Tracking

#### Dashboard (`src/app/(dashboard)/dashboard/Dashboard.tsx`)

- Page visits
- Onboarding flow initiation
- Tab switching between candidate/recruiter views

#### Discover Page (`src/app/(dashboard)/discover/page.tsx`)

- Search queries and results
- Candidate profile views
- Filter applications
- External link clicks

#### Onboarding Flow

- **Selection** (`src/app/onboarding/page.tsx`): Role selection tracking
- **Resume Upload** (`src/app/onboarding/upload-resume.tsx`): File upload events
- **Profile Completion** (`src/app/onboarding/complete-profile.tsx`): Form submissions
- **Video Introduction** (`src/app/onboarding/introduce-yourself.tsx`): Video recording events

#### Navigation Components

- **Sidebar** (`src/components/app-sidebar.tsx`): Navigation tracking
- **Nav Main** (`src/components/nav-main.tsx`): Main navigation clicks
- **Nav Projects** (`src/components/nav-projects.tsx`): Project navigation
- **Nav User** (`src/components/nav-user.tsx`): User menu interactions

## Event Properties

All events automatically include:

- `user_id` - Clerk user identifier
- `user_email` - User's email address
- `timestamp` - ISO timestamp of event

## Usage Examples

```typescript
const { trackSearch, trackCandidateViewed } = useTracking();

// Track a search
trackSearch("senior react developer", "natural_language");

// Track candidate view
trackCandidateViewed("candidate_123", 85);
```

## Analytics Insights

These events enable tracking of:

1. **User Onboarding Funnel**

   - Conversion rates by user type
   - Drop-off points in onboarding

2. **Search Behavior**

   - Popular search terms
   - Search success rates
   - Filter usage patterns

3. **Candidate Engagement**

   - Profile view rates
   - Match score effectiveness
   - Contact conversion rates

4. **Feature Adoption**

   - Most used features
   - User journey patterns
   - Navigation preferences

5. **User Retention**
   - Session patterns
   - Feature stickiness
   - Churn indicators

## PostHog Configuration

Events are sent to PostHog with:

- Automatic pageview capture enabled
- Person profiles for all users
- Custom event properties for rich analytics
- Real-time event streaming

## Privacy & Compliance

- No sensitive personal data in event properties
- User consent handled through PostHog settings
- GDPR-compliant data collection
- Anonymization options available
