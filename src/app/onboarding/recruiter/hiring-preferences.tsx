"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { Target, Sparkles, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface HiringPreferencesProps {
  onComplete: () => void;
}

export default function HiringPreferences({
  onComplete,
}: HiringPreferencesProps) {
  const { data: user } = api.user.getOrCreateUser.useQuery();
  const completeOnboardingMutation =
    api.user.completeRecruiterOnboarding.useMutation({
      onSuccess: () => {
        toast.success("Profile setup complete! Welcome aboard!");
        onComplete();
      },
      onError: (error) => {
        console.error("Failed to complete onboarding:", error);
        toast.error("Failed to complete profile setup");
      },
    });

  const [preferences, setPreferences] = useState({
    rolesYouHireFor: "",
    preferredSkills: "",
    additionalNotes: "",
  });

  const handleInputChange = (
    field: keyof typeof preferences,
    value: string,
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now, we'll just complete the onboarding without storing these preferences
    // In the future, you might want to add these fields to the database schema
    completeOnboardingMutation.mutate({
      // You can add these preferences to the mutation if you extend the schema
      additionalData: preferences,
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        {/* Geometric Background Elements */}
        <div className="absolute top-0 right-0 h-32 w-32 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
            <polygon
              points="50,10 90,50 50,90 10,50"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 h-24 w-24 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-blue-300">
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
              <Target className="h-10 w-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Hiring Preferences
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                Help us understand what type of candidates you're looking for to
                improve your search experience.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600/20 px-4 py-2 text-blue-300 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-300"></div>
              Step 2 of 2
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="rolesYouHireFor" className="text-white font-medium">
                What roles do you typically hire for?
                <span className="ml-2 text-white/60 text-sm">(optional)</span>
              </Label>
              <Textarea
                id="rolesYouHireFor"
                placeholder="e.g. Software Engineers, Product Managers, Data Scientists..."
                className="min-h-[100px] w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                value={preferences.rolesYouHireFor}
                onChange={(e) =>
                  handleInputChange("rolesYouHireFor", e.target.value)
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="preferredSkills" className="text-white font-medium">
                What skills do you look for most often?
                <span className="ml-2 text-white/60 text-sm">(optional)</span>
              </Label>
              <Textarea
                id="preferredSkills"
                placeholder="e.g. React, Python, Leadership, Communication..."
                className="min-h-[100px] w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                value={preferences.preferredSkills}
                onChange={(e) =>
                  handleInputChange("preferredSkills", e.target.value)
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="additionalNotes" className="text-white font-medium">
                Anything else you'd like us to know?
                <span className="ml-2 text-white/60 text-sm">(optional)</span>
              </Label>
              <Textarea
                id="additionalNotes"
                placeholder="e.g. Company culture preferences, remote work policies, interview process..."
                className="min-h-[100px] w-full rounded-xl border border-blue-400/30 bg-blue-700/30 px-4 py-4 text-white placeholder:text-white/50 backdrop-blur-sm focus:border-blue-300/50 focus:ring-2 focus:ring-blue-300/20"
                value={preferences.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
              />
            </div>

            <div className="relative overflow-hidden rounded-xl border border-blue-400/30 bg-blue-600/20 p-6 backdrop-blur-sm">
              <div className="absolute top-0 right-0 h-16 w-16 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full text-blue-300"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 flex-shrink-0 text-blue-300 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-200">Pro tip:</p>
                  <p className="text-sm text-white/80">
                    These preferences help our AI understand your hiring patterns and 
                    provide better candidate recommendations. You can always update 
                    them later in your dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                size="lg"
                className="group relative overflow-hidden rounded-xl bg-white px-12 py-6 text-lg font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
                disabled={completeOnboardingMutation.isPending}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  {completeOnboardingMutation.isPending
                    ? "Completing Setup..."
                    : "Complete Profile"}
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
