import { fonts } from "@/lib/fonts";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import { PostHogProvider } from "./providers";

export const metadata: Metadata = {
  title: "Talent Hunt",
  description: "Accelerate your hiring with AI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${fonts.bricolageGrotesque.className}`}>
        <body>
          <PostHogProvider>
            <TRPCReactProvider>
              <NuqsAdapter>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                  }}
                />
              </NuqsAdapter>
            </TRPCReactProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
