import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * SIDEBAR
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] bg-black/40 transition-opacity z-30",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-[72px] z-40 w-96 bg-background shadow-xl",
          "h-[calc(100vh-80px)]",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create observation</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </header>

        <div className="p-4">
          {/* todo: Form */}
          Form goes here…
        </div>
      </aside>
    </>
  );
}
