"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  SignedOut,
  SignInButton,
  useClerk,
  UserProfile,
  useSignIn,
} from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";

const strategy: OAuthStrategy = "oauth_github";

export default function Home() {
  const { signIn, isLoaded } = useSignIn();
  const { signOut, session } = useClerk();

  const { data: linkedin } = api.services.getLinkedinInfo.useQuery(undefined, {
    enabled: !!session,
  });

  const { data: github } = api.services.getGithubInfo.useQuery(undefined, {
    enabled: !!session,
  });

  if (!isLoaded) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {session && <UserProfile />}

        <Button
          onClick={() => {
            signIn
              .authenticateWithRedirect({
                strategy,
                redirectUrl: "/sign-in/sso-callback",
                redirectUrlComplete: "/",
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.log(err);
                console.error(err, null, 2);
              });
          }}
        >
          Connect Github
        </Button>

        <Button
          onClick={() => {
            void signOut();
          }}
        >
          Sign Out
        </Button>

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

          <div className="flex max-w-lg gap-2 rounded-lg bg-white/10 p-4">
            <pre className="flex text-sm whitespace-pre-wrap">
              {JSON.stringify({ github, linkedin }, null, 2)}
            </pre>
          </div>
          <div className="flex max-w-lg gap-2 rounded-lg bg-white/10 p-4">
            <pre className="flex text-sm whitespace-pre-wrap">
              {/* {JSON.stringify(user, null, 2)} */}
            </pre>
          </div>
        </div>
      </main>
    </>
  );
}
