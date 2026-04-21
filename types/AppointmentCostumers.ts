export interface Appointment {
    id: string
    name: string
    services: string[]
    amount: number
    status: Status
  }
  
  export type AppointmentFormData = Omit<Appointment, "id">