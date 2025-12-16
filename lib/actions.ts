"use server";

import type { Observation } from "@/lib/types";
import type { MinimalObservation } from "@/lib/types";

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

export async function getMinimalObservations(): Promise<MinimalObservation[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_BASE_URL in environment variables");
    }

    const res = await fetch(`${baseUrl}/api/observations/minimal`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch minimal observations: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "API returned unknown error");
    }

    return data.observations as MinimalObservation[];
  } catch (err) {
    console.error("getMinimalObservations error:", err);
    return [];
  }
}

export async function getObservation(id: string): Promise<Observation | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_BASE_URL in environment variables");
    }

    if (!id) {
      throw new Error("Missing observation id");
    }

    const res = await fetch(`${baseUrl}/api/observations/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch observation: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "API returned unknown error");
    }

    return data.observation as Observation;
  } catch (err) {
    console.error("getObservation error:", err);
    return null;
  }
}
