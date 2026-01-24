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

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Gestão de Clientes", icon: UsersIcon, path: "/clientes" },
    { name: "CRM Intelligence", icon: Target, path: "/crm" },
    { name: "Upload de Listas", icon: UploadIcon, path: "/upload" },
    { name: "Disparo de Mensagens", icon: SendIcon, path: "/mensagens" },
    { name: "Configurações", icon: SettingsIcon, path: "/configuracoes" },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      <aside className="fixed top-0 left-0 h-full w-72 sm:w-80 max-w-[85vw] bg-evo-cyan-800 z-50 lg:hidden transform transition-transform duration-300 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-evo-cyan-800 z-10">
          <span className="text-[#DCDCDD] font-bold text-lg sm:text-xl">EVO Coaching</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation cursor-pointer"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-[#DCDCDD]" />
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
                    ? "bg-indigo-500 text-zinc-100 font-bold"
                    : "text-[#DCDCDD] hover:bg-white/10 active:bg-white/20"
                }`}
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
