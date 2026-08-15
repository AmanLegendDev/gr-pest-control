"use client";

import { useMemo, useState } from "react";

import FAQSearch from "@/components/faq/FAQSearch";
import FAQPopular from "@/components/faq/FAQPopular";
import FAQAccordion from "@/components/faq/FAQAccordion";

interface FAQContentItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  featured: boolean;
}

interface FAQContentProps {
  items: FAQContentItem[];
}

export default function FAQContent({
  items,
}: FAQContentProps) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const normalizedQuery =
    searchQuery.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const question =
        item.question.toLowerCase();

      const answer =
        item.answer.toLowerCase();

      const category =
        item.category.toLowerCase();

      return (
        question.includes(
          normalizedQuery,
        ) ||
        answer.includes(
          normalizedQuery,
        ) ||
        category.includes(
          normalizedQuery,
        )
      );
    });
  }, [items, normalizedQuery]);

  const popularItems = useMemo(() => {
    return filteredItems
      .filter(
        (item) => item.featured,
      )
      .slice(0, 4);
  }, [filteredItems]);

  return (
    <>
      {/* =========================
          SEARCH
      ========================== */}

      <section
        className="
          bg-white
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
          lg:py-20
        "
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl">
            <FAQSearch
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={
                filteredItems.length
              }
            />
          </div>
        </div>
      </section>

      {/* =========================
          POPULAR
      ========================== */}

      {!normalizedQuery &&
        popularItems.length > 0 && (
          <FAQPopular
            items={popularItems}
          />
        )}

      {/* =========================
          SEARCH RESULT STATE
      ========================== */}

      {normalizedQuery && (
        <section
          className="
            bg-white
            px-4
            pb-8
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto max-w-5xl">
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-100
                bg-[#F8FAFC]
                px-4
                py-3
                sm:px-5
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  text-slate-500
                "
              >
                Search results for{" "}
                <span className="font-extrabold text-[#062B63]">
                  "{searchQuery.trim()}"
                </span>
              </p>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-white
                  px-2.5
                  py-1.5
                  text-[9px]
                  font-extrabold
                  text-[#0878E8]
                  shadow-sm
                "
              >
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "answer"
                  : "answers"}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* =========================
          ALL FAQS
      ========================== */}

      <section
        className="
          bg-[#F8FAFC]
          px-4
          pb-16
          pt-4
          sm:px-6
          sm:pb-20
          sm:pt-6
          lg:px-8
          lg:pb-24
          lg:pt-8
        "
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              {normalizedQuery
                ? "Search results"
                : "All answers"}
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              {normalizedQuery
                ? "Matching questions"
                : "Frequently asked questions"}
            </h2>
          </div>

          <FAQAccordion
            items={filteredItems}
          />
        </div>
      </section>
    </>
  );
}