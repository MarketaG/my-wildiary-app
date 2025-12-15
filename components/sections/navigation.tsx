"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Header from "@/components/ui/nav/header";

/**
 * NAVIGATION
 * Main entry point for navigation-related components and logic.
 */
export function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handlers = {
    switchLanguage(nextLocale: "cs" | "en") {
      router.push(pathname, { locale: nextLocale });
    },
    toggleTheme() {
      setTheme(theme === "dark" ? "light" : "dark");
    },
  };

  return (
    <>
      <Header
        t={t}
        locale={locale}
        theme={theme}
        isActive={isActive}
        {...handlers}
      />
    </>
  );
}
