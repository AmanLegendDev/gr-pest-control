import Link from "next/link";
import { ArrowLeft, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";

import { getServiceAreaById } from "@/features/service-areas/queries/getServiceAreaById";
import ServiceAreaForm from "@/features/service-areas/components/admin/ServiceAreaForm";

interface EditServiceAreaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditServiceAreaPage({
  params,
}: EditServiceAreaPageProps) {
  const { id } = await params;

  const serviceArea =
    await getServiceAreaById(id);

  if (!serviceArea) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================
            PAGE HEADER
        ========================== */}

        <div className="mb-8">
          <Link
            href="/admin/service-areas"
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#64748B]
              transition
              hover:text-[#0878E8]
            "
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            Back to Service Areas
          </Link>

          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#0878E8]
              "
            >
              <MapPinned
                size={22}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0878E8]">
                Service Areas
              </p>

              <h1
                className="
                  mt-1
                  text-2xl
                  font-bold
                  tracking-tight
                  text-[#062B63]
                  sm:text-3xl
                "
              >
                Edit Service Area
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Update the location content,
                imagery, FAQs, publishing status
                and SEO information.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            EDIT FORM
        ========================== */}

        <ServiceAreaForm
          mode="edit"
          initialData={serviceArea}
        />
      </div>
    </main>
  );
}