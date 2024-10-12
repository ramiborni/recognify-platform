"use server";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { env } from "@/env.mjs";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  productId: string,
): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const user = await getCurrentUser();

    if (!user || !user.email || !user.id) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      const product =  await stripe.products.retrieve(productId);

      const metadata = {
        userId: user.id,
        allowedUsers: product.metadata.allowedUsers,
        planName: product.metadata.allowedUsers,
      };

      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: env.NEXT_PUBLIC_APP_URL + "/dashboard/",
        payment_method_types: ["card"],
        mode: "payment",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price: product.default_price as string,
            quantity: 1,
          },
        ],
        metadata: metadata,
        payment_intent_data: {
          metadata: metadata,
        },
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate user stripe session");
  }

  // no revalidatePath because redirect
  redirect(redirectUrl);
}
