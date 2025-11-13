"use client";

import { useTranslations } from "next-intl";

/**
 * Welcome Section
 */
export default function WelcomeSection() {
  const t = useTranslations("welcome");
  return (
    <section className="section">
      <h2>{t("title")}</h2>
    </section>
  );
}
