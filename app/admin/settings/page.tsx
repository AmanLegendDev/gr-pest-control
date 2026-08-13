import {
  Settings,
} from "lucide-react";
import {
  getServerSession,
} from "next-auth";
import {
  redirect,
} from "next/navigation";

import {
  authOptions,
} from "@/lib/auth/auth-options";

import {
  getSiteSettings,
} from "@/features/settings/queries/getSiteSettings";

import SettingsForm from "@/features/settings/components/admin/SettingsForm";

export const metadata = {
  title:
    "Website Settings | GR Pest Control Admin",

  description:
    "Manage website and business settings.",
};

export default async function SettingsPage() {
  const session =
    await getServerSession(
      authOptions,
    );

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  const settings =
    await getSiteSettings();

  const initialSettings =
    settings
      ? {
          businessName:
            settings.businessName,

          shortDescription:
            settings.shortDescription,

          logo: settings.logo,

          email: settings.email,

          phone: settings.phone,

          whatsapp:
            settings.whatsapp,

          address:
            settings.address,

          city:
            settings.city,

          state:
            settings.state,

          pincode:
            settings.pincode,

          socialLinks: {
            facebook:
              settings.socialLinks
                ?.facebook ?? "",

            instagram:
              settings.socialLinks
                ?.instagram ?? "",

            youtube:
              settings.socialLinks
                ?.youtube ?? "",

            googleBusiness:
              settings.socialLinks
                ?.googleBusiness ?? "",
          },

          primaryCTA:
            settings.primaryCTA,

          currency:
            settings.currency,

          businessHours:
            settings.businessHours,

          siteTitle:
            settings.siteTitle,

          siteDescription:
            settings.siteDescription,

          favicon:
            settings.favicon,

          active:
            settings.active,
        }
      : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
              <Settings
                size={21}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0878E8]">
                Administration
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                Website Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Manage your business identity, contact information,
                social links, working hours and website SEO from one place.
              </p>
            </div>
          </div>
        </div>

        <SettingsForm
          initialSettings={
            initialSettings
          }
        />
      </div>
    </main>
  );
}