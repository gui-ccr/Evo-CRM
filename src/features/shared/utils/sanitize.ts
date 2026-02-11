/**
 * Utilitários de sanitização para dados importados da planilha.
 * Converte formatos brasileiros (vírgula decimal, datas) para tipos JS nativos.
 */

/** Converte string numérica BR (ex: "1.234,56") para number. Já numérico retorna direto. */
export function parseBRNumber(value: string | number | undefined | null): number {
  if (value == null || value === '') return 0;
  if (typeof value === 'number') return value;
  const cleaned = String(value).replace(/\s/g, '');
  // Se já estiver no formato americano (ponto decimal, sem vírgula) retorna direto
  if (/^\d+(\.\d+)?$/.test(cleaned)) return parseFloat(cleaned);
  // Formato BR: remove pontos de milhar e troca vírgula por ponto
  return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Converte data no formato "M/D/YY H:mm" (formato do Excel) para Date.
 * Ex: "4/4/25 13:30" -> Date(2025, 3, 4, 13, 30)
 */
export function parseExcelDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  const str = String(value).trim();

  // Formato "M/D/YY H:mm" ou "M/D/YY HH:mm"
  const match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+(\d{1,2}):(\d{2})$/);
  if (match) {
    let year = parseInt(match[3], 10);
    if (year < 100) year += 2000;
    const month = parseInt(match[1], 10) - 1;
    const day = parseInt(match[2], 10);
    const hour = parseInt(match[4], 10);
    const minute = parseInt(match[5], 10);
    return new Date(year, month, day, hour, minute);
  }

  // Fallback: tenta parse nativo
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

/** Normaliza o status da transação para categorias base */
export function normalizeStatus(status: string): 'APROVADO' | 'ESTORNADO' | 'CHARGEBACK' | 'PENDENTE' {
  const s = String(status).toUpperCase().trim();
  if (s.startsWith('APROVADO')) return 'APROVADO';
  if (s.startsWith('ESTORNADO')) return 'ESTORNADO';
  if (s === 'CHARGEBACK') return 'CHARGEBACK';
  if (s === 'PAYFLEX') return 'PENDENTE';
  return 'PENDENTE';
}

/** Normaliza nomes de produto para categorias agrupadas */
export function normalizeProduct(produto: string): string {
  const lower = produto.toLowerCase().trim();
  if (lower.includes('triade') || lower.includes('tríade')) return 'Livro Tríade do Poder';
  if (lower.includes('reino agora')) return 'Livro Reino Agora';
  if (lower.includes('verdade')) return 'Livro A Verdade';
  if (lower.includes('passado resolvido')) return 'Livro Passado Resolvido';
  if (lower.includes('identidade em')) return 'Jogo Identidade em Ação';
  if (lower.includes('trilha do empres')) return 'Trilha do Empresário';
  if (lower.includes('jornada evo') || lower.includes('amante radical')) return 'Jornada EVO';
  if (lower.includes('formação') || lower.includes('intelig')) return 'Formação Int. Emocional';
  if (lower.includes('avaliação') || lower.includes('avaliaç')) return 'Avaliação de Identidade';
  if (lower.includes('mentoria')) return 'Mentoria Relacionamento';
  if (lower.includes('ebw')) return 'EBW';
  return produto;
}
