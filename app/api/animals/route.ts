export const runtime = "nodejs";

import clientPromise from "@/db/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const animals = await db
      .collection("Animals")
      .find(
        {},
        {
          projection: {
            _id: 1,
            commonName: 1,
            species: 1,
          },
        }
      )
      .sort({ commonName: 1 })
      .toArray();

    return new Response(
      JSON.stringify({
        success: true,
        animals: animals.map((a) => ({
          _id: a._id,
          commonName: a.commonName,
          species: a.species,
        })),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  } catch (e: unknown) {
    console.error("Error fetching animals:", e);

    const message = e instanceof Error ? e.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
