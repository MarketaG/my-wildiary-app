import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { NavLinkProps } from "@/lib/types";

/**
 * NAVIGATION LINK
 */
export default function NavLink({
  href,
  label,
  active,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "px-3 py-2 rounded-md cursor-pointer font-medium relative",
        active ? "text-emerald-200 font-bold" : "text-accent-foreground",
        className
      )}
    >
      {label}
    </Link>
  );
}
