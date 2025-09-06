import "server-only"
import { scheduleDate } from "@/public/mocks/statisticsMock"

export async function getBooking(id: number){
    const booking = scheduleDate.find((b) => b.id === id)
  return booking
}