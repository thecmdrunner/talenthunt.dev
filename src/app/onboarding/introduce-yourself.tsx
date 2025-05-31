"use client";

import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";

interface IntroduceYourselfProps {
  onComplete: () => void;
}

export default function IntroduceYourself({
  onComplete,
}: IntroduceYourselfProps) {
  const handleStartRecording = () => {
    // TODO: Implement video recording logic
    alert("Start recording functionality will be implemented");
  };

  const handleUploadVideo = () => {
    // TODO: Implement video upload logic
    alert("Upload video functionality will be implemented");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Tell Us About Yourself
        </h2>
        <p className="text-gray-600">
          Record a short video (up to 60 seconds) to share who you are, what
          you&apos;re passionate about, and what you&apos;re looking for.
        </p>
        <div className="text-sm text-gray-500">Step 3 of 3</div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-lg bg-blue-600 hover:bg-blue-700"
            onClick={handleStartRecording}
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Recording
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-lg"
            onClick={handleUploadVideo}
          >
            <Video className="mr-2 h-5 w-5" />
            Upload Video
          </Button>
        </div>

        <div className="rounded-xl bg-blue-50 p-6">
          <h3 className="mb-3 font-medium text-gray-900">
            Tips for a great video:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Be natural
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Keep it concise
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              Smile!
            </li>
          </ul>
        </div>

        <Button
          size="lg"
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700"
          onClick={onComplete}
        >
          Complete Profile
        </Button>
      </div>
    </div>
  );
}
