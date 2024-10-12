import "@/styles/globals.css";

import React, { useState } from "react";
import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { getCurrentUser } from "@/lib/session";
import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ToastToaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import ModalProvider from "@/components/modals/providers";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Intercom from '@intercom/messenger-js-sdk';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = constructMetadata();

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    Intercom({
      app_id: "jievhfpn",
      user_id: user.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
      name: user.name!, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
      email: user.email!, // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email
      created_at: user.createdAt.getTime(), // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date in a Unix timestamp (in seconds) e.g. 1704067200
    });
  }else{
    Intercom({
      app_id: "jievhfpn", 
    });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children}</Providers>
            <Analytics />
            <Toaster richColors closeButton />
            <ToastToaster />
            <TailwindIndicator />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
