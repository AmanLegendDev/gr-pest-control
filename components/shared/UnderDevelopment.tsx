import { ArrowLeft, Clock3 } from "lucide-react";
import Link from "next/link";

interface UnderDevelopmentProps {
  title: string;
  description: string;
}

export default function UnderDevelopment({
  title,
  description,
}: UnderDevelopmentProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-160px)] items-center justify-center overflow-hidden bg-white px-4 py-28 sm:px-6 lg:px-8">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
          <Clock3 size={14} />

          Coming Soon
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {description}
        </p>

        {/* Card */}
        <div className="mx-auto mt-9 max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(6,43,99,0.08)] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
            <Clock3 size={25} />
          </div>

          <h2 className="mt-5 text-xl font-extrabold text-[#062B63]">
            We’re working on it.
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This page is currently under development. We’re
            putting the finishing touches on it and will have
            it ready soon.
          </p>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#062B63] px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0878E8]"
        >
          <ArrowLeft size={16} />

          Back to Home
        </Link>
      </div>
    </section>
  );
}