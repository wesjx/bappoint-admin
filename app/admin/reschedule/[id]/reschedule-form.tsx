"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { format, startOfDay } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import Header from "@/components/header";
import LoadingIndicator from "@/components/loading-indicator";
import { useCompany } from "@/contexts/company-context";
import { rescheduleAppointment } from "@/lib/reschedule-appointment";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RescheduleFormProps = {
  appointmentId: string;
};

type AvailableTimeSlot = {
  start: string;
  end: string;
};

const fetcher = async (url: string): Promise<AvailableTimeSlot[]> => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch available times: ${response.status} ${
        errorText || response.statusText
      }`
    );
  }

  return response.json() as Promise<AvailableTimeSlot[]>;
};

export default function RescheduleForm({
  appointmentId,
}: RescheduleFormProps) {
  const router = useRouter();
  const { getToken } = useAuth();
  const { company, loading: companyLoading } = useCompany();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dateParam = useMemo(
    () => (selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""),
    [selectedDate]
  );

  const shouldFetchAvailableTimes = Boolean(selectedDate && company?.id);

  const { data, error, isLoading } = useSWR<AvailableTimeSlot[]>(
    shouldFetchAvailableTimes
      ? `/api/available-times?date=${dateParam}&companyId=${company?.id}`
      : null,
    fetcher,
    {
      dedupingInterval: 100_000,
      revalidateOnFocus: false,
    }
  );

  const availableTimes =
    data?.map((slot) => format(new Date(slot.start), "HH:mm")) ?? [];

  async function handleSubmit() {
    if (!selectedDate || !selectedTime) {
      const message = "Select a date and time before saving.";
      setSubmitError(message);
      toast.error(message);
      return;
    }

    if (!company?.id) {
      const message = "Company not available.";
      setSubmitError(message);
      toast.error(message);
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      const message = "NEXT_PUBLIC_API_URL is not defined.";
      setSubmitError(message);
      toast.error(message);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not available.");
      }

      const appointmentDate = format(selectedDate, "yyyy-MM-dd");
      const startTime = `${appointmentDate}T${selectedTime}:00`;

      await rescheduleAppointment({
        baseUrl,
        companyId: company.id,
        appointmentId,
        token,
        appointmentDate,
        startTime,
      });

      toast.success("Appointment rescheduled successfully.");
      router.push("/admin/bookings");
      router.refresh();
    } catch (submitErr) {
      const message =
        submitErr instanceof Error
          ? submitErr.message
          : "Unexpected error while rescheduling appointment.";

      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Header />

      <div className="flex items-center gap-3 p-6">
        <Button onClick={() => router.back()} size="icon" type="button">
          <ArrowLeft />
        </Button>

        <div>
          <h2 className="text-xl font-semibold">Reschedule appointment</h2>
          <p className="text-sm text-muted-foreground">
            Choose a new date and time for this appointment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select date</CardTitle>
          </CardHeader>

          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedTime("");
                setSubmitError(null);
              }}
              className="rounded-md border"
              disabled={(date) => startOfDay(date) < startOfDay(new Date())}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available times</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {!selectedDate ? (
              <p className="text-sm text-muted-foreground">
                Select a date to load available times.
              </p>
            ) : companyLoading ? (
              <div className="flex min-h-24 items-center justify-center">
                <LoadingIndicator />
              </div>
            ) : isLoading ? (
              <div className="flex min-h-24 items-center justify-center">
                <LoadingIndicator />
              </div>
            ) : error ? (
              <p className="text-sm text-red-600">
                {error instanceof Error
                  ? error.message
                  : "Failed to load available times."}
              </p>
            ) : availableTimes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No available times for this date.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => {
                      setSelectedTime(time);
                      setSubmitError(null);
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}

            {submitError ? (
              <p className="text-sm text-red-600">{submitError}</p>
            ) : null}

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !selectedDate ||
                !selectedTime ||
                !company?.id ||
                companyLoading ||
                submitting
              }
              className="w-full"
            >
              {submitting ? "Saving..." : "Save new schedule"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
