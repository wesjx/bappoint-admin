import { useAuth } from "@clerk/nextjs"
import { useCallback } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export function useApiClerkClient() {
  const { getToken } = useAuth()

  const authFetch = useCallback(async (path: string, options: RequestInit = {}) => {
    const token = await getToken({ template: "default", skipCache: true })

    if (!token) throw new Error("No auth token available")

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || `Request failed: ${res.status}`)
    }

    const contentType = res.headers.get("content-type")
    if (contentType?.includes("application/json")) {
      return res.json()
    }
    return res.text()
  }, [getToken])

  return { authFetch }
}