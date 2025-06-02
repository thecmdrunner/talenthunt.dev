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
import { useTracking } from "@/lib/hooks/use-tracking";
import { api } from "@/trpc/react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  const clerk = useClerk();
  const { trackButtonClicked, trackPageVisited } = useTracking();
  const { data: creditsStatus } = api.user.getCreditsStatus.useQuery();
  const userName = user?.firstName;
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userImageUrl = user?.imageUrl;

  const handleMenuClick = (action: string) => {
    trackButtonClicked(`user_menu_${action}`, "nav_user");
  };

  const handlePageNavigation = (page: string) => {
    trackPageVisited(page, "user_menu");
    trackButtonClicked(`nav_to_${page}`, "nav_user");
  };

  const handleLogout = () => {
    trackButtonClicked("user_logout", "nav_user");
    void clerk.signOut().then(() => {
      window.location.reload();
    });
  };

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
                  {creditsStatus && (
                    <span className="text-muted-foreground">
                      {creditsStatus.credits} credits
                    </span>
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
            {process.env.NODE_ENV !== "production" && (
              <DropdownMenuItem
                onClick={() => {
                  void navigator.clipboard.writeText(user?.id ?? "");
                  toast.success("Copied to clipboard");
                }}
              >
                userid: {user?.id}
              </DropdownMenuItem>
            )}

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
              <DropdownMenuItem asChild>
                <Link
                  href="#"
                  className="cursor-pointer"
                  onClick={() => handlePageNavigation("upgrade")}
                >
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
                    Upgrade
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
              <DropdownMenuItem onClick={() => handleMenuClick("account")}>
                <BadgeCheck />
                Get Verified
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleMenuClick("notifications")}
              >
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
