"use server";

import type { Observation } from "@/lib/types";

export async function getObservations(): Promise<Observation[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_BASE_URL in environment variables");
    }

    const res = await fetch(`${baseUrl}/api/observations`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch observations: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "API returned unknown error");
    }

    return data.observations as Observation[];
  } catch (err) {
    console.error("getObservations error:", err);
    return [];
  }
}
