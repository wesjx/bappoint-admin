"use client";

import { useCallback, useEffect, useState } from "react";
import { BookingsFilters } from "./booking-filters";
import { BookingsTable } from "./booking-table";
import { BookingDialog } from "./booking-dialog";
import { useAppointmentsList } from "@/hooks/use-appointments-list";
import { Appointment } from "@/types/AppointmentCostumers";
import { Status } from "@/enum/status";
import { useDebounce } from "@/hooks/use-debounce";

type BookingFilterStatus = "ALL" | Status;

export default function BookingsPanel() {
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingFilterStatus>("ALL");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(0);
  }, [search, status]);

  const { appointments, loading, error, hasNextPage, totalPages, totalElements } =
    useAppointmentsList({
      page,
      itemsPerPage,
      search: debouncedSearch,
      status,
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
          search={search}
          onSearch={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {!loading && !error && (
          <div className="text-sm text-muted-foreground">
            {totalElements} booking(s) found
          </div>
        )}

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

        {!loading && !error && appointments.length > 0 && (
          <BookingsTable
            appointments={appointments}
            onSeeDetails={handleSeeDetails}
          />
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="rounded-lg border bg-white p-6">
            <p className="text-sm text-muted-foreground">
              No bookings found with the selected filters.
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
            Page {page + 1} of {Math.max(totalPages, 1)}
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

      <BookingDialog
        appointment={selected ?? undefined}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
