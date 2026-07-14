"use client";

import { Appointment } from "@/types/AppointmentCostumers";
import { useTodayAppointments } from "@/hooks/use-today-appointments";
import { useServiceNameMap } from "@/hooks/use-service-name";
import { getStatusColor, getStatusLabel } from "@/app/utils/status";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatTime(dateTime: string) {
  return new Date(dateTime).toLocaleTimeString("en-IE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TodayAppointments() {
  const { appointments, loading, error, isEmpty } = useTodayAppointments();
  const serviceNameMap = useServiceNameMap();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments for today</CardTitle>
        <CardDescription>
          {loading
            ? "Loading today's appointments..."
            : `${appointments.length} appointments for ${new Date().toLocaleDateString("en-IE")}`}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
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
            <p className="text-sm text-muted-foreground">
              You don't have appointments for today.
            </p>
          )}

          {!loading &&
            !error &&
            appointments.map((appointment: Appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(appointment.costumerName)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-medium">
                        {appointment.costumerName}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {formatTime(appointment.startTime)} -{" "}
                        {formatTime(appointment.endTime)}
                      </div>

                      <div className="mt-1 flex flex-wrap gap-2">
                        {appointment.serviceIds.length > 0 ? (
                          appointment.serviceIds.map((serviceId) => (
                            <Badge
                              key={serviceId}
                              variant="outline"
                              className="text-xs"
                            >
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
                  </div>

                  <div className="text-right">
                    <Badge className={getStatusColor(appointment.appointmentStatus)}>
                      {getStatusLabel(appointment.appointmentStatus)}
                    </Badge>

                    <div className="mt-1 text-sm font-medium">
                      {formatCurrency(appointment.totalAmount)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
