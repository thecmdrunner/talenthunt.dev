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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Award, MessageSquare, Search, Settings2, Users } from "lucide-react";
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

        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <RainbowButton>Upgrade to Pro</RainbowButton>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
