"use client";

import Link from "next/link";

import { Appointment } from "@/types/AppointmentCostumers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStatusColor, getStatusLabel } from "@/app/utils/status";

type Props = {
  appointment?: Appointment | null;
  onClose: () => void;
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

export function BookingDialog({ appointment, onClose }: Props) {
  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Appointment details</DialogTitle>
          <DialogDescription>
            Complete appointment information from the backend.
          </DialogDescription>
        </DialogHeader>

        {appointment ? (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{appointment.costumerName}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="break-all text-sm">{appointment.costumerEmail}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="text-sm">{appointment.costumerPhone}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Appointment details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium">
                      {formatDate(appointment.appointmentDate)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Start time</div>
                    <div className="font-medium">
                      {formatTime(appointment.startTime)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">End time</div>
                    <div className="font-medium">
                      {formatTime(appointment.endTime)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge className={getStatusColor(appointment.appointmentStatus)}>
                      {getStatusLabel(appointment.appointmentStatus)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services and payment</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-muted-foreground">Service IDs</div>
                  <div className="flex flex-wrap gap-2">
                    {appointment.serviceIds.length > 0 ? (
                      appointment.serviceIds.map((serviceId) => (
                        <Badge key={serviceId} variant="outline">
                          {serviceId}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No services linked to this appointment.
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Total amount</div>
                    <div className="text-lg font-bold">
                      {formatCurrency(appointment.totalAmount)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Stripe session</div>
                    <div className="break-all text-sm">
                      {appointment.stripeSessionId || "Not available"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>

              <Button variant="outline" asChild>
                <Link href={`/admin/reschedule/${appointment.id}`}>Reschedule</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
