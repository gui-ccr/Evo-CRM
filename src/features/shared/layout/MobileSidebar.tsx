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

      <aside className="fixed top-0 left-0 h-full w-64 bg-evo-indigo z-50 lg:hidden transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-[#DCDCDD] font-bold text-xl">EVO Coaching</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} className="text-[#DCDCDD]" />
          </button>
        </div>

        <nav className="py-4">
          {menus.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                  isActive
                    ? "bg-evo-orange text-black font-bold"
                    : "text-[#DCDCDD] hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
