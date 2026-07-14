"use client";

import { useMemo } from "react";
import { useAppointmentsByDate } from "@/hooks/use-appointments-by-date";

function formatToday(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function useTodayAppointments() {
  const today = useMemo(() => formatToday(), []);
  return useAppointmentsByDate({ date: today });
}
