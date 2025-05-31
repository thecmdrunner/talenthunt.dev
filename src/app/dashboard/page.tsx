"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Search, Settings, User, Users } from "lucide-react";

export default function DashboardPage() {
  const { data: user, isLoading } = api.user.getOrCreateUser.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isCandidate = !!user?.candidateProfile;
  const isRecruiter = !!user?.recruiterProfile;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {isCandidate && "Candidate Dashboard"}
              {isRecruiter && "Recruiter Dashboard"}
              {!isCandidate && !isRecruiter && "Dashboard"}
            </h1>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {!isCandidate && !isRecruiter && (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                Complete Your Profile
              </h2>
              <p className="mb-6 text-gray-600">
                You haven't set up your profile yet. Choose your role to get
                started.
              </p>
              <Button onClick={() => (window.location.href = "/onboarding")}>
                Complete Setup
              </Button>
            </CardContent>
          </Card>
        )}

        {isCandidate && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Step:</span>
                    <span className="font-medium">
                      {user.candidateProfile.currentStep}/5
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{
                        width: `${(user.candidateProfile.currentStep / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.candidateProfile.currentStep < 5
                      ? "Complete your profile to get discovered by recruiters"
                      : "Your profile is complete!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No recent activity yet.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No job opportunities yet.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {isRecruiter && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Step:</span>
                    <span className="font-medium">
                      {user.recruiterProfile.currentStep}/4
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{
                        width: `${(user.recruiterProfile.currentStep / 4) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.recruiterProfile.currentStep < 4
                      ? "Complete your profile to start searching for candidates"
                      : "Your profile is complete!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Candidate Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Find the perfect candidates using natural language search.
                </p>
                <Button className="w-full">Start Searching</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No active outreach campaigns.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
