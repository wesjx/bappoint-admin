"use client"

import BookingRow from "./bookin-row";

type Props = {
    schedules: any[];
    onSeeDetails: (s: any) => void;
};


export function BookingsTable({ schedules, onSeeDetails }: Props) {
    return (
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
            <table className="w-full min-w-[800px]">
                <thead className="bg-slate-100 text-left">
                    <tr>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Date/Time</th>
                        <th className="p-3">Services</th>
                        <th className="p-3">Vehicle</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((s) => (
                        <BookingRow key={s.id} schedule={s} onSeeDetails={onSeeDetails} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}