import { ProfileStatus } from "@/components/profile-status";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Lightbulb, Mail, MousePointer, Star, Video } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto flex flex-col gap-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          Track your profile performance and opportunities
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-border flex gap-4 border-b">
        <button className="rounded-t-lg bg-blue-500 px-4 py-2 font-medium text-white">
          Overview
        </button>
        <button className="text-muted-foreground hover:text-foreground px-4 py-2">
          Analytics
        </button>
        <button className="text-muted-foreground hover:text-foreground px-4 py-2">
          Recommendations
        </button>
      </div>

      {/* Profile Status Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileStatus />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Profile Views</p>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-muted-foreground text-xs">Past 7 Days</p>
                  <p className="text-xs text-green-600">
                    ↗ +12% from last week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <MousePointer className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Recruiter Clicks
                  </p>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-muted-foreground text-xs">Past 7 Days</p>
                  <p className="text-xs text-green-600">
                    ↗ +8% from last week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Outreach Received
                  </p>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-muted-foreground text-xs">Past 7 Days</p>
                  <p className="text-xs text-blue-600">3 new messages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Shortlists</p>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-muted-foreground text-xs">Past 7 Days</p>
                  <p className="text-xs text-blue-600">
                    5 companies interested
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Resume Credibility Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resume Credibility Score</CardTitle>
            <p className="text-muted-foreground text-sm">
              Based on verification and assessment
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">
                8.5<span className="text-lg">/10</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Excellent credibility rating
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Video Screening</span>
              <Badge className="ml-auto bg-blue-100 text-blue-700">
                Completed
              </Badge>
            </div>

            <div className="text-muted-foreground space-y-2 text-sm">
              <p>Feedback</p>
              <p>• Excellent technical explanation of RAG implementation</p>
              <p>• Consider adding more details about scalability challenges</p>
            </div>
          </CardContent>
        </Card>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Performance</CardTitle>
            <p className="text-muted-foreground text-sm">
              How your projects are performing
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Customer Support Bot</p>
                  <p className="text-muted-foreground text-sm">
                    LangChain + RAG implementation
                  </p>
                  <div className="mt-1 flex gap-1">
                    <Badge variant="secondary">LangChain</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">FastAPI</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Eye className="h-3 w-3" />
                    89
                    <Star className="ml-2 h-3 w-3" />
                    12
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Document Q&A System</p>
                  <p className="text-muted-foreground text-sm">
                    Enterprise RAG solution
                  </p>
                  <div className="mt-1 flex gap-1">
                    <Badge variant="secondary">RAG</Badge>
                    <Badge variant="secondary">ChromaDB</Badge>
                    <Badge variant="secondary">OpenAI</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Eye className="h-3 w-3" />
                    156
                    <Star className="ml-2 h-3 w-3" />
                    23
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Multi-modal Search Engine</p>
                  <p className="text-muted-foreground text-sm">
                    Text + image retrieval system
                  </p>
                  <div className="mt-1 flex gap-1">
                    <Badge variant="secondary">CLIP</Badge>
                    <Badge variant="secondary">Weaviate</Badge>
                    <Badge variant="secondary">React</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Eye className="h-3 w-3" />
                    67
                    <Star className="ml-2 h-3 w-3" />8
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Improvement Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Profile Improvement Suggestions
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              AI-powered recommendations
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p>• Add more projects showcasing LangChain expertise</p>
              <p>• Complete remaining screening questions</p>
              <p>• Link GitHub profile for enhanced credibility</p>
              <p>• Update bio with recent AI/ML achievements</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="mb-2 font-medium">Recent Activity</h4>
              <p className="text-muted-foreground text-sm">
                Your profile activity timeline
              </p>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-blue-600" />
                  <span>Recruiter Reached Out</span>
                  <span className="text-muted-foreground ml-auto text-xs">
                    2 hours ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-3 w-3 text-green-600" />
                  <span>Video Screening Completed</span>
                  <span className="text-muted-foreground ml-auto text-xs">
                    1 day ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="h-3 w-3 rounded-full bg-purple-600" />
                  <span>LinkedIn Verified</span>
                  <span className="text-muted-foreground ml-auto text-xs">
                    3 days ago
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
