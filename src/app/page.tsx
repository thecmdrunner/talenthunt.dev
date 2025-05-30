import { SignedOut, SignInButton } from "@clerk/nextjs";

import { HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          <SignedOut>
            <div className="flex flex-col items-center gap-4">
              <p className="text-xl">Welcome! Please sign in to continue.</p>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <div className="flex max-w-sm gap-2 rounded-lg bg-white/10 p-4">
            <pre className="flex text-sm whitespace-pre-wrap">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
