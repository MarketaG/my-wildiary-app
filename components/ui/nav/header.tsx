import NavLink from "@/components/ui/nav/nav-link";
import NavIcon from "@/components/ui/nav/nav-icon";
import { HeaderProps } from "@/lib/types";
import {
  BookOpenIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlusIcon,
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
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
          <input
            type="text"
            placeholder={t("search")}
            className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none bg-emerald-700 text-white placeholder-emerald-200 hover:bg-emerald-600 transition-colors"
          />
        </div>

        {/* right - create button + translation */}
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center justify-center bg-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2 text-white" />
            Create
          </button>
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
