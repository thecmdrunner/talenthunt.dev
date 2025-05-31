import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

// Profile completion tracking
export interface ProfileCompletionStatus {
  linkedinVerified: boolean;
  githubVerified: boolean;
  profilePictureUploaded: boolean;
  bioCompleted: boolean;
  skillsAdded: boolean;
  experienceAdded: boolean;
  educationAdded: boolean;
  projectsAdded: boolean;
}

const profileCompletionSchema = z
  .object({
    linkedinVerified: z.boolean(),
    githubVerified: z.boolean(),
    profilePictureUploaded: z.boolean(),
    bioCompleted: z.boolean(),
    skillsAdded: z.boolean(),
    experienceAdded: z.boolean(),
    educationAdded: z.boolean(),
    projectsAdded: z.boolean(),
  })
  .catch({
    linkedinVerified: true, // Default from image
    githubVerified: false, // Default from image
    profilePictureUploaded: true,
    bioCompleted: true,
    skillsAdded: true,
    experienceAdded: true,
    educationAdded: false,
    projectsAdded: true,
  });

type PersistedProfileCompletion = z.infer<typeof profileCompletionSchema>;

const fallbackProfileCompletion = {
  linkedinVerified: true, // Default from image
  githubVerified: false, // Default from image
  profilePictureUploaded: true,
  bioCompleted: true,
  skillsAdded: true,
  experienceAdded: true,
  educationAdded: false,
  projectsAdded: true,
} satisfies PersistedProfileCompletion;

const profileCompletionKey = "profileCompletion";

export const profileCompletionAtom =
  atomWithStorage<PersistedProfileCompletion>(
    profileCompletionKey,
    fallbackProfileCompletion,
    {
      setItem: (key, val) =>
        localStorage.setItem(
          key,
          JSON.stringify(profileCompletionSchema.parse(val)),
        ),

      removeItem: (key) => localStorage.removeItem(key),

      getItem: (key) => {
        const item = localStorage.getItem(key);
        if (!item) return fallbackProfileCompletion;
        try {
          return profileCompletionSchema.parse(JSON.parse(item));
        } catch {
          return fallbackProfileCompletion;
        }
      },
    },
  );

// Derived atom for completion percentage
export const completionPercentageAtom = atom((get) => {
  const completion = get(profileCompletionAtom);
  const completedFields = Object.values(completion).filter(Boolean).length;
  const totalFields = Object.keys(completion).length;
  return Math.round((completedFields / totalFields) * 100);
});

// Derived atom for completed count
export const completedCountAtom = atom((get) => {
  const completion = get(profileCompletionAtom);
  return Object.values(completion).filter(Boolean).length;
});

// Derived atom for pending tasks
export const pendingTasksAtom = atom((get) => {
  const completion = get(profileCompletionAtom);
  const pendingTasks: Array<{
    key: keyof ProfileCompletionStatus;
    label: string;
  }> = [];

  if (!completion.linkedinVerified) {
    pendingTasks.push({
      key: "linkedinVerified",
      label: "Verify LinkedIn profile",
    });
  }
  if (!completion.githubVerified) {
    pendingTasks.push({
      key: "githubVerified",
      label: "Verify GitHub profile",
    });
  }
  if (!completion.profilePictureUploaded) {
    pendingTasks.push({
      key: "profilePictureUploaded",
      label: "Upload profile picture",
    });
  }
  if (!completion.bioCompleted) {
    pendingTasks.push({ key: "bioCompleted", label: "Complete bio" });
  }
  if (!completion.skillsAdded) {
    pendingTasks.push({ key: "skillsAdded", label: "Add skills" });
  }
  if (!completion.experienceAdded) {
    pendingTasks.push({ key: "experienceAdded", label: "Add work experience" });
  }
  if (!completion.educationAdded) {
    pendingTasks.push({ key: "educationAdded", label: "Add education" });
  }
  if (!completion.projectsAdded) {
    pendingTasks.push({ key: "projectsAdded", label: "Add projects" });
  }

  return pendingTasks;
});
