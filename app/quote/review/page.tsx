import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";
import QuoteReviewClient from "@/components/quote/QuoteReviewClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Review Your Quote Request",
  description:
    "Review your GR Pest Control quote request before submitting.",
};

export default async function QuoteReviewPage() {
  await connectDB();

  const settingsDoc =
    await SiteSettings.findOne({
      active: true,
    })
      .lean()
      .exec();

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#062B63]">
              Website settings not configured
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please configure the website
              settings from the admin panel.
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

    whatsapp:
      settingsDoc.whatsapp,

    address:
      settingsDoc.address,

    city:
      settingsDoc.city,

    state:
      settingsDoc.state,

    pincode:
      settingsDoc.pincode,

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
        settingsDoc.socialLinks
          ?.googleBusiness ?? "",
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

    active:
      settingsDoc.active,
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar settings={settings} />

      <QuoteReviewClient />

      <Footer settings={settings} />
    </main>
  );
}