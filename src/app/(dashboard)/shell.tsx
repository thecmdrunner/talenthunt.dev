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

  console.log({
    isDiscoverPage,
    pathname,
  });

  const breadcrumbItems = useMemo(() => {
    return (
      pathname
        .split("/")
        // .slice(0, 1)
        .filter(Boolean)
    );
  }, [pathname]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-1 flex-col gap-4 overflow-hidden pt-0",
        isDiscoverPage
          ? "bg-gradient-to-br from-cyan-100/50 via-purple-50/50 to-pink-100/50"
          : "bg-white",
      )}
    >
      <header className="border-border sticky top-0 left-0 z-20 flex shrink-0 items-center gap-2 border-b bg-slate-50 py-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        {state === "collapsed" && (
          <>
            <SidebarTrigger className="ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </>
        )}
        <Breadcrumb className="ml-5">
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
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={path}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {(!isLast || breadcrumbItems.length === 1) && (
                    <BreadcrumbSeparator className="" />
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </header>

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
