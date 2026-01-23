import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Target,
  UploadIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Gestão de Clientes", icon: UsersIcon, path: "/clientes" },
    { name: "CRM Intelligence", icon: Target, path: "/crm" },
    { name: "Upload de Listas", icon: UploadIcon, path: "/upload" },
    { name: "Disparo de Mensagens", icon: SendIcon, path: "/mensagens" },
    { name: "Configurações", icon: SettingsIcon, path: "/configuracoes" },
  ];

  const sidebarColor = "bg-evo-indigo";
  const shadowColorHex = "#0077B6";

  return (
    <aside className={`w-56 ${sidebarColor} py-10 flex flex-col z-10 relative h-full`}>
      <div className="px-8 mb-10 text-[#DCDCDD] font-bold text-xl">EVO Coaching</div>
      <ul>
        {menus.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.name} className="relative">
              <div
                className={`absolute right-0 -top-12 w-12 h-12 z-20 pointer-events-none transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 scale-50" : "opacity-0 scale-0"
                }`}
                style={{
                  borderRadius: "0 0 100% 0",
                  boxShadow: `30px 30px 0 24px ${shadowColorHex}`,
                  transformOrigin: "bottom right",
                }}
              />

              <Link
                to={item.path}
                className={`relative flex w-full items-center gap-4 px-8 h-14 transition-all duration-300 ease-in-out z-10
                    ${isActive
                      ? `bg-evo-cyan-100 text-evo-indigo font-bold rounded-l-[50px] ml-4 w-[calc(100%-16px)] border-l-4 border-evo-orange`
                      : "text-[#DCDCDD] hover:text-[#E5E5E5]"}`}>
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>

              <div
                className={`absolute right-0 -bottom-12 w-12 h-12 z-20 pointer-events-none transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 scale-50" : "opacity-0 scale-0"
                }`}
                style={{
                  borderRadius: "0 100% 0 0",
                  boxShadow: `30px -30px 0 24px ${shadowColorHex}`,
                  transformOrigin: "top right",
                }}
              />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
