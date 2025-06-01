"use client";

import { Target, Zap } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function TalentHuntBranding() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/dashboard" prefetch>
          <SidebarMenuButton
            size="lg"
            className="flex flex-row items-center gap-2 bg-transparent"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <Target className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                TalentHunt
              </span>
              <span className="text-muted-foreground flex items-center gap-1 truncate text-xs">
                <Zap className="size-3" />
                Find. Connect. Hire.
              </span>
            </div>

            <SidebarTrigger />
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
