import Link from "next/link";

import { integrations } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import { Badge } from "../ui/badge";

export default function Integations() {
  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Integrations"
            title="Discover all integrations."
            subtitle="Use the provided integrations to fit your unique requirements."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => {
              const Icon = Icons[integration.icon || "nextjs"];
              return (
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                  key={integration.title}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-primary/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                  />
                  <div className="relative">
                    <div className="relative flex size-12 rounded-2xl border border-border shadow-sm *:relative *:m-auto *:size-6">
                      <Icon className="size-10" />
                    </div>
                    <div className="mt-6 flex flex-row items-center pb-2 align-middle">
                      <h3 className="font-urban text-2xl font-bold">
                        {integration.title}
                      </h3>
                      {integration.soon && <Badge className="ml-2">Soon</Badge>}
                    </div>

                    <p className="text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
