import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { connectDB } from "@/lib/db/connect";
import { getAdminServiceById } from "@/features/services/queries/getAdminServiceById";

import ServiceForm from "@/components/admin/services/ServiceForm";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditServicePageProps): Promise<Metadata> {
  const { id } = await params;

  await connectDB();

  const service =
    await getAdminServiceById(id);

  return {
    title: service
      ? `Edit ${service.title} | Services Admin`
      : "Edit Service | Admin",
  };
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
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
          <h1
            className="
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
            The service you are trying to
            edit does not exist.
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

  /*
   * =========================
   * FORM DATA
   *
   * Explicitly map the DB object
   * instead of passing the entire
   * Mongo document around.
   * =========================
   */

  const initialData = {
    id: service.id,

    title: service.title,

    slug: service.slug,

    category:
      service.category,

    shortDescription:
      service.shortDescription,

    description:
      service.description,

    heroImage:
      service.heroImage
        ? {
            url: service.heroImage.url,
            publicId:
              service.heroImage.publicId,
            alt: service.heroImage.alt,
          }
        : undefined,

    icon:
      service.icon ?? "",

    pestTypes:
      service.pestTypes ?? [],

    benefits:
      service.benefits ?? [],

    process:
      (service.process ?? [])
        .sort(
          (a, b) =>
            a.sortOrder -
            b.sortOrder,
        )
        .map(
          (step, index) => ({
            title: step.title,
            description:
              step.description,
            sortOrder:
              step.sortOrder ??
              index,
          }),
        ),

    faqs:
      (service.faqs ?? [])
        .sort(
          (a, b) =>
            a.sortOrder -
            b.sortOrder,
        )
        .map(
          (faq, index) => ({
            question:
              faq.question,
            answer: faq.answer,
            sortOrder:
              faq.sortOrder ??
              index,
          }),
        ),

    seoTitle:
      service.seoTitle ?? "",

    seoDescription:
      service.seoDescription ?? "",

    featured:
      service.featured,

    active:
      service.active,

    sortOrder:
      service.sortOrder,
  };

  return (
    <div className="space-y-6">
      {/* =========================
          HEADER
      ========================== */}

      <div>
        <Link
          href={`/admin/services/${service.id}`}
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

          Back to Service
        </Link>

        <div className="mt-4">
          <p
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.15em]
              text-[#0878E8]
            "
          >
            Service Management
          </p>

          <h1
            className="
              mt-1.5
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            Edit Service
          </h1>

          <p
            className="
              mt-1.5
              text-xs
              leading-6
              text-slate-400
            "
          >
            Update{" "}
            <span className="font-bold text-slate-500">
              {service.title}
            </span>{" "}
            and keep your public service
            page up to date.
          </p>
        </div>
      </div>

      {/* =========================
          EDIT FORM
      ========================== */}

      <ServiceForm
        mode="edit"
        initialData={initialData}
      />
    </div>
  );
}