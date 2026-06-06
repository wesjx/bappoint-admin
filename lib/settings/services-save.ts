import { Company } from "@/types/Company";
import { ConfigType } from "@/types/SettingsType";
import { createService, updateService } from "../settings-api";

export async function saveService(companyId: string, company: Company, config: ConfigType, service: any, token: string) {
    const currentServices = config.settings.services ?? [];

    await Promise.all(
        currentServices.map((service) => {
            const payload = {
                name: service.name,
                description: service.description ?? "",
                durationMinutes: service.durationMinutes,
                price: service.price,
                isActive: service.isActive,
            };

            if (service.id) {
                return updateService(companyId, service.id, payload, token);
            }

            return createService(companyId, payload, token);
        })
    );

}