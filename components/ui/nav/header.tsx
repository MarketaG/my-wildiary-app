import Link from "next/link";
import {
  BookOpenIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

/**
 * HEADER - top navigation
 */
export default function Header() {
  return (
    <header className="bg-emerald-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* left - logo + nav*/}
        <div className="flex items-center gap-6">
          <BookOpenIcon className="w-8 h-8 text-white" />
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/observations"
                  className="px-3 py-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
                >
                  Observations List
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* center - search bar */}
        <div className="relative w-1/3 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none bg-emerald-700 text-white placeholder-emerald-200 hover:bg-emerald-600 transition-colors"
          />
        </div>

        {/* right - create button + translation */}
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center justify-center bg-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2 text-white" />
            Create
          </button>
          <GlobeAltIcon className="w-6 h-6 text-white cursor-pointer hover:text-emerald-200 transition-colors" />
          <SunIcon className="w-6 h-6 text-white cursor-pointer hover:text-emerald-200 transition-colors" />
        </div>
      </div>
    </header>
  );
}
