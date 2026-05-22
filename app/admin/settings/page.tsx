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

export default function SettingsPage() {
    const { company, loading } = useCompany();

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

    const updateCompanyField = (
        field: keyof ConfigType["company"],
        value: string
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

    const removeOffDay = (id: string) => {
        setConfig((prev) =>
            prev
                ? {
                    ...prev,
                    settings: {
                        ...prev.settings,
                        offDays: prev.settings.offDays.filter((offDay) => offDay.id !== id),
                    },
                }
                : prev
        );
    };

    const saveConfig = () => {
        console.log("💾 Saving configuration:", config);
    };

    if (loading || !config) {
        return <div className="p-6">Carregando configurações...</div>;
    }

    return (
        <>
            <SettingsHeader onSave={saveConfig} />

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
                        <TabsList className="grid w-full grid-cols-5">
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

                            <TabsTrigger value="notifications">
                                <Bell className="mr-2 h-4 w-4" />
                                Notifications
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
                                offDays={config.settings.offDays}
                                addOffDay={addOffDay}
                                removeOffDay={removeOffDay}
                                isOffDayDialogOpen={isOffDayDialogOpen}
                                setIsOffDayDialogOpen={setIsOffDayDialogOpen}
                                newOffDayDate={newOffDayDate}
                                setNewOffDayDate={setNewOffDayDate}
                                offDayReason={offDayReason}
                                setOffDayReason={setOffDayReason}
                                offDayType={offDayType}
                                setOffDayType={setOffDayType}
                            />
                        </TabsContent>

                        <TabsContent value="services">
                            <SettingsServices
                                services={config.settings.services}
                                onUpdateSettingsField={updateSettingsField}
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
