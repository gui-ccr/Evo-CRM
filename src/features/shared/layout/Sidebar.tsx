import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  UsersIcon,
  Target,
  UploadIcon,
  SendIcon,
  SettingsIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useLayoutTheme, useTheme } from "./ThemeContext";

export function Sidebar() {
  const location = useLocation();
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

  const inactiveTextColor = isDark ? "#A1A1AA" : undefined;

  return (
    <aside
      className="w-56 border-r border-border py-10 flex flex-col z-10 relative h-full"
      style={{ backgroundColor: theme.sidebarBackground }}
    >
      <div className="px-8 mb-10 font-bold text-xl" style={{ color: theme.pageTitleColor }}>EVO Coaching</div>

      <ul className="flex-1">
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
                  boxShadow: `30px 30px 0 24px ${theme.connectorColor}`,
                  transformOrigin: "bottom right",
                }}
              />

              <Link
                to={item.path}
                className={`relative flex w-full items-center gap-4 px-8 h-14 transition-all duration-300 ease-in-out z-10
                    ${isActive
                      ? "font-semibold rounded-l-[50px] ml-4 w-[calc(100%-16px)]"
                      : "rounded-l-full ml-2 w-[calc(100%-8px)] hover:bg-black/5"}`}
                style={isActive ? {
                  backgroundColor: theme.activeItemBackground,
                  color: theme.activeItemColor,
                } : { color: inactiveTextColor }}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>

              <div
                className={`absolute right-0 -bottom-12 w-12 h-12 z-20 pointer-events-none transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 scale-50" : "opacity-0 scale-0"
                }`}
                style={{
                  borderRadius: "0 100% 0 0",
                  boxShadow: `30px -30px 0 24px ${theme.connectorColor}`,
                  transformOrigin: "top right",
                }}
              />
            </li>
          );
        })}
      </ul>

      {/* Theme toggle */}
      <div className="px-5 pb-6 pt-4 border-t" style={{ borderColor: isDark ? "#3F3F46" : "#E5E7EB" }}>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: isDark ? "#3F3F46" : "#F3F4F6",
            color: isDark ? "#A1A1AA" : "#6B7280",
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="text-sm font-medium">{isDark ? "Tema Claro" : "Tema Escuro"}</span>
        </button>
      </div>
    </aside>
  );
}
