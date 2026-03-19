"use client"


import { useMemo } from "react";
import { scheduleDate } from "@/public/mocks/statisticsMock";


export function useBookings({ search, status }: { search: string; status: string }) {
const schedulesFiltered = useMemo(() => {
return scheduleDate.filter((schedule) => {
const matchStatus = status === "all" || schedule.status === status;
const matchSearch =
search === "" ||
schedule.client.name.toLowerCase().includes(search.toLowerCase()) ||
schedule.vehicle.toLowerCase().includes(search.toLowerCase());
return matchStatus && matchSearch;
});
}, [search, status]);


return { schedulesFiltered };
}