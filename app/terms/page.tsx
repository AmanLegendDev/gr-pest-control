import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

import {
  createStaticPageMetadata,
} from "@/lib/seo/metadata";

import {
  createJsonLdGraph,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo/schemas";

import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata =
  createStaticPageMetadata({
    title:
      "Terms & Conditions | GR Pest Control",

    description:
      "Read the Terms & Conditions that apply when using the GR Pest Control website and requesting our pest control services.",

    path: "/terms",

    image:
      "/og-image.jpg",

    imageAlt:
      "GR Pest Control — Terms & Conditions",
  });

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function TermsPage() {
  await connectDB();

  const settingsDoc = await SiteSettings.findOne({
    active: true,
  })
    .lean()
    .exec();

  if (!settingsDoc) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
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
    id: String(settingsDoc._id),

    businessName: settingsDoc.businessName,

    shortDescription:
      settingsDoc.shortDescription,

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
      facebook:
        settingsDoc.socialLinks?.facebook ?? "",

      instagram:
        settingsDoc.socialLinks?.instagram ?? "",

      youtube:
        settingsDoc.socialLinks?.youtube ?? "",

      googleBusiness:
        settingsDoc.socialLinks?.googleBusiness ?? "",
    },

    primaryCTA:
      settingsDoc.primaryCTA ||
      "Get a Free Quote",

    currency:
      settingsDoc.currency || "AUD",

    businessHours:
      settingsDoc.businessHours?.map(
        (hour) => ({
          day: hour.day,
          open: hour.open,
          close: hour.close,
          closed: hour.closed,
        }),
      ) ?? [],

    siteTitle: settingsDoc.siteTitle,
    siteDescription:
      settingsDoc.siteDescription,

    favicon: settingsDoc.favicon
      ? {
          url: settingsDoc.favicon.url,
          publicId: settingsDoc.favicon.publicId,
          alt: settingsDoc.favicon.alt,
        }
      : undefined,

    active: settingsDoc.active,

    createdAt: new Date(
      settingsDoc.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      settingsDoc.updatedAt,
    ).toISOString(),
  };

  const lastUpdated = formatDate(
    new Date(settingsDoc.updatedAt),
  );


  const breadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },

    {
      name: "Terms & Conditions",
      url: "/terms",
    },
  ]);

const webPageSchema =
  createWebPageSchema({
    name:
      "Terms & Conditions | GR Pest Control",

    description:
      "Read the Terms & Conditions that apply when using the GR Pest Control website and requesting our pest control services.",

    url: "/terms",
  });

const jsonLd =
  createJsonLdGraph([
    breadcrumbSchema,
    webPageSchema,
  ]);

