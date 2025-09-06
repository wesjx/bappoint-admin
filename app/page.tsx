import BookCalendar from "@/components/book-calendar"
import TableBookings from "../components/table-bookings"
import TodayBooks from "@/components/today-books"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Statistics from "@/components/statistics"

export default function Page() {

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

        <TabsContent value="list">
          <TableBookings />
        </TabsContent>

        <TabsContent value="calendar">
          <BookCalendar key='calendar' />
        </TabsContent>

        <TabsContent value="today">
          <TodayBooks />
        </TabsContent>
      </Tabs>
    </>
  )
}
