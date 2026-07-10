import { Appointment } from "@/types/AppointmentCostumers";

type GetAppointmentsByDateParams = {
  baseUrl: string;
  companyId: string;
  token: string;
  date: string;
};

export async function getAppointmentsByDate({
  baseUrl,
  companyId,
  token,
  date,
}: GetAppointmentsByDateParams): Promise<Appointment[]> {
  const url = new URL(`${baseUrl}/companies/${companyId}/appointments/by-date`);
  url.searchParams.set("date", date);

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
      `Failed to fetch appointments by date: ${response.status} ${errorText || response.statusText}`
    );
  }

  return (await response.json()) as Appointment[];
}
