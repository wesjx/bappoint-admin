export interface Company {
  id: string
  slug: string
  stripeAccountId: string
  name: string
  email: string
  phone: string
  address: string
  clerkUserId: string
      settings: {
        appointmentInterval: string
        maxCancellationInterval: number
    }
}

export type CompanyFormData = Omit<Company, "id">
