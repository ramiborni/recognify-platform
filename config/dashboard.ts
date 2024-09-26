import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      {
        href: "/dashboard/profile",
        icon: "user",
        title: "Profile",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/teams",
        icon: "users",
        title: "Teams",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/teams",
        icon: "users",
        title: "Teams",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "/dashboard/recognitions/list",
        icon: "award",
        title: "Recognitions",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/recognitions/",
        icon: "award",
        title: "Recognitions",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "/dashboard/surveys/",
        icon: "clipboard",
        title: "Surveys",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/surveys/",
        icon: "clipboard",
        title: "Surveys",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
