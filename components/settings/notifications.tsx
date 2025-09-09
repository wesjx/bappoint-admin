import { ConfigType } from "@/types/SettingsType";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

type SettingsServicesProps = {
    config: ConfigType,
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export function SettingsNotification({ config, setConfig }: SettingsServicesProps) {

    function updateNotifications<K extends keyof ConfigType["notifications"]>(notifications: K, value: ConfigType["notifications"][K]) {
        setConfig((prev) => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [notifications]: value,
            },
        }))
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure how and when notifications will be sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-medium">Client Email</Label>
                                <p className="text-sm text-slate-600">Send confirmations by email</p>
                            </div>
                            <Switch
                                checked={config.notifications.customerEmail}
                                onCheckedChange={(checked) => updateNotifications("customerEmail", checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-medium">Client SMS</Label>
                                <p className="text-sm text-slate-600">Send reminders by SMS</p>
                            </div>
                            <Switch
                                checked={config.notifications.customerSMS}
                                onCheckedChange={(checked) => updateNotifications("customerSMS", checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="font-medium">Admin Email</Label>
                                <p className="text-sm text-slate-600">Receive notifications for new bookings</p>
                            </div>
                            <Switch
                                checked={config.notifications.adminEmail}
                                onCheckedChange={(checked) => updateNotifications("adminEmail", checked)}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Label className="font-medium">Advance Reminder:</Label>
                            <Select
                                value={config.notifications.reminderAdvance.toString()}
                                onValueChange={(value) => updateNotifications("reminderAdvance", Number.parseInt(value))}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 hour</SelectItem>
                                    <SelectItem value="2">2 hours</SelectItem>
                                    <SelectItem value="6">6 hours</SelectItem>
                                    <SelectItem value="12">12 hours</SelectItem>
                                    <SelectItem value="24">24 hours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}