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

export interface CompanyType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OperatingHoursType {
  id?: string;
  weekday: WeekDay;
  isActive: boolean;
  startTime: string;
  endTime: string;
  lunchStartTime?: string | null;
  lunchEndTime?: string | null;
}

export interface OffDayTypeModel {
  id?: string;
  date: string;
  reason: string;
  offDaysType: OffDayType;
}

export interface ServiceType {
  id?: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
}

export interface SettingsDataType {
  id?: string;
  appointmentInterval: AppointmentInterval;
  maxCancellationInterval: number;
  offDays: OffDayTypeModel[];
  operatingHours: OperatingHoursType[];
  services: ServiceType[];
}

export interface ConfigType {
  company: CompanyType;
  settings: SettingsDataType;
}
