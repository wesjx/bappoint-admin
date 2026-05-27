const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch(path: string, options: RequestInit, token: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─── Company (inclui settings dentro) ────────────────────────────────────────

export interface UpdateCompanyPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  clerkUserId: string;
  slug: string;
  stripeAccountId: string;
  settings: {
    appointmentInterval: string;
    maxCancellationInterval: number;
  };
}

export function updateCompany(
  companyId: string,
   data: UpdateCompanyPayload,
  token: string
) {
  return apiFetch(
    `/companies/update/${companyId}`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  );
}

// ─── Operating Hours ──────────────────────────────────────────────────────────

export interface OperatingHoursPayload {
  weekday: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  lunchStartTime: string | null;
  lunchEndTime: string | null;
}

export function createOperatingHours(
  companyId: string,
   data: OperatingHoursPayload,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/settings/operating_hours/create`,
    { method: "POST", body: JSON.stringify(data) },
    token
  );
}

export function updateOperatingHours(
  companyId: string,
  operatingHoursId: string,
   data: OperatingHoursPayload,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/settings/operating_hours/update/${operatingHoursId}`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  );
}

// ─── Off Days ─────────────────────────────────────────────────────────────────

export interface CreateOffDayPayload {
  date: string;
  reason: string;
  offDaysType: string;
}

export function createOffDay(
  companyId: string,
   data: CreateOffDayPayload,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/settings/off_days/create`,
    { method: "POST", body: JSON.stringify(data) },
    token
  );
}

export function deleteOffDay(
  companyId: string,
  offDayId: string,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/settings/off_days/delete/${offDayId}`,
    { method: "DELETE" },
    token
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface ServicePayload {
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
}


export function createService(
  companyId: string,
   data: ServicePayload,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/services/create`,
    { method: "POST", body: JSON.stringify(data) },
    token
  );
}

export function updateService(
  companyId: string,
  serviceId: string,
   data: ServicePayload,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/services/update/${serviceId}`,
    { method: "PUT", body: JSON.stringify(data) },
    token
  );
}

export function deleteService(
  companyId: string,
  serviceId: string,
  token: string
) {
  return apiFetch(
    `/companies/${companyId}/services/delete/${serviceId}`,
    { method: "DELETE" },
    token
  );
}
