export const statistics = {
  appointmentsToday: 3,
  revenueToday: 145,
  customersServed: 28,
  occupancyRate: 85,
} as const;

// Mocked data for demonstration
export const scheduleDate = [
  {
    id: 1,
    client: {
      name: "João Silva",
      phone: "+351 912 345 678",
      email: "joao@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-08-31",
    time: "09:00",
    services: ["Premium Wash"],
    total: 40,
    depositPaid: 20,
    status: "confirmed",
    vehicle: "BMW X3 - ABC-12-34",
    notes: "Client prefers extra wax",
  },
  {
    id: 2,
    client: {
      name: "Maria Santos",
      phone: "+351 913 456 789",
      email: "maria@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-08-31",
    time: "10:30",
    services: ["Complete Wash", "Complete Detailing"],
    total: 90,
    depositPaid: 45,
    status: "pending",
    vehicle: "Mercedes C200 - DEF-56-78",
    notes: "",
  },
  {
    id: 3,
    client: {
      name: "Pedro Costa",
      phone: "+351 914 567 890",
      email: "pedro@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-08-31",
    time: "14:00",
    services: ["Simple Wash"],
    total: 15,
    depositPaid: 7.5,
    status: "completed",
    vehicle: "Volkswagen Golf - GHI-90-12",
    notes: "",
  },
  {
    id: 4,
    client: {
      name: "Ana Oliveira",
      phone: "+351 915 678 901",
      email: "ana@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-01",
    time: "11:00",
    services: ["Premium Wash"],
    total: 40,
    depositPaid: 20,
    status: "confirmed",
    vehicle: "Audi A4 - JKL-34-56",
    notes: "First time at the establishment",
  },
  {
    id: 5,
    client: {
      name: "Carlos Ferreira",
      phone: "+351 916 789 012",
      email: "carlos@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-01",
    time: "15:30",
    services: ["Complete Detailing"],
    total: 65,
    depositPaid: 32.5,
    status: "canceled",
    vehicle: "Toyota Corolla - MNO-78-90",
    notes: "Canceled by client",
  },
  {
    id: 6,
    client: {
      name: "Rui Almeida",
      phone: "+351 917 111 222",
      email: "rui@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-02",
    time: "09:30",
    services: ["Complete Wash"],
    total: 50,
    depositPaid: 25,
    status: "pending",
    vehicle: "Seat Leon - PQR-12-34",
    notes: "",
  },
  {
    id: 7,
    client: {
      name: "Beatriz Rocha",
      phone: "+351 918 222 333",
      email: "beatriz@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-02",
    time: "13:00",
    services: ["Simple Wash", "Quick Wax"],
    total: 25,
    depositPaid: 10,
    status: "confirmed",
    vehicle: "Peugeot 208 - STU-56-78",
    notes: "",
  },
  {
    id: 8,
    client: {
      name: "Fernando Lopes",
      phone: "+351 919 333 444",
      email: "fernando@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-03",
    time: "16:00",
    services: ["Complete Detailing"],
    total: 85,
    depositPaid: 42.5,
    status: "confirmed",
    vehicle: "Tesla Model 3 - VWX-90-12",
    notes: "Client requested special attention on the interior",
  },
  {
    id: 9,
    client: {
      name: "Sofia Martins",
      phone: "+351 920 444 555",
      email: "sofia@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-04",
    time: "10:00",
    services: ["Premium Wash"],
    total: 40,
    depositPaid: 20,
    status: "pending",
    vehicle: "Renault Clio - YZA-34-56",
    notes: "",
  },
  {
    id: 10,
    client: {
      name: "Miguel Torres",
      phone: "+351 921 555 666",
      email: "miguel@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2025-09-04",
    time: "17:30",
    services: ["Complete Wash"],
    total: 55,
    depositPaid: 27.5,
    status: "confirmed",
    vehicle: "Honda Civic - BCD-78-90",
    notes: "",
  },
] as const;

export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "canceled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const scheduleDateMock = [
  // example/mock data - keep your existing mock or replace it
  {
    id: "1",
    client: { name: "Alice Silva", phone: "+351 912345678", email: "alice@example.com", avatar: null },
    date: new Date().toISOString(),
    time: "10:00",
    services: ["Wash", "Polish"],
    vehicle: "Toyota Corolla",
    total: 50,
    depositPaid: 20,
    status: "pending",
    notes: "Allergic to wax"
  },
  {
    id: "2",
    client: { name: "Bruno Costa", phone: "+351 923456789", email: "bruno@example.com", avatar: null },
    date: new Date().toISOString(),
    time: "14:00",
    services: ["Interior Cleaning"],
    vehicle: "Honda Civic",
    total: 30,
    depositPaid: 0,
    status: "confirmed",
    notes: ""
  }
];