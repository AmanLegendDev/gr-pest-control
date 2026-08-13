import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth-options";

import GalleryForm from "@/features/gallery/components/admin/GalleryForm";

export const metadata = {
  title: "Upload Gallery | GR Pest Control Admin",
  description:
    "Add a new image to the GR Pest Control website gallery.",
};

export default async function NewGalleryPage() {
  const session =
    await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/gallery"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#0878E8] focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            Back to Gallery
          </Link>

          <div>
            <p className="text-sm font-semibold text-[#0878E8]">
              Content Management
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
              Upload Gallery
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Add a professional project, treatment, workplace,
              residential or team image to the website gallery.
            </p>
          </div>
        </div>

        <GalleryForm />
      </div>
    </main>
  );
}