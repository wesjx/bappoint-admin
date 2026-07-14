import { Status } from "@/enum/status";
import { Appointment } from "@/types/AppointmentCostumers";
import { PageResponse } from "@/types/Pagination";

type BookingFilterStatus = "ALL" | Status;

type GetAppointmentsListParams = {
  baseUrl: string;
  companyId: string;
  token: string;
  page: number;
  itemsPerPage: number;
  search?: string;
  status?: BookingFilterStatus;
};

export async function getAppointmentsList({
  baseUrl,
  companyId,
  token,
  page,
  itemsPerPage,
  search,
  status,
}: GetAppointmentsListParams): Promise<PageResponse<Appointment>> {
  const url = new URL(`${baseUrl}/companies/${companyId}/appointments/list`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("itemsPerPage", String(itemsPerPage));

  if (search?.trim()) {
    url.searchParams.set("search", search.trim());
  }

  if (status && status !== "ALL") {
    url.searchParams.set("status", status);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch appointments: ${response.status} ${errorText || response.statusText}`
    );
  }

  return (await response.json()) as PageResponse<Appointment>;
}
