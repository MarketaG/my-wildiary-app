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
          $lookup: {
            from: "Users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            habitat: 1,
            weather: 1,
            createdAt: 1,
            "animal._id": 1,
            "animal.commonName": 1,
            "animal.species": 1,
            "user._id": 1,
            "user.name": 1,
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
    console.error("Error fetching observations:", e);

    const message = e instanceof Error ? e.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
