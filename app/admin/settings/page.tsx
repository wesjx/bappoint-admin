"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Settings, Clock, CalendarX, Bell } from "lucide-react"
import SettingsHeader from "@/components/settings/setting-header"
import OperatingHours from "@/components/settings/operating-hours"
import { ConfigType, SettingsType } from "@/types/SettingsType"
import { OffDays } from "@/components/settings/off-days"
import SettingsServices from "@/components/settings/services"
import { SettingsNotification } from "@/components/settings/notifications"
import GeneralFunctions from "@/components/settings/general-settings"
import { initialConfig } from "@/public/mocks/setting-mock"

export default function SettingsPage() {
    const [config, setConfig] = useState<ConfigType>(initialConfig)
    const [newOffDayDate, setNewOffDayDate] = useState<Date | undefined>()
    const [offDayReason, setOffDayReason] = useState("")
    const [offDayType, setOffDayType] = useState("holiday")
    const [isOffDayDialogOpen, setIsOffDayDialogOpen] = useState<boolean>(false)

    useEffect(() => {
        console.log("🔧 Configuration updated:", config)
    }, [config])

    const addOffDay = () => {
        if (!newOffDayDate || !offDayReason) return
        const newOffDay = {
            id: Date.now(),
            date: newOffDayDate.toISOString().split("T")[0],
            reason: offDayReason,
            type: offDayType,
        }
        setConfig((prev) => ({
            ...prev,
            offDays: [...prev.offDays, newOffDay],
        }))
        setNewOffDayDate(undefined)
        setOffDayReason("")
        setOffDayType("holiday")
        setIsOffDayDialogOpen(false)
    }

    const saveConfig = () => {
        console.log("💾 Saving configuration:", config)
        // Api connfig goes here bro
        alert("Settings saved successfully!")
    }

    return (
        <>

            {/* Header */}
            < SettingsHeader onSave={saveConfig} />
            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">System Settings</h1>
                        <p className="text-slate-600">Manage schedules, services, and general business settings</p>
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
                        {/* Operating Hours */}
                        <TabsContent value="operatingHours">
                            <OperatingHours 
                            config={config} 
                            setConfig={setConfig} />
                        </TabsContent>
                        {/* Off Days */}
                        <TabsContent value="offDays">
                            <OffDays
                                addOffDay={addOffDay}
                                isOffDayDialogOpen={isOffDayDialogOpen}
                                setIsOffDayDialogOpen={setIsOffDayDialogOpen}
                                setConfig={setConfig}
                                newOffDayDate={newOffDayDate}
                                setNewOffDayDate={setNewOffDayDate}
                                offDayReason={offDayReason}
                                setOffDayReason={setOffDayReason}
                                offDayType={offDayType}
                                setOffDayType={setOffDayType}
                                config={config}
                            />
                        </TabsContent>
                        {/* Services */}
                        <TabsContent value="services">
                            <SettingsServices 
                            config={config} 
                            setConfig={setConfig} 
                            />
                        </TabsContent>
                        {/* Notifications */}
                        <TabsContent value="notifications">
                            <SettingsNotification 
                            config={config} 
                            setConfig={setConfig} 
                            />
                        </TabsContent>
                        {/* General Settings */}
                        <TabsContent value="general">
                            <GeneralFunctions 
                            config={config} 
                            setConfig={setConfig} 
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    )
}
