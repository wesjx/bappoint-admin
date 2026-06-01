"use client"
import BookCalendar from "@/components/book-calendar"
import TodayBooks from "@/components/today-books"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Statistics from "@/components/statistics"
import BookingsPanel from "@/components/bookings"
import { useCompany } from "@/contexts/company-context"


export default function Bookings() {

  const { company, loading } = useCompany();

  console.log(company);

  return (
    <>
      <Header />
      <Statistics/>
      <Tabs defaultValue="list" className="space-y-6">
        <div className="pt-6 px-6">
          <TabsList>
            <TabsTrigger value="list">List of bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>

        </div>

        {/* <TabsContent value="list">
          <BookingsPanel />
        </TabsContent>

        <TabsContent value="calendar">
          <BookCalendar key='calendar' />
        </TabsContent>

        <TabsContent value="today">
          <TodayBooks />
        </TabsContent> */}
      </Tabs>
      <div>
      <h1>{company?.name}</h1>
      <p>{company?.email}</p>
    </div>
    </>
  )
}
