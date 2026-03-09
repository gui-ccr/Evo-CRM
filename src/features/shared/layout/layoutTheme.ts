/**
 * layoutTheme.ts
 * ─────────────────────────────────────────────────────────────
 * Arquivo central de configuração visual do layout.
 * Edite aqui para controlar as cores de toda a interface.
 * ─────────────────────────────────────────────────────────────
 */

export const layoutTheme = {

  // ─── PÁGINAS ─────────────────────────────────────────────────
  // ⚠️  pageBackground DEVE ser igual a connectorColor e activeItemBackground
  //     para o efeito de conexão da sidebar funcionar corretamente.

  pageBackground:   "#DEE2E6",
  pageTitleColor:   "#000000",
  pageSubtitleColor:"#000000",


  // ─── SIDEBAR ─────────────────────────────────────────────────

  sidebarBackground:    "#FFFFFF",
  connectorColor:       "#DEE2E6", // ⚠️  = pageBackground
  activeItemBackground: "#DEE2E6", // ⚠️  = pageBackground
  activeItemColor:      "#4F46E5", // indigo-600


  // ─── CARDS ───────────────────────────────────────────────────

  cardBackground: "#FFFFFF",
  cardBorder:     "#E5E7EB", // gray-200
  cardTitleColor: "#111827", // gray-900

} as const;
