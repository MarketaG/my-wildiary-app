import { AnimalOption } from "@/lib/types";

export async function fetchAnimals(): Promise<AnimalOption[]> {
  const res = await fetch("/api/animals", {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch animals");
  return (await res.json()).animals;
}
