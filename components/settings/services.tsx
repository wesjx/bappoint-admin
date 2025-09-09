import { ConfigType } from "@/types/SettingsType";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ServiceType } from "@/types/ServiceType";

type SettingsServicesProps = {
    config: ConfigType,
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export default function SettingsServices({ config, setConfig }: SettingsServicesProps) {

    function updateService<K extends keyof ServiceType>(id: number, field: K, value: ServiceType[K]){
        setConfig((prev) => ({
            ...prev,
            services: prev.services.map((service) => (service.id === id ? { ...service, [field]: value } : service)),
        }))
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Services Management</CardTitle>
                    <CardDescription>Configure offered services, prices, and durations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {config.services.map((service) => (
                            <div key={service.id} className="p-4 border border-slate-200 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <Switch
                                            checked={service.active}
                                            onCheckedChange={(checked: boolean) => updateService(service.id, "active", checked)}
                                        />
                                        <Input
                                            value={service.name}
                                            onChange={(e) => updateService(service.id, "name", e.target.value)}
                                            className="font-medium"
                                        />
                                    </div>
                                    <Badge variant={service.active ? "default" : "secondary"}>
                                        {service.active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm">Price (€)</Label>
                                        <Input
                                            type="number"
                                            value={service.price}
                                            onChange={(e) => updateService(service.id, "price", Number.parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm">Duration (min)</Label>
                                        <Input
                                            type="number"
                                            value={service.duration}
                                            onChange={(e) => updateService(service.id, "duration", Number.parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}