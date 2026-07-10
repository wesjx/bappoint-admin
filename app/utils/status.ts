import { Status } from "@/enum/status";

const statusMap: Record<Status, { label: string; color: string }> = {
  CREATED: {
    label: "Created",
    color: "bg-slate-100 text-slate-700",
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-100 text-red-700",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-green-100 text-green-700",
  },
  PAID: {
    label: "Paid",
    color: "bg-emerald-100 text-emerald-700",
  },
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
  NOT_PAID: {
    label: "Not paid",
    color: "bg-orange-100 text-orange-700",
  },
};

const DEFAULT_STATUS = {
  label: "Unknown",
  color: "bg-slate-100 text-slate-700",
};

export function getStatusColor(status?: Status | null) {
  if (!status) return DEFAULT_STATUS.color;
  return statusMap[status]?.color ?? DEFAULT_STATUS.color;
}

export function getStatusLabel(status?: Status | null) {
  if (!status) return DEFAULT_STATUS.label;
  return statusMap[status]?.label ?? DEFAULT_STATUS.label;
}
