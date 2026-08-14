import Hero from "@/components/home/Hero";
import Navigation from "@/components/shared/navigation/Navigation";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import TrustBar from "@/components/home/TrustBar";

import { getFeaturedServiceAreas } from "@/features/service-areas/queries/getServiceAreas";

import { getActiveGallery } from "@/features/gallery/queries/getGallery";

import ServicesPreview from "@/components/home/ServicesPreview";
import { getFeaturedServices } from "@/features/services/queries/getFeaturedServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SolutionsSection from "@/components/home/SolutionsSection";
import ProcessSection from "@/components/home/ProcessSection";
import ServiceAreasPreview from "@/components/home/ServiceAreasPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import { getActiveTestimonials } from "@/features/testimonials/queries/getTestimonials";
import TestimonialsPreview from "@/components/home/TestimonialsPreview"
import { getActiveFAQs } from "@/features/faq/queries/getFAQs";
import FAQPreview from "@/components/home/FAQPreview";

import { getPublishedBlogs } from "@/features/blogs/queries/getBlogs";
import BlogPreview from "@/components/home/BlogPreview";
import QuoteCTA from "@/components/home/QuoteCTA";
import Footer from "@/components/shared/footer/Footer";

export default async function HomePage() {
  await connectDB();

  const services = await getFeaturedServices(3);
  const serviceAreas = await getFeaturedServiceAreas(3);
  const gallery = await getActiveGallery(5);
  const testimonials = await getActiveTestimonials(3);
  const faqs = await getActiveFAQs(5);
  const blogs = await getPublishedBlogs(3);

  const settingsDoc = await SiteSettings.findOne({
    active: true,
  })
    .lean()
    .exec();

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />

        <section className="flex min-h-screen items-center justify-center px-6 pt-28">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#062B63]">
              Website settings not configured
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please configure the website settings from the admin panel.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const settings = {
    businessName: settingsDoc.businessName,
    shortDescription: settingsDoc.shortDescription,

    logo: settingsDoc.logo
      ? {
          url: settingsDoc.logo.url,
          publicId: settingsDoc.logo.publicId,
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
      facebook: settingsDoc.socialLinks?.facebook ?? "",
      instagram: settingsDoc.socialLinks?.instagram ?? "",
      youtube: settingsDoc.socialLinks?.youtube ?? "",
      googleBusiness:
        settingsDoc.socialLinks?.googleBusiness ?? "",
    },

    primaryCTA:
      settingsDoc.primaryCTA || "Get a Free Quote",

    currency: settingsDoc.currency || "AUD",

    businessHours:
      settingsDoc.businessHours?.map((hour) => ({
        day: hour.day,
        open: hour.open,
        close: hour.close,
        closed: hour.closed,
      })) ?? [],

    siteTitle: settingsDoc.siteTitle,
    siteDescription: settingsDoc.siteDescription,

    favicon: settingsDoc.favicon
      ? {
          url: settingsDoc.favicon.url,
          publicId: settingsDoc.favicon.publicId,
          alt: settingsDoc.favicon.alt,
        }
      : undefined,

    active: settingsDoc.active,

    // Required by SiteSettingsViewModel
    id: String(settingsDoc._id),

    createdAt: new Date(
      settingsDoc.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      settingsDoc.updatedAt,
    ).toISOString(),
  };

  return (
 <main className="min-h-screen bg-white">
    <Navigation />

    <Hero settings={settings} />

    <TrustBar settings={settings} />

    <ServicesPreview services={services} />

    <WhyChooseUs settings={settings} />

    <SolutionsSection services={services} />

    <ProcessSection />

    <ServiceAreasPreview
      serviceAreas={serviceAreas}
    />

    <GalleryPreview gallery={gallery} />

    <TestimonialsPreview
      testimonials={testimonials}
    />

    <FAQPreview faqs={faqs} />

    <BlogPreview blogs={blogs} />

    <QuoteCTA settings={settings} />

    <Footer settings={settings} />
  </main>
  );
}