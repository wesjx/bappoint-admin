"use client";

import AppointmentsCalendar from "@/components/appointments-calendar";
import TodayAppointments from "@/components/today-appointments";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Statistics from "@/components/statistics";
import BookingsPanel from "@/components/bookings";

export default function Bookings() {
  return (
    <>
      <Header />
      <Statistics />

      <Tabs defaultValue="list" className="space-y-6">
        <div className="px-6 pt-6">
          <TabsList>
            <TabsTrigger value="list">List of bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list">
          <BookingsPanel />
        </TabsContent>

        <TabsContent value="calendar">
          <AppointmentsCalendar />
        </TabsContent>

        <TabsContent value="today">
          <TodayAppointments />
        </TabsContent>
      </Tabs>
    </>
  );
}
