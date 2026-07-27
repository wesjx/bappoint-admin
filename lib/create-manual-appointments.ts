type CreateManualAppointmentPayload = {
    costumerName: string;
    costumerEmail: string;
    costumerPhone: string;
    startTime: string;
    serviceIds: string[];
  };
  
  type CreateManualAppointmentParams = {
    baseUrl: string;
    companyId: string;
    token: string;
    payload: CreateManualAppointmentPayload;
  };
  
  function pad(value: number) {
    return String(value).padStart(2, "0");
  }
  
  export function buildLocalDateTime(date: Date, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
  
    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      throw new Error("Invalid time format. Expected HH:mm.");
    }
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
  
    return `${year}-${month}-${day}T${pad(hours)}:${pad(minutes)}:00`;
  }
  
  export async function createManualAppointment({
    baseUrl,
    companyId,
    token,
    payload,
  }: CreateManualAppointmentParams) {
    const response = await fetch(
      `${baseUrl}/companies/${companyId}/appointments/manual-create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
  
      if (
        response.status === 400 &&
        errorText.toLowerCase().includes("starttime") &&
        errorText.toLowerCase().includes("future")
      ) {
        throw new Error("It is not possible to create appointment at past.");
      }
  
      throw new Error(
        `Failed to create manual appointment: ${response.status} ${
          errorText || response.statusText
        }`
      );
    }
  
    return response.json();
  }
  