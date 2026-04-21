"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface Company {
  id: string;
  clerkUserId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  slug: string;
  settings: object;
}

interface CompanyContextType {
  company: Company | null;
  loading: boolean;
}

const CompanyContext = createContext<CompanyContextType>({
  company: null,
  loading: true,
});

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const { userId, getToken } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchCompany() {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/clerk/${userId}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );

      const data = await res.json();
      setCompany(data);
      setLoading(false);
    }

    fetchCompany();
  }, [userId]); 

  return (
    <CompanyContext.Provider value={{ company, loading }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
