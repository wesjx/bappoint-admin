"use client";

import { useMemo, useState } from "react";
import { Appointment } from "@/types/AppointmentCostumers";
import { useAppointmentsByDate } from "@/hooks/use-appointments-by-date";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getStatusColor, getStatusLabel } from "@/app/utils/status";
import { useServiceNameMap } from "@/hooks/use-service-name";

function formatDateToApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString("en-IE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const serviceNameMap = useServiceNameMap();

  const date = useMemo(() => formatDateToApi(selectedDate), [selectedDate]);

  const { appointments, loading, error, isEmpty } = useAppointmentsByDate({
    date,
  });

  const handleSelectDate = (value?: Date) => {
    if (!value) return;
    setSelectedDate(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment calendar</CardTitle>
        <CardDescription>View appointments by selected date.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
            className="rounded-md border"
          />

          <div className="space-y-4">
            <h3 className="font-semibold">
              Appointments for {selectedDate.toLocaleDateString("en-IE")}
            </h3>

            {loading && (
              <div className="rounded-md border bg-white p-4">
                <p className="text-sm text-muted-foreground">
                  Loading appointments...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {!loading && isEmpty && (
              <div className="rounded-md border bg-white p-4">
                <p className="text-sm text-muted-foreground">
                  No appointments found for this date.
                </p>
              </div>
            )}

            {!loading && !error && appointments.length > 0 && (
              <div className="space-y-3">
                {appointments.map((appointment: Appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-medium">{appointment.costumerName}</div>

                        <div className="text-sm text-muted-foreground">
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {appointment.serviceIds.length > 0 ? (
                            appointment.serviceIds.map((serviceId) => (
                              <Badge key={serviceId} variant="outline" className="text-xs">
                                {serviceNameMap[serviceId] ?? serviceId}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No services
                            </span>
                          )}
                        </div>
                      </div>

                      <Badge className={getStatusColor(appointment.appointmentStatus)}>
                        {getStatusLabel(appointment.appointmentStatus)}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
