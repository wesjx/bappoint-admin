"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { ConfigType, OffDayType } from "@/types/SettingsType";

type OffDaysProps = {
  addOffDay: () => void;
  handleDeleteOffDay: (index: number, offDayId?: string) => Promise<void>;
  isOffDayDialogOpen: boolean;
  setIsOffDayDialogOpen: (open: boolean) => void;
  newOffDayDate: Date | undefined;
  setNewOffDayDate: (date: Date | undefined) => void;
  offDayReason: string;
  setOffDayReason: (reason: string) => void;
  offDayType: OffDayType;
  setOffDayType: (dayType: OffDayType) => void;
  config: ConfigType;
};

export function OffDays({
  addOffDay,
  handleDeleteOffDay,
  isOffDayDialogOpen,
  setIsOffDayDialogOpen,
  newOffDayDate,
  setNewOffDayDate,
  offDayReason,
  setOffDayReason,
  offDayType,
  setOffDayType,
  config,
}: OffDaysProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Off Days and Holidays</CardTitle>
        <CardDescription>
          Manage days when the business will be closed
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Dialog
          open={isOffDayDialogOpen}
          onOpenChange={setIsOffDayDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Off Day
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Off Day</DialogTitle>
              <DialogDescription>
                Select a date and reason for closure
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={newOffDayDate}
                    onSelect={setNewOffDayDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Input
                  value={offDayReason}
                  onChange={(e) => setOffDayReason(e.target.value)}
                  placeholder="Ex: Christmas, Maintenance, Vacation..."
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={offDayType}
                  onValueChange={(value) =>
                    setOffDayType(value as OffDayType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="HOLIDAY">Holiday</SelectItem>
                    <SelectItem value="VACATION">Vacation</SelectItem>
                    <SelectItem value="PERSONAL_LEAVE">
                      Personal Leave
                    </SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={addOffDay}
                className="w-full"
                disabled={!newOffDayDate || !offDayReason.trim()}
              >
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-3">
          {config.settings.offDays.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              No off days added yet.
            </div>
          ) : (
            config.settings.offDays.map((day) => (
              <div
                key={day.id ?? `${day.date}-${day.reason}`}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">
                    {new Date(day.date).toLocaleDateString("en-GB")}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {day.reason}
                  </p>

                  <Badge variant="secondary">{day.offDaysType}</Badge>
                </div>

                {day.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteOffDay(config.settings.offDays.indexOf(day), day.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
