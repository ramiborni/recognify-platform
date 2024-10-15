import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Startups",
    benefits: [
      "20 team members",
      "10 surveys per month",
      "Unlimited recognitions",
      "Full survey analytics",
      "Slack Integration",
      "Chat & email support"
    ],
    limitations: [

    ],
    prices: {
      monthly: 127,
      yearly: 127,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Growth",
    description: "For mid to big companies",
    benefits: [
      "100 team members",
      "Unlimited surveys",
      "Unlimited recognitions",
      "Full survey analytics",
      "Slack Integration",
      "Chat & email support"
    ],
    limitations: [

    ],
    prices: {
      monthly: 387,
      yearly: 387,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  /*
    {
    title: "Business",
    description: "For Power Users",
    benefits: [
      "Unlimited posts",
      "Real-time analytics and reporting",
      "Access to all templates, including custom branding",
      "24/7 business customer support",
      "Personalized onboarding and account management.",
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
  */
];

export const plansColumns = [
  "starter",
  "growth",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Team Members",
    starter: "Up to 20",
    growth: "Up to 100",
    tooltip: "The Starter plan supports up to 20 members, while Growth supports 100."
  },
  {
    feature: "Surveys per Month",
    starter: "10 surveys",
    growth: "Unlimited surveys",
    tooltip: "The Starter plan allows 10 surveys per month. Growth offers unlimited surveys."
  },
  {
    feature: "Recognitions",
    starter: "Unlimited",
    growth: "Unlimited",
    tooltip: "Both plans provide unlimited recognitions to ensure your team feels valued."
  },
  {
    feature: "Full Survey Analytics",
    starter: true,
    growth: true,
    tooltip: "Access full survey analytics with both Starter and Growth plans."
  },
  {
    feature: "Slack Integration",
    starter: true,
    growth: true,
    tooltip: "Stay connected with your team via Slack integration in both plans."
  },
  {
    feature: "Support",
    starter: "Chat & Email",
    growth: "Chat & Email",
    tooltip: "Both plans include access to chat and email support for assistance."
  },
  {
    feature: "Priority Support",
    starter: false,
    growth: true,
    tooltip: "Priority support is not included in these plans."
  },
  // You can add more features as needed
];
