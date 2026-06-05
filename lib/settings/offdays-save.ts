import { Company } from "@/types/Company";
import { ConfigType } from "@/types/SettingsType";
import { createOffDay, deleteOffDay } from "../settings-api";

export async function saveOffDay(
    companyId: string,
    config: ConfigType,
    company: Company,
    token: string
){
    const originalOffDays = config.settings?.offDays ?? [];
    const currentOffDays = config.settings.offDays ?? [];

    const originalOffDayIds = new Set(
        originalOffDays.map((o: any) => o.id).filter(Boolean)
      );

      const currentOffDayIds = new Set(
        currentOffDays.map((o) => o.id).filter(Boolean)
      );
    
      const toCreate = currentOffDays.filter(
        (o) => !o.id || !originalOffDayIds.has(o.id)
      );
      const toDelete = originalOffDays.filter(
        (o: any) => o.id && !currentOffDayIds.has(o.id)
      );
      return Promise.all([
        ...toCreate.map((offDay) =>
          createOffDay(
            companyId,
            {
              date: offDay.date,
              reason: offDay.reason,
              offDaysType: offDay.offDaysType,
            },
            token
          )
        ),
        ...toDelete.map((offDay: any) =>
          deleteOffDay(companyId, offDay.id, token)
        ),
      ]
    );
}