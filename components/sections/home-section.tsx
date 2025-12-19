"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { SearchBar } from "@/components/ui/nav/searchbar";
import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/components/ui/observation/dialog-wrapper";
import { AddObservationForm } from "@/components/ui/observation/add-observation-form";
import { MinimalObservation } from "@/lib/types";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const Map = dynamic(() => import("../ui/map/map"), {
  ssr: false,
});

/**
 * HOME SECTION
 */
export default function HomeSection({
  observations,
}: {
  observations: MinimalObservation[];
}) {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);

    setTimeout(() => {
      toast.success("Observation added successfully");

      window.location.reload();
    }, 200);
  };

  return (
    <main className="relative h-full">
      <div className="relative h-full">
        {/* Map */}
        <Map observations={observations} />

        {/* overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-[1000] flex justify-center">
          <div className="pointer-events-auto flex items-center gap-3 h-10">
            <SearchBar
              placeholder={t("search")}
              icon={MagnifyingGlassIcon}
              className="w-56"
            />
            <Button
              onClick={() => setOpen(true)}
              className="bg-emerald-700 hover:bg-emerald-600 shadow-lg cursor-pointer"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {t("create-observation")}
            </Button>

            {/* Modal */}
            <DialogWrapper
              open={open}
              onClose={() => setOpen(false)}
              title={t("main-title")}
              subtitle={t("main-subtitle")}
            >
              <div className="p-4">
                <AddObservationForm
                  onSuccess={handleSuccess}
                  onClose={() => setOpen(false)}
                  t={t}
                />
              </div>
            </DialogWrapper>
          </div>
        </div>
      </div>
    </main>
  );
}
