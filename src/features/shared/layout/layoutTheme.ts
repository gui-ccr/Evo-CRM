/**
 * layoutTheme.ts
 * ─────────────────────────────────────────────────────────────
 * Arquivo central de configuração visual do layout.
 * Edite aqui para controlar as cores de toda a interface.
 * ─────────────────────────────────────────────────────────────
 */

export const lightTheme = {

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

export const darkTheme = {

  // ─── PÁGINAS ─────────────────────────────────────────────────
  // ⚠️  pageBackground DEVE ser igual a connectorColor e activeItemBackground

  pageBackground:   "#18181B", // zinc-900
  pageTitleColor:   "#F4F4F5", // zinc-100
  pageSubtitleColor:"#A1A1AA", // zinc-400


  // ─── SIDEBAR ─────────────────────────────────────────────────

  sidebarBackground:    "#27272A", // zinc-800
  connectorColor:       "#18181B", // ⚠️  = pageBackground
  activeItemBackground: "#18181B", // ⚠️  = pageBackground
  activeItemColor:      "#818CF8", // indigo-400


  // ─── CARDS ───────────────────────────────────────────────────

  cardBackground: "#27272A", // zinc-800
  cardBorder:     "#3F3F46", // zinc-700
  cardTitleColor: "#F4F4F5", // zinc-100

} as const;

/** Tipo que descreve o shape de um tema */
export type ThemeTokens = typeof lightTheme;

/** Alias mantido para retrocompatibilidade — use useLayoutTheme() em componentes */
export const layoutTheme = lightTheme;
