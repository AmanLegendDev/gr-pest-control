import Service from "@/models/Service";

export async function getServiceCategories() {
  return Service.distinct(
    "category",
  ).then((categories) =>
    categories
      .filter(
        (category) =>
          typeof category ===
            "string" &&
          category.trim().length > 0,
      )
      .sort((a, b) =>
        a.localeCompare(b),
      ),
  );
}