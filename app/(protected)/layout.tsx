import React, { Suspense } from "react";

import { sidebarLinks } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import { Toaster } from "@/components/ui/toaster";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import OrgModel from "./dashboard/components/org-model";
import { Icons } from "@/components/shared/icons";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) => !authorizeOnly || user?.role === authorizeOnly,
    ),
  }));

  const orgModelRendered = true;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        </div>
      }
    >
      {" "}
      <div className="relative flex min-h-screen w-full">
        <OrgModel />

        {orgModelRendered && (
          <>
            <DashboardSidebar links={filteredLinks} />

            <div className="flex flex-1 flex-col">
              <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
                <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
                  <MobileSheetSidebar links={filteredLinks} />

                  <div className="w-full flex-1">
                    <SearchCommand links={filteredLinks} />
                  </div>

                  <ModeToggle />
                  <UserAccountNav />
                </MaxWidthWrapper>
              </header>

              <main className="flex-1 p-4 xl:px-8">
                <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
                  {children}
                </MaxWidthWrapper>
                <Toaster />
              </main>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}
