import Link from "next/link";
import {
  ArrowLeft,
  Home,
  MapPin,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="relative px-6 py-14 text-center sm:px-10 sm:py-20">
            {/* Background decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-50 blur-3xl"
            />

            {/* 404 */}
            <div className="relative">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#0878E8]">
                GR Pest Control
              </p>

              <div className="mt-5">
                <span className="text-[88px] font-black leading-none tracking-[-0.07em] text-[#062B63] sm:text-[120px]">
                  404
                </span>
              </div>

              <h1 className="mx-auto mt-4 max-w-xl text-2xl font-extrabold tracking-tight text-[#062B63] sm:text-3xl">
                We couldn&apos;t find that page
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                The page you&apos;re looking for may have moved,
                been removed, or the address may be incorrect.
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0878E8]
                    px-5
                    text-sm
                    font-extrabold
                    text-white
                    shadow-[0_10px_25px_rgba(8,120,232,0.18)]
                    transition
                    hover:bg-[#066BCF]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-200
                    focus-visible:ring-offset-2
                  "
                >
                  <Home size={16} />
                  Back to Home
                </Link>

                <Link
                  href="/services"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    text-sm
                    font-bold
                    text-[#062B63]
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-[#0878E8]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-200
                    focus-visible:ring-offset-2
                  "
                >
                  <Search size={16} />
                  View Services
                </Link>
              </div>
            </div>
          </div>

          {/* Helpful links */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#0878E8]"
              >
                <MapPin size={14} />
                Service Areas
              </Link>

              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
              />

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#0878E8]"
              >
                <ArrowLeft size={14} />
                Return to website
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}