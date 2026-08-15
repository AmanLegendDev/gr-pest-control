import Service from "@/models/Service";

export interface GetAdminServicesOptions {
  search?: string;
  category?: string;
  active?: "all" | "active" | "inactive";
  featured?: "all" | "featured" | "normal";
  page?: number;
  limit?: number;
}

export async function getAdminServices({
  search = "",
  category = "",
  active = "all",
  featured = "all",
  page = 1,
  limit = 12,
}: GetAdminServicesOptions = {}) {
  const safePage =
    Math.max(1, page);

  const safeLimit =
    Math.min(
      50,
      Math.max(1, limit),
    );

  const filter: Record<
    string,
    unknown
  > = {};

  const cleanSearch =
    search.trim();

  if (cleanSearch) {
    const escaped =
      cleanSearch.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );

    filter.$or = [
      {
        title: {
          $regex: escaped,
          $options: "i",
        },
      },
      {
        category: {
          $regex: escaped,
          $options: "i",
        },
      },
      {
        shortDescription: {
          $regex: escaped,
          $options: "i",
        },
      },
    ];
  }

  if (category.trim()) {
    filter.category =
      category.trim();
  }

  if (active === "active") {
    filter.active = true;
  }

  if (active === "inactive") {
    filter.active = false;
  }

  if (featured === "featured") {
    filter.featured = true;
  }

  if (featured === "normal") {
    filter.featured = false;
  }

  const skip =
    (safePage - 1) *
    safeLimit;

  const [
    services,
    total,
  ] = await Promise.all([
    Service.find(filter)
      .sort({
        featured: -1,
        sortOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    Service.countDocuments(filter),
  ]);

  return {
    services: services.map(
      (service) => ({
        ...service,
        id: service._id.toString(),
        _id: undefined,
      }),
    ),

    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages:
        Math.ceil(
          total / safeLimit,
        ),
      hasNextPage:
        safePage * safeLimit <
        total,
      hasPreviousPage:
        safePage > 1,
    },
  };
}