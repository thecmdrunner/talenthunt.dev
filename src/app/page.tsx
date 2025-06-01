import { AuroraText } from "@/components/magicui/aurora-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  Github,
  Linkedin,
  MessageSquare,
  Search,
  Shield,
  Star,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  const user = await auth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              TalentHunt.dev
            </span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900"
            >
              How it works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button>dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/discover">
                  <Button>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Start Hiring
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button variant="outline">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Find Work
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16">
        <div className="container mx-auto max-w-6xl text-center">
          <Tabs defaultValue="hire" className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit gap-2 rounded-full bg-blue-50 p-1">
              <TabsTrigger
                value="hire"
                className={cn(
                  "rounded-full px-6 py-2 font-medium text-blue-700 transition-colors",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                )}
              >
                <Zap className="mr-2 inline-block h-4 w-4" />
                Hire Talent
              </TabsTrigger>
              <TabsTrigger
                value="work"
                className={cn(
                  "rounded-full px-6 py-2 font-medium text-blue-700 transition-colors",
                  "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
                )}
              >
                <Briefcase className="mr-2 inline-block h-4 w-4" />
                Find Work
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hire">
              <div className="mb-8 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  AI-Powered Talent Matching
                </span>
              </div>
              <h1 className="mx-auto mb-6 max-w-2xl text-5xl leading-tight font-bold text-balance md:text-4xl">
                Find the best{" "}
                <AuroraText className="border-border w-60 rounded-lg border bg-white [box-shadow:3px_3px_1px_theme(colors.indigo.600)]">
                  Candidates
                </AuroraText>
                <br />
              </h1>

              <p className="">with a simple search.</p>

              <div className="mx-auto mb-12 max-w-2xl">
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Find senior GenAI engineers with LangChain + RAG experience in Europe..."
                    className="rounded-xl border-2 border-gray-200 py-4 pr-4 pl-12 text-lg focus:border-blue-500"
                  />
                  <Button className="absolute top-1/2 right-2 -translate-y-1/2 transform">
                    Search
                  </Button>
                </div>
              </div>
              <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-8 py-4 text-lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Find Talent
                </Button>
              </div>
              <div className="mb-8 text-sm text-gray-500">
                Trusted by 1000+ companies and 50,000+ candidates
              </div>
              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Senior Full-Stack Engineer",
                    company: "Ex-Google",
                    skills: ["React", "Node.js", "Python"],
                    verified: true,
                  },
                  {
                    name: "Marcus Johnson",
                    role: "DevOps Engineer",
                    company: "Ex-AWS",
                    skills: ["Kubernetes", "Docker", "Terraform"],
                    verified: true,
                  },
                  {
                    name: "Elena Rodriguez",
                    role: "Data Scientist",
                    company: "Ex-Meta",
                    skills: ["ML", "Python", "TensorFlow"],
                    verified: true,
                  },
                ].map((candidate, i) => (
                  <Card key={i} className="transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${candidate.name}`}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <div className="mb-1 flex items-center space-x-2">
                            <h3 className="font-semibold">{candidate.name}</h3>
                            {candidate.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="mb-2 text-sm text-gray-600">
                            {candidate.role}
                          </p>
                          <p className="mb-3 text-xs text-gray-500">
                            {candidate.company}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, j) => (
                              <Badge
                                key={j}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="work">
              <div className="mb-8 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  AI-Powered Job Matching
                </span>
              </div>
              <h1 className="mx-auto mb-6 max-w-2xl text-5xl leading-tight font-bold text-balance md:text-4xl">
                Find the best{" "}
                <AuroraText className="border-border w-60 rounded-lg border bg-white [box-shadow:3px_3px_1px_theme(colors.indigo.600)]">
                  Opportunity
                </AuroraText>{" "}
                <br />
              </h1>

              <p className="">with a simple search.</p>

              <div className="mx-auto mb-12 max-w-2xl">
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search for remote product manager roles in SaaS startups..."
                    className="rounded-xl border-2 border-gray-200 py-4 pr-4 pl-12 text-lg focus:border-blue-500"
                  />
                  <Button className="absolute top-1/2 right-2 -translate-y-1/2 transform">
                    Search
                  </Button>
                </div>
              </div>
              <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-8 py-4 text-lg">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Find Work
                </Button>
              </div>
              <div className="mb-8 text-sm text-gray-500">
                Join 50,000+ candidates landing interviews at 1000+ companies
              </div>
              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                {[
                  {
                    name: "Priya Singh",
                    role: "Product Manager",
                    company: "Ex-Stripe",
                    skills: ["Agile", "Figma", "A/B Testing"],
                    verified: true,
                  },
                  {
                    name: "David Kim",
                    role: "QA Tester",
                    company: "Ex-Atlassian",
                    skills: ["JIRA", "Automation", "Selenium"],
                    verified: true,
                  },
                  {
                    name: "Anna Müller",
                    role: "UX Researcher",
                    company: "Ex-N26",
                    skills: ["User Research", "Notion", "Miro"],
                    verified: true,
                  },
                ].map((candidate, i) => (
                  <Card key={i} className="transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${candidate.name}`}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <div className="mb-1 flex items-center space-x-2">
                            <h3 className="font-semibold">{candidate.name}</h3>
                            {candidate.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="mb-2 text-sm text-gray-600">
                            {candidate.role}
                          </p>
                          <p className="mb-3 text-xs text-gray-500">
                            {candidate.company}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, j) => (
                              <Badge
                                key={j}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Why TalentHunt.dev?</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              We're revolutionizing hiring with AI-powered matching and
              verification
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Natural Language Search",
                description:
                  "Find candidates using plain English queries. No complex filters needed.",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description:
                  "LinkedIn and GitHub verification ensures authentic, credible candidates.",
              },
              {
                icon: Zap,
                title: "AI-Powered Matching",
                description:
                  "Our AI ranks and matches candidates based on your specific requirements.",
              },
              {
                icon: MessageSquare,
                title: "Personalized Outreach",
                description:
                  "Generate personalized emails and reach out directly through your email client.",
              },
              {
                icon: Clock,
                title: "60% Faster Hiring",
                description:
                  "Reduce time-to-hire from 60+ days to just weeks with automated screening.",
              },
              {
                icon: Star,
                title: "Featured Candidates",
                description:
                  "Discover top talent through our scoring algorithm and community endorsements.",
              },
            ].map((feature, i) => (
              <Card key={i} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <feature.icon className="mb-4 h-10 w-10 text-blue-600" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-gray-600">
              Simple steps for both recruiters and candidates
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* For Recruiters */}
            <div>
              <h3 className="mb-8 text-center text-2xl font-bold">
                <Users className="mr-2 inline h-8 w-8 text-blue-600" />
                For Recruiters
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Connect LinkedIn",
                    description:
                      "Verify your recruiter status with LinkedIn authentication",
                  },
                  {
                    step: 2,
                    title: "Describe Your Needs",
                    description:
                      "Tell us what you're looking for in plain English",
                  },
                  {
                    step: 3,
                    title: "Browse Matches",
                    description:
                      "Review AI-ranked candidates with detailed profiles",
                  },
                  {
                    step: 4,
                    title: "Reach Out",
                    description: "Send personalized outreach emails directly",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Candidates */}
            <div>
              <h3 className="mb-8 text-center text-2xl font-bold">
                <Briefcase className="mr-2 inline h-8 w-8 text-purple-600" />
                For Candidates
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Create Profile",
                    description:
                      "Upload resume and connect LinkedIn/GitHub accounts",
                  },
                  {
                    step: 2,
                    title: "Video Verification",
                    description:
                      "Complete skill assessment through video responses",
                  },
                  {
                    step: 3,
                    title: "Showcase Projects",
                    description:
                      "Highlight your best work for recruiters to see",
                  },
                  {
                    step: 4,
                    title: "Get Discovered",
                    description:
                      "Be found by top companies looking for your skills",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">
            Verified Talent, Verified Quality
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-600">
            Our verification process ensures you connect with authentic,
            qualified professionals
          </p>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card className="p-8">
              <Linkedin className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-xl font-bold">LinkedIn Verified</h3>
              <p className="text-gray-600">
                All users verify their professional identity through LinkedIn
                authentication
              </p>
            </Card>
            <Card className="p-8">
              <Github className="mx-auto mb-4 h-12 w-12 text-gray-800" />
              <h3 className="mb-2 text-xl font-bold">GitHub Verified</h3>
              <p className="text-gray-600">
                Developers showcase verified projects and contributions from
                GitHub
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to revolutionize your hiring?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Join thousands of companies and candidates already using
            TalentHunt.dev
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/discover">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Start Hiring Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                size="lg"
                variant="outline"
                className="border-white px-8 py-4 text-lg text-white hover:bg-white hover:text-blue-600"
              >
                Join as Candidate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentHunt.dev</span>
              </div>
              <p className="text-gray-400">
                AI-powered talent matching for the modern workforce
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="flex flex-col items-center justify-between text-gray-400 sm:flex-row">
            <p>&copy; 2024 TalentHunt.dev. All rights reserved.</p>
            <div className="mt-4 flex space-x-4 sm:mt-0">
              <Link href="#" className="hover:text-white">
                Terms
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
