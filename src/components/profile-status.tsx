"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  completionPercentageAtom,
  pendingTasksAtom,
  profileCompletionAtom,
  type ProfileCompletionStatus,
} from "@/lib/atoms";
import { useAtom, useAtomValue } from "jotai";
import { Check, Clock, Star } from "lucide-react";

export function ProfileStatus() {
  const [completion, setCompletion] = useAtom(profileCompletionAtom);
  const percentage = useAtomValue(completionPercentageAtom);
  const pendingTasks = useAtomValue(pendingTasksAtom);

  const updateCompletion = (
    key: keyof ProfileCompletionStatus,
    value: boolean,
  ) => {
    setCompletion((prev) => ({ ...prev, [key]: value }));
  };

  const handleCompleteProfile = () => {
    // Handle navigation to profile completion flow
    console.log("Navigate to profile completion");
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Profile Status</h3>
        </div>
        <p className="text-sm text-blue-100">
          Complete your profile to get more visibility
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-lg font-bold">{percentage}%</span>
          </div>

          <Progress value={percentage} className="h-2 bg-blue-400/30" />
        </div>

        {/* Status Indicators */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {completion.linkedinVerified ? (
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-300" />
                <Badge
                  variant="secondary"
                  className="border-green-400/20 bg-green-500/20 text-green-100"
                >
                  LinkedIn Verified
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-300" />
                <Badge
                  variant="secondary"
                  className="cursor-pointer border-orange-400/20 bg-orange-500/20 text-orange-100"
                  onClick={() => updateCompletion("linkedinVerified", true)}
                >
                  LinkedIn Pending
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {completion.githubVerified ? (
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-300" />
                <Badge
                  variant="secondary"
                  className="border-green-400/20 bg-green-500/20 text-green-100"
                >
                  GitHub Verified
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-300" />
                <Badge
                  variant="secondary"
                  className="cursor-pointer border-orange-400/20 bg-orange-500/20 text-orange-100"
                  onClick={() => updateCompletion("githubVerified", true)}
                >
                  GitHub Pending
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Complete Profile Button */}
        <Button
          onClick={handleCompleteProfile}
          variant="secondary"
          className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
        >
          Complete Profile
        </Button>

        {/* Pending Tasks (for debugging/development) */}
        {pendingTasks.length > 0 && process.env.NODE_ENV === "development" && (
          <div className="space-y-2 border-t border-white/20 pt-2">
            <p className="text-xs text-blue-100">Pending tasks:</p>
            <div className="space-y-1">
              {pendingTasks.slice(0, 3).map((task) => (
                <button
                  key={task.key}
                  onClick={() => updateCompletion(task.key, true)}
                  className="block text-left text-xs text-blue-200 hover:text-white"
                >
                  • {task.label}
                </button>
              ))}
              {pendingTasks.length > 3 && (
                <p className="text-xs text-blue-200">
                  +{pendingTasks.length - 3} more tasks
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
