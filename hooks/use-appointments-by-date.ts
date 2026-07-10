"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCompany } from "@/contexts/company-context";
import { Appointment } from "@/types/AppointmentCostumers";
import { getAppointmentsByDate } from "@/lib/get-appointments-by-date";

type UseAppointmentsByDateParams = {
  date: string;
  enabled?: boolean;
};

type UseAppointmentsByDateReturn = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isEmpty: boolean;
};

export function useAppointmentsByDate({
  date,
  enabled = true,
}: UseAppointmentsByDateParams): UseAppointmentsByDateReturn {
  const { getToken } = useAuth();
  const { company, loading: companyLoading } = useCompany();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointmentsByDate = useCallback(async () => {
    if (!enabled || !date) {
      setAppointments([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (!company?.id) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined.");
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not available.");
      }

      const data = await getAppointmentsByDate({
        baseUrl,
        companyId: company.id,
        token,
        date,
      });

      setAppointments(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unknown error while fetching appointments by date";

      setError(message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, date, company?.id, getToken]);

  useEffect(() => {
    if (companyLoading) return;
    void fetchAppointmentsByDate();
  }, [companyLoading, fetchAppointmentsByDate]);

  const isEmpty = useMemo(
    () => !loading && appointments.length === 0,
    [loading, appointments.length]
  );

  return {
    appointments,
    loading: loading || companyLoading,
    error,
    refetch: fetchAppointmentsByDate,
    isEmpty,
  };
}
