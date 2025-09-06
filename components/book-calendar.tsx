"use client"

import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { scheduleDate, getStatusColor } from "@/public/mocks/statisticsMock"

export default function BookCalendar() {
    const [datePicked, setDatePicked] = useState<Date | undefined>(new Date())
    const dailySchedule = scheduleDate
        .filter((schedule) => {
            if (!datePicked) return false
            return schedule.date === datePicked.toISOString().split("T")[0]
        })
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointment Calendar</CardTitle>
                <CardDescription>View appointments by date</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Calendar
                        mode="single"
                        selected={datePicked}
                        onSelect={setDatePicked}
                        className="rounded-md border"
                    />
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            Appointments for {datePicked?.toLocaleDateString("en-EU")}
                        </h3>
                        <div className="space-y-3">
                            {dailySchedule.length === 0 ? (
                                <p>You have no appointments for the day {datePicked?.toLocaleDateString("pt-PT")} </p>
                            ) : (
                                dailySchedule.map((schedule) => (
                                <Card key={schedule.id} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{schedule.client.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {schedule.time} - {schedule.services.join(", ")}
                                            </div>
                                        </div>
                                        <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                                    </div>
                                </Card>
                            )))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}