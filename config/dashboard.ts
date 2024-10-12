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
        href: "/dashboard/teams",
        icon: "users",
        title: "Teams",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "/dashboard/recognitions/",
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
        href: "",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "https://recognify.featurebase.app/roadmap",
        icon: "map",
        title: "Roadmap",
        authorizeOnly: UserRole.TEAM_LEADER,
      },
      {
        href: "https://recognify.featurebase.app/roadmap",
        icon: "map",
        title: "Roadmap",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
    ],
  },
];
