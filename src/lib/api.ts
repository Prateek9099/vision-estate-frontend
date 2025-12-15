// src/lib/api.ts
import axios from "axios";

// Hardcoded to ensure connection during debugging
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

console.log("API_BASE_URL =", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- helpers
export function extractErrorMessage(err: unknown): string {
  // axios-specific
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (data) {
      if (typeof data === "string") return data;
      // server might return { error: "..." } or { message: "..." } or other JSON
      if (typeof data === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyData = data as any;
        return anyData.error || anyData.message || JSON.stringify(anyData);
      }
    }
    return err.message || "Network error";
  }

  // generic Error
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err) || "Unknown error";
  } catch {
    return "Unknown error";
  }
}

// --- types
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location?: string;
  bhk?: number;
  area?: number;
  amenities?: Record<string, unknown>;
  eco_score?: number;
  thumbnail_url?: string;
  model_3d_url?: string;
}

// --- API functions
export const getProperties = async (): Promise<Property[]> => {
  try {
    const res = await api.get<Property[]>("/api/properties");
    return res.data;
  } catch (err: unknown) {
    console.error("getProperties error:", err);
    throw new Error(extractErrorMessage(err));
  }
};

export async function getPropertyById(id: string): Promise<Property> {
  try {
    const res = await api.get<Property>(`/api/properties/${id}`);
    return res.data;
  } catch (err: unknown) {
    console.error("getPropertyById error:", err);
    throw new Error(extractErrorMessage(err));
  }
}

export type BookingResponse = {
  id: string;
  user_id: string;
  property_id: string;
  status: string;
  milestones: string;
  created_at: string;
};

export async function createBooking(payload: {
  user_id?: string;
  name?: string;
  email?: string;
  property_id: string;
  initial_payment?: number;
}): Promise<BookingResponse> {
  try {
    const res = await api.post<BookingResponse>("/api/bookings", payload);
    return res.data;
  } catch (err: unknown) {
    console.error("createBooking error:", err);
    throw new Error(extractErrorMessage(err));
  }
}

export type SiteVisitResponse = {
  id: string;
  user_id: string;
  property_id: string;
  visit_date: string;
  status: string;
  created_at: string;
};

export async function createSiteVisit(payload: {
  user_id?: string;
  name?: string;
  email?: string;
  property_id: string;
  visit_date: string;
}): Promise<SiteVisitResponse> {
  try {
    const res = await api.post<SiteVisitResponse>("/api/site-visits", payload);
    return res.data;
  } catch (err: unknown) {
    console.error("createSiteVisit error:", err);
    throw new Error(extractErrorMessage(err));
  }
}