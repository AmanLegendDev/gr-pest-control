"use client";

import {
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

interface FAQSearchProps {
  value: string;
  onChange: (
    value: string,
  ) => void;
  resultCount?: number;
}

export default function FAQSearch({
  value,
  onChange,
  resultCount,
}: FAQSearchProps) {
  const [query, setQuery] =
    useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        onChange(query);
      },
      180,
    );

    return () =>
      window.clearTimeout(
        timeout,
      );
  }, [query, onChange]);

  const clearSearch = () => {
    setQuery("");
    onChange("");
  };

  return (
    <div className="w-full">
      <div
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-slate-200
          bg-white
          shadow-[0_10px_35px_rgba(15,23,42,0.055)]
          transition-all
          duration-200
          focus-within:border-blue-200
          focus-within:shadow-[0_15px_45px_rgba(8,120,232,0.08)]
        "
      >
        {/* Search icon */}

        <Search
          size={18}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-[#0878E8]
          "
        />

        {/* Input */}

        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value,
            )
          }
          placeholder="Search your question..."
          aria-label="Search frequently asked questions"
          className="
            h-14
            w-full
            bg-transparent
            pl-12
            pr-24
            text-sm
            font-semibold
            text-[#062B63]
            outline-none
            placeholder:text-slate-400
            sm:h-16
            sm:text-base
          "
        />

        {/* Result count / clear */}

        <div
          className="
            absolute
            right-3
            top-1/2
            flex
            -translate-y-1/2
            items-center
            gap-2
          "
        >
          {query.trim() &&
            typeof resultCount ===
              "number" && (
              <span
                className="
                  hidden
                  rounded-full
                  bg-slate-50
                  px-2.5
                  py-1.5
                  text-[9px]
                  font-extrabold
                  text-slate-400
                  sm:inline-flex
                "
              >
                {resultCount}{" "}
                {resultCount === 1
                  ? "result"
                  : "results"}
              </span>
            )}

          {query.trim() && (
            <button
              type="button"
              onClick={
                clearSearch
              }
              aria-label="Clear FAQ search"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-slate-50
                text-slate-400
                transition-all
                hover:bg-blue-50
                hover:text-[#0878E8]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile result count */}

      {query.trim() &&
        typeof resultCount ===
          "number" && (
          <p
            className="
              mt-2
              px-1
              text-[10px]
              font-bold
              text-slate-400
              sm:hidden
            "
          >
            {resultCount}{" "}
            {resultCount === 1
              ? "answer"
              : "answers"}{" "}
            found
          </p>
        )}
    </div>
  );
}