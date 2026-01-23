import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-evo-cyan-50 font-sans">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="lg:hidden bg-evo-indigo p-3 sm:p-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          <span className="text-white font-bold text-base sm:text-lg">EVO Coaching</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu size={24} className="text-white" />
          </button>
        </header>

        <main className="flex-1 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
