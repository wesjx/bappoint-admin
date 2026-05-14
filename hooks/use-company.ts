"use client"

import { useState, useCallback, useEffect } from "react"
import type { Company, CompanyFormData } from "@/types/Company"
import { useApiClerkClient } from "@/lib/api-clerk"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function getCompanyByClerkId(): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/list/{companyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get company details: ${response.status}`);
  }

  return response.json() as Promise<Company>;
}