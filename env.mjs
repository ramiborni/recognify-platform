import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    AZURE_BLOB_CONNECTION_STRING: z.string().min(1),
    SLACK_CLIENT_ID: z.string().min(1),
    SLACK_CLIENT_SECRET: z.string().min(1),
    SLACK_REDIRECT_URI: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_LTD_STARTER_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_LTD_GROWTH_PLAN_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM, // Updated to match .env
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Stripe
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_LTD_STARTER_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_LTD_STARTER_PLAN_ID,
    NEXT_PUBLIC_STRIPE_LTD_GROWTH_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_LTD_GROWTH_PLAN_ID,

    // Azure
    AZURE_BLOB_CONNECTION_STRING: process.env.AZURE_BLOB_CONNECTION_STRING,

    // Slack
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    SLACK_REDIRECT_URI: process.env.SLACK_REDIRECT_URI
  },
});
