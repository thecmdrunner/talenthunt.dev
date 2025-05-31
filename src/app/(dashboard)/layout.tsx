import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/server";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await api.user.getOrCreateUser();

  if (user && !user?.candidateProfile && !user?.recruiterProfile) {
    return redirect("/onboarding");
  }

  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="relative flex min-h-screen flex-1 flex-col gap-4 overflow-hidden bg-gradient-to-br from-cyan-100 via-purple-50 to-pink-100 p-4 pt-0">
              <header className="sticky top-0 left-0 z-20 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarTrigger className="-ml-1 lg:hidden" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
              </header>

              {/* Decorative background elements */}
              <div className="absolute inset-0 z-10 overflow-hidden">
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
                <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-2xl" />
                <div className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-2xl" />
                <div className="absolute top-1/3 right-1/3 h-16 w-16 rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-xl" />
                <div className="absolute right-10 bottom-40 h-28 w-28 rounded-full bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 blur-2xl" />
              </div>
              {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> */}
              {children}
              {/* </div> */}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SignedIn>
    </>
  );
}
