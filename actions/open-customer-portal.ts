"use server";

import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = absoluteUrl("/dashboard/");

export async function openCustomerPortal(
  userStripeId: string,
): Promise<string> {
  let redirectUrl: string = "";

  try {
    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate user stripe session");
  }

  return redirectUrl;
}
