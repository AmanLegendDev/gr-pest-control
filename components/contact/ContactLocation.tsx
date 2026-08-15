import {
  ExternalLink,
  MapPin,
} from "lucide-react";

interface ContactLocationProps {
  businessName: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export default function ContactLocation({
  businessName,
  address,
  city,
  state,
  pincode,
}: ContactLocationProps) {
  const locationParts = [
    address,
    city,
    state,
    pincode,
  ].filter(Boolean);

  const locationText =
    locationParts.join(", ");

  if (!locationText) {
    return null;
  }

  const mapQuery =
    encodeURIComponent(
      locationText,
    );

  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section
      className="
        bg-[#F8FAFC]
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
            overflow-hidden
            rounded-[30px]
            border
            border-slate-100
            bg-white
            shadow-[0_10px_35px_rgba(15,23,42,0.04)]
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* =========================
              LOCATION INFO
          ========================== */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-6
              sm:p-8
              lg:p-10
            "
          >
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
              <MapPin size={20} />
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
              Find us
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
              We're nearby.
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
              Visit or get directions to{" "}
              {businessName}.
            </p>

            {/* Address */}

            <address
              className="
                mt-6
                not-italic
                rounded-2xl
                border
                border-slate-100
                bg-[#F8FAFC]
                px-4
                py-4
                text-sm
                font-semibold
                leading-7
                text-slate-600
              "
            >
              {address && (
                <span className="block">
                  {address}
                </span>
              )}

              {(city || state) && (
                <span className="block">
                  {[city, state]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              )}

              {pincode && (
                <span className="block">
                  {pincode}
                </span>
              )}
            </address>

            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-5
                inline-flex
                min-h-11
                w-fit
                items-center
                gap-2
                rounded-full
                bg-[#062B63]
                px-5
                text-xs
                font-extrabold
                text-white
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#0878E8]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              Get directions

              <ExternalLink
                size={13}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>

          {/* =========================
              MAP AREA
          ========================== */}

          <div
            className="
              relative
              min-h-[300px]
              overflow-hidden
              bg-slate-100
              lg:min-h-[430px]
            "
          >
            <iframe
              title={`${businessName} location`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="
                absolute
                inset-0
                h-full
                w-full
                border-0
              "
            />

            {/* Map overlay label */}

            <div
              className="
                pointer-events-none
                absolute
                left-4
                top-4
                rounded-full
                border
                border-white/20
                bg-[#062B63]/90
                px-3.5
                py-2
                shadow-lg
                backdrop-blur-md
              "
            >
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.1em]
                  text-white
                "
              >
                <MapPin size={11} />

                Our location
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}