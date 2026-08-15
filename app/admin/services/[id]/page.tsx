import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  Image as ImageIcon,
  Layers3,
  ListChecks,
  MessageCircleQuestion,
  Search,
  Star,
  Tag,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import { getAdminServiceById } from "@/features/services/queries/getAdminServiceById";

import DeleteServiceButton from "@/components/admin/services/DeleteServiceButton";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  await connectDB();

  const service =
    await getAdminServiceById(id);

  return {
    title: service
      ? `${service.title} | Services Admin`
      : "Service | Admin",
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  await connectDB();

  const service =
    await getAdminServiceById(id);

  if (!service) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-[28px]
            border
            border-slate-100
            bg-white
            p-8
            text-center
            shadow-[0_10px_35px_rgba(15,23,42,0.04)]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-500
            "
          >
            <XCircle size={24} />
          </div>

          <h1
            className="
              mt-5
              text-lg
              font-extrabold
              text-[#062B63]
            "
          >
            Service not found
          </h1>

          <p
            className="
              mt-2
              text-xs
              leading-6
              text-slate-400
            "
          >
            This service may have been
            deleted or the URL is invalid.
          </p>

          <Link
            href="/admin/services"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#062B63]
              px-5
              py-3
              text-xs
              font-extrabold
              text-white
              transition-colors
              hover:bg-[#0878E8]
            "
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* =========================
          TOP BAR
      ========================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <Link
            href="/admin/services"
            className="
              inline-flex
              items-center
              gap-1.5
              text-[10px]
              font-extrabold
              text-slate-400
              transition-colors
              hover:text-[#0878E8]
            "
          >
            <ArrowLeft size={12} />
            Back to Services
          </Link>

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.1em]
                text-[#0878E8]
              "
            >
              {service.category}
            </span>

            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.1em]
                ${
                  service.active
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              {service.active ? (
                <CheckCircle2 size={11} />
              ) : (
                <XCircle size={11} />
              )}

              {service.active
                ? "Active"
                : "Inactive"}
            </span>

            {service.featured && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-amber-50
                  px-3
                  py-1.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.1em]
                  text-amber-600
                "
              >
                <Star
                  size={11}
                  fill="currentColor"
                />

                Featured
              </span>
            )}
          </div>

          <h1
            className="
              mt-3
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            {service.title}
          </h1>

          <p
            className="
              mt-1.5
              text-xs
              text-slate-400
            "
          >
            /services/{service.slug}
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-[10px]
              font-extrabold
              text-[#062B63]
              transition-colors
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#0878E8]
            "
          >
            <ExternalLink size={13} />
            View Live
          </Link>

          <Link
            href={`/admin/services/${service.id}/edit`}
            className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              bg-[#062B63]
              px-4
              text-[10px]
              font-extrabold
              text-white
              transition-colors
              hover:bg-[#0878E8]
            "
          >
            <Edit3 size={13} />
            Edit Service
          </Link>

          <DeleteServiceButton
            serviceId={service.id}
            serviceTitle={service.title}
          />
        </div>
      </div>

      {/* =========================
          HERO IMAGE + OVERVIEW
      ========================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1.15fr_0.85fr]
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-slate-100
            bg-white
            shadow-[0_8px_30px_rgba(15,23,42,0.035)]
          "
        >
          <div
            className="
              aspect-[16/9]
              bg-slate-100
            "
          >
            {service.heroImage?.url ? (
              <img
                src={service.heroImage.url}
                alt={
                  service.heroImage.alt ||
                  service.title
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-slate-300
                "
              >
                <ImageIcon size={36} />
              </div>
            )}
          </div>
        </div>

        <div
          className="
            rounded-[28px]
            border
            border-slate-100
            bg-white
            p-6
            shadow-[0_8px_30px_rgba(15,23,42,0.035)]
          "
        >
          <p
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.15em]
              text-[#0878E8]
            "
          >
            Overview
          </p>

          <h2
            className="
              mt-2
              text-lg
              font-extrabold
              tracking-[-0.025em]
              text-[#062B63]
            "
          >
            {service.shortDescription}
          </h2>

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
            "
          >
            <Stat
              icon={<Tag size={14} />}
              label="Category"
              value={service.category}
            />

            <Stat
              icon={<Layers3 size={14} />}
              label="Pest Types"
              value={String(
                service.pestTypes.length,
              )}
            />

            <Stat
              icon={<ListChecks size={14} />}
              label="Process Steps"
              value={String(
                service.process.length,
              )}
            />

            <Stat
              icon={
                <MessageCircleQuestion
                  size={14}
                />
              }
              label="FAQs"
              value={String(
                service.faqs.length,
              )}
            />
          </div>

          <div
            className="
              mt-5
              rounded-2xl
              bg-slate-50
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  text-slate-400
                "
              >
                Sort order
              </span>

              <span
                className="
                  text-xs
                  font-extrabold
                  text-[#062B63]
                "
              >
                #{service.sortOrder}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}

      <DetailsSection
        icon={<Layers3 size={16} />}
        label="Service description"
        title="About this service"
      >
        <p
          className="
            whitespace-pre-line
            text-sm
            leading-7
            text-slate-500
          "
        >
          {service.description}
        </p>
      </DetailsSection>

      {/* =========================
          PEST TYPES
      ========================== */}

      <DetailsSection
        icon={<Tag size={16} />}
        label="Coverage"
        title="Pest types"
      >
        {service.pestTypes.length > 0 ? (
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {service.pestTypes.map(
              (pest) => (
                <span
                  key={pest}
                  className="
                    rounded-xl
                    bg-blue-50
                    px-3
                    py-2
                    text-xs
                    font-bold
                    text-[#0878E8]
                  "
                >
                  {pest}
                </span>
              ),
            )}
          </div>
        ) : (
          <EmptyText text="No pest types added." />
        )}
      </DetailsSection>

      {/* =========================
          BENEFITS
      ========================== */}

      <DetailsSection
        icon={<CheckCircle2 size={16} />}
        label="Why choose this"
        title="Benefits"
      >
        {service.benefits.length > 0 ? (
          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            {service.benefits.map(
              (benefit, index) => (
                <div
                  key={`${benefit}-${index}`}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
                  "
                >
                  <span
                    className="
                      mt-0.5
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-emerald-50
                      text-emerald-500
                    "
                  >
                    <CheckCircle2
                      size={13}
                    />
                  </span>

                  <p
                    className="
                      text-xs
                      font-semibold
                      leading-5
                      text-slate-600
                    "
                  >
                    {benefit}
                  </p>
                </div>
              ),
            )}
          </div>
        ) : (
          <EmptyText text="No benefits added." />
        )}
      </DetailsSection>

      {/* =========================
          PROCESS
      ========================== */}

      <DetailsSection
        icon={<ListChecks size={16} />}
        label="How it works"
        title="Treatment process"
      >
        {service.process.length > 0 ? (
          <div
            className="
              space-y-3
            "
          >
            {[
              ...service.process,
            ]
              .sort(
                (a, b) =>
                  a.sortOrder -
                  b.sortOrder,
              )
              .map(
                (step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="
                      flex
                      gap-4
                      rounded-2xl
                      border
                      border-slate-100
                      bg-slate-50/70
                      p-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#062B63]
                        text-[10px]
                        font-extrabold
                        text-white
                      "
                    >
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      <h3
                        className="
                          text-sm
                          font-extrabold
                          text-[#062B63]
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-6
                          text-slate-500
                        "
                      >
                        {
                          step.description
                        }
                      </p>
                    </div>
                  </div>
                ),
              )}
          </div>
        ) : (
          <EmptyText text="No process steps added." />
        )}
      </DetailsSection>

      {/* =========================
          FAQS
      ========================== */}

      <DetailsSection
        icon={
          <MessageCircleQuestion
            size={16}
          />
        }
        label="Questions"
        title="Service FAQs"
      >
        {service.faqs.length > 0 ? (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-100
            "
          >
            {[
              ...service.faqs,
            ]
              .sort(
                (a, b) =>
                  a.sortOrder -
                  b.sortOrder,
              )
              .map(
                (faq, index) => (
                  <div
                    key={`${faq.question}-${index}`}
                    className="
                      border-b
                      border-slate-100
                      p-5
                      last:border-b-0
                    "
                  >
                    <div
                      className="
                        flex
                        gap-3
                      "
                    >
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-blue-50
                          text-[9px]
                          font-extrabold
                          text-[#0878E8]
                        "
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div>
                        <h3
                          className="
                            text-sm
                            font-extrabold
                            text-[#062B63]
                          "
                        >
                          {faq.question}
                        </h3>

                        <p
                          className="
                            mt-2
                            text-xs
                            leading-6
                            text-slate-500
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
          </div>
        ) : (
          <EmptyText text="No FAQs added." />
        )}
      </DetailsSection>

      {/* =========================
          SEO
      ========================== */}

      <DetailsSection
        icon={<Search size={16} />}
        label="Search visibility"
        title="SEO"
      >
        <div
          className="
            grid
            gap-4
            lg:grid-cols-2
          "
        >
          <SEOField
            label="SEO title"
            value={
              service.seoTitle ||
              "Not configured"
            }
          />

          <SEOField
            label="SEO description"
            value={
              service.seoDescription ||
              "Not configured"
            }
          />
        </div>
      </DetailsSection>
    </div>
  );
}

/* =========================
   SMALL UI COMPONENTS
========================= */

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-slate-50
        p-3.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[#0878E8]
        "
      >
        {icon}

        <span
          className="
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.1em]
            text-slate-400
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-sm
          font-extrabold
          text-[#062B63]
        "
      >
        {value}
      </p>
    </div>
  );
}

function DetailsSection({
  icon,
  label,
  title,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-[28px]
        border
        border-slate-100
        bg-white
        p-6
        shadow-[0_8px_30px_rgba(15,23,42,0.035)]
        sm:p-7
      "
    >
      <div
        className="
          mb-5
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#0878E8]
          "
        >
          {icon}
        </span>

        <div>
          <p
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.15em]
              text-[#0878E8]
            "
          >
            {label}
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-extrabold
              tracking-[-0.025em]
              text-[#062B63]
            "
          >
            {title}
          </h2>
        </div>
      </div>

      {children}
    </section>
  );
}

function EmptyText({
  text,
}: {
  text: string;
}) {
  return (
    <p
      className="
        rounded-2xl
        bg-slate-50
        px-4
        py-5
        text-xs
        font-semibold
        text-slate-400
      "
    >
      {text}
    </p>
  );
}

function SEOField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-[9px]
          font-extrabold
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-slate-600
        "
      >
        {value}
      </p>
    </div>
  );
}