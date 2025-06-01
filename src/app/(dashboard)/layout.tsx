import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api } from "@/trpc/server";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import Shell from "./shell";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await api.user.getOrCreateUser();

  if (!user) {
    return redirect("/");
  }

  if (!user?.recruiterProfile && !user?.candidateProfile) {
    return redirect("/onboarding");
  }

  if (!user?.recruiterProfile && user?.candidateProfile.currentStep === 0) {
    return redirect("/onboarding/candidate");
  }

  if (!user?.candidateProfile && user?.recruiterProfile.currentStep === 0) {
    return redirect("/onboarding/recruiter");
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
            <Shell> {children} </Shell>
          </SidebarInset>
        </SidebarProvider>
      </SignedIn>
    </>
  );
}
