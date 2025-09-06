"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { scheduleDate, getStatusColor } from "@/public/mocks/statisticsMock";


export default function TodayBooks() {
    const appointmentToday = scheduleDate.filter(
        (schedule) => schedule.date === new Date().toISOString().split("T")[0],
    )

    console.log(scheduleDate)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointments for today</CardTitle>
                <CardDescription>
                    {appointmentToday.length} appointments for {new Date().toLocaleDateString("en-EU")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {appointmentToday.length === 0 ? (
                        <p>You don't have appointments for today.</p>
                    ) : (
                        appointmentToday.map((schedule) => (
                        <Card key={schedule.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={schedule.client.avatar || "/placeholder.svg"}
                                            alt={schedule.client.name}
                                        />
                                        <AvatarFallback>
                                            {schedule.client.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{schedule.client.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {schedule.time} - {schedule.services.join(", ")}
                                        </div>
                                        <div className="text-sm text-muted-foreground">{schedule.vehicle}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                                    <div className="text-sm font-medium mt-1">€{schedule.total}</div>
                                </div>
                            </div>
                        </Card>
                    )))}
                </div>
            </CardContent>
        </Card>
    )
}
