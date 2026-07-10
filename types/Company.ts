import { ServiceType } from "./SettingsType";


export interface CompanySettings {
  id: string;
  appointmentInterval: string;
  maxCancellationInterval: number;
  offDays: any[];
  operatingHours: any[];
  services: ServiceType[]; 
}

export interface Company {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  slug: string;
  settings: CompanySettings;
  stripeAccountId: string;
  depositPercentage: number;
}

export type CompanyFormData = Omit<Company, "id">
