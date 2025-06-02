import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const user = await api.user.getOrCreateUser();

  if (
    !user?.candidateProfile?.onboardingCompletedAt &&
    !user?.recruiterProfile?.onboardingCompletedAt
  ) {
    return redirect("/onboarding");
  }

  return <Dashboard user={user} />;
}
