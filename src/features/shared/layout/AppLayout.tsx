import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { layoutTheme } from "./layoutTheme";

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full font-sans" style={{ backgroundColor: layoutTheme.pageBackground }}>
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="lg:hidden bg-white border-b border-border p-3 sm:p-4 flex items-center justify-between sticky top-0 z-30 shadow-card">
          <span className="text-content-primary font-bold text-base sm:text-lg">EVO Coaching</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-surface-muted rounded-lg transition-colors touch-manipulation cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu size={24} className="text-content-secondary" />
          </button>
        </header>

        <main className="flex-1 overflow-auto w-full" style={{ backgroundColor: layoutTheme.pageBackground }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
