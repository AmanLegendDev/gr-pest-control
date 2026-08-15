import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ContactBreadcrumb from "@/components/contact/ContactBreadcrumb";
import ContactHero from "@/components/contact/ContactHero";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactLocation from "@/components/contact/ContactLocation";
import ContactHours from "@/components/contact/ContactHours";
import ContactCTA from "@/components/contact/ContactCTA";

import { getSiteSettings } from "@/features/about/queries/getSiteSettings";

export const metadata: Metadata = {
  title:
    "Contact Us | GR Pest Control",

  description:
    "Get in touch with GR Pest Control for professional pest control services, enquiries, directions and service information.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title:
      "Contact Us | GR Pest Control",

    description:
      "Contact GR Pest Control by phone, WhatsApp or email, find our location and check business hours.",

    type: "website",
  },
};

export const dynamic =
  "force-dynamic";

export default async function ContactPage() {
  await connectDB();

  const settings =
    await getSiteSettings();

  if (!settings) {
    throw new Error(
      "Site settings are not configured.",
    );
  }

  /*
   * =========================
   * NAVBAR / FOOTER SETTINGS
   * =========================
   */

  const navbarFooterSettings = {
    id: settings.id,

    businessName:
      settings.businessName,

    shortDescription:
      settings.shortDescription,

    logo: settings.logo,

    email:
      settings.email,

    phone:
      settings.phone,

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

    socialLinks:
      settings.socialLinks,

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

    createdAt:
      settings.createdAt,

    updatedAt:
      settings.updatedAt,
  };

  /*
   * =========================
   * CONTACT PAGE
   * =========================
   */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar
        settings={
          navbarFooterSettings
        }
      />

      {/* =========================
          BREADCRUMB
      ========================== */}

      <ContactBreadcrumb />

      {/* =========================
          HERO
      ========================== */}

      <ContactHero
        businessName={
          settings.businessName
        }
        city={settings.city}
        phone={settings.phone}
        email={settings.email}
      />

      {/* =========================
          CONTACT METHODS
      ========================== */}

      <ContactMethods
        phone={settings.phone}
        email={settings.email}
        whatsapp={settings.whatsapp}
      />

      {/* =========================
          LOCATION
      ========================== */}

      <ContactLocation
        businessName={
          settings.businessName
        }
        address={settings.address}
        city={settings.city}
        state={settings.state}
        pincode={settings.pincode}
      />

      {/* =========================
          BUSINESS HOURS
      ========================== */}

      <ContactHours
        businessHours={
          settings.businessHours
        }
      />

      {/* =========================
          FINAL CTA
      ========================== */}

      <ContactCTA
        businessName={
          settings.businessName
        }
        primaryCTA={
          settings.primaryCTA
        }
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      {/* =========================
          FOOTER
      ========================== */}

      <Footer
        settings={
          navbarFooterSettings
        }
      />
    </main>
  );
}