import { Link } from "@/i18n/navigation";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { NavIconProps } from "@/lib/types";

/**
 * NAVIGATION ICON
 */
export default function NavIcon({
  icon: Icon,
  href,
  tooltip,
  onClick,
  className,
}: NavIconProps) {
  const iconElement = (
    <span className="flex items-center justify-center h-full w-full">
      <Icon className="h-6 w-6 text-text" />
    </span>
  );

  return (
    <Tooltip content={tooltip} position="bottom">
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          <Button variant="ghost" size="icon" className="cursor-pointer">
            {iconElement}
          </Button>
        </Link>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={`flex items-center justify-center cursor-pointer ${className}`}
        >
          {iconElement}
        </Button>
      )}
    </Tooltip>
  );
}
