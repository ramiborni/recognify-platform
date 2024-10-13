import "@/styles/globals.css";

import React, { useState } from "react";
import Script from "next/script";
import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { User } from "@prisma/client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { getCurrentUser } from "@/lib/session";
import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ToastToaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import IntercomWidget from "@/components/intercom-widget";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import NextTopLoader from 'nextjs-toploader';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = constructMetadata();

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser();

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
        <NextTopLoader
          color="#3d61ff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
        />

        <Script
          data-domain="recognify.io"
          src="https://plausible.io/js/script.js"
        ></Script>
        {/* Intercom Script */}
        <Script
          id="intercom-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var w=window;
                var ic=w.Intercom;
                if(typeof ic==="function"){
                  ic('reattach_activator');
                  ic('update',w.intercomSettings);
                } else {
                  var d=document;
                  var i=function(){
                    i.c(arguments);
                  };
                  i.q=[];
                  i.c=function(args){
                    i.q.push(args);
                  };
                  w.Intercom=i;
                  var l=function(){
                    var s=d.createElement('script');
                    s.type='text/javascript';
                    s.async=true;
                    s.src='https://widget.intercom.io/widget/jievhfpn';
                    var x=d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s,x);
                  };
                  if(document.readyState==='complete'){
                    l();
                  } else if(w.attachEvent){
                    w.attachEvent('onload',l);
                  } else {
                    w.addEventListener('load',l,false);
                  }
                }
              })();
            `,
          }}
        />

        <SessionProvider>
          <IntercomWidget user={user as User} />
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
