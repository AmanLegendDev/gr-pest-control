import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import QuoteForm from "@/components/quote/QuoteForm";
import QuoteIntro from "@/components/quote/QuoteIntro";
import QuoteTrustInfo from "@/components/quote/QuoteTrustInfo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Get a Free Quote",
  description:
    "Request a pest control quote from GR Pest Control.",
};

export default async function QuotePage() {
  await connectDB();

  const [services, settingsDoc] =
    await Promise.all([
      Service.find({
        active: true,
      })
        .select({
          _id: 1,
          title: 1,
          slug: 1,
        })
        .sort({
          sortOrder: 1,
          createdAt: -1,
        })
        .lean(),

      SiteSettings.findOne({
        active: true,
      })
        .lean()
        .exec(),
    ]);

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#062B63]">
              Website settings not configured
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please configure the website settings
              from the admin panel.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const settings = {
    businessName:
      settingsDoc.businessName,

    shortDescription:
      settingsDoc.shortDescription,

    logo: settingsDoc.logo
      ? {
          url: settingsDoc.logo.url,
          publicId:
            settingsDoc.logo.publicId,
          alt: settingsDoc.logo.alt,
        }
      : undefined,

    email: settingsDoc.email,

    phone: settingsDoc.phone,

    whatsapp: settingsDoc.whatsapp,

    address: settingsDoc.address,

    city: settingsDoc.city,

    state: settingsDoc.state,

    pincode: settingsDoc.pincode,

    socialLinks: {
      facebook:
        settingsDoc.socialLinks?.facebook ??
        "",

      instagram:
        settingsDoc.socialLinks?.instagram ??
        "",

      youtube:
        settingsDoc.socialLinks?.youtube ??
        "",

      googleBusiness:
        settingsDoc.socialLinks?.googleBusiness ??
        "",
    },

    primaryCTA:
      settingsDoc.primaryCTA ||
      "Get a Free Quote",

    currency:
      settingsDoc.currency || "INR",

    businessHours:
      settingsDoc.businessHours?.map(
        (hour) => ({
          day: hour.day,
          open: hour.open,
          close: hour.close,
          closed: hour.closed,
        }),
      ) ?? [],

    siteTitle:
      settingsDoc.siteTitle,

    siteDescription:
      settingsDoc.siteDescription,

    favicon: settingsDoc.favicon
      ? {
          url: settingsDoc.favicon.url,
          publicId:
            settingsDoc.favicon.publicId,
          alt: settingsDoc.favicon.alt,
        }
      : undefined,

    active: settingsDoc.active,
  };

  const serviceOptions =
    services.map((service) => ({
      id: String(service._id),
      title: service.title,
      slug: service.slug,
    }));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVIGATION
      ========================== */}

      <Navbar settings={settings} />

      {/* =========================
          QUOTE CONTENT
      ========================== */}

      <section className="px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <QuoteIntro />

          <QuoteForm
            services={serviceOptions}
          />

          <QuoteTrustInfo
            businessName={
              settings.businessName
            }
          />
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}

      <Footer settings={settings} />
    </main>
  );
}