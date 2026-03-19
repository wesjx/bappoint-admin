"use client"

import { useState, useCallback, useEffect } from "react"
import type { Company, CompanyFormData } from "@/types/Company"
import { useApiClerkClient } from "@/lib/api-clerk"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const { authFetch } = useApiClerkClient()

  const getCompanies = useCallback(async () => {
    setLoading(true)
    try {
      const data = await authFetch("/companies/list")
      setCompanies(data)
    } catch {
      throw new Error("Failed to fetch companies")
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  const getCompany = useCallback(async (id: string): Promise<Company | null> => {
    try {
      return await authFetch(`/companies/list/${id}`)
    } catch {
      throw new Error("Failed to fetch company")
    }
  }, [authFetch])

  const createCompany = useCallback(async (data: CompanyFormData): Promise<Company> => {
    try {
      console.log(data)
      const newCompany = await authFetch("/companies/create", {
        method: "POST",
        body: JSON.stringify(data),
      })
      setCompanies((prev) => [...prev, newCompany])
      return newCompany
    } catch {
      throw new Error("Failed to create company")
    }
    
  }, [authFetch])

  const updateCompany = useCallback(async (id: string, data: CompanyFormData): Promise<Company> => {
    try {
      const updated = await authFetch(`/companies/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        
      })
      setCompanies((prev) => prev.map((c) => (c.id === id ? updated : c)))
      return updated
    } catch {
      throw new Error("Failed to update company")
    }
  }, [authFetch])

  const deleteCompany = useCallback(async (id: string): Promise<void> => {
    try {
      await authFetch(`/companies/delete/${id}`, { method: "DELETE" })
      setCompanies((prev) => prev.filter((c) => c.id !== id))
    } catch {
      throw new Error("Failed to delete company")
    }
  }, [authFetch])

  useEffect(() => {
    getCompanies()
  }, [getCompanies])

  return {
    companies,
    loading,
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  }
}