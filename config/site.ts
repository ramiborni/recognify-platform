import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Recognify",
  description:
    "Recognify helps remote teams feel appreciated with easy-to-use employee recognition and feedback. our platform makes it simple to celebrate achievements and stay connected. With integrations for Slack and Microsoft Teams, Recognify keeps everyone in the loop and boosts team spirit no matter where they work.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/recognify",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/company/recognify/",
  },
  mailSupport: "support@saas-starter.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "About Recognify",
    items: [
      { title: "Pricing", href: "/pricing" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "News",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Roadmap", href: "https://recognify.featurebase.app/roadmap" },
    ],
  },
  {
    title: "Support",
    items: [{ title: "Contact us", href: "mailto:rami@recognify.io" }],
  },
];
