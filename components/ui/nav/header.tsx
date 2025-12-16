import NavLink from "@/components/ui/nav/nav-link";
import NavIcon from "@/components/ui/nav/nav-icon";
import { SearchBar } from "@/components/ui/nav/searchbar";
import { CreateObservation } from "@/components/CreateObservation";
import { HeaderProps } from "@/lib/types";
import {
  BookOpenIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

/**
 * HEADER - top navigation
 * Top-level navigation bar containing links, navigation icons and search.
 */
export default function Header({
  t,
  locale,
  theme,
  isActive,
  switchLanguage,
  toggleTheme,
}: HeaderProps) {
  return (
    <header className="bg-emerald-800 shadow-lg text-text">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* left - logo + nav*/}
        <div className="flex items-center gap-6">
          <BookOpenIcon className="w-8 h-8" />
          <nav>
            <ul className="flex gap-4">
              <li>
                <NavLink href="/" label={t("home")} active={isActive("/")} />
              </li>
              <li>
                <NavLink
                  href="/observations"
                  label={t("observations-list")}
                  active={isActive("/observations")}
                />
              </li>
            </ul>
          </nav>
        </div>

        {/* center - search bar */}
        <div className="relative w-1/3 max-w-md">
          <SearchBar placeholder={t("search")} icon={MagnifyingGlassIcon} />
        </div>

        {/* right - create button + translation */}
        <div className="flex items-center justify-center gap-4">
          <CreateObservation label={t("create")} />

          <NavIcon
            icon={GlobeAltIcon}
            tooltip={
              locale === "en"
                ? "CS Přepnout na češtinu"
                : "EN Switch to English"
            }
            onClick={() => switchLanguage(locale === "en" ? "cs" : "en")}
            className="hidden md:block"
          />

          <NavIcon
            icon={theme === "dark" ? SunIcon : MoonIcon}
            tooltip={theme === "dark" ? t("theme-light") : t("theme-dark")}
            onClick={toggleTheme}
            className="hidden md:block"
          />
        </div>
      </div>
    </header>
  );
}
