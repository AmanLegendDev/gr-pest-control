import { Settings } from "lucide-react";

import SettingsForm from "@/features/settings/components/admin/SettingsForm";
import { getSiteSettings } from "@/features/settings/queries/getSiteSettings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  const initialSettings = settings
    ? {
        businessName: settings.businessName,
        shortDescription: settings.shortDescription,

        logo: settings.logo
          ? {
              url: settings.logo.url,
              publicId: settings.logo.publicId,
              alt: settings.logo.alt,
            }
          : undefined,

        email: settings.email,
        phone: settings.phone,
        whatsapp: settings.whatsapp,

        address: settings.address,
        city: settings.city,
        state: settings.state,
        pincode: settings.pincode,

        socialLinks: {
          facebook:
            settings.socialLinks?.facebook ?? "",
          instagram:
            settings.socialLinks?.instagram ?? "",
          youtube:
            settings.socialLinks?.youtube ?? "",
          googleBusiness:
            settings.socialLinks?.googleBusiness ?? "",
        },

        primaryCTA: settings.primaryCTA,
        currency: settings.currency,

        businessHours:
          settings.businessHours.map((hours) => ({
            day: hours.day,
            open: hours.open,
            close: hours.close,
            closed: hours.closed,
          })),

        siteTitle: settings.siteTitle,
        siteDescription: settings.siteDescription,

        favicon: settings.favicon
          ? {
              url: settings.favicon.url,
              publicId: settings.favicon.publicId,
              alt: settings.favicon.alt,
            }
          : undefined,

        active: settings.active,
      }
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================
            PAGE HEADER
        ========================== */}

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
              <Settings
                size={22}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0878E8]">
                Website Configuration
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                Website Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Manage your business information,
                contact details, social links, business
                hours, branding, SEO and website status
                from one place.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            SETTINGS FORM
        ========================== */}

        <SettingsForm
          initialSettings={initialSettings}
        />
      </div>
    </main>
  );
}