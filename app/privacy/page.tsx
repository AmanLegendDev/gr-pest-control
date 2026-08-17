import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import Navbar from "@/components/shared/navigation/Navbar";
import Footer from "@/components/shared/footer/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy | GR Pest Control",
  description:
    "Learn how GR Pest Control collects, uses, stores and protects personal information when you use our website and services.",
  alternates: {
    canonical: "/privacy",
  },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function PrivacyPage() {
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

  return (
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
              Privacy Policy
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
              <ShieldCheck
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
                Privacy & Trust
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
              Your privacy matters.
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
              We want you to understand what personal
              information we collect, why we collect it,
              how we use it and the choices available to
              you.
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
                <LockKeyhole
                  size={14}
                  className="text-[#0878E8]"
                />

                Privacy Policy
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
          {/* Main */}

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
                  GR Pest Control respects your privacy
                  and is committed to handling personal
                  information responsibly. This Privacy
                  Policy explains how we manage personal
                  information when you visit our website,
                  contact us, request a quote or otherwise
                  interact with our business.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  This policy is intended to provide clear
                  and practical information about our
                  privacy practices and should be read
                  together with any notices provided to you
                  when we collect personal information.
                </p>
              </div>

              <div className="px-6 py-8 sm:px-9 sm:py-10">
                {/* 1 */}

                <PrivacySection
                  number="01"
                  title="Information We Collect"
                >
                  <p>
                    Depending on how you interact with
                    GR Pest Control, we may collect
                    information that helps us respond to
                    enquiries, provide services and
                    communicate with you.
                  </p>

                  <p>
                    This may include:
                  </p>

                  <ul>
                    <li>
                      Your name and contact details.
                    </li>

                    <li>
                      Phone number, email address and
                      other communication details.
                    </li>

                    <li>
                      Property or service information
                      you provide when requesting a
                      quote or service.
                    </li>

                    <li>
                      Information contained in messages,
                      enquiries, feedback or other
                      communications you send to us.
                    </li>

                    <li>
                      Appointment, service and customer
                      information necessary to provide
                      our services.
                    </li>

                    <li>
                      Technical information associated
                      with your use of our website, where
                      collected through website
                      technologies or analytics tools.
                    </li>
                  </ul>

                  <p>
                    We generally only ask for information
                    that is reasonably necessary for the
                    purpose for which it is collected.
                  </p>
                </PrivacySection>

                {/* 2 */}

                <PrivacySection
                  number="02"
                  title="How We Collect Information"
                >
                  <p>
                    We may collect personal information
                    directly from you when you:
                  </p>

                  <ul>
                    <li>
                      Submit a quote or enquiry form.
                    </li>

                    <li>
                      Contact us by phone, email or
                      another communication channel.
                    </li>

                    <li>
                      Request, schedule or receive a
                      pest control service.
                    </li>

                    <li>
                      Communicate with us about an
                      existing enquiry or service.
                    </li>

                    <li>
                      Interact with our website.
                    </li>
                  </ul>

                  <p>
                    In some circumstances, information
                    may also be collected automatically
                    when you use our website, such as
                    technical or usage information
                    generated by your device or browser.
                  </p>
                </PrivacySection>

                {/* 3 */}

                <PrivacySection
                  number="03"
                  title="How We Use Personal Information"
                >
                  <p>
                    We may use personal information for
                    purposes including:
                  </p>

                  <ul>
                    <li>
                      Responding to enquiries and quote
                      requests.
                    </li>

                    <li>
                      Arranging and providing pest
                      control services.
                    </li>

                    <li>
                      Communicating with customers about
                      appointments, services and
                      enquiries.
                    </li>

                    <li>
                      Managing customer relationships
                      and service records.
                    </li>

                    <li>
                      Improving our website, services and
                      customer experience.
                    </li>

                    <li>
                      Managing website security and
                      preventing misuse or fraud.
                    </li>

                    <li>
                      Meeting legal, regulatory and
                      administrative requirements.
                    </li>
                  </ul>

                  <p>
                    We will not use personal information
                    for unrelated purposes unless permitted
                    or required by applicable law or where
                    you have otherwise provided appropriate
                    consent.
                  </p>
                </PrivacySection>

                {/* 4 */}

                <PrivacySection
                  number="04"
                  title="Quote Requests & Service Information"
                >
                  <p>
                    When you request a quote or contact us
                    about pest control, the information you
                    provide may be used to understand your
                    pest problem, property requirements and
                    preferred contact method.
                  </p>

                  <p>
                    This helps us assess your enquiry,
                    communicate with you and determine an
                    appropriate service or next step.
                  </p>

                  <div className="my-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                    <div className="flex gap-3">
                      <ShieldCheck
                        size={18}
                        className="mt-0.5 shrink-0 text-[#0878E8]"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        Please avoid submitting sensitive
                        personal information through
                        general enquiry forms unless it is
                        genuinely necessary for your
                        enquiry.
                      </p>
                    </div>
                  </div>
                </PrivacySection>

                {/* 5 */}

                <PrivacySection
                  number="05"
                  title="How We Hold & Protect Information"
                >
                  <p>
                    We take reasonable steps to protect
                    personal information against misuse,
                    interference, loss and unauthorised
                    access, modification or disclosure.
                  </p>

                  <p>
                    Depending on the information and the
                    systems involved, reasonable safeguards
                    may include access controls, secure
                    systems, authentication measures,
                    restricted access and appropriate
                    operational procedures.
                  </p>

                  <p>
                    No internet transmission or electronic
                    storage system can be guaranteed to be
                    completely secure. For this reason, we
                    cannot promise absolute security of
                    information transmitted to or through
                    our website.
                  </p>
                </PrivacySection>

                {/* 6 */}

                <PrivacySection
                  number="06"
                  title="When We Share Information"
                >
                  <p>
                    We do not sell personal information as
                    part of our ordinary business activities.
                  </p>

                  <p>
                    We may disclose personal information
                    where reasonably necessary to operate
                    our business, provide services, respond
                    to your request or comply with legal
                    obligations.
                  </p>

                  <p>
                    Depending on the circumstances, this may
                    include disclosure to:
                  </p>

                  <ul>
                    <li>
                      Service providers that support our
                      website or business operations.
                    </li>

                    <li>
                      Technology, hosting, communication
                      or infrastructure providers.
                    </li>

                    <li>
                      Professional advisers where
                      reasonably necessary.
                    </li>

                    <li>
                      Government agencies, regulators,
                      courts or law enforcement where
                      required or authorised by law.
                    </li>
                  </ul>

                  <p>
                    We aim to limit disclosure to
                    information that is reasonably necessary
                    for the relevant purpose.
                  </p>
                </PrivacySection>

                {/* 7 */}

                <PrivacySection
                  number="07"
                  title="Overseas Service Providers"
                >
                  <p>
                    Some technology or service providers
                    used by a business may process or store
                    information outside Australia.
                  </p>

                  <p>
                    Where personal information is disclosed
                    to an overseas recipient, the handling
                    of that information may be subject to
                    the laws of the country where the
                    recipient operates.
                  </p>

                  <p>
                    The specific overseas locations involved
                    can depend on the third-party services
                    used by GR Pest Control and may change
                    over time.
                  </p>
                </PrivacySection>

                {/* 8 */}

                <PrivacySection
                  number="08"
                  title="Cookies & Website Technologies"
                >
                  <p>
                    Our website may use cookies or similar
                    technologies to support website
                    functionality, understand how visitors
                    use the website and improve the online
                    experience.
                  </p>

                  <p>
                    Your browser may allow you to control
                    or block certain cookies. Some website
                    functions may not work as intended if
                    required technologies are disabled.
                  </p>

                  <p>
                    Where third-party analytics,
                    advertising or embedded services are
                    used, those providers may also process
                    information in accordance with their
                    own privacy policies.
                  </p>
                </PrivacySection>

                {/* 9 */}

                <PrivacySection
                  number="09"
                  title="Marketing Communications"
                >
                  <p>
                    If we send marketing communications,
                    we will do so in accordance with
                    applicable requirements.
                  </p>

                  <p>
                    You may ask us to stop sending
                    marketing communications at any time.
                    We will also continue to retain
                    information where necessary for
                    legitimate business, legal or
                    administrative purposes.
                  </p>
                </PrivacySection>

                {/* 10 */}

                <PrivacySection
                  number="10"
                  title="How Long We Keep Information"
                >
                  <p>
                    We retain personal information only for
                    as long as reasonably necessary for the
                    purpose for which it was collected,
                    ongoing business needs, legal
                    obligations, dispute resolution,
                    record-keeping or other lawful purposes.
                  </p>

                  <p>
                    When information is no longer required,
                    reasonable steps will be taken to
                    securely destroy or de-identify it,
                    subject to applicable legal and
                    operational requirements.
                  </p>
                </PrivacySection>

                {/* 11 */}

                <PrivacySection
                  number="11"
                  title="Access & Correction"
                >
                  <p>
                    You may request access to personal
                    information we hold about you and ask
                    us to correct information that you
                    believe is inaccurate, incomplete or
                    out of date.
                  </p>

                  <p>
                    To make a request, please contact us
                    using the details provided below. We
                    may need to verify your identity before
                    processing an access or correction
                    request.
                  </p>

                  <p>
                    We will handle requests in accordance
                    with applicable privacy requirements.
                  </p>
                </PrivacySection>

                {/* 12 */}

                <PrivacySection
                  number="12"
                  title="Privacy Complaints"
                >
                  <p>
                    If you believe we have mishandled your
                    personal information or breached an
                    applicable privacy requirement, we
                    encourage you to contact us first so we
                    can understand and address your concern.
                  </p>

                  <p>
                    Please provide enough information for us
                    to identify the issue and investigate
                    your complaint.
                  </p>

                  <p>
                    We will consider and respond to privacy
                    complaints in accordance with our
                    obligations and applicable privacy
                    requirements.
                  </p>

                  <p>
                    If you are not satisfied with our
                    response, you may have the right to
                    contact the Office of the Australian
                    Information Commissioner (OAIC).
                  </p>
                </PrivacySection>

                {/* 13 */}

                <PrivacySection
                  number="13"
                  title="Children's Privacy"
                >
                  <p>
                    Our website and services are primarily
                    intended for adults arranging pest
                    control services for a property.
                  </p>

                  <p>
                    We do not knowingly seek unnecessary
                    personal information from children.
                    If you believe a child has provided
                    personal information to us unnecessarily,
                    please contact us so we can review the
                    situation.
                  </p>
                </PrivacySection>

                {/* 14 */}

                <PrivacySection
                  number="14"
                  title="Third-Party Websites"
                >
                  <p>
                    Our website may contain links to
                    third-party websites or services.
                  </p>

                  <p>
                    We are not responsible for the privacy
                    practices, content or security of
                    websites that we do not operate.
                  </p>

                  <p>
                    We recommend reviewing the privacy
                    policy of any third-party website before
                    providing personal information.
                  </p>
                </PrivacySection>

                {/* 15 */}

                <PrivacySection
                  number="15"
                  title="Changes to This Privacy Policy"
                >
                  <p>
                    We may update this Privacy Policy from
                    time to time to reflect changes to our
                    business, website, services, technology
                    or applicable privacy requirements.
                  </p>

                  <p>
                    The updated version will be published on
                    this page with the relevant updated
                    date.
                  </p>
                </PrivacySection>

                {/* Contact */}

                <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0878E8] shadow-sm">
                      <Mail
                        size={19}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0878E8]">
                        Privacy enquiries
                      </p>

                      <h2 className="mt-2 text-xl font-extrabold tracking-tight text-[#062B63]">
                        Have a privacy question?
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Contact GR Pest Control and we’ll
                        help you with questions about your
                        personal information or this policy.
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
                </section>

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
                  ["01", "Information We Collect"],
                  ["02", "How We Collect Information"],
                  ["03", "How We Use Information"],
                  ["04", "Quote Requests"],
                  ["05", "Protection & Security"],
                  ["06", "Information Sharing"],
                  ["07", "Overseas Providers"],
                  ["08", "Cookies"],
                  ["09", "Marketing"],
                  ["10", "Retention"],
                  ["11", "Access & Correction"],
                  ["12", "Complaints"],
                  ["13", "Children's Privacy"],
                  ["14", "Third-Party Websites"],
                  ["15", "Changes"],
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

            <div className="mt-5 rounded-3xl bg-[#062B63] p-6 text-white shadow-[0_18px_45px_rgba(6,43,99,0.16)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                Need pest control?
              </p>

              <h2 className="mt-3 text-xl font-extrabold tracking-tight">
                Let’s talk about your pest problem.
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100/75">
                Tell us what’s happening at your property
                and request a free quote.
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
          </aside>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}

/* =========================================================
   SECTION COMPONENT
========================================================= */

interface PrivacySectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function PrivacySection({
  number,
  title,
  children,
}: PrivacySectionProps) {
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