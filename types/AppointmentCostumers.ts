import { Status } from "@/enum/status"

export interface Appointment {
    id: string
    createdAt: string
    costumerName: string
    costumerEmail: string
    costumerPhone: string
    appointmentDate: string
    startTime: string
    endTime: string
    totalAmount: number
    stripeSessionId: string
    serviceIds: string[]
    appointmentStatus: Status
    companyId: string
  }
  
  export type AppointmentFormData = Omit<Appointment, "id">