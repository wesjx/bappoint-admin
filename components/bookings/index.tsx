"use client"


import { useState, useCallback } from "react";
import { BookingsFilters } from "./BookingsFilters";
import { BookingsTable } from "./BookingsTable";
import { BookingDialog } from "./BookingDialog";
import { useBookings } from "@/hooks/useBookings";


export default function BookingsPanel() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [selected, setSelected] = useState<any | undefined>();


    const { schedulesFiltered } = useBookings({ search, status });


    const onSeeDetails = useCallback((s: any) => setSelected(s), []);
    const onClose = useCallback(() => setSelected(undefined), []);


    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <main className="flex-1 p-6">
                <div className="space-y-6">
                    <div>
                        <BookingsFilters
                            search={search}
                            onSearch={setSearch}
                            status={status}
                            onStatusChange={setStatus}
                        />
                    </div>


                    <div>
                        <div className="mb-4 text-lg font-medium">Appointments ({schedulesFiltered.length})</div>
                        <BookingsTable schedules={schedulesFiltered} onSeeDetails={onSeeDetails} />
                    </div>
                </div>
            </main>


            <BookingDialog schedule={selected} onClose={onClose} />
        </div>
    );
}