import type {
    ApiCompany,
    ApiOffDay,
    ApiOperatingHours,
    ApiService,
    ApiSettings,
    CompanyForm,
    ConfigType,
    ExistingOffDay,
    ExistingService,
    OperatingHoursForm,
    SettingsForm,
  } from "@/types/SettingsType";
  
  export function toOperatingHoursForm(api: ApiOperatingHours): OperatingHoursForm {
    return {
      id: api.id,
      weekday: api.weekday,
      isActive: api.isActive,
      startTime: api.startTime,
      endTime: api.endTime,
      lunchStartTime: api.lunchStartTime ?? "",
      lunchEndTime: api.lunchEndTime ?? "",
    };
  }
  
  export function toOffDayForm(api: ApiOffDay): ExistingOffDay {
    return {
      id: api.id,
      date: api.date,
      reason: api.reason,
      offDaysType: api.offDaysType,
    };
  }
  
  export function toServiceForm(api: ApiService): ExistingService {
    return {
      id: api.id,
      name: api.name,
      description: api.description ?? "",
      durationInMinutes: api.durationInMinutes ?? 30, // fallback seguro
      price: api.price ?? 0,
      isActive: api.isActive,
    };
  }
  
  export function toSettingsForm(api: ApiSettings): SettingsForm {
    return {
      id: api.id,
      appointmentInterval: api.appointmentInterval,
      maxCancellationInterval: api.maxCancellationInterval,
      operatingHours: api.operatingHours.map(toOperatingHoursForm),
      offDays: api.offDays.map(toOffDayForm),
      services: api.services.map(toServiceForm),
    };
  }
  
  export function toCompanyForm(api: ApiCompany): CompanyForm {
    return {
      id: api.id,
      name: api.name,
      email: api.email,
      phone: api.phone,
      address: api.address,
    };
  }
  
  export function toConfigType(company: ApiCompany, settings: ApiSettings): ConfigType {
    return {
      company: toCompanyForm(company),
      settings: toSettingsForm(settings),
    };
  }
  