export type SettingsType = {
  businessHours: {
    [key: string]: {
      active: boolean;
      start: string;
      end: string;
    };
  };
  appointmentInterval: number;
  daysOff: {
    id: number;
    date: string;
    reason: string;
    type: string;
  }[];
  services: {
    id: number;
    name: string;
    price: number;
    duration: number;
    active: boolean;
  }[];
  notifications: {
    customerEmail: boolean;
    customerSMS: boolean;
    adminEmail: boolean;
    reminderAdvance: number;
  };
  payment: {
    depositPercentage: number;
    acceptedMethods: string[];
  };
  company: {
    name: string;
    phone: string;
    email: string;
    address: string;
    maxCancellationTime: number;
  };
}

export type ConfigType = {
  operatingHours: {
    monday: { active: boolean; start: string; end: string }
    tuesday: { active: boolean; start: string; end: string }
    wednesday: { active: boolean; start: string; end: string }
    thursday: { active: boolean; start: string; end: string }
    friday: { active: boolean; start: string; end: string }
    saturday: { active: boolean; start: string; end: string }
    sunday: { active: boolean; start: string; end: string }
  }
  appointmentIntervals: number
  offDays: {
    id: number
    date: string
    reason: string
    type: string
  }[]
  services: {
    id: number
    name: string
    price: number
    duration: number
    active: boolean
  }[]
  notifications: {
    customerEmail: boolean
    customerSMS: boolean
    adminEmail: boolean
    reminderAdvance: number
  }
  payment: {
    depositPercentage: number
    acceptedMethods: string[]
  }
  company: {
    name: string
    phone: string
    email: string
    address: string
    maxCancellationTime: number
  }
}
