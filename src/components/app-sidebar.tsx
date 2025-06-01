"use client";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TalentHuntBranding } from "@/components/talent-hunt-branding";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { Award, Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  api.user.getOrCreateUser.useQuery();

  const pathname = usePathname();
  const { trackButtonClicked, trackPageVisited } = useTracking();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },

      {
        title: "Discover",
        url: "/discover",
        icon: Search,
        isActive: pathname === "/discover",
      },

      // {
      //   title: "My Searches",
      //   url: "#",
      //   icon: Search,
      //   isActive: pathname === "/searches",
      //   items: [
      //     {
      //       title: "Recent Searches",
      //       url: "/searches",
      //     },
      //     {
      //       title: "Saved Searches",
      //       url: "/searches/saved",
      //     },
      //     {
      //       title: "Search Analytics",
      //       url: "/searches/analytics",
      //     },
      //   ],
      // },

      // {
      //   title: "Outreach",
      //   url: "#",
      //   icon: MessageSquare,
      //   isActive: pathname === "/outreach",
      //   items: [
      //     {
      //       title: "Sent Messages",
      //       url: "/outreach",
      //     },
      //     {
      //       title: "Templates",
      //       url: "/outreach/templates",
      //     },
      //     {
      //       title: "Analytics",
      //       url: "/outreach/analytics",
      //     },
      //   ],
      // },
      // {
      //   title: "Settings",
      //   url: "#",
      //   icon: Settings2,
      //   items: [
      //     {
      //       title: "Profile",
      //       url: "/settings/profile",
      //     },
      //     {
      //       title: "Company",
      //       url: "/settings/company",
      //     },
      //     {
      //       title: "Billing",
      //       url: "/settings/billing",
      //     },
      //     {
      //       title: "Preferences",
      //       url: "/settings/preferences",
      //     },
      //   ],
      // },
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TalentHuntBranding />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
