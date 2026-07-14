"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { useCompany } from "@/contexts/company-context";
import { Appointment } from "@/types/AppointmentCostumers";
import { getAppointmentsList } from "@/lib/appointments";
import { Status } from "@/enum/status";

type BookingFilterStatus = "ALL" | Status;

type UseAppointmentsListParams = {
  page: number;
  itemsPerPage: number;
  search: string;
  status: BookingFilterStatus;
};

type UseAppointmentsListReturn = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasNextPage: boolean;
  isEmpty: boolean;
  totalPages: number;
  totalElements: number;
};

export function useAppointmentsList({
  page,
  itemsPerPage,
  search,
  status,
}: UseAppointmentsListParams): UseAppointmentsListReturn {
  const { getToken } = useAuth();
  const { company, loading: companyLoading } = useCompany();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchAppointments = useCallback(async () => {
    if (!company?.id) {
      setAppointments([]);
      setHasNextPage(false);
      setTotalPages(0);
      setTotalElements(0);
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
        search,
        status,
      });

      setAppointments(data.content ?? []);
      setHasNextPage(!data.last);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error while fetching appointments";

      setError(message);
      setAppointments([]);
      setHasNextPage(false);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [company?.id, getToken, page, itemsPerPage, search, status]);

  useEffect(() => {
    if (companyLoading) return;
    void fetchAppointments();
  }, [companyLoading, fetchAppointments]);

  return {
    appointments,
    loading: loading || companyLoading,
    error,
    refetch: fetchAppointments,
    hasNextPage,
    isEmpty: !loading && appointments.length === 0,
    totalPages,
    totalElements,
  };
}
