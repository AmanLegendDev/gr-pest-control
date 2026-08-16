import Link from "next/link";
import { getServerSession } from "next-auth";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  Camera,
  CheckCircle2,
  FileQuestion,
  Globe2,
  LayoutDashboard,
  MapPin,
  MessageSquareQuote,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
  XCircle,
  Clock3,
} from "lucide-react";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import { getDashboardStats } from "@/features/admin-dashboard/queries/getDashboardStats";

export const dynamic = "force-dynamic";

const BOOKING_CARDS = [
  {
    key: "pending",
    title: "Pending Requests",
    description: "New quote requests waiting for your call.",
    href: "/admin/quote-requests?status=pending",
    icon: Clock3,
    tone: "blue",
  },
  {
    key: "inProgress",
    title: "In Progress",
    description: "Requests currently being handled.",
    href: "/admin/quote-requests?status=in-progress",
    icon: CalendarCheck2,
    tone: "amber",
  },
  {
    key: "completed",
    title: "Completed",
    description: "Requests successfully completed.",
    href: "/admin/quote-requests?status=completed",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    description: "Requests that were cancelled.",
    href: "/admin/quote-requests?status=cancelled",
    icon: XCircle,
    tone: "red",
  },
  {
    key: "total",
    title: "Total Requests",
    description: "All quote requests received.",
    href: "/admin/quote-requests?status=all",
    icon: LayoutDashboard,
    tone: "navy",
  },
] as const;

const MANAGEMENT_CARDS = [
  {
    key: "services",
    title: "Services",
    description:
      "Manage pest-control services and pricing content.",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    key: "serviceAreas",
    title: "Service Areas",
    description:
      "Manage suburbs and locations you serve.",
    href: "/admin/service-areas",
    icon: MapPin,
  },
  {
    key: "blogs",
    title: "Blog",
    description:
      "Create and manage pest-control articles.",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    key: "gallery",
    title: "Gallery",
    description:
      "Manage website photos and project images.",
    href: "/admin/gallery",
    icon: Camera,
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description:
      "Manage customer reviews and testimonials.",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    key: "faqs",
    title: "FAQs",
    description:
      "Manage frequently asked questions.",
    href: "/admin/faqs",
    icon: FileQuestion,
  },
  {
    title: "Site Settings",
    description:
      "Business details, branding, SEO and contact information.",
    href: "/admin/settings",
    icon: Settings,
  },
] as const;

function getCount(
  stats: Awaited<ReturnType<typeof getDashboardStats>>,
  key: (typeof BOOKING_CARDS)[number]["key"],
) {
  return stats[key];
}

function getToneClasses(
  tone: (typeof BOOKING_CARDS)[number]["tone"],
) {
  switch (tone) {
    case "blue":
      return {
        icon: "bg-blue-50 text-[#0878E8]",
        number: "text-[#0878E8]",
        hover: "hover:border-blue-200 hover:shadow-blue-100/50",
      };

    case "amber":
      return {
        icon: "bg-amber-50 text-amber-600",
        number: "text-amber-600",
        hover: "hover:border-amber-200 hover:shadow-amber-100/50",
      };

    case "green":
      return {
        icon: "bg-emerald-50 text-emerald-600",
        number: "text-emerald-600",
        hover: "hover:border-emerald-200 hover:shadow-emerald-100/50",
      };

    case "red":
      return {
        icon: "bg-red-50 text-red-500",
        number: "text-red-500",
        hover: "hover:border-red-200 hover:shadow-red-100/50",
      };

    default:
      return {
        icon: "bg-[#062B63] text-white",
        number: "text-[#062B63]",
        hover: "hover:border-slate-300 hover:shadow-slate-200/60",
      };
  }
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  await connectDB();

  const stats = await getDashboardStats();

  const firstName =
    session.user.name?.split(" ")[0] ||
    "Admin";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
                <ShieldCheck size={23} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0878E8]">
                    GR Pest Control
                  </p>

                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                  <p className="hidden text-xs font-medium text-slate-400 sm:block">
                    Admin
                  </p>
                </div>

                <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
                  Good to see you, {firstName}.
                </h1>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                  Manage your quote requests and website
                  content from one place.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-[#0F172A]">
                  {session.user.name ||
                    "Administrator"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {session.user.email}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#062B63] text-sm font-extrabold text-white shadow-sm">
                {firstName
                  .charAt(0)
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* ===================================================
            BOOKING OVERVIEW
        ==================================================== */}

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#0878E8]">
                Booking overview
              </p>

              <h2 className="mt-1 text-xl font-extrabold tracking-[-0.025em] text-[#0F172A]">
                Quote requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of every request from first
                contact to completion.
              </p>
            </div>

            <Link
              href="/admin/quote-requests"
              className="hidden items-center gap-1.5 text-sm font-bold text-[#0878E8] transition hover:text-[#066BCF] sm:flex"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BOOKING_CARDS.map((card) => {
              const Icon = card.icon;
              const tone =
                getToneClasses(card.tone);

              return (
                <Link
                  key={card.key}
                  href={card.href}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${tone.hover}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.icon}`}
                    >
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="mt-1 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0878E8]"
                    />
                  </div>

                  <div className="mt-6">
                    <p
                      className={`text-3xl font-extrabold tracking-[-0.04em] ${tone.number}`}
                    >
                      {getCount(stats, card.key)}
                    </p>

                    <h3 className="mt-1.5 text-sm font-extrabold text-[#0F172A]">
                      {card.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/admin/quote-requests"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#062B63] shadow-sm transition hover:border-blue-200 hover:text-[#0878E8] sm:hidden"
          >
            View all quote requests
            <ArrowRight size={15} />
          </Link>
        </section>

        {/* ===================================================
            QUICK MANAGEMENT
        ==================================================== */}

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
              Website management
            </p>

            <div className="mt-1 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold tracking-[-0.025em] text-[#0F172A]">
                  Manage your website
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the content that appears across
                  the public website.
                </p>
              </div>

              <Sparkles
                size={20}
                className="hidden text-[#0878E8] sm:block"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MANAGEMENT_CARDS.map((card) => {
              const Icon = card.icon;

              return (
  <Link
    key={card.href}
    href={card.href}
    className="group flex min-h-[155px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/30"
  >
    {/* Icon + Count */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#0878E8] transition-colors duration-200 group-hover:bg-[#0878E8] group-hover:text-white">
        <Icon size={20} />
      </div>

      {/* Real DB Count */}
      {"key" in card && (
        <div className="text-right">
          <p className="text-2xl font-extrabold tracking-[-0.04em] text-[#062B63]">
            {stats[card.key]}
          </p>

          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Items
          </p>
        </div>
      )}

      <ArrowRight
        size={17}
        className="mt-1 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0878E8]"
      />
    </div>

    {/* Content */}
    <div className="mt-auto pt-5">
      <h3 className="text-sm font-extrabold text-[#0F172A]">
        {card.title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {card.description}
      </p>
    </div>
  </Link>
);
            })}
          </div>
        </section>

        {/* ===================================================
            ADMIN TIP
        ==================================================== */}

        <section className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60">
            <div className="flex gap-4 p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0878E8] shadow-sm">
                <Globe2 size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#062B63]">
                  Keep your website information
                  up to date
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:max-w-3xl sm:text-sm sm:leading-6">
                  Services, service areas, testimonials,
                  FAQs and contact information are shown
                  directly on the public website. Make sure
                  production information stays accurate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FOOTER NOTE
        ==================================================== */}

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>
            GR Pest Control Admin Panel
          </p>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Dashboard connected
          </div>
        </div>
      </div>
    </main>
  );
}