import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/solid";

type DialogWrapperProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
};

export function DialogWrapper({
  children,
  open,
  onClose,
  title,
  subtitle,
}: DialogWrapperProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center antialiased",
        "transition-opacity duration-300 ease-out",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-stone-800/75" onClick={onClose} />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-card rounded-lg",
          "w-full max-w-3xl max-h-[90vh] overflow-y-auto",
          "transform transition-transform duration-300 ease-out",
          open ? "scale-100" : "scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-stone-200 p-4 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-lg text-stone-800 font-semibold">{title}</h1>
            <p className="font-sans text-base text-stone-500">{subtitle}</p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 text-xl leading-none cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
