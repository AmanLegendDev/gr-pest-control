"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ClipboardList,
  Plus,
  Trash2,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type ServiceProcessProps = {
  watch: UseFormWatch<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

type ProcessStep = CreateServiceInput["process"][number];

const createEmptyStep = (sortOrder: number): ProcessStep => ({
  title: "",
  description: "",
  sortOrder,
});

export default function ServiceProcess({
  watch,
  setValue,
  errors,
}: ServiceProcessProps) {
  const process = watch("process") ?? [];

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addStep = () => {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      return;
    }

    const newStep: ProcessStep = {
      title: cleanTitle,
      description: cleanDescription,
      sortOrder: process.length,
    };

    setValue("process", [...process, newStep], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const removeStep = (index: number) => {
    const updatedSteps = process
      .filter((_, stepIndex) => stepIndex !== index)
      .map((step, stepIndex) => ({
        ...step,
        sortOrder: stepIndex,
      }));

    setValue("process", updatedSteps, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= process.length) {
      return;
    }

    const updatedSteps = [...process];

    [updatedSteps[index], updatedSteps[targetIndex]] = [
      updatedSteps[targetIndex],
      updatedSteps[index],
    ];

    const normalizedSteps = updatedSteps.map((step, stepIndex) => ({
      ...step,
      sortOrder: stepIndex,
    }));

    setValue("process", normalizedSteps, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const cancelNewStep = () => {
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ClipboardList size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Service Process
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Explain the main steps involved in delivering this service.
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
            Add Step
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {/* ADD STEP FORM */}
        {showForm && (
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#0F172A]">
                New Process Step
              </h3>

              <p className="mt-1 text-xs text-[#64748B]">
                Add a clear step that explains how this service is delivered.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="process-step-title"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Step Title
                </label>

                <input
                  id="process-step-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                  placeholder="e.g. Property Assessment"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="process-step-description"
                  className="mb-2 block text-sm font-semibold text-[#0F172A]"
                >
                  Description
                </label>

                <textarea
                  id="process-step-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  maxLength={500}
                  rows={4}
                  placeholder="Briefly explain what happens during this step..."
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {description.length}/500
                </p>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelNewStep}
                  className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addStep}
                  disabled={!title.trim() || !description.trim()}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066acb] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEPS */}
        {process.length > 0 ? (
          <div className="space-y-3">
            {process.map((step, index) => (
              <div
                key={`${step.sortOrder}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
              >
                <div className="flex items-start gap-3">
                  {/* NUMBER */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#062B63] text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#0F172A]">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#64748B]">
                      {step.description}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(index, "up")}
                      disabled={index === 0}
                      aria-label={`Move ${step.title} up`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-slate-100 hover:text-[#062B63] disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveStep(index, "down")}
                      disabled={index === process.length - 1}
                      aria-label={`Move ${step.title} down`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition hover:bg-slate-100 hover:text-[#062B63] disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <ArrowDown size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      aria-label={`Remove ${step.title}`}
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
            <ClipboardList
              size={24}
              className="mx-auto text-slate-400"
            />

            <p className="mt-2 text-sm font-medium text-[#64748B]">
              No process steps added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add the steps customers should expect from this service.
            </p>
          </div>
        )}

        {/* VALIDATION ERROR */}
        {errors.process?.message && (
          <p className="mt-3 text-sm text-red-600">
            {String(errors.process.message)}
          </p>
        )}
      </div>
    </section>
  );
}