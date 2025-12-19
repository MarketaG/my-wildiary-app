export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { contactFormSchema } from "@/lib/validation/contactForm.schema";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = contactFormSchema.parse(body);

    const client = await clientPromise;
    const db = client.db("mydatabase");

    let animalId: ObjectId;

    if (data.newAnimal) {
      const animalInsert = await db.collection("Animals").insertOne({
        species: data.newAnimal.species,
        commonName: data.newAnimal.commonName,
        diet: data.newAnimal.diet ?? null,
        conservationStatus: data.newAnimal.conservationStatus ?? null,
      });

      if (!animalInsert.insertedId) {
        throw new Error("Failed to create animal");
      }

      animalId = animalInsert.insertedId;
    } else if (data.animalId) {
      animalId = new ObjectId(data.animalId);
    } else {
      return NextResponse.json(
        { message: "Animal is required" },
        { status: 400 }
      );
    }

    const observation = {
      title: data.title ?? null,
      description: data.description ?? null,
      habitat: data.habitat,
      weather: data.weather,
      latitude: data.latitude,
      longitude: data.longitude,
      imageUrl: data.imageUrl ?? null,
      createdAt: new Date(data.date),

      animalId,
      userId: data.userId ? new ObjectId(data.userId) : null,
    };

    const observationInsert = await db
      .collection("Observations")
      .insertOne(observation);

    if (!observationInsert.insertedId) {
      throw new Error("Failed to create observation");
    }

    return NextResponse.json(
      { id: observationInsert.insertedId.toString() },
      { status: 201 }
    );
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("OBSERVATION POST ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
