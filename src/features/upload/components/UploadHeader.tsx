import { layoutTheme } from "../../shared/layout/layoutTheme";

export function UploadHeader() {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2" style={{ color: layoutTheme.pageTitleColor }}>
        Upload de Listas
      </h1>
      <p className="text-sm sm:text-base" style={{ color: layoutTheme.pageSubtitleColor }}>
        Importe listas de leads via Excel ou CSV
      </p>
    </div>
  );
}
