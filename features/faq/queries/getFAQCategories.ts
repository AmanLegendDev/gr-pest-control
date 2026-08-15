import FAQ from "@/models/FAQ";

export async function getFAQCategories() {
  const categories = await FAQ.distinct(
    "category",
    {
      active: true,
      category: {
        $exists: true,
        $ne: "",
      },
    },
  );

  return categories
    .filter(
      (category): category is string =>
        typeof category === "string" &&
        category.trim().length > 0,
    )
    .map(
      (category) =>
        category.trim(),
    )
    .filter(
      (category, index, array) =>
        array.indexOf(category) ===
        index,
    )
    .sort((a, b) =>
      a.localeCompare(b),
    );
}