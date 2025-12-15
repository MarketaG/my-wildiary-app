import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  return (
    <div className="relative inline-flex group">
      {children}
      <div
        className={`absolute z-50 px-2 py-1 text-xs font-medium rounded whitespace-nowrap
        bg-foreground text-background opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity ${positionClasses}`}
        suppressHydrationWarning
      >
        {content}
      </div>
    </div>
  );
}
