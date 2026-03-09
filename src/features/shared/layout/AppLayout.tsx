import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { ThemeProvider, useLayoutTheme } from "./ThemeContext";

function AppLayoutInner() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useLayoutTheme();

  return (
    <div className="flex h-screen w-full font-sans" style={{ backgroundColor: theme.pageBackground }}>
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header
          className="lg:hidden border-b border-border p-3 sm:p-4 flex items-center justify-between sticky top-0 z-30 shadow-card"
          style={{ backgroundColor: theme.sidebarBackground }}
        >
          <span className="text-content-primary font-bold text-base sm:text-lg" style={{ color: theme.pageTitleColor }}>EVO Coaching</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg transition-colors touch-manipulation cursor-pointer"
            style={{ color: theme.pageTitleColor }}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-auto w-full" style={{ backgroundColor: theme.pageBackground }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <ThemeProvider>
      <AppLayoutInner />
    </ThemeProvider>
  );
}
