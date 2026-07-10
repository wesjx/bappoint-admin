"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCompany } from "@/contexts/company-context";
import { Appointment } from "@/types/AppointmentCostumers";
import { getAppointmentsList } from "@/lib/appointments";


type UseAppointmentsListParams = {
  page: number;
  itemsPerPage: number;
};

type UseAppointmentsListReturn = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasNextPage: boolean;
  isEmpty: boolean;
};

export function useAppointmentsList({
  page,
  itemsPerPage,
}: UseAppointmentsListParams): UseAppointmentsListReturn {
  const { getToken } = useAuth();
  const { company, loading: companyLoading } = useCompany();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
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

      const data = await getAppointmentsList({
        baseUrl,
        companyId: company.id,
        token,
        page,
        itemsPerPage,
      });

      setAppointments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error while fetching appointments";

      setError(message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [company?.id, getToken, page, itemsPerPage]);

  useEffect(() => {
    if (companyLoading) return;
    void fetchAppointments();
  }, [companyLoading, fetchAppointments]);

  const hasNextPage = useMemo(
    () => appointments.length === itemsPerPage,
    [appointments.length, itemsPerPage]
  );

  return {
    appointments,
    loading: loading || companyLoading,
    error,
    refetch: fetchAppointments,
    hasNextPage,
    isEmpty: !loading && appointments.length === 0,
  };
}
