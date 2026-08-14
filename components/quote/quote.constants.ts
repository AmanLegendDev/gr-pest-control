export const QUOTE_STEPS = [
  {
    id: 1,
    label: "Your Details",
    shortLabel: "Details",
  },
  {
    id: 2,
    label: "Service & Location",
    shortLabel: "Service",
  },
  {
    id: 3,
    label: "Preferred Time",
    shortLabel: "Date & Time",
  },
] as const;

export const PROPERTY_TYPES = [
  {
    value: "residential" as const,
    label: "Residential",
    description: "Home, apartment or other residential property",
  },
  {
    value: "commercial" as const,
    label: "Commercial",
    description: "Shop, office or other business property",
  },
] as const;

export const PREFERRED_TIME_SLOTS = [
  {
    value: "8:00 AM - 10:00 AM",
    label: "8:00 AM – 10:00 AM",
  },
  {
    value: "10:00 AM - 12:00 PM",
    label: "10:00 AM – 12:00 PM",
  },
  {
    value: "12:00 PM - 2:00 PM",
    label: "12:00 PM – 2:00 PM",
  },
  {
    value: "2:00 PM - 4:00 PM",
    label: "2:00 PM – 4:00 PM",
  },
  {
    value: "4:00 PM - 6:00 PM",
    label: "4:00 PM – 6:00 PM",
  },
] as const;

export const INITIAL_QUOTE_DATA = {
  customer: {
    name: "",
    phone: "",
    email: "",
  },

  serviceId: "",

  propertyType:
    "residential" as
      | "residential"
      | "commercial",

  location: {
    suburb: "",
    address: "",
  },

  pestProblem: "",

  preferredDate: "",

  preferredTime: "",
};

export const QUOTE_FORM_COPY = {
  eyebrow: "Request a Free Quote",

  title: "Tell us what you need.",

  description:
    "A few quick details will help our team understand your pest problem and arrange the right service for you.",

  stepOne: {
    title: "Let's start with you.",
    description:
      "Tell us how we can contact you about your request.",
  },

  stepTwo: {
    title: "Tell us about the property.",
    description:
      "Choose the service and give us the location details.",
  },

  stepThree: {
    title: "When would suit you?",
    description:
      "Choose your preferred date and time. Our team will confirm availability.",
  },

  review: {
    title: "Review your request.",
    description:
      "Please check your details before sending your quote request.",
  },
} as const;