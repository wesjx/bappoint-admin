export type CustomerSelected = {
  id: number;
  client: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  date: string; // formato ISO string ou "YYYY-MM-DD"
  time: string; // formato "HH:mm"
  services: string[];
  total: number;
  depositPaid: number;
  status: string;
  vehicle: string;
  notes: string;
};
