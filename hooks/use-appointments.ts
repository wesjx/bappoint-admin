"use client"


import { useCallback, useEffect, useMemo, useState } from "react";
import { scheduleDate } from "@/public/mocks/statisticsMock";
import { Appointment } from "@/types/AppointmentCostumers";


export function useAppointment({ search, status }: { search: string; status: string }) {

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)

    const getAppointments = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch("companies/{companyId}/appointments")
            const data = await response.json() as Appointment[]
            setAppointments(data)
        } catch {
            throw new Error("Failed to fetch appointments")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getAppointments()
    }, [getAppointments])

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


    return { getAppointments, schedulesFiltered };
}