"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Settings, Clock, CalendarX, Bell } from "lucide-react";
import SettingsHeader from "@/components/settings/setting-header";
import OperatingHours from "@/components/settings/operating-hours";
import { OffDays } from "@/components/settings/off-days";
import SettingsServices from "@/components/settings/services";
import GeneralFunctions from "@/components/settings/general-settings";
import { useCompany } from "@/contexts/company-context";
import {
    AppointmentInterval,
    ConfigType,
    OffDayType,
    OperatingHoursType,
} from "@/types/SettingsType";
import {
    updateCompany,
    createOffDay,
    deleteOffDay,
    createOperatingHours,
    updateOperatingHours,
    createService,
    updateService,
    deleteService,
} from "@/lib/settings-api";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { saveCompanySettings } from "@/lib/settings/company-save";
import { saveOffDay } from "@/lib/settings/offdays-save";
import { saveOperatingHours } from "@/lib/settings/operating-hours-save";
import { saveService } from "@/lib/settings/services-save";


export default function SettingsPage() {
    const { getToken } = useAuth();

    const { company, loading } = useCompany();

    const [isSaving, setIsSaving] = useState(false);
    const [config, setConfig] = useState<ConfigType | null>(null);
    const [newOffDayDate, setNewOffDayDate] = useState<Date | undefined>(undefined);
    const [offDayReason, setOffDayReason] = useState("");
    const [offDayType, setOffDayType] = useState<OffDayType>("HOLIDAY");
    const [isOffDayDialogOpen, setIsOffDayDialogOpen] = useState(false);

    useEffect(() => {
        if (!company) return;

        setConfig({
            company: {
                id: company.id,
                name: company.name ?? "",
                email: company.email ?? "",
                phone: company.phone ?? "",
                address: company.address ?? "",
                depositPercentage: company.depositPercentage,
            },
            settings: {
                id: company.settings?.id,
                appointmentInterval:
                    (company.settings?.appointmentInterval as AppointmentInterval) ?? "MINUTES_15",
                maxCancellationInterval: company.settings?.maxCancellationInterval ?? 0,
                offDays: company.settings?.offDays ?? [],
                operatingHours: company.settings?.operatingHours ?? [],
                services: company.settings?.services ?? [],
            },
        });
    }, [company]);

    useEffect(() => {
        if (!config) return;
        console.log("🔧 Configuration updated:", config);
    }, [config]);

    const handleDeleteService = async (index: number, serviceId?: string) => {
        if (!config) return;
      
        if (!serviceId) {
          setConfig((prev) =>
            prev
              ? {
                  ...prev,
                  settings: {
                    ...prev.settings,
                    services: prev.settings.services.filter((_, i) => i !== index),
                  },
                }
              : prev
          );
          return;
        }
      
        try {
          const token = await getToken();
          if (!token) throw new Error("No auth token available");
      
          await deleteService(config.company.id, serviceId, token);
      
          setConfig((prev) =>
            prev
              ? {
                  ...prev,
                  settings: {
                    ...prev.settings,
                    services: prev.settings.services.filter(
                      (service) => service.id !== serviceId
                    ),
                  },
                }
              : prev
          );
      
          toast.success("Service deleted successfully!");
        } catch (error) {
          console.error("Failed to delete service:", error);
          toast.error("Failed to delete service.");
        }
      };
      
      const handleDeleteOffDay = async (index: number, offDayId?: string) => {
        if (!config) return;
      
        if (!offDayId) {
          setConfig((prev) =>
            prev
              ? {
                  ...prev,
                  settings: {
                    ...prev.settings,
                    offDays: prev.settings.offDays.filter((_, i) => i !== index),
                  },
                }
              : prev
          );
          return;
        }
      
        try {
          const token = await getToken();
          if (!token) throw new Error("No auth token available");
      
          await deleteOffDay(config.company.id, offDayId, token);
      
          setConfig((prev) =>
            prev
              ? {
                  ...prev,
                  settings: {
                    ...prev.settings,
                    offDays: prev.settings.offDays.filter(
                      (offDay) => offDay.id !== offDayId
                    ),
                  },
                }
              : prev
          );
      
          toast.success("Off day deleted successfully!");
        } catch (error) {
          console.error("Failed to delete off day:", error);
          toast.error("Failed to delete off day.");
        }
      };

      const updateCompanyField = <K extends keyof ConfigType["company"]>(
        field: K,
        value: ConfigType["company"][K]
      ) => {
        setConfig((prev) =>
          prev
            ? {
                ...prev,
                company: {
                  ...prev.company,
                  [field]: value,
                    },
                }
                : prev
        );
    };

    const updateSettingsField = <K extends keyof ConfigType["settings"]>(
        field: K,
        value: ConfigType["settings"][K]
    ) => {
        setConfig((prev) =>
            prev
                ? {
                    ...prev,
                    settings: {
                        ...prev.settings,
                        [field]: value,
                    },
                }
                : prev
        );
    };

    const addOffDay = () => {
        if (!newOffDayDate || !offDayReason || !config) return;

        const newOffDay = {
            id: crypto.randomUUID(),
            date: newOffDayDate.toISOString().split("T")[0],
            reason: offDayReason,
            offDaysType: offDayType,
        };

        setConfig((prev) =>
            prev
                ? {
                    ...prev,
                    settings: {
                        ...prev.settings,
                        offDays: [...prev.settings.offDays, newOffDay],
                    },
                }
                : prev
        );

        setNewOffDayDate(undefined);
        setOffDayReason("");
        setOffDayType("HOLIDAY");
        setIsOffDayDialogOpen(false);
    };

    const saveConfig = async () => {
        if (!config || !company) return;
      
        setIsSaving(true);
      
        try {
          const token = await getToken();
          if (!token) throw new Error("No auth token available");
      
          const companyId = config.company.id;
      
          await saveCompanySettings(companyId, config, company, token);
      
          await saveOperatingHours(companyId, config, company, token);
      
          await saveOffDay(companyId, config, company, token);
      
          await saveService(companyId, company, config, config.settings.services, token);
      
          toast.success("Settings saved successfully!");
        } catch (error) {
          console.error("Failed to save settings:", error);
          toast.error("Failed to save settings. Please try again.");
        } finally {
          setIsSaving(false);
        }
      };

    if (loading || !config) {
        return <div className="p-6">Carregando configurações...</div>;
    }

    return (
        <>
            <SettingsHeader onSave={saveConfig}  isSaving={isSaving}/>

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            System Settings
                        </h1>
                        <p className="text-slate-600">
                            Manage schedules, services, and general business settings
                        </p>
                    </div>

                    <Tabs defaultValue="operatingHours" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="operatingHours">
                                <Clock className="mr-2 h-4 w-4" />
                                Operating Hours
                            </TabsTrigger>

                            <TabsTrigger value="offDays">
                                <CalendarX className="mr-2 h-4 w-4" />
                                Off Days
                            </TabsTrigger>

                            <TabsTrigger value="services">
                                <Car className="mr-2 h-4 w-4" />
                                Services
                            </TabsTrigger>

                            <TabsTrigger value="general">
                                <Settings className="mr-2 h-4 w-4" />
                                General
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="operatingHours">
                            <OperatingHours
                                operatingHours={config.settings.operatingHours as OperatingHoursType[]}
                                appointmentInterval={config.settings.appointmentInterval}
                                onChangeOperatingHours={(hours) =>
                                    updateSettingsField("operatingHours", hours)
                                }
                                onChangeAppointmentInterval={(interval: AppointmentInterval) =>
                                    updateSettingsField("appointmentInterval", interval)
                                }
                            />
                        </TabsContent>

                        <TabsContent value="offDays">
                            <OffDays
                                addOffDay={addOffDay}
                                handleDeleteOffDay={handleDeleteOffDay}
                                isOffDayDialogOpen={isOffDayDialogOpen}
                                setIsOffDayDialogOpen={setIsOffDayDialogOpen}
                                newOffDayDate={newOffDayDate}
                                setNewOffDayDate={setNewOffDayDate}
                                offDayReason={offDayReason}
                                setOffDayReason={setOffDayReason}
                                offDayType={offDayType}
                                setOffDayType={setOffDayType}
                                config={config}
                            />

                        </TabsContent>

                        <TabsContent value="services">
                            <SettingsServices
                                services={config.settings.services}
                                onChangeServices={(services) => updateSettingsField("services", services)}
                                onDeleteService={handleDeleteService}
                            />

                        </TabsContent>

                        <TabsContent value="general">
                            <GeneralFunctions
                                company={config.company}
                                settings={config.settings}
                                onUpdateCompanyField={updateCompanyField}
                                onUpdateSettingsField={updateSettingsField}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    );
}
