import { Status } from "@/enum/status";

type UpdateAppointmentStatusParams = {
    baseUrl: string;
    companyId: string;
    appointmentId: string;
    token: string;
    status: Status;
  };
  
  export async function updateAppointmentStatus({
    baseUrl,
    companyId,
    appointmentId,
    token,
    status,
  }: UpdateAppointmentStatusParams) {
    const response = await fetch(
      `${baseUrl}/companies/${companyId}/appointments/${appointmentId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          status,
        }),
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update appointment status: ${response.status} ${
          errorText || response.statusText
        }`
      );
    }
  
    return response.json();
  }