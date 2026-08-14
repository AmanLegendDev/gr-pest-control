import { connectDB } from "@/lib/db/connect";
import Service from "@/models/Service";

import QuoteForm from "@/components/quote/QuoteForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Get a Free Quote",
  description:
    "Request a pest control quote from GR Pest Control.",
};

export default async function QuotePage() {
  await connectDB();

  const services = await Service.find({
    active: true,
  })
    .select({
      _id: 1,
      title: 1,
      slug: 1,
    })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  const serviceOptions = services.map(
    (service) => ({
      id: String(service._id),
      title: service.title,
      slug: service.slug,
    }),
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <QuoteForm
            services={serviceOptions}
          />
        </div>
      </section>
    </main>
  );
}