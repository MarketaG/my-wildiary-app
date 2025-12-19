import clientPromise from "./mongodb";

export async function initDb() {
  const client = await clientPromise;
  const db = client.db("mydatabase");

  console.log("Initializing database structure...");

  await db
    .collection("Animals")
    .createIndex({ commonName: "text" }, { name: "animals_commonName_text" });

  await db
    .collection("Observations")
    .createIndex({ title: "text" }, { name: "observations_title_text" });

  await db.collection("Observations").createIndex({ animalId: 1 });
  await db.collection("Observations").createIndex({ userId: 1 });

  await db.collection("Users").createIndex({ name: 1 }, { unique: true });
}
