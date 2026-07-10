"use client";

import { useCallback, useState } from "react";
import { BookingsFilters } from "./booking-filters";
import { BookingsTable } from "./booking-table";
import { BookingDialog } from "./booking-dialog";
import { useAppointmentsList } from "@/hooks/use-appointments-list";
import { Appointment } from "@/types/AppointmentCostumers";

export default function BookingsPanel() {
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const { appointments, loading, error, hasNextPage } = useAppointmentsList({
    page,
    itemsPerPage,
  });

  const handleSeeDetails = useCallback((appointment: Appointment) => {
    setSelected(appointment);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <div className="px-6 pb-6">
      <div className="space-y-6">
        <BookingsFilters
          search=""
          onSearch={() => {}}
          status="all"
          onStatusChange={() => {}}
        />

        {loading && (
          <div className="rounded-lg border bg-white p-6">
            <p className="text-sm text-muted-foreground">Loading appointments...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <BookingsTable
            appointments={appointments}
            onSeeDetails={handleSeeDetails}
          />
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="rounded-lg border bg-white p-6">
            <p className="text-sm text-muted-foreground">
              No bookings found for this page.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0 || loading}
            className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page + 1}
          </span>

          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage || loading}
            className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <BookingDialog appointment={selected ?? undefined} onClose={handleCloseDialog} />
    </div>
  );
}
