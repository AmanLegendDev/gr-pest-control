import Link from "next/link";
import { getServerSession } from "next-auth";
import {
  ArrowRight,
  BookOpen,
  Camera,
  FileQuestion,
  Globe,
  MapPin,
  MessageSquareQuote,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";

const QUICK_ACTIONS = [
  {
    title: "Add Service",
    description: "Create a new pest-control service.",
    href: "/admin/services/new",
    icon: Wrench,
  },
  {
    title: "Add Service Area",
    description: "Add a location where you provide service.",
    href: "/admin/service-areas/new",
    icon: MapPin,
  },
  {
    title: "Add FAQ",
    description: "Create a frequently asked question.",
    href: "/admin/faqs/new",
    icon: FileQuestion,
  },
  {
    title: "Write Blog",
    description: "Create a new pest-control article.",
    href: "/admin/blogs/new",
    icon: BookOpen,
  },
  {
    title: "Upload Gallery",
    description: "Add a new image to the website gallery.",
    href: "/admin/gallery/new",
    icon: Camera,
  },
  {
    title: "Add Testimonial",
    description: "Add a genuine customer testimonial.",
    href: "/admin/testimonials/new",
    icon: MessageSquareQuote,
  },
];

const MANAGEMENT_LINKS = [
  {
    title: "Site Settings",
    description: "Business information, branding, SEO defaults and social links.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const firstName = session.user.name?.split(" ")[0] || "Admin";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold text-[#0878E8]">
              GR Pest Control
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
              Admin Dashboard
            </h1>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#062B63] text-sm font-bold text-white">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                {session.user.name || "Administrator"}
              </p>

              <p className="text-xs text-[#64748B]">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Welcome */}
        <section className="mb-10">
          <div className="flex items-start gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8] sm:flex">
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#64748B]">
                Welcome back, {firstName}.
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#0F172A] sm:text-2xl">
                Build your website content
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Add your services, service areas, FAQs, articles, gallery
                images and customer testimonials. Everything you create here
                will be stored in the CMS and used across the website.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Create */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0878E8]">
                Content Management
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#0F172A] sm:text-xl">
                Create new content
              </h2>
            </div>

            <Sparkles
              size={20}
              className="hidden text-[#39A935] sm:block"
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0878E8]/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0878E8] focus:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EEF6FF] text-[#0878E8] transition group-hover:bg-[#0878E8] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={18}
                      className="mt-1 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0878E8]"
                    />
                  </div>

                  <h3 className="mt-5 font-semibold text-[#0F172A]">
                    {action.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-5 text-[#64748B]">
                    {action.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#0878E8]">
                    Create
                    <Plus size={15} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Settings */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Configuration
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#0F172A] sm:text-xl">
              Website settings
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MANAGEMENT_LINKS.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0878E8]/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0878E8] focus:ring-offset-2"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#062B63]">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#0F172A]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#64748B]">
                      {item.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0878E8]"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Future CMS note */}
        <section className="mt-10 rounded-xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0878E8] shadow-sm">
              <Globe size={19} />
            </div>

            <div>
              <h3 className="font-semibold text-[#062B63]">
                CMS-driven website
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#64748B]">
                The public website will consume the content you create here.
                Keep production information accurate — especially services,
                locations, testimonials and business contact details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}