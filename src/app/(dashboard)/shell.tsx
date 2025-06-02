"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useMemo, type PropsWithChildren } from "react";

const convertPathnameToBreadcrumbs = (pathname: string) => {
  const urlToBreadcrumbs = {
    "/discover": "Discover",
    "/dashboard": "Dashboard",
    "/settings": "Settings",
    "/onboarding/candidate": "Candidate Onboarding",
    "/onboarding/recruiter": "Recruiter Onboarding",
    "/jobs/new": "Post Job",
  };

  return urlToBreadcrumbs[pathname as keyof typeof urlToBreadcrumbs];
};

export default function Shell(props: PropsWithChildren) {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isDiscoverPage = useMemo(() => {
    return pathname.startsWith("/discover");
  }, [pathname]);

  const breadcrumbItems = useMemo(() => {
    return (
      pathname
        .split("/")
        // .slice(0, 1)
        .filter(Boolean)
    );
  }, [pathname]);

  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-1 flex-col gap-4 overflow-hidden pt-0",
        // isDiscoverPage
        //   ? "bg-gradient-to-br from-cyan-100/50 via-purple-50/50 to-pink-100/50"
        //   : "bg-white",

        "bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700",
      )}
    >
      {/* Geometric Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Geometric Shapes */}
        <div className="absolute top-10 -left-20 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/5 blur-3xl"></div>
        <div className="absolute top-40 -right-10 h-[350px] w-[350px] animate-pulse rounded-full bg-gradient-to-tl from-blue-300/8 to-blue-500/4 blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(96,165,250,0.15) 1px, transparent 1px),
                linear-gradient(rgba(96,165,250,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>
      {!isDiscoverPage && (
        <header className="sticky top-0 left-0 z-20 flex shrink-0 items-center gap-2 border-b border-blue-400/20 bg-blue-800/40 px-4 py-4 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          {state === "collapsed" ||
            (isMobile && (
              <>
                <SidebarTrigger
                  variant={"link"}
                  className="sticky top-0 z-20 ml-1 bg-transparent text-white"
                />

                <Separator
                  orientation="vertical"
                  className="mr-2 bg-blue-400/30 data-[orientation=vertical]:h-4"
                />
              </>
            ))}
          {/* Decorative gradient line at top */}
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>

          {state === "collapsed" && (
            <>
              <Separator
                orientation="vertical"
                className="mr-2 bg-blue-400/30 data-[orientation=vertical]:h-4"
              />
            </>
          )}

          <Breadcrumb className="ml-1">
            <BreadcrumbList>
              {breadcrumbItems.map((segment, index, array) => {
                const path = `/${array.slice(0, index + 1).join("/")}`;
                const isLast = index === array.length - 1;
                const fullPath = `/${array.join("/")}`;

                // Use convertPathnameToBreadcrumbs for the last segment if available
                const label =
                  isLast && convertPathnameToBreadcrumbs(fullPath)
                    ? convertPathnameToBreadcrumbs(fullPath)
                    : segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                  <React.Fragment key={path}>
                    <BreadcrumbItem key={path} className="">
                      {isLast ? (
                        <BreadcrumbPage className="font-medium text-white">
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={path}
                          className="text-white/70 transition-colors hover:text-white"
                        >
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {(!isLast || breadcrumbItems.length === 1) && (
                      <BreadcrumbSeparator className="text-blue-300/50" />
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      )}

      {/* Decorative background elements */}
      {isDiscoverPage && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
          <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-2xl" />
          <div className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-2xl" />
          <div className="absolute top-1/3 right-1/3 h-16 w-16 rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-xl" />
          <div className="absolute right-10 bottom-40 h-28 w-28 rounded-full bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 blur-2xl" />
        </div>
      )}
      {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> */}
      <div className="z-[2] px-6 py-2">{props.children}</div>
    </div>
  );
}
