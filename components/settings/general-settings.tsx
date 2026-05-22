import { ConfigType } from "@/types/SettingsType";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type GeneralFunctionsProps = {
    company: ConfigType["company"];
    settings: ConfigType["settings"];
    onUpdateCompanyField: (
        field: keyof ConfigType["company"],
        value: string
    ) => void;
    onUpdateSettingsField: (
        field: keyof ConfigType["settings"],
        value: ConfigType["settings"][keyof ConfigType["settings"]]
    ) => void;
};

export default function GeneralFunctions({
    company,
    settings,
    onUpdateCompanyField,
    onUpdateSettingsField,
}: GeneralFunctionsProps) {

    // const updateCompany = (field: keyof ConfigType["company"], value: string) => {
    //     setConfig((prev) => {
    //       if (!prev) return prev;
    //       return {
    //         ...prev,
    //         company: {
    //           ...prev.company,
    //           [field]: value,
    //         },
    //       };
    //     });
    //   };

    //   const updateSettings = (
    //     field: keyof ConfigType["settings"],
    //     value: ConfigType["settings"][keyof ConfigType["settings"]]
    //   ) => {
    //     setConfig((prev) => {
    //       if (!prev) return prev;
    //       return {
    //         ...prev,
    //         settings: {
    //           ...prev.settings,
    //           [field]: value,
    //         },
    //       };
    //     });
    //   };

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
                                value={company.name}
                                onChange={(e) => onUpdateCompanyField("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input
                                value={company.phone}
                                onChange={(e) => onUpdateCompanyField("phone", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                value={company.email}
                                onChange={(e) => onUpdateCompanyField("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Textarea
                                value={company.address}
                                onChange={(e) => onUpdateCompanyField("address", e.target.value)}
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
                                // value={config.payment.depositPercentage}
                                // onChange={(e) => updatePayment("depositPercentage", Number.parseInt(e.target.value))}
                                // min="0"
                                max="100"
                            />
                        </div>
                        <div>
                            <Label>Maximum Cancellation Time (hours)</Label>
                            <Input
                                type="number"
                                value={settings.maxCancellationInterval ?? 0}
                                onChange={(e) =>
                                    onUpdateSettingsField(
                                        "maxCancellationInterval",
                                        Number.parseInt(e.target.value || "0", 10)
                                    )
                                }
                                min="0"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
