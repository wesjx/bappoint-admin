"use client";

import { CalendarIcon } from "lucide-react";
import { useTodayAppointments } from "@/hooks/use-today-appointments";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Statistics() {
  const { appointments, loading } = useTodayAppointments();

  return (
    <div className="p-6 mb-8">
      <Card className="max-w-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today's appointments
          </CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "-" : appointments.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
