export type QuotePropertyType =
  | "residential"
  | "commercial";

export interface QuoteFormData {
  customer: {
    name: string;
    phone: string;
    email: string;
  };

  serviceId: string;

  propertyType: QuotePropertyType;

  location: {
    suburb: string;
    address: string;
  };

  pestProblem: string;

  preferredDate: string;

  preferredTime: string;
}