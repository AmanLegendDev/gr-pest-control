import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import BlogForm from "@/features/blogs/components/admin/BlogForm";
import { getBlogById } from "@/features/blogs/queries/getBlogById";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  const { id } = await params;

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-8">
          <Link
            href="/admin/blogs"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition hover:text-[#0878E8]"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />
            Back to Blogs
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
              <FileText
                size={22}
                aria-hidden="true"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0878E8]">
                Blog Management
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                Edit Blog
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Update the blog content, featured
                image, category, SEO information and
                publishing settings.
              </p>
            </div>
          </div>
        </div>

        <BlogForm
          mode="edit"
          initialData={blog}
        />

      </div>
    </main>
  );
}