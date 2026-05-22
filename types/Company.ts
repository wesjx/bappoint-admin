export interface CompanySettings {
  id: string;
  appointmentInterval: string;
  maxCancellationInterval: number;
  offDays: any[];
  operatingHours: any[];
  services: any[]; 
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
}

export type CompanyFormData = Omit<Company, "id">
