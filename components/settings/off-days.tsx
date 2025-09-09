import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { ConfigType } from "@/types/SettingsType";

type OffDaysProps = {
  addOffDay: () => void;
  isOffDayDialogOpen: boolean;
  setIsOffDayDialogOpen: (open: boolean) => void;
  setConfig: (prev: any) => void;
  newOffDayDate: Date | undefined;
  setNewOffDayDate: (date: Date | undefined) => void;
  offDayReason: string;
  setOffDayReason: (reason: string) => void;
  offDayType: string;
  setOffDayType: (dayType: string) => void;
  config: ConfigType;
}

export function OffDays({ 
    addOffDay,
    isOffDayDialogOpen,
    setIsOffDayDialogOpen, 
    setConfig,
    newOffDayDate,
    setNewOffDayDate,
    offDayReason,
    setOffDayReason,
    offDayType,
    setOffDayType,
    config
}: OffDaysProps) {
    const removeOffDay = (id: number) => {
        setConfig((prev: ConfigType) => ({
            ...prev,
            offDays: prev.offDays.filter((day) => day.id !== id),
        }))
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Off Days and Holidays</CardTitle>
                            <CardDescription>Manage days when the business will be closed</CardDescription>
                        </div>
                        <Dialog open={isOffDayDialogOpen} onOpenChange={setIsOffDayDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Off Day
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Off Day</DialogTitle>
                                    <DialogDescription>Select a date and reason for closure</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Date</Label>
                                        <Calendar
                                            mode="single"
                                            selected={newOffDayDate}
                                            onSelect={setNewOffDayDate}
                                            className="rounded-md border"
                                            disabled={(date) => date < new Date()}
                                        />
                                    </div>
                                    <div>
                                        <Label>Reason</Label>
                                        <Input
                                            value={offDayReason}
                                            onChange={(e) => setOffDayReason(e.target.value)}
                                            placeholder="Ex: Christmas, Maintenance, Vacation..."
                                        />
                                    </div>
                                    <div>
                                        <Label>Type</Label>
                                        <Select value={offDayType} onValueChange={setOffDayType}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="holiday">Holiday</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="vacation">Vacation</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={addOffDay} className="w-full">
                                        Add
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {config.offDays.map((day) => (
                            <div
                                key={day.id}
                                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                            >
                                <div>
                                    <div className="font-medium">{new Date(day.date).toLocaleDateString("en-GB")}</div>
                                    <div className="text-sm text-slate-600">{day.reason}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge
                                        variant="outline"
                                        className={
                                            day.type === "holiday"
                                                ? "bg-red-100 text-red-800"
                                                : day.type === "maintenance"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : "bg-blue-100 text-blue-800"
                                        }
                                    >
                                        {day.type}
                                    </Badge>
                                    <Button variant="ghost" size="sm" onClick={() => removeOffDay(day.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}