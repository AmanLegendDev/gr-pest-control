import {
  ArrowDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

interface ContactHeroProps {
  businessName: string;
  city?: string;
  phone?: string;
  email?: string;
}

export default function ContactHero({
  businessName,
  city,
  phone,
  email,
}: ContactHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        pb-14
        pt-10
        sm:px-6
        sm:pb-18
        sm:pt-14
        lg:px-8
        lg:pb-20
        lg:pt-16
      "
    >
      {/* =========================
          BACKGROUND
      ========================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-100/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-80
          w-80
          rounded-full
          bg-white
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[1fr_0.72fr]
            lg:gap-20
          "
        >
          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white
                px-3.5
                py-2
                shadow-[0_6px_20px_rgba(15,23,42,0.04)]
              "
            >
              <MessageCircle
                size={13}
                className="text-[#0878E8]"
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-[#0878E8]
                "
              >
                We're here to help
              </span>
            </div>

            <h1
              className="
                mt-6
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-[-0.055em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[4rem]
              "
            >
              Let's talk about
              <br />

              <span className="text-[#0878E8]">
                your pest problem.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                sm:leading-8
              "
            >
              Have a question, need help choosing
              the right treatment, or simply want
              to speak with our team? Reach{" "}
              {businessName} directly.
            </p>

            {/* Quick details */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              {city && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-100
                    bg-white
                    px-4
                    py-3
                    shadow-[0_6px_20px_rgba(15,23,42,0.035)]
                  "
                >
                  <MapPin
                    size={14}
                    className="text-[#0878E8]"
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      text-[#062B63]
                    "
                  >
                    Serving {city}
                  </span>
                </div>
              )}

              {phone && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-100
                    bg-white
                    px-4
                    py-3
                    shadow-[0_6px_20px_rgba(15,23,42,0.035)]
                  "
                >
                  <Phone
                    size={14}
                    className="text-[#0878E8]"
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      text-[#062B63]
                    "
                  >
                    {phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* =========================
              RIGHT CONTACT CARD
          ========================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-md
              lg:ml-auto
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-[#062B63]
                p-7
                shadow-[0_25px_65px_rgba(6,43,99,0.14)]
                sm:p-8
              "
            >
              {/* Decorative circles */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-20
                  -left-14
                  h-44
                  w-44
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-blue-100
                "
              >
                <Phone size={21} />
              </div>

              <p
                className="
                  relative
                  mt-7
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-blue-200
                "
              >
                Get in touch
              </p>

              <h2
                className="
                  relative
                  mt-2
                  text-2xl
                  font-extrabold
                  leading-tight
                  tracking-[-0.035em]
                  text-white
                "
              >
                Speak with our team.
              </h2>

              <p
                className="
                  relative
                  mt-3
                  text-sm
                  leading-6
                  text-blue-100/70
                "
              >
                Choose whichever contact method
                is easiest for you.
              </p>

              <div
                className="
                  relative
                  mt-7
                  space-y-3
                  border-t
                  border-white/10
                  pt-5
                "
              >
                {phone && (
                  <a
                    href={`tel:${phone.replace(
                      /[^0-9+]/g,
                      "",
                    )}`}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-white/5
                      px-4
                      py-3.5
                      transition-colors
                      hover:bg-white/10
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/10
                        text-blue-100
                      "
                    >
                      <Phone size={15} />
                    </span>

                    <span className="min-w-0">
                      <span
                        className="
                          block
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-blue-100/45
                        "
                      >
                        Call
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          truncate
                          text-xs
                          font-extrabold
                          text-white
                        "
                      >
                        {phone}
                      </span>
                    </span>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-white/5
                      px-4
                      py-3.5
                      transition-colors
                      hover:bg-white/10
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/10
                        text-blue-100
                      "
                    >
                      <Mail size={15} />
                    </span>

                    <span className="min-w-0">
                      <span
                        className="
                          block
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-blue-100/45
                        "
                      >
                        Email
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          truncate
                          text-xs
                          font-extrabold
                          text-white
                        "
                      >
                        {email}
                      </span>
                    </span>
                  </a>
                )}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-white/5
                    px-4
                    py-3.5
                  "
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                      text-blue-100
                    "
                  >
                    <Clock3 size={15} />
                  </span>

                  <span>
                    <span
                      className="
                        block
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-blue-100/45
                      "
                    >
                      Need a quote?
                    </span>

                    <span
                      className="
                        mt-0.5
                        block
                        text-xs
                        font-extrabold
                        text-white
                      "
                    >
                      We're ready to help
                    </span>
                  </span>
                </div>
              </div>

              <div
                className="
                  relative
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-blue-100/40
                "
              >
                <ArrowDown size={12} />

                Choose a contact option below
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}