"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStatusColor } from "@/public/mocks/statisticsMock"
import { ArrowLeft, Mail, Phone } from "lucide-react"
import { useState } from "react"
import useSWR from 'swr'
import { format } from "date-fns"
import LoadingIndicator from "@/components/loading-indicator"
import { useForm } from "react-hook-form"
import { Form, FormField } from "@/components/ui/form"
import Header from "@/components/header"
import { useRouter } from "next/navigation"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export type BookingSelected = {
    id: number;
    client: {
        name: string;
        phone: string;
        email: string;
        avatar: string;
    };
    date: string; // formato ISO string ou "YYYY-MM-DD"
    time: string; // formato "HH:mm"
    services: readonly string[];
    total: number;
    depositPaid: number;
    status: string;
    vehicle: string;
    notes: string;
}

export default function RescheduleForm({ booking }: { booking: BookingSelected }) {
    
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string>("")

    const form = useForm()
    const route = useRouter()

    const { data, isLoading } = useSWR(
        selectedDate ? `/api/available-times?date=${format(selectedDate, 'yyyy-MM-dd')}` : null,
        fetcher,
        { dedupingInterval: 100_000 } // cache por 5 minutos no client também
    )

    async function onSubmit(values: any) {
        try {
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: values.date,
                    time: values.time,
                }),
            })

            const data = await res.json()
            console.log("Resposta:", data)

            if (data.success) {
                alert("Success")
            } else {
                alert("Error : " + data.error)
            }
        } catch (err) {
            console.error(err)
            alert("Error unespected.")
        }
    }

    console.log(data)

    return (
        <div className="space-y-8">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
                <div className="flex items-center gap-3">
                    <Button onClick={route.back} size="icon">
                        <ArrowLeft />
                    </Button>
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            alt={booking?.client.name}
                        />
                        <AvatarFallback>
                            {booking?.client.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold">{booking?.client.name}</h2>
                        <p className="text-sm text-muted-foreground">{booking?.client.email}</p>
                    </div>
                </div>
                <Badge className={getStatusColor(booking?.status ?? "")}>
                    {booking?.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{booking?.client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{booking?.client.email}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Datails</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <div className="text-sm text-muted-foreground">Date and time</div>
                            <div className="font-medium">
                                {new Date(booking?.date ?? "").toLocaleDateString("en-EU")} at{" "}
                                {booking?.time}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Vehícle</div>
                            <div className="font-medium">{booking?.vehicle}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg">Reschedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            field.onChange(date)
                                            setSelectedDate(date)
                                        }}
                                        className="rounded-md border border-slate-200"
                                        disabled={(date) => date < new Date() || date.getDay() === 0}
                                    />
                                )}
                            />

                            {selectedDate && (
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-3">
                                        Times available
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {isLoading && <LoadingIndicator />}
                                        {data?.times?.length > 0 ? (
                                            data.times.map((time: string) => (
                                                <FormField
                                                    key={time}
                                                    control={form.control}
                                                    name="time"
                                                    render={({ field }) => (
                                                        <Button
                                                            type="button"
                                                            variant={selectedTime === time ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => {
                                                                field.onChange(time)
                                                                setSelectedTime(time)
                                                            }}
                                                            className={
                                                                selectedTime === time
                                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                                    : ""
                                                            }
                                                        >
                                                            {time}
                                                        </Button>
                                                    )}
                                                />
                                            ))
                                        ) : (
                                            !isLoading && (
                                                <p className="text-sm text-muted-foreground">
                                                    None time available
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <Button type="submit">Confirm reschedule</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-lg">Services and payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">
                            Services selected
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {booking?.services.map((service: string, index: number) => (
                                <Badge key={index} variant="outline">
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                            <div className="text-sm text-muted-foreground">Total</div>
                            <div className="text-lg font-bold">€{booking?.total}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Deposit paid</div>
                            <div className="text-lg font-bold text-green-600">
                                €{booking?.depositPaid}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Rest</div>
                            <div className="text-lg font-bold text-orange-600">
                                €{(booking?.total ?? 0) - (booking?.depositPaid ?? 0)}
                            </div>
                        </div>
                    </div>

                    {booking?.notes && (
                        <div>
                            <div className="text-sm text-muted-foreground">Notes</div>
                            <div className="text-sm bg-slate-50 p-2 rounded">
                                {booking?.notes}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end p-6">
                <Button variant="outline" onClick={route.back}>
                    Back
                </Button>
            </div>
        </div>


    )
}