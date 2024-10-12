"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Zap } from "lucide-react";

interface BillingFormButtonProps {
  stripeId: string;
  isPopular?: boolean;
}

export function BillingFormButton({
  stripeId,
  isPopular = false,
}: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(null, stripeId);

  const stripeSessionAction = () =>
    startTransition(async () => await generateUserStripeSession());

  return (
    <Button
      className="w-full text-lg font-semibold"
      size="lg"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        </>
      ) : (
        <>
          {isPopular ? (
            <>
              <Zap className="mr-2 size-5" />
              Get Started Now
            </>
          ) : (
            "Choose Plan"
          )}
        </>
      )}
    </Button>
  );
}
