import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface BusinessTopBarProps {
  settings: NavbarProps["settings"];
}

/* =========================================================
   HELPERS
========================================================= */

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function formatTime(value: string) {
  if (!value) return "";

  const [hour, minute] =
    value.split(":").map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return value;
  }

  const date = new Date();

  date.setHours(hour, minute, 0, 0);

  return new Intl.DateTimeFormat(
    "en-AU",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  ).format(date);
}

function getTodayName() {
  return new Intl.DateTimeFormat(
    "en-AU",
    {
      weekday: "long",
    },
  ).format(new Date());
}

/* =========================================================
   COMPONENT
========================================================= */

export default function BusinessTopBar({
  settings,
}: BusinessTopBarProps) {
  const phoneHref =
    `tel:${normalizePhone(settings.phone)}`;

  const emailHref =
    `mailto:${settings.email}`;

  const location = [
    settings.city,
    settings.state,
  ]
    .filter(Boolean)
    .join(", ");

  const todayName =
    getTodayName();

  const todayHours =
    settings.businessHours?.find(
      (item) =>
        item.day.toLowerCase() ===
        todayName.toLowerCase(),
    );

  const todayHoursLabel =
    todayHours?.closed
      ? "Closed today"
      : todayHours?.open &&
          todayHours?.close
        ? `${formatTime(todayHours.open)} – ${formatTime(todayHours.close)}`
        : "Contact for availability";

  return (
    <div
   className="
  sticky
  top-0
  z-[60]
  w-full
  border-b
  border-[#153B68]
  bg-[#062B63]
  text-white
"
    >
      <div
        className="
          mx-auto
          flex
          min-h-10
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-4
          py-2
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            DESKTOP CONTACT BAR
        ================================================== */}

        <div
          className="
            hidden
            min-w-0
            flex-1
            items-center
            justify-center
            gap-6
            text-[11px]
            font-semibold
            sm:flex
            lg:justify-start
            lg:gap-7
          "
        >
          {/* PHONE */}

          {settings.phone && (
            <a
              href={phoneHref}
              aria-label={`Call ${settings.businessName}`}
              className="
                group
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
                text-white/90
                transition-colors
                hover:text-white
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0878E8]/20
                  text-[#67D7FF]
                  transition-colors
                  group-hover:bg-[#0878E8]/30
                "
              >
                <Phone
                  size={10}
                  strokeWidth={2.8}
                />
              </span>

              <span>
                {settings.phone}
              </span>
            </a>
          )}

          {/* EMAIL */}

          {settings.email && (
            <a
              href={emailHref}
              aria-label={`Email ${settings.businessName}`}
              className="
                group
                inline-flex
                min-w-0
                items-center
                gap-2
                whitespace-nowrap
                text-white/75
                transition-colors
                hover:text-white
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                  text-white/60
                  transition-colors
                  group-hover:text-[#67D7FF]
                "
              >
                <Mail
                  size={10}
                  strokeWidth={2.8}
                />
              </span>

              <span className="max-w-[260px] truncate">
                {settings.email}
              </span>
            </a>
          )}

          {/* LOCATION */}

          {location && (
            <div
              className="
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
                text-white/75
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                  text-white/60
                "
              >
                <MapPin
                  size={10}
                  strokeWidth={2.8}
                />
              </span>

              <span>
                {location}
              </span>
            </div>
          )}

          {/* TODAY HOURS */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              whitespace-nowrap
              text-white/75
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-white/5
                text-white/60
              "
            >
              <Clock3
                size={10}
                strokeWidth={2.8}
              />
            </span>

            <span>
              {todayHoursLabel}
            </span>
          </div>
        </div>

        {/* =================================================
            DESKTOP SOCIALS
        ================================================== */}

        <div
          className="
            hidden
            shrink-0
            items-center
            gap-4
            lg:flex
          "
        >
          {settings.socialLinks?.instagram && (
            <Link
              href={
                settings.socialLinks.instagram
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-white/45
                transition-colors
                hover:text-white
              "
            >
              Instagram
            </Link>
          )}

          {settings.socialLinks?.facebook && (
            <Link
              href={
                settings.socialLinks.facebook
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-white/45
                transition-colors
                hover:text-white
              "
            >
              Facebook
            </Link>
          )}

          {settings.socialLinks?.youtube && (
            <Link
              href={
                settings.socialLinks.youtube
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-white/45
                transition-colors
                hover:text-white
              "
            >
              YouTube
            </Link>
          )}
        </div>

        {/* =================================================
            MOBILE TOP ROW
        ================================================== */}

        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-3
            sm:hidden
          "
        >
          {settings.phone && (
            <a
              href={phoneHref}
              aria-label={`Call ${settings.businessName}`}
              className="
                inline-flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[10px]
                font-bold
                text-white
              "
            >
              <Phone
                size={11}
                strokeWidth={2.8}
              />

              <span>
                {settings.phone}
              </span>
            </a>
          )}

          <div
            className="
              inline-flex
              items-center
              gap-1.5
              whitespace-nowrap
              text-[10px]
              font-semibold
              text-white/85
            "
          >
            <Clock3
              size={11}
              strokeWidth={2.8}
            />

            <span>
              {todayHoursLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================
          MOBILE SECOND ROW
      ==================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-4
          border-t
          border-white/10
          px-4
          py-1.5
          sm:hidden
        "
      >
        {settings.email && (
          <a
            href={emailHref}
            aria-label={`Email ${settings.businessName}`}
            className="
              inline-flex
              min-w-0
              max-w-[55%]
              items-center
              gap-1.5
              text-[9px]
              font-medium
              text-white/70
            "
          >
            <Mail
              size={10}
              strokeWidth={2.8}
              className="shrink-0"
            />

            <span className="truncate">
              {settings.email}
            </span>
          </a>
        )}

        {location && (
          <span
            className="
              inline-flex
              min-w-0
              max-w-[45%]
              items-center
              gap-1.5
              text-[9px]
              font-medium
              text-white/70
            "
          >
            <MapPin
              size={10}
              strokeWidth={2.8}
              className="shrink-0"
            />

            <span className="truncate">
              {location}
            </span>
          </span>
        )}
      </div>

      {/* ===================================================
          ACCENT LINE
      ==================================================== */}

      <div
        aria-hidden="true"
        className="
          h-[2px]
          w-full
          bg-gradient-to-r
          from-[#0878E8]
          via-[#4FD1C5]
          to-[#0878E8]
        "
      />
    </div>
  );
}