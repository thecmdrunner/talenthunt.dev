"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TalentHuntBranding } from "@/components/talent-hunt-branding";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  BriefcaseBusinessIcon,
  Home,
  LucideSparkles,
  Search,
} from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";
import { RainbowButton } from "./magicui/rainbow-button";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  api.user.getOrCreateUser.useQuery();

  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Discover",
        url: "/discover",
        icon: Search,
        isActive: pathname === "/discover",
      },

      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },

      {
        title: "Jobs",
        url: "/jobs",
        icon: BriefcaseBusinessIcon,
        isActive: pathname === "/jobs",
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
  };

  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TalentHuntBranding />
      </SidebarHeader>
      <SidebarContent>
        {/* Discover Button - First Item */}
        {/* <Link href="/discover" className="w-full">
            <Button className="bg-primary hover:bg-primary/90 h-10 w-full justify-center gap-2 text-center">
              <Search className="h-4 w-4" />
              Discover Talent
            </Button>
          </Link> */}

        {/* <Button
            asChild
            variant="outline"
            className="aspect-square h-10 w-10 text-purple-700 [box-shadow:0_0_4px_rgba(168,85,247,0.3)] hover:text-purple-600"
          >
            <Link href="/rewards">
              <Gift className="h-4 w-4" />
            </Link>
          </Button> */}

        {/* Quick Action Buttons */}
        {/* <div className="flex flex-col gap-2 px-3 py-2">
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
        </div> */}

        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <TooltipProvider>
          <Tooltip>
            <SidebarMenuButton
              className={cn(
                state === "expanded" && "hover:text-white active:text-white",
              )}
              asChild
            >
              <TooltipTrigger asChild>
                {state === "expanded" ? (
                  <RainbowButton>
                    <LucideSparkles className="size-4" />
                    <span>Upgrade to Pro</span>
                  </RainbowButton>
                ) : (
                  <Button
                    variant="ghost"
                    // className="hover:text-white active:text-white"
                  >
                    <LucideSparkles className="size-4" />
                  </Button>
                )}
              </TooltipTrigger>
            </SidebarMenuButton>
            <TooltipContent>
              <p>Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