return (
  <>
    <JsonLd data={jsonLd} />

    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar settings={settings} />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            -top-40
            h-96
            w-96
            rounded-full
            bg-blue-50
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-48
            -left-40
            h-96
            w-96
            rounded-full
            bg-slate-100
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-1.5 text-xs font-semibold text-slate-400"
          >
            <Link
              href="/"
              className="transition hover:text-[#0878E8]"
            >
              Home
            </Link>

            <ChevronRight
              size={13}
              aria-hidden="true"
            />

            <span className="text-[#062B63]">
              Terms & Conditions
            </span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50/70
                px-3.5
                py-2
              "
            >
              <FileCheck2
                size={14}
                className="text-[#0878E8]"
                aria-hidden="true"
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-[#0878E8]
                "
              >
                Website Terms
              </span>
            </div>

            <h1
              className="
                mt-6
                text-4xl
                font-extrabold
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-5xl
                sm:leading-[1.05]
                lg:text-6xl
              "
            >
              Clear terms.
              <span className="text-[#0878E8]">
                {" "}Straightforward service.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-8
                text-slate-500
                sm:text-lg
              "
            >
              These Terms & Conditions explain the
              rules for using the GR Pest Control website,
              requesting information and interacting with
              our pest control services.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                  shadow-sm
                "
              >
                <ShieldCheck
                  size={14}
                  className="text-[#0878E8]"
                />

                Terms & Conditions
              </div>

              <span className="text-xs text-slate-400">
                Last updated {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="bg-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <article className="min-w-0">
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-[0_18px_55px_rgba(15,23,42,0.05)]
              "
            >
              {/* Intro */}

              <div className="border-b border-slate-100 bg-gradient-to-br from-white to-blue-50/30 px-6 py-7 sm:px-9 sm:py-9">
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  These Terms & Conditions apply to your
                  use of the GR Pest Control website and
                  your interactions with our business
                  through the website.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  By using this website, you agree to use it
                  lawfully, responsibly and in a way that
                  does not interfere with the website,
                  business operations or the rights of other
                  users.
                </p>
              </div>

              <div className="px-6 py-8 sm:px-9 sm:py-10">
                {/* 01 */}

                <TermsSection
                  number="01"
                  title="About These Terms"
                >
                  <p>
                    These Terms & Conditions set out the
                    general terms that apply to your use of
                    the GR Pest Control website.
                  </p>

                  <p>
                    They are intended to explain how the
                    website may be used and how enquiries,
                    quotes and service-related interactions
                    are handled.
                  </p>

                  <p>
                    Separate terms may apply to a specific
                    service, quotation, booking, invoice or
                    other agreement where expressly provided
                    to you.
                  </p>
                </TermsSection>

                {/* 02 */}

                <TermsSection
                  number="02"
                  title="Using Our Website"
                >
                  <p>
                    You agree to use this website only for
                    lawful purposes and in a manner that does
                    not damage, disable, overburden or
                    interfere with the website or its
                    availability.
                  </p>

                  <p>
                    You must not knowingly:
                  </p>

                  <ul>
                    <li>
                      Attempt to gain unauthorised access
                      to website systems or accounts.
                    </li>

                    <li>
                      Introduce malicious code, harmful
                      files or other disruptive material.
                    </li>

                    <li>
                      Use automated methods to abuse,
                      overload or scrape the website
                      without permission.
                    </li>

                    <li>
                      Submit information that is knowingly
                      false, misleading or fraudulent.
                    </li>

                    <li>
                      Use the website for unlawful or
                      harmful purposes.
                    </li>
                  </ul>
                </TermsSection>

                {/* 03 */}

                <TermsSection
                  number="03"
                  title="Information You Provide"
                >
                  <p>
                    When submitting an enquiry, quote
                    request or other information through our
                    website, you should provide information
                    that is accurate and current to the best
                    of your knowledge.
                  </p>

                  <p>
                    You are responsible for checking the
                    information you provide before submitting
                    it, particularly contact details,
                    property information and service
                    requirements.
                  </p>

                  <p>
                    Providing incorrect or incomplete
                    information may affect our ability to
                    respond accurately or arrange an
                    appropriate service.
                  </p>
                </TermsSection>

                {/* 04 */}

                <TermsSection
                  number="04"
                  title="Quotes & Enquiries"
                >
                  <p>
                    A quote request submitted through the
                    website is an enquiry and does not
                    automatically create a confirmed service
                    booking or binding agreement.
                  </p>

                  <p>
                    Information provided through a quote
                    request helps us understand your
                    circumstances and determine the
                    appropriate next step.
                  </p>

                  <p>
                    Any pricing, availability, treatment
                    recommendations or service details
                    provided to you may be subject to
                    confirmation based on the property,
                    pest issue, access requirements and
                    other relevant circumstances.
                  </p>
                </TermsSection>

                {/* 05 */}

                <TermsSection
                  number="05"
                  title="Service Appointments"
                >
                  <p>
                    Where a service appointment is arranged,
                    you should provide reasonable access to
                    the relevant areas of the property and
                    provide accurate information about the
                    pest problem and property conditions.
                  </p>

                  <p>
                    Appointment times may be affected by
                    availability, travel requirements,
                    weather, property access, operational
                    circumstances or other factors outside
                    our reasonable control.
                  </p>

                  <p>
                    If you need to change or cancel an
                    appointment, please contact us as early
                    as reasonably possible.
                  </p>
                </TermsSection>

                {/* 06 */}

                <TermsSection
                  number="06"
                  title="Treatment Recommendations"
                >
                  <p>
                    Pest control treatment recommendations
                    depend on the pest involved, the
                    property, the level of activity,
                    environmental conditions and other
                    relevant circumstances.
                  </p>

                  <p>
                    Information on this website is general
                    information only and should not be
                    treated as a guarantee that a particular
                    treatment will produce a specific result
                    in every situation.
                  </p>

                  <p>
                    Pest activity can be affected by factors
                    outside our control, including structural
                    conditions, neighbouring properties,
                    ongoing moisture, food sources and
                    re-infestation.
                  </p>
                </TermsSection>

                {/* 07 */}

                <TermsSection
                  number="07"
                  title="Customer Preparation & Access"
                >
                  <p>
                    Some pest control services may require
                    preparation before treatment.
                  </p>

                  <p>
                    Where preparation instructions are
                    provided, customers should follow them
                    carefully and inform us of relevant
                    circumstances, including children,
                    pets, occupants, access restrictions or
                    other conditions that may affect the
                    service.
                  </p>

                  <p>
                    If reasonable access cannot be provided,
                    the service may need to be delayed,
                    adjusted or rescheduled.
                  </p>
                </TermsSection>

                {/* 08 */}

                <TermsSection
                  number="08"
                  title="Payments & Pricing"
                >
                  <p>
                    Where payment is required for a service,
                    the applicable price and payment
                    requirements will be communicated to you
                    before or as part of the relevant
                    service arrangement.
                  </p>

                  <p>
                    Website content, general pricing
                    information or promotional material may
                    be updated from time to time and should
                    not be treated as a confirmed quote
                    unless expressly provided as such.
                  </p>

                  <p>
                    Any applicable taxes, charges or fees
                    will be handled in accordance with the
                    relevant service arrangement and
                    applicable law.
                  </p>
                </TermsSection>

                {/* 09 */}

                <TermsSection
                  number="09"
                  title="Cancellations & Rescheduling"
                >
                  <p>
                    If you need to cancel or reschedule a
                    service, please contact GR Pest Control
                    as soon as reasonably possible.
                  </p>

                  <p>
                    Any cancellation, rescheduling or
                    refund conditions specifically agreed
                    for your service will apply.
                  </p>

                  <p>
                    Nothing in these Terms is intended to
                    exclude or limit any rights or remedies
                    that cannot lawfully be excluded or
                    limited under applicable Australian law.
                  </p>
                </TermsSection>

                {/* 10 */}

                <TermsSection
                  number="10"
                  title="Consumer Rights"
                >
                  <p>
                    Our services are provided subject to
                    applicable Australian consumer protection
                    laws.
                  </p>

                  <p>
                    Nothing in these Terms is intended to
                    exclude, restrict or modify any consumer
                    guarantee, right or remedy that cannot
                    legally be excluded, restricted or
                    modified.
                  </p>

                  <p>
                    Where a consumer guarantee or other
                    mandatory legal right applies, those
                    rights continue to apply regardless of
                    anything inconsistent in these Terms.
                  </p>
                </TermsSection>

                {/* 11 */}

                <TermsSection
                  number="11"
                  title="Website Content"
                >
                  <p>
                    We aim to keep the information on this
                    website useful and reasonably accurate.
                    However, website content may change over
                    time and may contain general information
                    rather than information tailored to your
                    particular property or situation.
                  </p>

                  <p>
                    We do not guarantee that every item of
                    website content will always be complete,
                    current, error-free or available without
                    interruption.
                  </p>

                  <p>
                    If you need advice about a specific pest
                    problem, property or treatment, contact
                    our team directly.
                  </p>
                </TermsSection>

                {/* 12 */}

                <TermsSection
                  number="12"
                  title="Intellectual Property"
                >
                  <p>
                    Unless otherwise stated, the content on
                    this website, including text, branding,
                    graphics, logos, images, layouts and
                    other original material, is owned by or
                    licensed to GR Pest Control.
                  </p>

                  <p>
                    You may view and use the website for
                    personal or legitimate business
                    purposes, but you must not reproduce,
                    modify, distribute, publish, sell or
                    commercially exploit website content
                    without appropriate permission.
                  </p>
                </TermsSection>

                {/* 13 */}

                <TermsSection
                  number="13"
                  title="Third-Party Links & Services"
                >
                  <p>
                    Our website may contain links to
                    third-party websites, platforms or
                    services.
                  </p>

                  <p>
                    These links may be provided for
                    convenience or additional information.
                    We do not control third-party websites
                    and are not responsible for their
                    content, availability, security or
                    privacy practices.
                  </p>

                  <p>
                    Your use of a third-party website is
                    subject to that provider's own terms and
                    policies.
                  </p>
                </TermsSection>

                {/* 14 */}

                <TermsSection
                  number="14"
                  title="Website Availability & Security"
                >
                  <p>
                    We may update, suspend, restrict or
                    discontinue parts of the website from
                    time to time for maintenance, security,
                    operational or other legitimate reasons.
                  </p>

                  <p>
                    We do not guarantee that the website will
                    always be available, uninterrupted or
                    completely free from technical issues.
                  </p>

                  <p>
                    You are responsible for maintaining
                    appropriate security on the device and
                    internet connection you use to access the
                    website.
                  </p>
                </TermsSection>

                {/* 15 */}

                <TermsSection
                  number="15"
                  title="Limitation of Liability"
                >
                  <p>
                    To the maximum extent permitted by law,
                    GR Pest Control is not responsible for
                    losses arising solely from your misuse of
                    the website, reliance on general website
                    information without seeking appropriate
                    advice, or circumstances outside our
                    reasonable control.
                  </p>

                  <p>
                    Nothing in these Terms excludes,
                    restricts or modifies liability where
                    doing so would be unlawful or would
                    remove a right that cannot legally be
                    excluded.
                  </p>

                  <p>
                    Where Australian consumer law or another
                    mandatory law applies, our obligations
                    under that law remain unaffected.
                  </p>
                </TermsSection>

                {/* 16 */}

                <TermsSection
                  number="16"
                  title="Events Outside Our Reasonable Control"
                >
                  <p>
                    Circumstances outside our reasonable
                    control may affect website availability
                    or service scheduling.
                  </p>

                  <p>
                    These circumstances may include severe
                    weather, natural events, transport
                    disruptions, utility failures,
                    telecommunications outages, supplier
                    issues, government action, emergencies
                    or other events that could not reasonably
                    be prevented or anticipated.
                  </p>

                  <p>
                    Where such circumstances affect a
                    scheduled service, we will aim to
                    communicate with affected customers and
                    arrange a reasonable next step.
                  </p>
                </TermsSection>

                {/* 17 */}

                <TermsSection
                  number="17"
                  title="Privacy"
                >
                  <p>
                    Personal information submitted through
                    this website is handled in accordance
                    with our Privacy Policy.
                  </p>

                  <p>
                    You can read the full policy here:
                  </p>

                  <Link
                    href="/privacy"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      font-bold
                      text-[#0878E8]
                      hover:underline
                    "
                  >
                    View our Privacy Policy
                    <ArrowRight size={15} />
                  </Link>
                </TermsSection>

                {/* 18 */}

                <TermsSection
                  number="18"
                  title="Changes to These Terms"
                >
                  <p>
                    We may update these Terms & Conditions
                    when our website, services, business
                    practices or legal requirements change.
                  </p>

                  <p>
                    The updated version will be published on
                    this page with the relevant updated date.
                  </p>

                  <p>
                    Your continued use of the website after
                    an update may be subject to the updated
                    Terms, to the extent permitted by law.
                  </p>
                </TermsSection>

                {/* 19 */}

                <TermsSection
                  number="19"
                  title="Applicable Law"
                >
                  <p>
                    These Terms are intended to operate in
                    accordance with the laws applicable to
                    the services and the jurisdiction in
                    which GR Pest Control operates.
                  </p>

                  <p>
                    Where a specific agreement or applicable
                    law requires a particular jurisdiction,
                    that requirement will apply.
                  </p>
                </TermsSection>

                {/* 20 */}

                <TermsSection
                  number="20"
                  title="Contact Us"
                >
                  <p>
                    If you have questions about these Terms,
                    a quote, an appointment or our services,
                    please contact GR Pest Control.
                  </p>

                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-white
                          text-[#0878E8]
                          shadow-sm
                        "
                      >
                        <Mail
                          size={19}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-[10px]
                            font-extrabold
                            uppercase
                            tracking-[0.14em]
                            text-[#0878E8]
                          "
                        >
                          Contact GR Pest Control
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#062B63]">
                          Need clarification?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Contact us if you have a question
                          about these Terms or a service
                          arrangement.
                        </p>

                        <div className="mt-5 flex flex-col gap-2 text-sm">
                          {settings.email && (
                            <a
                              href={`mailto:${settings.email}`}
                              className="font-semibold text-[#0878E8] hover:underline"
                            >
                              {settings.email}
                            </a>
                          )}

                          {settings.phone && (
                            <a
                              href={`tel:${settings.phone}`}
                              className="font-semibold text-[#062B63] hover:underline"
                            >
                              {settings.phone}
                            </a>
                          )}

                          {settings.address && (
                            <span className="text-slate-500">
                              {settings.address}
                              {settings.city
                                ? `, ${settings.city}`
                                : ""}
                              {settings.state
                                ? `, ${settings.state}`
                                : ""}
                              {settings.pincode
                                ? ` ${settings.pincode}`
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TermsSection>

                <p className="mt-8 text-xs leading-6 text-slate-400">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
          </article>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
                On this page
              </p>

              <nav className="mt-4 space-y-1">
                {[
                  ["01", "About These Terms"],
                  ["02", "Using Our Website"],
                  ["03", "Information You Provide"],
                  ["04", "Quotes & Enquiries"],
                  ["05", "Appointments"],
                  ["06", "Treatment Recommendations"],
                  ["07", "Customer Preparation"],
                  ["08", "Payments & Pricing"],
                  ["09", "Cancellations"],
                  ["10", "Consumer Rights"],
                  ["11", "Website Content"],
                  ["12", "Intellectual Property"],
                  ["13", "Third-Party Services"],
                  ["14", "Website Security"],
                  ["15", "Liability"],
                  ["16", "Events Outside Control"],
                  ["17", "Privacy"],
                  ["18", "Changes"],
                  ["19", "Applicable Law"],
                  ["20", "Contact"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="flex items-center gap-3 rounded-xl px-3 py-2"
                  >
                    <span className="text-[10px] font-extrabold text-slate-300">
                      {number}
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      {label}
                    </span>
                  </div>
                ))}
              </nav>
            </div>

            {/* CTA */}

            <div className="mt-5 rounded-3xl bg-[#062B63] p-6 text-white shadow-[0_18px_45px_rgba(6,43,99,0.16)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                Need pest control?
              </p>

              <h2 className="mt-3 text-xl font-extrabold tracking-tight">
                Ready to deal with the problem?
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100/75">
                Tell us what is happening at your
                property and request a free quote.
              </p>

              <Link
                href="/quote"
                className="
                  group
                  mt-5
                  inline-flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  transition
                  hover:bg-blue-50
                "
              >
                Get a Free Quote

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Privacy link */}

            <Link
              href="/privacy"
              className="
                mt-4
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                text-sm
                font-bold
                text-[#062B63]
                shadow-sm
                transition
                hover:border-blue-100
                hover:text-[#0878E8]
              "
            >
              <span>Privacy Policy</span>

              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
    </>
  );
}

/* =========================================================
   SECTION COMPONENT
========================================================= */

interface TermsSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function TermsSection({
  number,
  title,
  children,
}: TermsSectionProps) {
  return (
    <section className="border-b border-slate-100 py-9 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-4">
        <span
          className="
            mt-1
            hidden
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[10px]
            font-extrabold
            text-[#0878E8]
            sm:flex
          "
        >
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h2
            className="
              text-2xl
              font-extrabold
              tracking-[-0.025em]
              text-[#062B63]
              sm:text-[1.7rem]
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-5
              space-y-4
              text-[15px]
              leading-7
              text-slate-600
              sm:text-base
              sm:leading-8

              [&_ul]:my-5
              [&_ul]:space-y-2.5
              [&_ul]:pl-5
              [&_li]:pl-1
              [&_li]:marker:text-[#0878E8]
              [&_strong]:font-bold
              [&_strong]:text-slate-800
            "
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}