import { layoutTheme } from "../../shared/layout/layoutTheme";

export function ConfiguracoesHeader() {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2" style={{ color: layoutTheme.pageTitleColor }}>
        Configurações
      </h1>
      <p className="text-sm sm:text-base" style={{ color: layoutTheme.pageSubtitleColor }}>
        Gerencie as configurações do seu CRM EVO Coaching
      </p>
    </div>
  );
}
