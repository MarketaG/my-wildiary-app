export const runtime = "nodejs";

import { ObjectId } from "mongodb";
import clientPromise from "@/db/mongodb";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid ID" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mydatabase");

    const observation = await db
      .collection("Observations")
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
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

            latitude: 1,
            longitude: 1,

            "animal._id": 1,
            "animal.commonName": 1,
            "animal.species": 1,

            "user._id": 1,
            "user.name": 1,
          },
        },
      ])
      .next();

    if (!observation) {
      return new Response(
        JSON.stringify({ success: false, error: "Not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, observation }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    console.error("Error fetching observation:", e);

    const message = e instanceof Error ? e.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
