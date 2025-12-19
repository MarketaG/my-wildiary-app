"use client";

import { useState, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/lib/validation/contactForm.schema";
import { fetchAnimals } from "@/lib/fetch/animals";
import type { AnimalOption, User } from "@/lib/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { getNowForInput } from "@/lib/dayjs";

type AddObservationForm = {
  onSuccess: () => void;
  onClose: () => void;
  t: (key: string) => string;
};

/**
 * ADD OBSERVATION FORM
 */
export function AddObservationForm({
  onSuccess,
  onClose,
  t,
}: AddObservationForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      date: getNowForInput(),
    },
    shouldUnregister: true,
  });

  const [isCreatingAnimal, setIsCreatingAnimal] = useState(false);
  const [animals, setAnimals] = useState<AnimalOption[]>([]);
  const [loadingAnimals, setLoadingAnimals] = useState(true);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetchAnimals()
      .then((data) => {
        if (mounted) setAnimals(data);
      })
      .catch((err) => {
        console.error("Failed to load animals:", err);
      })
      .finally(() => {
        if (mounted) setLoadingAnimals(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        // limit
        if (res.status === 429) {
          setLimitReached(true);

          toast.error("Limit of observations has been reached");
          return;
        }

        if (result?.errors?.formErrors?.length) {
          toast.error(result.errors.formErrors[0]);
          return;
        }

        toast.error(result?.message ?? "Failed to create observation");
        return;
      }

      onSuccess();
    } catch {
      toast.error("Network error");
    }
  };

  const users: User[] = [
    { _id: "64f000000000000000000001", name: "Demo User" },
    { _id: "64f000000000000000000002", name: "User 2" },
    { _id: "64f000000000000000000003", name: "User 3" },
    { _id: "64f000000000000000000004", name: "User 4" },
    { _id: "64f000000000000000000005", name: "User 5" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("title")}*
        </label>
        <input
          id="title"
          className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground"
          {...register("title")}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("description")}*
        </label>
        <textarea
          id="description"
          className="flex h-20 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
          rows={4}
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t("animal")}*
          </label>

          <select
            {...register("animalId")}
            disabled={isCreatingAnimal || loadingAnimals}
            className="h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
          >
            <option value="">
              {loadingAnimals ? t("loading-animals") : t("select-animal")}
            </option>

            {animals.map((animal) => (
              <option key={animal._id} value={animal._id}>
                {animal.commonName} ({animal.species})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsCreatingAnimal(true)}
            className="mt-2 text-sm underline text-gray-400 cursor-pointer"
          >
            {t("create-new-animal")}
          </button>
          {isCreatingAnimal && (
            <div className="space-y-3 border border-muted-foreground rounded-md p-4">
              <h4 className="font-medium text-muted-foreground">
                {t("new-animal")}
              </h4>

              <input
                className="text-sm text-muted-foreground"
                placeholder={t("species-eg")}
                {...register("newAnimal.species")}
              />

              <input
                className="text-sm text-muted-foreground"
                placeholder={t("common-name")}
                {...register("newAnimal.commonName")}
              />

              <input
                className="text-sm text-muted-foreground"
                placeholder={t("diet")}
                {...register("newAnimal.diet")}
              />

              <input
                className="text-sm text-muted-foreground"
                placeholder={t("conservation-status")}
                {...register("newAnimal.conservationStatus")}
              />

              <button
                type="button"
                onClick={() => setIsCreatingAnimal(false)}
                className="text-sm underline text-gray-600 cursor-pointer"
              >
                {t("cancel")}
              </button>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="userId"
            className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("observer")}*
          </label>
          <select
            {...register("userId")}
            className="h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
          >
            <option value="">{t("select-user")}</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="habitat"
              className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("habitat")}*
            </label>
            <input
              id="habitat"
              className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
              placeholder={t("habitat-eg")}
              {...register("habitat")}
            />
          </div>

          <div>
            <label
              htmlFor="weather"
              className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("weather")}*
            </label>
            <input
              id="weather"
              className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
              placeholder="e.g., Sunny, Clear"
              {...register("weather")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="latitude"
              className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("latitude")}*
            </label>
            <input
              id="latitude"
              type="number"
              step="any"
              className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
              placeholder="e.g., 46.8182"
              {...register("latitude")}
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("longitude")}*
            </label>
            <input
              id="longitude"
              type="number"
              step="any"
              className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
              placeholder="e.g., 10.8342"
              {...register("longitude")}
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="text-sm text-muted-foreground font-medium"
        >
          {t("observation-date")}
        </label>

        <input
          id="date"
          type="datetime-local"
          defaultValue={getNowForInput()}
          className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/45"
          {...register("date")}
        />

        {errors.date && (
          <p className="text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("image-url")}
        </label>
        <input
          id="imageUrl"
          type="url"
          className="flex h-10 w-full rounded-md border px-3 text-sm text-muted-foreground/85"
          placeholder="https://example.com/image.jpg"
          {...register("imageUrl")}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1 cursor-pointer"
          disabled={limitReached}
        >
          {t("add-observation")}
        </Button>
        <Button className="cursor-pointer" variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
