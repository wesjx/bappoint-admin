export type ServiceType = {
    id: number;
    notification: "customerEmail" | "customerSMS" | "adminEmail" | "reminderAdvance";
    name: string;
    price: number;
    duration: number;
    active: boolean;
};
