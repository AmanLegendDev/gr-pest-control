import {
  LayoutDashboard,
  ClipboardList,
  BriefcaseBusiness,
  MapPinned,
  Images,
  MessageSquareQuote,
  CircleHelp,
  Newspaper,
  Settings,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type AdminNavigationSection = {
  label: string;
  items: AdminNavigationItem[];
};

export const ADMIN_NAVIGATION: AdminNavigationSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Quote Management",
    items: [
      {
        label: "Quote Requests",
        href: "/admin/quotes",
        icon: ClipboardList,
      },
    ],
  },

  {
    label: "Website Content",
    items: [
      {
        label: "Services",
        href: "/admin/services",
        icon: BriefcaseBusiness,
      },
      {
        label: "Service Areas",
        href: "/admin/service-areas",
        icon: MapPinned,
      },
      {
        label: "Gallery",
        href: "/admin/gallery",
        icon: Images,
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquareQuote,
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        icon: CircleHelp,
      },
      {
        label: "Blogs",
        href: "/admin/blogs",
        icon: Newspaper,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export const ADMIN_EXTERNAL_LINKS = [
  {
    label: "View Website",
    href: "/",
    icon: ExternalLink,
  },
] as const;