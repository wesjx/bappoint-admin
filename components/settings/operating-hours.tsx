"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppointmentInterval, OperatingHoursType, WeekDay } from "@/types/SettingsType";

interface OperatingHoursProps {
  operatingHours: OperatingHoursType[];
  appointmentInterval: AppointmentInterval;
  onChangeOperatingHours: (hours: OperatingHoursType[]) => void;
  onChangeAppointmentInterval: (interval: AppointmentInterval) => void;
}

const DAYS: { key: WeekDay; label: string }[] = [
  { key: "MONDAY", label: "Monday" },
  { key: "TUESDAY", label: "Tuesday" },
  { key: "WEDNESDAY", label: "Wednesday" },
  { key: "THURSDAY", label: "Thursday" },
  { key: "FRIDAY", label: "Friday" },
  { key: "SATURDAY", label: "Saturday" },
  { key: "SUNDAY", label: "Sunday" },
];

type OperatingHoursField =
  | "isActive"
  | "startTime"
  | "endTime"
  | "lunchStartTime"
  | "lunchEndTime";

const DEFAULT_START_TIME = "08:00";
const DEFAULT_END_TIME = "18:00";

export default function OperatingHours({
  operatingHours,
  appointmentInterval,
  onChangeOperatingHours,
  onChangeAppointmentInterval,
}: OperatingHoursProps) {
  const formatTimeForInput = (time?: string | null) => {
    if (!time) return "";
    return time.slice(0, 5);
  };

  const normalizeTimeForBackend = (time: string) => {
    if (!time) return "";
    return time.length === 5 ? `${time}:00` : time;
  };

  const getScheduleByDay = (weekday: WeekDay): OperatingHoursType => {
    const found = operatingHours.find((item) => item.weekday === weekday);

    return (
      found ?? {
        weekday,
        isActive: false,
        startTime: DEFAULT_START_TIME,
        endTime: DEFAULT_END_TIME,
        lunchStartTime: null,
        lunchEndTime: null,
      }
    );
  };

  const updateOperatingHours = (
    weekday: WeekDay,
    field: OperatingHoursField,
    value: boolean | string | null
  ) => {
    const exists = operatingHours.some((item) => item.weekday === weekday);

    if (!exists) {
      const newItem: OperatingHoursType = {
        weekday,
        isActive: field === "isActive" ? Boolean(value) : false,
        startTime:
          field === "startTime" && typeof value === "string"
            ? normalizeTimeForBackend(value)
            : DEFAULT_START_TIME,
        endTime:
          field === "endTime" && typeof value === "string"
            ? normalizeTimeForBackend(value)
            : DEFAULT_END_TIME,
        lunchStartTime:
          field === "lunchStartTime" && typeof value === "string"
            ? normalizeTimeForBackend(value)
            : null,
        lunchEndTime:
          field === "lunchEndTime" && typeof value === "string"
            ? normalizeTimeForBackend(value)
            : null,
      };

      onChangeOperatingHours([...operatingHours, newItem]);
      return;
    }

    const updated = operatingHours.map((item) =>
      item.weekday === weekday
        ? {
          ...item,
          [field]:
            typeof value === "string" &&
              (field === "startTime" ||
                field === "endTime" ||
                field === "lunchStartTime" ||
                field === "lunchEndTime")
              ? normalizeTimeForBackend(value)
              : value,
        }
        : item
    );

    onChangeOperatingHours(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {DAYS.map((day) => {
          const schedule = getScheduleByDay(day.key);

          return (
            <div
              key={day.key}
              className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg"
            >
              <div className="w-32">
                <Label className="font-medium">{day.label}</Label>
              </div>

              <Switch
                checked={schedule.isActive}
                onCheckedChange={(checked) =>
                  updateOperatingHours(day.key, "isActive", checked)
                }
              />

              {schedule.isActive ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Start:</Label>
                    <Input
                      type="time"
                      value={formatTimeForInput(schedule.startTime)}
                      onChange={(e) =>
                        updateOperatingHours(day.key, "startTime", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">End:</Label>
                    <Input
                      type="time"
                      value={formatTimeForInput(schedule.endTime)}
                      onChange={(e) =>
                        updateOperatingHours(day.key, "endTime", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Lunch start:</Label>
                    <Input
                      type="time"
                      value={formatTimeForInput(schedule.lunchStartTime)}
                      onChange={(e) =>
                        updateOperatingHours(day.key, "lunchStartTime", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Label className="text-sm">Lunch end:</Label>
                    <Input
                      type="time"
                      value={formatTimeForInput(schedule.lunchEndTime)}
                      onChange={(e) =>
                        updateOperatingHours(day.key, "lunchEndTime", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>

                </>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Closed
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center gap-4">
          <Label className="font-medium">Appointment Interval:</Label>

          <select
            value={appointmentInterval}
            onChange={(e) =>
              onChangeAppointmentInterval(e.target.value as AppointmentInterval)
            }
            className="h-10 rounded-md border border-slate-300 px-3 text-sm"
          >
            <option value="MINUTES_15">15 min</option>
            <option value="MINUTES_30">30 min</option>
            <option value="MINUTES_45">45 min</option>
            <option value="MINUTES_60">60 min</option>
          </select>
        </div>
      </div>
    </div>
  );
}
