import type { Metadata } from "next";

import { connectDB } from "@/lib/db/connect";

import { getAdminServices } from "@/features/services/queries/getAdminServices";
import { getServiceCategories } from "@/features/services/queries/getServiceCategories";

import AdminServicesList from "@/components/admin/services/AdminServicesList";

export const metadata: Metadata = {
  title: "Services | Admin",
  description:
    "Manage GR Pest Control services.",
};

export const dynamic =
  "force-dynamic";

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    active?: string;
    featured?: string;
    page?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params =
    await searchParams;

  const search =
    params.search?.trim() ?? "";

  const category =
    params.category?.trim() ?? "";

  const active =
    params.active === "active" ||
    params.active === "inactive"
      ? params.active
      : "all";

  const featured =
    params.featured === "featured" ||
    params.featured === "normal"
      ? params.featured
      : "all";

  const parsedPage = Number(
    params.page ?? "1",
  );

  const page =
    Number.isInteger(parsedPage) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  await connectDB();

  const [
    servicesResult,
    categories,
  ] = await Promise.all([
    getAdminServices({
      search,
      category,
      active,
      featured,
      page,
      limit: 12,
    }),

    getServiceCategories(),
  ]);

  return (
    <AdminServicesList
      services={
        servicesResult.services
      }
      pagination={
        servicesResult.pagination
      }
      categories={categories}
      filters={{
        search,
        category,
        active,
        featured,
      }}
    />
  );
}