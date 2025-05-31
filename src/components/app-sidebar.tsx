"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TalentHuntBranding } from "@/components/talent-hunt-branding";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Award,
  Crown,
  Gift,
  LucideSparkles,
  MessageSquare,
  Play,
  Search,
  Settings2,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { RainbowButton } from "./magicui/rainbow-button";

// Updated data for TalentHunt platform
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Candidates",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "All Candidates",
          url: "/discover",
        },
        {
          title: "Featured",
          url: "/discover/featured",
        },
        {
          title: "Saved",
          url: "/discover/saved",
        },
      ],
    },
    {
      title: "My Searches",
      url: "#",
      icon: Search,
      items: [
        {
          title: "Recent Searches",
          url: "/searches",
        },
        {
          title: "Saved Searches",
          url: "/searches/saved",
        },
        {
          title: "Search Analytics",
          url: "/searches/analytics",
        },
      ],
    },
    {
      title: "Outreach",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Sent Messages",
          url: "/outreach",
        },
        {
          title: "Templates",
          url: "/outreach/templates",
        },
        {
          title: "Analytics",
          url: "/outreach/analytics",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Company",
          url: "/settings/company",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Preferences",
          url: "/settings/preferences",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Frontend Engineers",
      url: "/discover?category=frontend",
      icon: Award,
    },
    {
      name: "Backend Engineers",
      url: "/discover?category=backend",
      icon: Award,
    },
    {
      name: "Full Stack Engineers",
      url: "/discover?category=fullstack",
      icon: Award,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TalentHuntBranding />
      </SidebarHeader>
      <SidebarContent>
        {/* Discover Button - First Item */}
        <div className="px-3 py-2">
          <Link href="/discover">
            <Button className="bg-primary hover:bg-primary/90 h-10 w-full justify-start gap-2">
              <Search className="h-4 w-4" />
              Discover Talent
            </Button>
          </Link>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col gap-2 px-3 py-2">
          <Button
            variant="outline"
            className="h-10 w-full justify-start gap-2 text-purple-700 [box-shadow:0_0_4px_rgba(168,85,247,0.3)] hover:text-purple-600"
            asChild
          >
            <Link href="/upgrade">
              <Crown className="h-4 w-4 fill-purple-600 stroke-none" />
              Upgrade to Pro
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size={"icon"}
            className="text-purple-700 [box-shadow:0_0_4px_rgba(168,85,247,0.3)] hover:text-purple-600"
          >
            <Link href="/rewards">
              <Gift className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full justify-start gap-2"
            asChild
          >
            <Link href="/start">
              <Play className="h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </div>

        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <RainbowButton asChild>
          <SidebarMenuButton>
            <LucideSparkles className="size-4" />
            <span>Upgrade to Pro</span>
          </SidebarMenuButton>
          {/* <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:border-border border border-transparent hover:bg-white"
          >
            🔥 Upgrade to Pro
          </SidebarMenuButton> */}
        </RainbowButton>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
