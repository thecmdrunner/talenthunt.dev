"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  const clerk = useClerk();
  const userName = user?.firstName;
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userImageUrl = user?.imageUrl;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {userImageUrl && (
                  <AvatarImage src={userImageUrl} alt={userName ?? ""} />
                )}
                <AvatarFallback className="rounded-lg bg-neutral-300">
                  {user ? (
                    "U"
                  ) : (
                    <div className="h-full w-full animate-pulse bg-neutral-300" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {userName ?? (
                    <span className="inline-block h-4 w-24 animate-pulse rounded bg-neutral-300" />
                  )}
                </span>
                <span className="truncate text-xs">
                  {userEmail ?? (
                    <span className="inline-block h-3 w-32 animate-pulse rounded bg-neutral-300" />
                  )}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.imageUrl ? (
                    <AvatarImage src={user.imageUrl} alt={userName ?? ""} />
                  ) : null}
                  <AvatarFallback className="rounded-lg">
                    {user ? (
                      "U"
                    ) : (
                      <div className="h-full w-full animate-pulse bg-neutral-300" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userName ?? (
                      <span className="inline-block h-4 w-24 animate-pulse rounded bg-neutral-300" />
                    )}
                  </span>
                  <span className="truncate text-xs">
                    {userEmail ?? (
                      <span className="inline-block h-3 w-32 animate-pulse rounded bg-neutral-300" />
                    )}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                void clerk.signOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
