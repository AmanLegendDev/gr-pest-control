import type {
  QuotePropertyType,
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

/* =========================================================
   PUBLIC QUOTE FORM DATA
========================================================= */

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

/* =========================================================
   CUSTOMER
========================================================= */

export interface QuoteRequestCustomerViewModel {
  name: string;
  phone: string;
  email: string;
}

/* =========================================================
   SERVICE
========================================================= */

export interface QuoteRequestServiceViewModel {
  id: string;
  title: string;
  slug: string;
}

/* =========================================================
   LOCATION
========================================================= */

export interface QuoteRequestLocationViewModel {
  suburb: string;
  address: string;
}

/* =========================================================
   ADMIN VIEW MODEL
========================================================= */

export interface QuoteRequestAdminViewModel {
  id: string;

  requestNumber: number;
  referenceNumber: string;

  customer: QuoteRequestCustomerViewModel;

  service: QuoteRequestServiceViewModel;

  propertyType: QuotePropertyType;

  location: QuoteRequestLocationViewModel;

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  status: QuoteRequestStatus;

  archived: boolean;

  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   PUBLIC VIEW MODEL
========================================================= */

export interface QuoteRequestPublicViewModel {
  id: string;

  requestNumber: number;
  referenceNumber: string;

  customer: QuoteRequestCustomerViewModel;

  service: QuoteRequestServiceViewModel;

  propertyType: QuotePropertyType;

  location: QuoteRequestLocationViewModel;

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  status: QuoteRequestStatus;

  createdAt: string;
}