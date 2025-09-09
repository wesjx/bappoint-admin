export const weekDays = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const 

export const initialConfig = {
    operatingHours: {
        monday: { active: true, start: "08:00", end: "18:00" },
        tuesday: { active: true, start: "08:00", end: "18:00" },
        wednesday: { active: true, start: "08:00", end: "18:00" },
        thursday: { active: true, start: "08:00", end: "18:00" },
        friday: { active: true, start: "08:00", end: "18:00" },
        saturday: { active: true, start: "08:00", end: "16:00" },
        sunday: { active: false, start: "08:00", end: "18:00" },
    },
    appointmentIntervals: 30, // minutes
    offDays: [
        { id: 1, date: "2024-12-25", reason: "Christmas", type: "holiday" },
        { id: 2, date: "2024-01-01", reason: "New Year", type: "holiday" },
        { id: 3, date: "2024-02-15", reason: "Maintenance", type: "maintenance" },
    ],
    services: [
        { id: 1, name: "Simple Wash", price: 15, duration: 30, active: true },
        { id: 2, name: "Complete Wash", price: 25, duration: 45, active: true },
        { id: 3, name: "Premium Wash", price: 40, duration: 60, active: true },
        { id: 4, name: "Complete Detailing", price: 65, duration: 90, active: true },
    ],
    notifications: {
        customerEmail: true,
        customerSMS: true,
        adminEmail: true,
        reminderAdvance: 24, // hours
    },
    payment: {
        depositPercentage: 50,
        acceptedMethods: ["card", "pix", "cash"],
    },
    company: {
        name: "CleanCar Pro",
        phone: "+351 912 345 678",
        email: "contact@cleancar.pt",
        address: "123 Flower Street - Lisbon",
        maxCancellationTime: 2, // hours
    },
} 
