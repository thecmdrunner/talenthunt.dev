import { extractPublicMetadata } from "@/server/auth/actions";
import { Waitlist } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function WaitlistPage() {
  const authedUser = await currentUser();

  const metadata = extractPublicMetadata(authedUser);

  if (metadata?.earlyAccess) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Waitlist />
    </div>
  );
}
