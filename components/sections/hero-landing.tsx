"use client";

import Link from "next/link";
import {
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { PlayIcon } from "lucide-react";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://recognify.io/dashboard"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span>
          <span className="flex">Recognify Beta is launched</span>
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Feeling Disconnected?
          <br />
          <span className="text-gradient_indigo-purple font-extrabold">
            Recognify Brings Your Team Together
          </span>
        </h1>

        <p
          className="w-full text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Fight isolation, improve morale, and strengthen communication in your
          remote team. Recognify transforms digital spaces into places for
          appreciation and connection.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <RegisterLink
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Start Recognizing</span>
            <Icons.arrowRight className="size-4" />
          </RegisterLink>
          <Link href="https://www.loom.com/share/97dd9fd0f57f4bc3b89fbe8741136c31?source=embed_watch_on_loom_cta&t=22">
            <Button
              variant="ghost"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  rounded: "full",
                }),
                "px-5",
              )}
            >
              <p>
                <span className="hidden sm:inline-block">Watch Demo</span>
                <PlayIcon className="inline-block size-6 md:hidden"></PlayIcon>
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
