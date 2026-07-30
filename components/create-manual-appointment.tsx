"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { useCompany } from "@/contexts/company-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AvailableTime,
  getAvailableTimes,
} from "@/lib/get-available-times";
import {
  buildLocalDateTime,
  createManualAppointment,
} from "@/lib/create-manual-appointments";

type Props = {
  selectedDate: Date;
  onCreated: () => Promise<void> | void;
  disabled?: boolean
};

function formatDateToApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function extractTimeLabel(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (value.length >= 16 && value.includes("T")) {
    return value.slice(11, 16);
  }

  return value;
}

export default function CreateManualAppointmentDialog({
  selectedDate,
  onCreated,
  disabled
}: Props) {
  const { getToken } = useAuth();
  const { company } = useCompany();

  const services = company?.settings?.services ?? [];
  const selectedDateString = useMemo(
    () => formatDateToApi(selectedDate),
    [selectedDate]
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [costumerName, setCostumerName] = useState("");
  const [costumerEmail, setCostumerEmail] = useState("");
  const [costumerPhone, setCostumerPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [availableTimesError, setAvailableTimesError] = useState<string | null>(
    null
  );

  const totalSelected = useMemo(() => {
    return services
      .filter((service) => selectedServices.includes(String(service.id)))
      .reduce((acc, service) => acc + Number(service.price), 0);
  }, [services, selectedServices]);

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  }

  function resetForm() {
    setCostumerName("");
    setCostumerEmail("");
    setCostumerPhone("");
    setSelectedTime("");
    setSelectedServices([]);
    setAvailableTimes([]);
    setAvailableTimesError(null);
  }

  useEffect(() => {
    if (!open) return;

    const companyId = company?.id ?? "";
    if (!companyId) return;

    let cancelled = false;

    async function loadAvailableTimes() {
      try {
        setLoadingTimes(true);
        setAvailableTimesError(null);

        const data = await getAvailableTimes({
          companyId,
          date: selectedDateString,
          serviceIds: selectedServices,
        });

        if (cancelled) return;

        setAvailableTimes(data);

        const stillExists = data.some((slot) => {
          const time = extractTimeLabel(slot.start).slice(0, 5);
          return time === selectedTime;
        });

        if (!stillExists) {
          setSelectedTime("");
        }
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof Error
            ? error.message
            : "Failed to load available times.";

        setAvailableTimesError(message);
        setAvailableTimes([]);
      } finally {
        if (!cancelled) {
          setLoadingTimes(false);
        }
      }
    }

    void loadAvailableTimes();

    return () => {
      cancelled = true;
    };
  }, [open, company?.id, selectedDateString, selectedServices, selectedTime]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!company?.id) {
      toast.error("Company not found.");
      return;
    }

    if (!selectedTime) {
      toast.error("Select an available time.");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("Select at least one service.");
      return;
    }

    const token = await getToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token || !baseUrl) {
      toast.error("Unable to authenticate request.");
      return;
    }

    try {
      setLoading(true);

      await createManualAppointment({
        baseUrl,
        companyId: company.id,
        token,
        payload: {
          costumerName,
          costumerEmail,
          costumerPhone,
          startTime: buildLocalDateTime(selectedDate, selectedTime),
          serviceIds: selectedServices,
        },
      });

      toast.success("Manual appointment created successfully.");
      resetForm();
      setOpen(false);
      await onCreated();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create appointment.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDay = selectedDate ? new Date(selectedDate) : null;
  if (selectedDay) {
    selectedDay.setHours(0, 0, 0, 0);
  }

  const isPastDate =
    !!selectedDay && selectedDay.getTime() < today.getTime()

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen && !loading) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={disabled || isPastDate}>New manual appointment</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create manual appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Date</Label>
              <Input value={selectedDate.toLocaleDateString("en-IE")} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costumerName">Customer name</Label>
              <Input
                id="costumerName"
                value={costumerName}
                onChange={(e) => setCostumerName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costumerPhone">Customer phone</Label>
              <Input
                id="costumerPhone"
                value={costumerPhone}
                onChange={(e) => setCostumerPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="costumerEmail">Customer email</Label>
              <Input
                id="costumerEmail"
                type="email"
                value={costumerEmail}
                onChange={(e) => setCostumerEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Services</Label>

            <div className="space-y-3">
              {services.map((service) => {
                const serviceId = String(service.id);

                return (
                  <label
                    key={serviceId}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-slate-50"
                  >
                    <Checkbox
                      checked={selectedServices.includes(serviceId)}
                      onCheckedChange={() => toggleService(serviceId)}
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.durationMinutes} minutes
                          </p>
                        </div>

                        <span className="font-semibold">
                          €{Number(service.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground">
              Total selected: €{totalSelected.toFixed(2)}
            </p>
          </div>

          <div className="space-y-3">
            <Label>Available times</Label>

            {loadingTimes && (
              <div className="rounded-md border bg-white p-4">
                <p className="text-sm text-muted-foreground">
                  Loading available times...
                </p>
              </div>
            )}

            {!loadingTimes && availableTimesError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">{availableTimesError}</p>
              </div>
            )}

            {!loadingTimes &&
              !availableTimesError &&
              availableTimes.length === 0 && (
                <div className="rounded-md border bg-white p-4">
                  <p className="text-sm text-muted-foreground">
                    No available times for this date.
                  </p>
                </div>
              )}

            {!loadingTimes &&
              !availableTimesError &&
              availableTimes.length > 0 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableTimes.map((slot) => {
                    const rawTime = extractTimeLabel(slot.start);
                    const normalizedTime = rawTime.slice(0, 5);
                    const isSelected = selectedTime === normalizedTime;

                    return (
                      <Button
                        key={slot.start}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => setSelectedTime(normalizedTime)}
                      >
                        {normalizedTime}
                      </Button>
                    );
                  })}
                </div>
              )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading || !selectedTime || isPastDate}>
              {loading ? "Creating..." : "Create appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
