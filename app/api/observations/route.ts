export const runtime = "nodejs";

import { NextResponse } from "next/server";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { contactFormSchema } from "@/lib/validation/contactForm.schema";
import { ZodError } from "zod";

/* =========================
   GET
========================= */
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

    return NextResponse.json({ success: true, observations }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching observations:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/* =========================
   POST
========================= */
const DAILY_LIMIT = 50;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactFormSchema.parse(body);

    if (!data.userId) {
      return NextResponse.json(
        { message: "User is required" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mydatabase");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayCount = await db.collection("Observations").countDocuments({
      userId: new ObjectId(data.userId),
      createdAt: { $gte: startOfDay },
    });

    if (todayCount >= DAILY_LIMIT) {
      return NextResponse.json(
        { message: "Daily observation limit reached" },
        { status: 429 }
      );
    }

    let animalId: ObjectId;

    if (data.newAnimal) {
      const animalInsert = await db.collection("Animals").insertOne({
        species: data.newAnimal.species,
        commonName: data.newAnimal.commonName,
        diet: data.newAnimal.diet ?? null,
        conservationStatus: data.newAnimal.conservationStatus ?? null,
        createdAt: new Date(),
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
      userId: new ObjectId(data.userId),
    };

    const result = await db.collection("Observations").insertOne(observation);

    return NextResponse.json(
      { id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("OBSERVATION POST ERROR:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
