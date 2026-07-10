import { Appointment } from "@/types/AppointmentCostumers";


type GetAppointmentsListParams = {
  baseUrl: string;
  companyId: string;
  token: string;
  page: number;
  itemsPerPage: number;
};

export async function getAppointmentsList({
  baseUrl,
  companyId,
  token,
  page,
  itemsPerPage,
}: GetAppointmentsListParams): Promise<Appointment[]> {
  const url = new URL(`${baseUrl}/companies/${companyId}/appointments/list`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("itemsPerPage", String(itemsPerPage));

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

  return (await response.json()) as Appointment[];
}
