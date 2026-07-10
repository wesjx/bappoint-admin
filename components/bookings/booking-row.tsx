"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Appointment } from "@/types/AppointmentCostumers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusColor, getStatusLabel } from "@/app/utils/status";
import { useServiceNameMap } from "@/hooks/use-service-name";

type Props = {
  appointment: Appointment;
  onSeeDetails: (appointment: Appointment) => void;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

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

export default function BookingRow({ appointment, onSeeDetails }: Props) {
    const serviceNameMap = useServiceNameMap();
  return (
    <tr className="border-t">
      <td className="p-3 align-top">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(appointment.costumerName)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="truncate font-medium">{appointment.costumerName}</div>
            <div className="truncate text-sm text-muted-foreground">
              {appointment.costumerPhone}
            </div>
          </div>
        </div>
      </td>

      <td className="p-3 align-top">
        <div className="font-medium">{formatDate(appointment.appointmentDate)}</div>
      </td>

      <td className="p-3 align-top">
        <div className="space-y-1">
          <div className="font-medium">{formatTime(appointment.startTime)}</div>
          <div className="text-sm text-muted-foreground">
            Until {formatTime(appointment.endTime)}
          </div>
        </div>
      </td>

      <td className="p-3 align-top">
        <div className="flex flex-wrap gap-2">
          {appointment.serviceIds.length > 0 ? (
            appointment.serviceIds.map((serviceId) => (
              <Badge key={serviceId} variant="outline" className="text-xs">
                {serviceNameMap[serviceId]}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No services</span>
          )}
        </div>
      </td>

      <td className="p-3 align-top">
        <div className="font-medium">{formatCurrency(appointment.totalAmount)}</div>
      </td>

      <td className="p-3 align-top">
        <Badge className={getStatusColor(appointment.appointmentStatus)}>
          {getStatusLabel(appointment.appointmentStatus)}
        </Badge>
      </td>

      <td className="p-3 align-top">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSeeDetails(appointment)}>
              See details
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={`/admin/reschedule/${appointment.id}`}>Reschedule</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-600">
              Cancel appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
