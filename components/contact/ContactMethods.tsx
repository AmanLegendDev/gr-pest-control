import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

interface ContactMethodsProps {
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export default function ContactMethods({
  phone,
  email,
  whatsapp,
}: ContactMethodsProps) {
  const phoneHref = phone
    ? `tel:${phone.replace(
        /[^0-9+]/g,
        "",
      )}`
    : "";

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(
        /[^0-9]/g,
        "",
      )}`
    : "";

  const methods = [
    {
      label: "Call us",
      title: phone || "Call our team",
      description:
        "Speak directly with our team.",
      href: phoneHref,
      icon: Phone,
      iconClass:
        "bg-blue-50 text-[#0878E8]",
    },
    {
      label: "WhatsApp",
      title:
        whatsapp || "Chat with us",
      description:
        "Send us a message on WhatsApp.",
      href: whatsappHref,
      icon: MessageCircle,
      iconClass:
        "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Email",
      title:
        email || "Email our team",
      description:
        "Send us your questions anytime.",
      href: email
        ? `mailto:${email}`
        : "",
      icon: Mail,
      iconClass:
        "bg-violet-50 text-violet-600",
    },
  ];

  const availableMethods =
    methods.filter(
      (method) => method.href,
    );

  if (
    availableMethods.length === 0
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
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Contact options
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
              Reach us your way.
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-xs
              leading-6
              text-slate-400
              sm:text-right
            "
          >
            Pick the option that's easiest for
            you. Our team is ready to help.
          </p>
        </div>

        {/* =========================
            CARDS
        ========================== */}

        <div
          className="
            mt-8
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {availableMethods.map(
            (method) => {
              const Icon =
                method.icon;

              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={
                    method.label ===
                    "WhatsApp"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    method.label ===
                    "WhatsApp"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-100
                    bg-[#F8FAFC]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white
                    hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#0878E8]
                    focus-visible:ring-offset-2
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        transition-transform
                        duration-300
                        group-hover:scale-105
                        ${method.iconClass}
                      `}
                    >
                      <Icon size={19} />
                    </div>

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-slate-300
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:bg-[#0878E8]
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight
                        size={14}
                      />
                    </span>
                  </div>

                  <p
                    className="
                      mt-6
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    {method.label}
                  </p>

                  <h3
                    className="
                      mt-1.5
                      truncate
                      text-base
                      font-extrabold
                      tracking-[-0.02em]
                      text-[#062B63]
                      transition-colors
                      group-hover:text-[#0878E8]
                    "
                  >
                    {method.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-6
                      text-slate-400
                    "
                  >
                    {method.description}
                  </p>
                </a>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}