"use server";

import { redirect } from "next/navigation";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";

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
      const product = await stripe.products.retrieve(productId);

      const metadata = {
        userId: user.id,
        allowedUsers: product.metadata.allowedUsers,
        planName: product.metadata.planName,
      };

      let stripeCustomerId = user.stripeCustomerId;

      if (!stripeCustomerId) {
        // Step 2: If not, create a new Stripe customer
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id, // Store your internal user ID for reference
          },
        });

        // Step 3: Save the customer ID to your database for future reference
        stripeCustomerId = customer.id;
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: stripeCustomerId },
        });
      }

      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: env.NEXT_PUBLIC_APP_URL + "/dashboard/",
        cancel_url: env.NEXT_PUBLIC_APP_URL + "/dashboard/",
        payment_method_types: ["card"],
        mode: "payment",
        billing_address_collection: "auto",
        customer: stripeCustomerId,
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
