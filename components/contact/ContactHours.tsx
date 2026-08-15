import {
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface BusinessHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface ContactHoursProps {
  businessHours: BusinessHour[];
}

export default function ContactHours({
  businessHours,
}: ContactHoursProps) {
  if (
    !businessHours ||
    businessHours.length === 0
  ) {
    return null;
  }

  return (
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
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            gap-8
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-start
            lg:gap-16
          "
        >
          {/* =========================
              LEFT
          ========================== */}

          <div>
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-[#0878E8]
              "
            >
              <Clock3 size={20} />
            </div>

            <p
              className="
                mt-6
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Opening hours
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
              When you can reach us.
            </h2>

            <p
              className="
                mt-3
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >
              Check our regular business hours
              before planning your visit or
              contacting the team.
            </p>

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-emerald-50
                px-3.5
                py-2
                text-[10px]
                font-extrabold
                text-emerald-600
              "
            >
              <CheckCircle2 size={13} />

              Hours may vary on holidays
            </div>
          </div>

          {/* =========================
              HOURS CARD
          ========================== */}

          <div
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-slate-100
              bg-[#F8FAFC]
              shadow-[0_10px_35px_rgba(15,23,42,0.035)]
            "
          >
            {businessHours.map(
              (hour, index) => (
                <div
                  key={`${hour.day}-${index}`}
                  className={`
                    flex
                    min-h-[58px]
                    items-center
                    justify-between
                    gap-5
                    px-5
                    py-3
                    sm:px-6
                    ${
                      index !==
                      businessHours.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }
                  `}
                >
                  {/* Day */}

                  <span
                    className="
                      text-xs
                      font-extrabold
                      text-[#062B63]
                    "
                  >
                    {hour.day}
                  </span>

                  {/* Time */}

                  {hour.closed ? (
                    <span
                      className="
                        rounded-full
                        bg-red-50
                        px-3
                        py-1.5
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.08em]
                        text-red-500
                      "
                    >
                      Closed
                    </span>
                  ) : (
                    <span
                      className="
                        text-xs
                        font-bold
                        text-slate-500
                      "
                    >
                      {hour.open &&
                      hour.close
                        ? `${hour.open} – ${hour.close}`
                        : "Available"}
                    </span>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}