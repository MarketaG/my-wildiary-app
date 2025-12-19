import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const contactFormSchema = z
  .object({
    animalId: z
      .string()
      .transform((v) => (v === "" ? undefined : v))
      .optional(),
    newAnimal: z
      .object({
        species: z.string().min(1, "Species is required"),
        commonName: z.string().min(1, "Common name is required"),
        diet: z.string().optional(),
        conservationStatus: z.string().optional(),
      })
      .optional(),

    userId: objectIdSchema,
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),

    habitat: z.string().min(1, "Habitat is required"),
    weather: z.string().min(1, "Weather is required"),

    latitude: z.coerce.number().refine((v) => !isNaN(v), {
      message: "Latitude is required",
    }),

    longitude: z.coerce.number().refine((v) => !isNaN(v), {
      message: "Longitude is required",
    }),

    imageUrl: z.string().url("Invalid image URL").optional(),

    date: z.string().min(1, "Date is required"),
  })
  .refine((data) => data.animalId || data.newAnimal, {
    message: "Select an existing animal or create a new one",
    path: ["animalId"],
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;
