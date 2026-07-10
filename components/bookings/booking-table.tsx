"use client";

import { Appointment } from "@/types/AppointmentCostumers";
import BookingRow from "./booking-row";

type Props = {
  appointments: Appointment[];
  onSeeDetails: (appointment: Appointment) => void;
};

export function BookingsTable({ appointments, onSeeDetails }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
      <table className="w-full min-w-[900px]">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3 text-sm font-semibold">Customer</th>
            <th className="p-3 text-sm font-semibold">Appointment date</th>
            <th className="p-3 text-sm font-semibold">Time</th>
            <th className="p-3 text-sm font-semibold">Services</th>
            <th className="p-3 text-sm font-semibold">Amount</th>
            <th className="p-3 text-sm font-semibold">Status</th>
            <th className="p-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <BookingRow
              key={appointment.id}
              appointment={appointment}
              onSeeDetails={onSeeDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
