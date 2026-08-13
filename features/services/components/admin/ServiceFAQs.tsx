"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type ServiceFAQsProps = {
  watch: UseFormWatch<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

type ServiceFAQ = CreateServiceInput["faqs"][number];

export default function ServiceFAQs({
  watch,
  setValue,
  errors,
}: ServiceFAQsProps) {
  const faqs = watch("faqs") ?? [];

  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addFAQ = () => {
    const cleanQuestion = question.trim();
    const cleanAnswer = answer.trim();

    if (!cleanQuestion || !cleanAnswer) {
      return;
    }

    const duplicateQuestion = faqs.some(
      (faq) =>
        faq.question.toLowerCase() === cleanQuestion.toLowerCase()
    );

    if (duplicateQuestion) {
      return;
    }

    const newFAQ: ServiceFAQ = {
      question: cleanQuestion,
      answer: cleanAnswer,
      sortOrder: faqs.length,
    };

    setValue("faqs", [...faqs, newFAQ], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setQuestion("");
    setAnswer("");
    setShowForm(false);
  };

  const removeFAQ = (index: number) => {
    const updatedFAQs = faqs
      .filter((_, faqIndex) => faqIndex !== index)
      .map((faq, faqIndex) => ({
        ...faq,
        sortOrder: faqIndex,
      }));

    setValue("faqs", updatedFAQs, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const moveFAQ = (index: number, direction: "up" | "down") => {
    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= faqs.length) {
      return;
    }

    const updatedFAQs = [...faqs];

    [updatedFAQs[index], updatedFAQs[targetIndex]] = [
      updatedFAQs[targetIndex],
      updatedFAQs[index],
    ];

    const normalizedFAQs = updatedFAQs.map((faq, faqIndex) => ({
      ...faq,
      sortOrder: faqIndex,
    }));

    setValue("faqs", normalizedFAQs, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const cancelNewFAQ = () => {
    setQuestion("");
    setAnswer("");
    setShowForm(false);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#39A935]">
            <HelpCircle size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Service FAQs
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add questions customers may have about this service.
            </p>
          </div>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066acb] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
          >
            <Plus size={17} />
            Add FAQ
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {/* ADD FAQ FORM */}
        {showForm && (
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#0F172A]">
                New Service FAQ
              </h3>

              <p className="mt-1 text-xs text-[#64748B]">
                Keep the question and answer clear and useful for customers.
              </p>
            </div>

            <div className="space-y-4">
              {/* QUESTION */}
              <div>
                <label
                  htmlFor="service-faq-question"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Question
                </label>

                <input
                  id="service-faq-question"
                  type="text"
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  maxLength={300}
                  placeholder="e.g. How long does the treatment take?"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {question.length}/300
                </p>
              </div>

              {/* ANSWER */}
              <div>
                <label
                  htmlFor="service-faq-answer"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Answer
                </label>

                <textarea
                  id="service-faq-answer"
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  maxLength={1000}
                  rows={5}
                  placeholder="Provide a clear answer to the customer's question..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {answer.length}/1000
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelNewFAQ}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addFAQ}
                  disabled={!question.trim() || !answer.trim()}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066acb] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ LIST */}
        {faqs.length > 0 ? (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={`${faq.question}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
              >
                <div className="flex items-start gap-3">
                  {/* NUMBER */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#062B63] text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-6 text-[#0F172A]">
                      {faq.question}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      {faq.answer}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveFAQ(index, "up")}
                      disabled={index === 0}
                      aria-label={`Move FAQ ${index + 1} up`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-slate-100 hover:text-[#062B63] disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveFAQ(index, "down")}
                      disabled={index === faqs.length - 1}
                      aria-label={`Move FAQ ${index + 1} down`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-slate-100 hover:text-[#062B63] disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <ArrowDown size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFAQ(index)}
                      aria-label={`Remove FAQ ${index + 1}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
            <HelpCircle
              size={24}
              className="mx-auto text-slate-400"
            />

            <p className="mt-2 text-sm font-medium text-[#64748B]">
              No service FAQs added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add common questions customers may ask about this service.
            </p>
          </div>
        )}

        {/* VALIDATION ERROR */}
        {errors.faqs?.message && (
          <p className="mt-3 text-sm text-red-600">
            {String(errors.faqs.message)}
          </p>
        )}
      </div>
    </section>
  );
}