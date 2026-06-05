import { Company } from "@/types/Company";
import { ConfigType } from "@/types/SettingsType";
import { updateCompany } from "../settings-api";

export async function saveCompanySettings(
    companyId: string,
    config: ConfigType,
    company: Company,
    token: string
){
    return updateCompany(
        companyId,
        {
          name: config.company.name,
          email: config.company.email,
          phone: config.company.phone,
          address: config.company.address,
          clerkUserId: company.clerkUserId,
          slug: company.slug,
          stripeAccountId: company.stripeAccountId ?? "",
          depositPercentage: config.company.depositPercentage,
          settings: {
            appointmentInterval: config.settings.appointmentInterval,
            maxCancellationInterval: config.settings.maxCancellationInterval,
          },
        },
        token
      );
}