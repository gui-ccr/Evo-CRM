import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Moon, Sun } from "lucide-react";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Target,
  UploadIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";
import gsap from "gsap";
import { useLayoutTheme, useTheme } from "./ThemeContext";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const theme = useLayoutTheme();
  const { isDark, toggleTheme } = useTheme();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Gestão de Clientes", icon: UsersIcon, path: "/clientes" },
    { name: "CRM Intelligence", icon: Target, path: "/crm" },
    { name: "Upload de Listas", icon: UploadIcon, path: "/upload" },
    { name: "Disparo de Mensagens", icon: SendIcon, path: "/mensagens" },
    { name: "Configurações", icon: SettingsIcon, path: "/configuracoes" },
  ];

  useEffect(() => {
    const backdrop = backdropRef.current;
    const aside = asideRef.current;
    if (!backdrop || !aside) return;

    if (isOpen) {
      gsap.set(aside, { x: "-100%" });
      gsap.set(backdrop, { opacity: 0, pointerEvents: "auto" });

      const tl = gsap.timeline();
      tl.to(backdrop, { opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(aside, { x: "0%", duration: 0.3, ease: "power3.out" }, "<");
    } else {
      gsap.set(backdrop, { pointerEvents: "none" });

      const tl = gsap.timeline();
      tl.to(aside, { x: "-100%", duration: 0.25, ease: "power3.in" })
        .to(backdrop, { opacity: 0, duration: 0.2, ease: "power2.in" }, "<0.05");
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        ref={asideRef}
        className="no-theme-transition fixed top-0 left-0 h-full w-72 sm:w-80 max-w-[85vw] border-r border-border z-50 lg:hidden overflow-y-auto flex flex-col"
        style={{
          backgroundColor: theme.sidebarBackground,
          transform: "translateX(-100%)",
        }}
      >
        <div
          className="flex items-center justify-between p-4 border-b sticky top-0 z-10"
          style={{
            backgroundColor: theme.sidebarBackground,
            borderColor: isDark ? "#3F3F46" : "#E5E7EB",
          }}
        >
          <span className="font-bold text-lg sm:text-xl" style={{ color: theme.pageTitleColor }}>EVO Coaching</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors touch-manipulation cursor-pointer"
            style={{ color: isDark ? "#A1A1AA" : "#6B7280" }}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="py-2 flex-1">
          {menus.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`group flex items-center gap-3 px-5 py-4 transition-colors touch-manipulation ${
                  isActive ? "font-semibold border-r-4" : ""
                }`}
                style={isActive ? {
                  backgroundColor: theme.activeItemBackground,
                  color: theme.activeItemColor,
                  borderRightColor: theme.activeItemColor,
                } : { color: isDark ? "#A1A1AA" : "#6B7280" }}
              >
                <item.icon size={20} className={`shrink-0 ${isActive ? '' : 'transition-colors group-hover:text-indigo-400'}`} />
                <span className={`text-sm sm:text-base ${isActive ? '' : 'transition-colors group-hover:text-indigo-400'}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="px-5 pb-6 pt-4 border-t" style={{ borderColor: isDark ? "#3F3F46" : "#E5E7EB" }}>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: isDark ? "#3F3F46" : "#F3F4F6",
              color: isDark ? "#A1A1AA" : "#6B7280",
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">{isDark ? "Tema Claro" : "Tema Escuro"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
