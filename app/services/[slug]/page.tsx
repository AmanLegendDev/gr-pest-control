import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceDetailBenefits from "@/components/services/ServiceDetailBenefits";
import ServiceDetailProcess from "@/components/services/ServiceDetailProcess";
import ServiceDetailFAQ from "@/components/services/ServiceDetailFAQ";
import ServiceDetailFinalCTA from "@/components/services/ServiceDetailFinalCTA";

import { getServiceBySlug } from "@/features/services/queries/getServiceBySlug";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  await connectDB();

  const service =
    await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description:
        "The requested pest control service could not be found.",
    };
  }

  const title =
    service.seoTitle ||
    `${service.title} | GR Pest Control`;

  const description =
    service.seoDescription ||
    service.shortDescription;

  return {
    title,
    description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",

      ...(service.heroImage?.url
        ? {
            images: [
              {
                url: service.heroImage.url,
                alt:
                  service.heroImage.alt ||
                  service.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(service.heroImage?.url
        ? {
            images: [
              service.heroImage.url,
            ],
          }
        : {}),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  await connectDB();

  const [service, settingsDoc] =
    await Promise.all([
      getServiceBySlug(slug),

      SiteSettings.findOne({
        active: true,
      })
        .lean()
        .exec(),
    ]);

  /*
   * Invalid slug OR inactive service.
   */
  if (!service) {
    notFound();
  }

  /*
   * Website settings are required by
   * the shared navigation/footer.
   */
  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white ">
        <section className="flex min-h-screen items-center justify-center px-6 ">
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

  /*
   * Keep the same settings shape used
   * throughout the public website.
   */
  const settings = {
    id: String(settingsDoc._id),

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

    email:
      settingsDoc.email,

    phone:
      settingsDoc.phone,

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
        settingsDoc.socialLinks
          ?.facebook ?? "",

      instagram:
        settingsDoc.socialLinks
          ?.instagram ?? "",

      youtube:
        settingsDoc.socialLinks
          ?.youtube ?? "",

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

    createdAt: new Date(
      settingsDoc.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      settingsDoc.updatedAt,
    ).toISOString(),
  };

  return (
    <>
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          NAVIGATION
      ========================== */}

      <Navbar settings={settings} />

      {/* =========================
          BREADCRUMB
      ========================== */}

      <ServiceBreadcrumb
        serviceTitle={service.title}
      />

      {/* =========================
          SERVICE HERO
      ========================== */}

      <ServiceDetailHero
        title={service.title}
        category={service.category}
        shortDescription={
          service.shortDescription
        }
        description={
          service.description
        }
        heroImage={
          service.heroImage
        }
        pestTypes={
          service.pestTypes
        }
      />

      {/* =========================
          PROBLEMS + BENEFITS
      ========================== */}

      <ServiceDetailBenefits
        pestTypes={
          service.pestTypes
        }
        benefits={
          service.benefits
        }
      />

      {/* =========================
          PROCESS
      ========================== */}

      <ServiceDetailProcess
        process={
          service.process
        }
      />

      {/* =========================
          FAQ
      ========================== */}

      <ServiceDetailFAQ
        faqs={
          service.faqs
        }
      />

      {/* =========================
          FINAL CTA
      ========================== */}

      <ServiceDetailFinalCTA
        serviceTitle={
          service.title
        }
      />

      {/* =========================
          FOOTER
      ========================== */}

      <Footer settings={settings} />
    </main>
    </>
  );
}