import { headers } from "next/headers";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve the subscription details from Stripe.


    if (
      session.customer_details &&
      session.mode === "payment" &&
      session.metadata &&
      session.payment_status === "paid"
    ) {
      // Update the user stripe into in our database.
      // Since this is the initial subscription, we need to update
      // the subscription id and customer id.
      await prisma.user.update({
        where: {
          id: session?.metadata?.userId,
        },
        data: {
          //stripeSubscriptionId: subscription.id,
          stripeCustomerId: session.customer as string,
          ltdPlan: session.metadata.planName,
          isLTD: true,
          isLTDStart: new Date(),
          //stripeCurrentPeriodEnd: new Date(
          // subscription.current_period_end * 1000,)
        },
      });
    }
  }

  /*

  if(event.type === "payment_intent.succeeded"){
    const session = event.data.object as Stripe.PaymentIntent;
    console.log(session);
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // Update the price id and set the new period end.
      await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }
  }

  */

  return new Response(null, { status: 200 });
}
