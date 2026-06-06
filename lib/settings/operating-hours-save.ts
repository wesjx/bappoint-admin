import { Company } from "@/types/Company";
import { ConfigType } from "@/types/SettingsType";
import { createOperatingHours, updateOperatingHours } from "../settings-api";

export async function saveOperatingHours(companyId: string, config: ConfigType, company: Company, token: string) {
    await Promise.all(
                config.settings.operatingHours.map((hour) => {
                  const payload = {
                    weekday: hour.weekday,
                    isActive: hour.isActive,
                    startTime: hour.startTime,
                    endTime: hour.endTime,
                    lunchStartTime: hour.lunchStartTime ?? null,
                    lunchEndTime: hour.lunchEndTime ?? null,
                  };
          
                  if (hour.id) {
                    return updateOperatingHours(companyId, hour.id, payload, token);
                  }
          
                  return createOperatingHours(companyId, payload, token);
                })
              );
}