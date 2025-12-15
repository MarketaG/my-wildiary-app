"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchBarProps } from "@/lib/types";

/**
 * SEARCHBAR
 */
export function SearchBar({
  placeholder,
  icon: Icon,
  value,
  onChange,
  className,
  name,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
      )}

      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-2 rounded-md",
          "bg-emerald-700 text-white placeholder-emerald-200",
          "hover:bg-emerald-600 transition-colors",
          "focus:outline-none"
        )}
      />
    </div>
  );
}
