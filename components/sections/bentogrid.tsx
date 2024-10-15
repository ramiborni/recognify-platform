import Image from "next/image";
import DataImage from "@/public/_static/illustrations/data.png";
import RecognitionImage from "@/public/_static/illustrations/recognition.png";
import { ChartBar, PuzzleIcon } from "lucide-react";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function BentoGrid() {
  return (
    <section className="py-32">
      <MaxWidthWrapper>
        <div className="z-10 grid grid-cols-6 gap-3">
          {/* First card */}
          <div className="col-span-full flex overflow-hidden rounded-2xl border bg-background px-4 py-6 lg:col-span-2">
            <div className="m-auto size-fit py-6">
              {/*
<div className="flex mt-6 h-24 w-full items-center justify-center">
               <Image className="mx-auto" src={RecognitionImage as unknown as string} alt="Feature 1" width={700} height={400} />
              </div>
                */}
              <h2 className="mt-6 text-center font-heading text-3xl md:text-4xl lg:text-[40px]">
                Peer Recognition
              </h2>
              <p className="mt-4 text-center text-muted-foreground">
                Close the distance and create a culture of appreciation, even
                when your team works in different time zones.
              </p>
            </div>
          </div>

          {/* Second card */}
          <div className="col-span-full flex overflow-hidden rounded-2xl border bg-background px-4 lg:col-span-2">
            <div className="m-auto size-fit">
              {/*
<div className="flex mt-6 h-24 w-full items-center justify-center">
               <Image className="mx-auto" src={RecognitionImage as unknown as string} alt="Feature 1" width={700} height={400} />
              </div>
                */}
              <h2 className="mt-6 text-center font-heading text-3xl md:text-4xl lg:text-[40px]">
                Structured Feedback
              </h2>
              <p className="mt-4 text-center text-muted-foreground">
                Overcome communication barriers and ensure every team member
                receives constructive, actionable feedback for growth.
              </p>
            </div>
          </div>

          {/* Third card */}
          <div className="col-span-full flex overflow-hidden rounded-2xl border bg-background px-4 lg:col-span-2">
            <div className="m-auto size-fit">
              {/*
<div className="flex mt-6 h-24 w-full items-center justify-center">
               <Image className="mx-auto" src={RecognitionImage as unknown as string} alt="Feature 1" width={700} height={400} />
              </div>
                */}
              <h2 className="mt-6 text-center font-heading text-3xl md:text-4xl lg:text-[40px]">
                Quick Surveys
              </h2>
              <p className="mt-4 text-center text-muted-foreground">
                Stay connected with your team&apos;s well-being and quickly
                identify and address issues before they escalate.
              </p>
            </div>
          </div>
          {/* Second row */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid sm:grid-cols-1">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5 dark:before:bg-white/5">
                  <ChartBar className="m-auto size-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">
                    Team Insights
                  </h2>
                  <p className="text-muted-foreground">
                    See how your team&apos;s doing with easy-to-understand
                    charts and stats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid h-full sm:grid-cols-1">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5 dark:before:bg-white/5">
                  <PuzzleIcon className="m-auto size-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">
                    Multiple Integrations
                  </h2>
                  <p className="text-muted-foreground">
                    Connect Recognify with various of platforms to keep in
                    connection with your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
