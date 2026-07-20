type RescheduleAppointmentParams = {
  baseUrl: string;
  companyId: string;
  appointmentId: string;
  token: string;
  appointmentDate: string;
  startTime: string;
};

export async function rescheduleAppointment({
  baseUrl,
  companyId,
  appointmentId,
  token,
  appointmentDate,
  startTime,
}: RescheduleAppointmentParams) {
  const response = await fetch(
    `${baseUrl}/companies/${companyId}/appointments/reschedule/${appointmentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        appointmentDate,
        startTime,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to reschedule appointment: ${response.status} ${
        errorText || response.statusText
      }`
    );
  }

  return response.json();
}
