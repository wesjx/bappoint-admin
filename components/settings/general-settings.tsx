import { ConfigType } from "@/types/SettingsType";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type SettingsServicesProps = {
    config: ConfigType,
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export default function GeneralFunctions({ config, setConfig }: SettingsServicesProps) {
    const updateCompany = (field: string, value: any) => {
        setConfig((prev) => ({
            ...prev,
            company: {
                ...prev.company,
                [field]: value,
            },
        }))
    }

    const updatePayment = (field: string, value: any) => {
        setConfig((prev) => ({
            ...prev,
            payment: {
                ...prev.payment,
                [field]: value,
            },
        }))
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                value={config.company.name}
                                onChange={(e) => updateCompany("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input
                                value={config.company.phone}
                                onChange={(e) => updateCompany("phone", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                value={config.company.email}
                                onChange={(e) => updateCompany("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Textarea
                                value={config.company.address}
                                onChange={(e) => updateCompany("address", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Deposit Percentage (%)</Label>
                            <Input
                                type="number"
                                value={config.payment.depositPercentage}
                                onChange={(e) => updatePayment("depositPercentage", Number.parseInt(e.target.value))}
                                min="0"
                                max="100"
                            />
                        </div>
                        <div>
                            <Label>Maximum Cancellation Time (hours)</Label>
                            <Input
                                type="number"
                                value={config.company.maxCancellationTime}
                                onChange={(e) => updateCompany("maxCancellationTime", Number.parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}