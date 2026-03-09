import { useLayoutTheme } from "../../shared/layout/ThemeContext";

export function ConfiguracoesHeader() {
  const theme = useLayoutTheme();
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2" style={{ color: theme.pageTitleColor }}>
        Configurações
      </h1>
      <p className="text-sm sm:text-base" style={{ color: theme.pageSubtitleColor }}>
        Gerencie as configurações do seu CRM EVO Coaching
      </p>
    </div>
  );
}
