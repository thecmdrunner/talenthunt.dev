"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { api } from "@/trpc/react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Coins,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  const clerk = useClerk();
  const { data: creditsStatus } = api.user.getCreditsStatus.useQuery();
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:border-border border border-transparent hover:bg-white"
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

            {/* Credits Status */}
            {creditsStatus && (
              <>
                <DropdownMenuSeparator />
                <div className="px-2 py-2">
                  <div className="bg-muted/50 flex items-center justify-between rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium">Credits</span>
                    </div>
                    <Badge
                      variant={
                        creditsStatus.hasLowCredits ? "destructive" : "default"
                      }
                      className="font-mono"
                    >
                      {creditsStatus.credits}
                    </Badge>
                  </div>
                  {creditsStatus.hasLowCredits && (
                    <p className="text-muted-foreground mt-2 text-xs">
                      Running low! Get more credits to continue searching.
                    </p>
                  )}
                </div>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/upgrade" className="cursor-pointer">
                  <Sparkles
                    className={
                      creditsStatus?.hasLowCredits ? "text-amber-500" : ""
                    }
                  />
                  <span
                    className={
                      creditsStatus?.hasLowCredits
                        ? "font-medium text-amber-700"
                        : ""
                    }
                  >
                    Upgrade to Pro
                  </span>
                  {creditsStatus?.hasLowCredits && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Recommended
                    </Badge>
                  )}
                </Link>
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
