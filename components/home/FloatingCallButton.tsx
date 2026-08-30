import { Phone } from "lucide-react";

interface FloatingCallButtonProps {
  phone: string;
  businessName: string;
}

export default function FloatingCallButton({
  phone,
  businessName,
}: FloatingCallButtonProps) {
  if (!phone?.trim()) {
    return null;
  }

  return (
    <a
      href={`tel:${phone}`}
      aria-label={`Call ${businessName}`}
      title="Call Now"
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#0878E8]
        text-white
        shadow-[0_12px_35px_rgba(8,120,232,0.30)]
        ring-4
        ring-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-105
        hover:bg-[#066BCF]
        hover:shadow-[0_16px_42px_rgba(8,120,232,0.38)]
        focus:outline-none
        focus-visible:ring-4
        focus-visible:ring-blue-200
        sm:bottom-6
        sm:right-6
      "
    >
      <Phone
        size={22}
        strokeWidth={2.7}
        aria-hidden="true"
      />
    </a>
  );
}