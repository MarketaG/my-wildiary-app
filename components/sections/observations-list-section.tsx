"use client";

import { useTranslations } from "next-intl";

/**
 * HOME SECTION
 */
export default function ObservationsListSection() {
  const t = useTranslations("welcome");
  return (
    <section className="absolute top-[64px] left-0 z-20 h-full w-[380px] bg-white/90 backdrop-blur-md shadow-xl">
      <h2 className="text-black">{t("title")}</h2>
    </section>
  );
}
