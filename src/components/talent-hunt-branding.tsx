"use client";

import { Target, Zap } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function TalentHuntBranding() {
  const {
    isMobile,

    toggleSidebar,
  } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="flex flex-row items-center gap-2 bg-transparent"
        >
          <div
            onClick={() => {
              if (!isMobile) {
                toggleSidebar();
              }
            }}
            className="flex aspect-square size-8 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white"
          >
            <Target className="size-4" />
          </div>
          <Link
            href="/dashboard"
            className="grid flex-1 text-left text-sm leading-tight"
          >
            <span className="truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
              TalentHunt
            </span>
            <span className="text-muted-foreground flex items-center gap-1 truncate text-xs">
              <Zap className="size-3" />
              Find. Connect. Hire.
            </span>
          </Link>

          <SidebarTrigger />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
