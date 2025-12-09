import clientPromise from "@/db/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const observations = await db
      .collection("Observations")
      .aggregate([
        {
          $lookup: {
            from: "Animals",
            localField: "animalId",
            foreignField: "_id",
            as: "animal",
          },
        },
        { $unwind: "$animal" },

        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            latitude: 1,
            longitude: 1,
            "animal.commonName": 1,
          },
        },
        {
          $addFields: {
            coords: ["$latitude", "$longitude"],
          },
        },
        {
          $project: {
            latitude: 0,
            longitude: 0,
          },
        },
      ])
      .toArray();

    return new Response(
      JSON.stringify({
        success: true,
        observations,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e: unknown) {
    console.error("Error fetching minimal observations:", e);

    const message = e instanceof Error ? e.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
