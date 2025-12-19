import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import clientPromise from "../db/mongodb";
import { initDb } from "../db/initDb";
import { ObjectId } from "mongodb";

async function seed() {
  const client = await clientPromise;
  const db = client.db("mydatabase");

  await initDb();

  console.log("Deleting old data...");
  await db.collection("Users").deleteMany({});
  await db.collection("Animals").deleteMany({});
  await db.collection("Observations").deleteMany({});

  console.log("Inserting seed data...");

  // --- Users
  const users = Array.from({ length: 5 }).map((_, i) => ({
    _id: new ObjectId(),
    name: `User ${i + 1}`,
    password: `hashed-password-${i + 1}`,
  }));

  await db.collection("Users").insertMany(users);

  // --- Animals
  const animals = [
    {
      _id: new ObjectId(),
      species: "Vulpes vulpes",
      commonName: "Red Fox",
      conservationStatus: "Least Concern",
      diet: "Omnivore",
    },
    {
      _id: new ObjectId(),
      species: "Lynx lynx",
      commonName: "Eurasian Lynx",
      conservationStatus: "Least Concern",
      diet: "Carnivore",
    },
    {
      _id: new ObjectId(),
      species: "Castor fiber",
      commonName: "European Beaver",
      conservationStatus: "Least Concern",
      diet: "Herbivore",
    },
    {
      _id: new ObjectId(),
      species: "Cervus elaphus",
      commonName: "Red Deer",
      conservationStatus: "Least Concern",
      diet: "Herbivore",
    },
    {
      _id: new ObjectId(),
      species: "Capreolus capreolus",
      commonName: "Roe Deer",
      conservationStatus: "Least Concern",
      diet: "Herbivore",
    },
  ];

  await db.collection("Animals").insertMany(animals);

  // --- Observations
  const observationTitles = [
    "Fox spotted in the field",
    "Lynx hunting by the river",
    "Lynx in rocky terrain",
    "Beaver building a dam",
    "Deer in the morning mist",
  ];
  const habitats = ["Forest", "Mountains", "Field", "River", "Meadow"];
  const weathers = ["Sunny", "Cloudy", "Rain", "Windy", "Fog"];
  const observationDescriptions = [
    "The red fox was seen hunting along the edge of the field in the early morning.",
    "A bear was spotted near the river searching for fish and moving cautiously.",
    "A Eurasian lynx was observed silently moving through the rocky terrain.",
    "A European beaver was busy building a dam along the riverbank.",
    "A red deer was seen grazing in the meadow under the morning mist.",
  ];
  const observationDates = [
    new Date("2025-12-01T08:30:00"),
    new Date("2025-12-02T10:15:00"),
    new Date("2025-12-03T14:00:00"),
    new Date("2025-12-04T09:45:00"),
    new Date("2025-12-05T07:20:00"),
  ];
  const generateRandomCzechMountainCoords = () => {
    const latitude = 48.5 + Math.random() * 1.5; // 48.5 – 50.0
    const longitude = 13.5 + Math.random() * 3.5; // 13.5 – 17.0
    return { latitude, longitude };
  };

  const observations = Array.from({ length: 5 }).map((_, i) => {
    const { latitude, longitude } = generateRandomCzechMountainCoords();

    return {
      _id: new ObjectId(),
      title: observationTitles[i],
      description: observationDescriptions[i],
      createdAt: observationDates[i],
      habitat: habitats[i],
      weather: weathers[i],
      latitude,
      longitude,
      imageUrl: `https://example.com/image-${i + 1}.jpg`,
      userId: users[i]._id,
      animalId: animals[i]._id,
    };
  });

  await db.collection("Observations").insertMany(observations);

  console.log("Seed ready!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
