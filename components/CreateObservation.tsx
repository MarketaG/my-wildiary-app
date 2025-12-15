"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/side-bar";
import { PlusIcon } from "@heroicons/react/24/solid";

type CreateObservationProps = {
  label: string;
};

/**
 * CREATE OBSERVATION
 */
export function CreateObservation({ label }: CreateObservationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-emerald-700 hover:bg-emerald-600"
      >
        <PlusIcon className="w-5 h-5 mr-2 text-text" />
        {label}
      </Button>
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
