import { weekDays } from "@/public/mocks/setting-mock"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { ConfigType } from "@/types/SettingsType"

type OperatingHoursProps = {
  config: ConfigType;
  setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export default function OperatingHours({ config, setConfig }: OperatingHoursProps) {
    const updateOperatingHours = (day: string, field: string, value: any) => {
        setConfig((prev: ConfigType) => ({
            ...prev,
            operatingHours: {
                ...prev.operatingHours,
                [day]: {
                    ...prev.operatingHours[day as keyof typeof prev.operatingHours],
                    [field]: value,
                },
            },
        }))
    }

    return (
        <>
            <Card className="space-y-6">
                <CardHeader>
                    <CardTitle>Operating Hours</CardTitle>
                    <CardDescription>Configure opening hours for each day of the week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {weekDays.map((day) => {
                        const schedule = config.operatingHours[day.key as keyof typeof config.operatingHours]
                        return (
                            <div key={day.key} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                                <div className="w-32">
                                    <Label className="font-medium">{day.label}</Label>
                                </div>
                                <Switch
                                    checked={schedule.active}
                                    onCheckedChange={(checked) => updateOperatingHours(day.key, "active", checked)}
                                />
                                {schedule.active && (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <Label className="text-sm">Start:</Label>
                                            <Input
                                                type="time"
                                                value={schedule.start}
                                                onChange={(e) => updateOperatingHours(day.key, "start", e.target.value)}
                                                className="w-32"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Label className="text-sm">End:</Label>
                                            <Input
                                                type="time"
                                                value={schedule.end}
                                                onChange={(e) => updateOperatingHours(day.key, "end", e.target.value)}
                                                className="w-32"
                                            />
                                        </div>
                                    </>
                                )}
                                {!schedule.active && (
                                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                                        Closed
                                    </Badge>
                                )}
                            </div>
                        )
                    })}
                    <div className="pt-4 border-t">
                        <div className="flex items-center space-x-4">
                            <Label className="font-medium">Appointment Interval:</Label>
                            <Select
                                value={config.appointmentIntervals.toString()}
                                onValueChange={(value) =>
                                    setConfig((prev: any ) => ({ ...prev, appointmentIntervals: Number.parseInt(value) }))
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 min</SelectItem>
                                    <SelectItem value="30">30 min</SelectItem>
                                    <SelectItem value="45">45 min</SelectItem>
                                    <SelectItem value="60">60 min</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}