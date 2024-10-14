import React, { Suspense } from "react";
import { headers } from "next/headers";
import { continueRegistration } from "@/actions/continue-registration";
import { openCustomerPortal } from "@/actions/open-customer-portal";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User, UserRole } from "@prisma/client";

import { sidebarLinks } from "@/config/dashboard";
import { axiosConfig } from "@/lib/axios-config";
import { getCurrentUser } from "@/lib/session";
import { Toaster } from "@/components/ui/toaster";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import Plans from "./components/Plans";
import OrgModel from "./dashboard/components/org-model";
import axios from "axios";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const { getAccessTokenRaw, getUser } = await getKindeServerSession();
  axiosConfig(await getAccessTokenRaw());

  const kindeUser = await getUser();

  const heads = headers();

  const pathname = heads.get("x-url");

  const url = new URL(pathname!);

  const invitationToken = url.searchParams.get("invitationToken");

  let user = await continueRegistration(kindeUser.id, invitationToken!);

  if(!user){
    user = await getCurrentUser() as User;
  }

  const billingUrl = await openCustomerPortal(user?.stripeCustomerId!);

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items
      .filter(
        ({ authorizeOnly }) => !authorizeOnly || user?.role === authorizeOnly,
      )
      .map((item) =>
        item.title === "Billing" ? { ...item, href: billingUrl } : item,
      ),
  }));

  const orgModelRendered = true;

  console.log(
    !user?.isLTD ||
      //!user?.stripeSubscriptionId &&
      !user?.stripeCustomerId ||
      !user?.ltdPlan,
  );

  if (
    !user?.isLTD ||
    !user?.stripeCustomerId ||
    !user?.ltdPlan // Removed the commented-out condition
  ) {
    // If the above condition is met, check this next condition
    if (user?.isTeamLeader || user?.role === UserRole.TEAM_LEADER) {
      return <Plans />;
    }
  }
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
                  <UserAccountNav user={user as User} />
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
