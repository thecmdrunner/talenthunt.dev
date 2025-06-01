"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
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
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <div className="mb-4 text-4xl">🎯</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Hiring Preferences
        </h2>
        <p className="text-gray-600">
          Help us understand what type of candidates you&apos;re looking for to
          improve your search experience.
        </p>
        <div className="text-sm text-gray-500">Step 2 of 2</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rolesYouHireFor">
            What roles do you typically hire for? (optional)
          </Label>
          <Textarea
            id="rolesYouHireFor"
            placeholder="e.g. Software Engineers, Product Managers, Data Scientists..."
            className="min-h-[100px] rounded-lg"
            value={preferences.rolesYouHireFor}
            onChange={(e) =>
              handleInputChange("rolesYouHireFor", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredSkills">
            What skills do you look for most often? (optional)
          </Label>
          <Textarea
            id="preferredSkills"
            placeholder="e.g. React, Python, Leadership, Communication..."
            className="min-h-[100px] rounded-lg"
            value={preferences.preferredSkills}
            onChange={(e) =>
              handleInputChange("preferredSkills", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">
            Anything else you&apos;d like us to know? (optional)
          </Label>
          <Textarea
            id="additionalNotes"
            placeholder="e.g. Company culture preferences, remote work policies, interview process..."
            className="min-h-[100px] rounded-lg"
            value={preferences.additionalNotes}
            onChange={(e) =>
              handleInputChange("additionalNotes", e.target.value)
            }
          />
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            💡 <strong>Pro tip:</strong> These preferences help our AI
            understand your hiring patterns and provide better candidate
            recommendations. You can always update them later in your dashboard.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={completeOnboardingMutation.isPending}
          >
            {completeOnboardingMutation.isPending
              ? "Completing Setup..."
              : "Complete Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
