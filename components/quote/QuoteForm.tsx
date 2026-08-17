"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  quoteRequestSchema,
} from "@/features/quote-requests/validation/quoteRequestSchema";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";

import QuoteProgress from "./QuoteProgress";
import QuoteStepOne from "./QuoteStepOne";
import QuoteStepTwo from "./QuoteStepTwo";
import QuoteStepThree from "./QuoteStepThree";

import {
  INITIAL_QUOTE_DATA,
} from "./quote.constants";

interface ServiceOption {
  id: string;
  title: string;
  slug: string;
}

interface QuoteFormProps {
  services: ServiceOption[];
}

type FieldErrors = {
  name?: string;
  phone?: string;
  email?: string;

  serviceId?: string;
  propertyType?: string;

  suburb?: string;
  address?: string;
  pestProblem?: string;

  preferredDate?: string;
  preferredTime?: string;
};

export default function QuoteForm({
  services,
}: QuoteFormProps) {
  const router = useRouter();
const searchParams = useSearchParams();

const [currentStep, setCurrentStep] =
  useState(1);

const [data, setData] =
  useState<QuoteFormData>(
    INITIAL_QUOTE_DATA,
  );


  useEffect(() => {
  try {
    const stored =
      sessionStorage.getItem(
        "gr-quote-request",
      );

    if (stored) {
      const parsed =
        JSON.parse(stored) as QuoteFormData;

      setData(parsed);
    }

    const step =
      searchParams.get("step");

    if (
      step === "1" ||
      step === "2" ||
      step === "3"
    ) {
      setCurrentStep(
        Number(step) as 1 | 2 | 3,
      );
    }
  } catch (error) {
    console.error(
      "Failed to restore quote data:",
      error,
    );

    sessionStorage.removeItem(
      "gr-quote-request",
    );
  }
}, [searchParams]);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  /*
   * --------------------------------------------------
   * Update helpers
   * --------------------------------------------------
   */

  const updateCustomer = (
    field: keyof QuoteFormData["customer"],
    value: string,
  ) => {
    setData((previous) => ({
      ...previous,

      customer: {
        ...previous.customer,
        [field]: value,
      },
    }));

    clearError(field);
  };

  const updateLocation = (
    field: keyof QuoteFormData["location"],
    value: string,
  ) => {
    setData((previous) => ({
      ...previous,

      location: {
        ...previous.location,
        [field]: value,
      },
    }));

    clearError(field);
  };

  const updateMainField = (
    field:
      | "serviceId"
      | "propertyType"
      | "pestProblem"
      | "preferredDate"
      | "preferredTime",
    value: string,
  ) => {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));

    clearError(field);
  };

  /*
   * --------------------------------------------------
   * Error helper
   * --------------------------------------------------
   */

  const clearError = (
    field: keyof FieldErrors,
  ) => {
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };

  /*
   * --------------------------------------------------
   * Validation
   * --------------------------------------------------
   */

  const validateCurrentStep =
    (): boolean => {
      const result =
        quoteRequestSchema.safeParse(
          data,
        );

      /*
       * If everything is valid,
       * current step is automatically valid.
       */
      if (result.success) {
        setErrors({});
        return true;
      }

      const nextErrors: FieldErrors =
        {};

      for (const issue of result.error
        .issues) {
        const path = issue.path.join(".");

        switch (path) {
          case "customer.name":
            nextErrors.name =
              issue.message;
            break;

          case "customer.phone":
            nextErrors.phone =
              issue.message;
            break;

          case "customer.email":
            nextErrors.email =
              issue.message;
            break;

          case "serviceId":
            nextErrors.serviceId =
              issue.message;
            break;

          case "propertyType":
            nextErrors.propertyType =
              issue.message;
            break;

          case "location.suburb":
            nextErrors.suburb =
              issue.message;
            break;

          case "location.address":
            nextErrors.address =
              issue.message;
            break;

          case "pestProblem":
            nextErrors.pestProblem =
              issue.message;
            break;

          case "preferredDate":
            nextErrors.preferredDate =
              issue.message;
            break;

          case "preferredTime":
            nextErrors.preferredTime =
              issue.message;
            break;
        }
      }

      setErrors(nextErrors);

      return false;
    };

  /*
   * --------------------------------------------------
   * Step-specific validation
   * --------------------------------------------------
   */

  const validateStepOne =
    (): boolean => {
      const result =
        quoteRequestSchema.shape.customer.safeParse(
          data.customer,
        );

      if (result.success) {
        setErrors((previous) => ({
          ...previous,
          name: undefined,
          phone: undefined,
          email: undefined,
        }));

        return true;
      }

      const nextErrors: FieldErrors =
        {};

      for (const issue of result.error
        .issues) {
        const field = issue.path[0];

        if (
          field === "name" ||
          field === "phone" ||
          field === "email"
        ) {
          nextErrors[field] =
            issue.message;
        }
      }

      setErrors((previous) => ({
        ...previous,
        ...nextErrors,
      }));

      return false;
    };

  const validateStepTwo =
    (): boolean => {
      const result =
        quoteRequestSchema.safeParse(
          data,
        );

      if (result.success) {
        return true;
      }

      const nextErrors: FieldErrors =
        {};

      for (const issue of result.error
        .issues) {
        const path =
          issue.path.join(".");

        if (path === "serviceId") {
          nextErrors.serviceId =
            issue.message;
        }

        if (path === "propertyType") {
          nextErrors.propertyType =
            issue.message;
        }

        if (path === "location.suburb") {
          nextErrors.suburb =
            issue.message;
        }

        if (path === "location.address") {
          nextErrors.address =
            issue.message;
        }

        if (path === "pestProblem") {
          nextErrors.pestProblem =
            issue.message;
        }
      }

      setErrors((previous) => ({
        ...previous,
        ...nextErrors,
      }));

      return (
        !nextErrors.serviceId &&
        !nextErrors.propertyType &&
        !nextErrors.suburb &&
        !nextErrors.address &&
        !nextErrors.pestProblem
      );
    };

  const validateStepThree =
    (): boolean => {
      const result =
        quoteRequestSchema.safeParse(
          data,
        );

      if (result.success) {
        return true;
      }

      const nextErrors: FieldErrors =
        {};

      for (const issue of result.error
        .issues) {
        const path =
          issue.path.join(".");

        if (path === "preferredDate") {
          nextErrors.preferredDate =
            issue.message;
        }

        if (path === "preferredTime") {
          nextErrors.preferredTime =
            issue.message;
        }
      }

      setErrors((previous) => ({
        ...previous,
        ...nextErrors,
      }));

      return (
        !nextErrors.preferredDate &&
        !nextErrors.preferredTime
      );
    };

  /*
   * --------------------------------------------------
   * Next
   * --------------------------------------------------
   */

  const handleNext = () => {
    let valid = false;

    if (currentStep === 1) {
      valid = validateStepOne();
    }

    if (currentStep === 2) {
      valid = validateStepTwo();
    }

    if (currentStep === 3) {
      valid = validateStepThree();
    }

    if (!valid) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(
        (previous) => previous + 1,
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
     * Step 3 complete.
     *
     * We intentionally do NOT submit
     * anything to MongoDB here.
     *
     * The complete data is temporarily
     * stored in sessionStorage and the
     * review page will use it.
     */
    sessionStorage.setItem(
      "gr-quote-request",
      JSON.stringify(data),
    );

    router.push("/quote/review");
  };

  /*
   * --------------------------------------------------
   * Back
   * --------------------------------------------------
   */

  const handleBack = () => {
    if (currentStep === 1) {
      router.back();
      return;
    }

    setErrors({});

    setCurrentStep(
      (previous) => previous - 1,
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------
   * Current step content
   * --------------------------------------------------
   */

  const stepContent = useMemo(() => {
    if (currentStep === 1) {
      return (
        <QuoteStepOne
          data={data.customer}
          onChange={updateCustomer}
          errors={{
            name: errors.name,
            phone: errors.phone,
            email: errors.email,
          }}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <QuoteStepTwo
          data={{
            serviceId: data.serviceId,
            propertyType:
              data.propertyType,
            location: data.location,
            pestProblem:
              data.pestProblem,
          }}
          services={services}
          onChange={(
            field,
            value,
          ) => {
            updateMainField(
              field,
              value,
            );
          }}
          onLocationChange={
            updateLocation
          }
          errors={{
            serviceId:
              errors.serviceId,
            propertyType:
              errors.propertyType,
            suburb:
              errors.suburb,
            address:
              errors.address,
            pestProblem:
              errors.pestProblem,
          }}
        />
      );
    }

    return (
      <QuoteStepThree
        data={{
          preferredDate:
            data.preferredDate,
          preferredTime:
            data.preferredTime,
        }}
        onChange={(
          field,
          value,
        ) => {
          updateMainField(
            field,
            value,
          );
        }}
        errors={{
          preferredDate:
            errors.preferredDate,
          preferredTime:
            errors.preferredTime,
        }}
      />
    );
  }, [
    currentStep,
    data,
    errors,
    services,
  ]);

  return (
    <div className="w-full">
      {/* Progress */}
      <QuoteProgress
        currentStep={currentStep}
      />

      {/* Form card */}
      <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:mt-10 sm:rounded-[32px]">
        <div className="p-5 sm:p-8 lg:p-10">
          {stepContent}
        </div>

        {/* Navigation */}
        <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-8 sm:py-6 lg:px-10">
          <div className="flex items-center justify-between gap-3">
            {/* Back */}
            <button
              type="button"
              onClick={
                handleBack
              }
              className="
                inline-flex
                min-h-12
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-bold
                text-[#062B63]
                shadow-sm
                transition-all
                duration-200
                hover:border-slate-300
                hover:bg-slate-50
                active:scale-[0.98]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-200
              "
            >
              <ArrowLeft
                size={16}
              />

              <span className="hidden sm:inline">
                Back
              </span>
            </button>

            {/* Next / Review */}
            <button
              type="button"
              onClick={
                handleNext
              }
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0878E8]
                px-6
                text-sm
                font-bold
                text-white
                shadow-[0_10px_25px_rgba(8,120,232,0.20)]
                transition-all
                duration-200
                hover:bg-[#066BCF]
                hover:shadow-[0_12px_30px_rgba(8,120,232,0.25)]
                active:scale-[0.98]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-200
                focus-visible:ring-offset-2
              "
            >
              <span>
                {currentStep === 3
                  ? "Continue to Review"
                  : "Continue"}
              </span>

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Small reassurance */}
      <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
        Your information is only used to
        respond to your quote request.
      </p>
    </div>
  );
}