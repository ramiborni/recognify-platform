import { startTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { Check, Zap } from "lucide-react";

import { env } from "@/env.mjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BillingFormButton } from "@/components/forms/billing-form-button";

export default async function Plans() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams ready to boost morale",
      price: 127,
      originalPrice: 160,
      features: [
        "20 team members",
        "10 surveys per month",
        "Unlimited recognitions",
        "Full survey analytics",
        "Slack Integration",
        "Chat & email support",
      ],
      stripePlanId: env.NEXT_PUBLIC_STRIPE_LTD_STARTER_PLAN_ID,
    },
    {
      name: "Growth",
      description: "Ideal for growing teams aiming for peak performance",
      price: 387,
      originalPrice: 485,
      features: [
        "100 team members",
        "Unlimited surveys",
        "Unlimited recognitions",
        "Full survey analytics",
        "Slack Integration",
        "Priority 24/7 chat & email support",
      ],
      popular: true,
      stripePlanId: env.NEXT_PUBLIC_STRIPE_LTD_GROWTH_PLAN_ID,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight">
        Boost your team spirits and productivity with Recognify!
      </h1>
      <p className="mb-8 text-center text-xl text-gray-600">
        Choose the plan that fits your team and watch motivation rise!
      </p>
      <div className="mb-12 rounded-lg bg-blue-50 p-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-blue-800">
          🎉 Limited-Time Offer: Lifetime Deal!
        </h2>
        <p className="text-blue-700">
          Because everyone deserves to be recognized, we&apos;re offering a
          one-time payment for lifetime access.
          <br />
          <span className="font-semibold">
            Act now – this offer won&apos;t last forever!
          </span>
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:px-40">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                {plan.popular && (
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    Best Value
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-2 text-base">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <div className="mb-6">
                <span className="text-4xl font-extrabold">${plan.price}</span>
              </div>
              <p className="mb-6 text-sm font-medium text-gray-600">
                One-time payment for lifetime access
              </p>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 size-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <BillingFormButton
                stripeId={plan.stripePlanId}
                isPopular={plan.popular}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        All plans come with a 30-day money-back guarantee. No questions asked.
      </p>
    </div>
  );
}
