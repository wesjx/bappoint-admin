export type BookingStatus = "pending" | "confirmed" | "completed" | "canceled";

const statusMap: Record<string, { label: string; color: string }> = {
  pending:   { label: "Pending",   color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700" },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-700" },
  canceled:  { label: "Canceled",  color: "bg-red-100 text-red-700" },
};

const DEFAULT_STATUS = { label: "Unknown", color: "bg-slate-100 text-slate-700" };

export function getStatusColor(status?: string) {
  return (status && statusMap[status]?.color) ?? DEFAULT_STATUS.color;
}

export function getStatusLabel(status?: string) {
  return (status && statusMap[status]?.label) ?? DEFAULT_STATUS.label;
}
