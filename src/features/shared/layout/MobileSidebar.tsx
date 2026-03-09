import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Target,
  UploadIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";
import gsap from "gsap";
import { layoutTheme } from "./layoutTheme";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

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
      // Garante estado inicial antes de animar
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
        className="fixed top-0 left-0 h-full w-72 sm:w-80 max-w-[85vw] border-r border-border z-50 lg:hidden overflow-y-auto"
        style={{
          backgroundColor: layoutTheme.sidebarBackground,
          transform: "translateX(-100%)",
        }}
      >
        <div
          className="flex items-center justify-between p-4 border-b border-border sticky top-0 z-10"
          style={{ backgroundColor: layoutTheme.sidebarBackground }}
        >
          <span className="text-content-primary font-bold text-lg sm:text-xl">EVO Coaching</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-muted rounded-lg transition-colors touch-manipulation cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-content-secondary" />
          </button>
        </div>

        <nav className="py-2">
          {menus.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-4 transition-colors touch-manipulation ${
                  isActive
                    ? "font-semibold border-r-4"
                    : "text-content-secondary hover:bg-surface-muted hover:text-content-primary active:bg-surface-subtle"
                }`}
                style={isActive ? {
                  backgroundColor: layoutTheme.activeItemBackground,
                  color: layoutTheme.activeItemColor,
                  borderRightColor: layoutTheme.activeItemColor,
                } : undefined}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className="text-sm sm:text-base">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
