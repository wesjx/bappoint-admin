"use client";

import { useMemo } from "react";
import { useCompany } from "@/contexts/company-context";

export function useServiceNameMap() {
  const { company } = useCompany();

  return useMemo(() => {
    const services = company?.settings?.services ?? [];

    return services.reduce<Record<string, string>>((acc, service) => {
      acc[String(service.id)] = service.name;
      return acc;
    }, {});
  }, [company?.settings?.services]);
}
