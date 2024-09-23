import { InfoLdg, IntegrationLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Why is Recognify the best for your team?",
    description:
      "Remote work can feel isolating, but Recognify ensures your team feels valued and connected.",
    image: "/_static/illustrations/work-party.svg",
    list: [
      {
        title: "Keeps Everyone Engaged",
        description:
          "Simple, meaningful recognition boosts motivation and morale.",
        icon: "boost",
      },
      {
        title: "Builds Stronger Teams",
        description:
          "Seamlessly strengthens bonds, no matter where your team is.",
        icon: "arms",
      },
      {
        title: "Grows with You",
        description: "Scales effortlessly as your business expands.",
        icon: "rocket",
      },
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate our open-source SaaS seamlessly into your existing workflows. Effortlessly connect with your favorite tools and services for a streamlined experience.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Flexible",
        description:
          "Customize your integrations to fit your unique requirements.",
        icon: "laptop",
      },
      {
        title: "Efficient",
        description: "Streamline your processes and reducing manual effort.",
        icon: "search",
      },
      {
        title: "Reliable",
        description:
          "Rely on our robust infrastructure and comprehensive documentation.",
        icon: "settings",
      },
    ],
  },
];

export const integrations: IntegrationLdg[] = [
  {
    title: "Slack",
    description: "Use Slack to send recognition messages to your team.",
    link: "/",
    icon: "slack",
  },
  {
    title: "Microsoft Teams",
    soon: true,
    description:
      "Coming soon! Use Microsoft Teams to send recognition messages to your team.",
    link: "/",
    icon: "microsoftTeams",
  },
  {
    title: "Google Workspace",
    soon: true,
    description:
      "Coming soon! Use Google Workspace to send recognition messages to your team.",
    link: "/",
    icon: "googleWorkspace",
  },
  {
    title: "Trello",
    soon: true,
    description:
      "Coming soon! Use Trello to send recognition messages to your team when a user completes a task.",
    link: "/",
    icon: "trello",
  },
  {
    title: "Jira",
    soon: true,
    description:
      "Coming soon! Use Jira to send recognition messages to your team.",
    link: "/",
    icon: "jira",
  },
  {
    title: "Asana",
    soon: true,
    description:
      "Coming soon! Use Asana to send recognition messages to your team.",
    link: "/",
    icon: "asana",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "John Doe",
    job: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "The next-saas-stripe-starter repo has truly revolutionized my development workflow. With its comprehensive features and seamless integration with Stripe, I've been able to build and deploy projects faster than ever before. The documentation is clear and concise, making it easy to navigate through the setup process. I highly recommend next-saas-stripe-starter to any developer.",
  },
  {
    name: "Alice Smith",
    job: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I've been able to create modern and attractive user interfaces in record time. The starter kit provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.",
  },
  {
    name: "David Johnson",
    job: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I was able to streamline the entire process and get payments up and running in no time. ",
  },
  {
    name: "Michael Wilson",
    job: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review:
      "I'm impressed by the quality of code and clear documentation of next-saas-stripe-starter. Kudos to the team!",
  },
  {
    name: "Sophia Garcia",
    job: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "next-saas-stripe-starter provided me with the tools I needed to efficiently manage user data. Thank you so much!",
  },
  {
    name: "Emily Brown",
    job: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "next-saas-stripe-starter has been an invaluable asset in my role as a marketing manager. With its seamless integration with Stripe, I've been able to launch targeted marketing campaigns with built-in payment functionality, allowing us to monetize our products and services more effectively.",
  },
  {
    name: "Jason Stan",
    job: "Web Designer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I've been able to create modern and attractive user interfaces in record time. The starter kit provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.",
  },
];
