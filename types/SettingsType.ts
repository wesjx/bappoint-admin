// ─── Enums ────────────────────────────────────────────────────────────────────
export type WeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type AppointmentInterval =
  | "MINUTES_15"
  | "MINUTES_30"
  | "MINUTES_45"
  | "MINUTES_60";

export type OffDayType =
  | "HOLIDAY"
  | "VACATION"
  | "PERSONAL_LEAVE"
  | "OTHER";

// ─── Tipos da API (o que vem do backend) ──────────────────────────────────────

export interface ApiOperatingHours {
  id: string;
  weekday: WeekDay;
  isActive: boolean;
  startTime: string;
  endTime: string;
  lunchStartTime?: string;
  lunchEndTime?: string;
}

export interface ApiOffDay {
  id: string;
  date: string;
  reason: string;
  offDaysType: OffDayType;
}

export interface ApiService {
  id: string;
  name: string;
  description?: string;
  durationInMinutes?: number;
  price?: number;
  isActive: boolean;
}

export interface ApiSettings {
  id: string;
  appointmentInterval: AppointmentInterval;
  maxCancellationInterval: number;
  offDays: ApiOffDay[];
  operatingHours: ApiOperatingHours[];
  services: ApiService[];
}

export interface ApiCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OperatingHoursForm {
  id: string;          
  weekday: WeekDay;
  isActive: boolean;
  startTime: string;
  endTime: string;
  lunchStartTime: string; 
  lunchEndTime: string;
}

export interface ExistingOffDay {
  id: string;          
  date: string;
  reason: string;
  offDaysType: OffDayType;
}

export interface NewOffDay {
  id?: never;           
  date: string;
  reason: string;
  offDaysType: OffDayType;
}

export type OffDayForm = ExistingOffDay | NewOffDay;

export interface ExistingService {
  id: string;           
  name: string;
  description: string;  
  durationInMinutes: number;
  price: number;
  isActive: boolean;
}

export interface NewService {
  id?: never;           
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
  isActive: boolean;
}

export type ServiceForm = ExistingService | NewService;

export interface SettingsForm {
  id: string;
  appointmentInterval: AppointmentInterval;
  maxCancellationInterval: number;
  offDays: OffDayForm[];
  operatingHours: OperatingHoursForm[];
  services: ServiceForm[];
}

export interface CompanyForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ConfigType {
  company: CompanyForm;
  settings: SettingsForm;
}
