"use client"

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useCompany() {
  const { userId, getToken } = useAuth(); // userId = clerkUserId automaticamente
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchCompany() {
      const token = await getToken(); // token sempre fresco, clerk renova sozinho

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/clerk/${userId}`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setCompany(data);
      setLoading(false);
    }

    fetchCompany();
  }, [userId]);

  return { company, loading };
}