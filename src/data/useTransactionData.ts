import { useMemo, useState, useCallback } from 'react';
import { rawTransactions } from './transactions';
import { parseExcelDate, normalizeStatus, normalizeProduct } from '../features/shared/utils/sanitize';

export interface Transaction {
  id: string;
  status: 'APROVADO' | 'ESTORNADO' | 'CHARGEBACK' | 'PENDENTE';
  statusOriginal: string;
  dataTransacao: Date;
  valorCompra: number;
  comissao: number;
  produto: string;
  produtoNormalizado: string;
  comprador: string;
  email: string;
  telefone: string;
  metodoPagamento: string;
  oferta: string;
}

export interface TransactionFilters {
  status: string;
  produto: string;
  dataInicio: string;
  dataFim: string;
}

export type QuickDatePreset = 'hoje' | '7dias' | 'mes' | 'ano' | '';

const initialFilters: TransactionFilters = {
  status: '',
  produto: '',
  dataInicio: '',
  dataFim: '',
};

function toYYYYMMDD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getPresetDates(preset: QuickDatePreset): { dataInicio: string; dataFim: string } {
  const now = new Date();
  const today = toYYYYMMDD(now);

  switch (preset) {
    case 'hoje':
      return { dataInicio: today, dataFim: today };
    case '7dias': {
      const d = new Date(now);
      d.setDate(d.getDate() - 6);
      return { dataInicio: toYYYYMMDD(d), dataFim: today };
    }
    case 'mes':
      return {
        dataInicio: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`,
        dataFim: today,
      };
    case 'ano':
      return { dataInicio: `${now.getFullYear()}-01-01`, dataFim: today };
    default:
      return { dataInicio: '', dataFim: '' };
  }
}

/** Processa os dados brutos uma vez: sanitiza, normaliza, ordena */
function processRawData(): Transaction[] {
  return rawTransactions
    .map((raw) => {
      const date = parseExcelDate(raw.dataTransacao);
      if (!date) return null;
      return {
        id: raw.id,
        status: normalizeStatus(raw.statusOriginal),
        statusOriginal: raw.statusOriginal,
        dataTransacao: date,
        valorCompra: raw.valorCompra,
        comissao: raw.comissao,
        produto: raw.produto,
        produtoNormalizado: normalizeProduct(raw.produto),
        comprador: raw.comprador,
        email: raw.email,
        telefone: raw.telefone,
        metodoPagamento: raw.metodoPagamento,
        oferta: raw.oferta,
      };
    })
    .filter((t): t is Transaction => t !== null)
    .sort((a, b) => b.dataTransacao.getTime() - a.dataTransacao.getTime());
}

let _processedData: Transaction[] | null = null;
function getProcessedData(): Transaction[] {
  if (!_processedData) {
    _processedData = processRawData();
  }
  return _processedData;
}

export function useTransactionData() {
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);
  const [quickDatePreset, setQuickDatePreset] = useState<QuickDatePreset>('');

  const allTransactions = useMemo(() => getProcessedData(), []);

  // Dados filtrados
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((t) => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.produto && t.produtoNormalizado !== filters.produto) return false;
      if (filters.dataInicio) {
        const inicio = new Date(filters.dataInicio + 'T00:00:00');
        if (t.dataTransacao < inicio) return false;
      }
      if (filters.dataFim) {
        const fim = new Date(filters.dataFim + 'T23:59:59');
        if (t.dataTransacao > fim) return false;
      }
      return true;
    });
  }, [allTransactions, filters]);

  // --- Filtros dependentes ---
  // Status disponíveis considerando o filtro de produto atual
  const statusOptions = useMemo(() => {
    let pool = allTransactions;
    if (filters.produto) {
      pool = pool.filter((t) => t.produtoNormalizado === filters.produto);
    }
    if (filters.dataInicio) {
      const inicio = new Date(filters.dataInicio + 'T00:00:00');
      pool = pool.filter((t) => t.dataTransacao >= inicio);
    }
    if (filters.dataFim) {
      const fim = new Date(filters.dataFim + 'T23:59:59');
      pool = pool.filter((t) => t.dataTransacao <= fim);
    }
    return Array.from(new Set(pool.map((t) => t.status))).sort();
  }, [allTransactions, filters.produto, filters.dataInicio, filters.dataFim]);

  // Produtos disponíveis considerando o filtro de status atual
  const produtoOptions = useMemo(() => {
    let pool = allTransactions;
    if (filters.status) {
      pool = pool.filter((t) => t.status === filters.status);
    }
    if (filters.dataInicio) {
      const inicio = new Date(filters.dataInicio + 'T00:00:00');
      pool = pool.filter((t) => t.dataTransacao >= inicio);
    }
    if (filters.dataFim) {
      const fim = new Date(filters.dataFim + 'T23:59:59');
      pool = pool.filter((t) => t.dataTransacao <= fim);
    }
    return Array.from(new Set(pool.map((t) => t.produtoNormalizado))).sort();
  }, [allTransactions, filters.status, filters.dataInicio, filters.dataFim]);

  // Métricas calculadas dos dados filtrados
  const metrics = useMemo(() => {
    const aprovados = filteredTransactions.filter((t) => t.status === 'APROVADO');
    const estornados = filteredTransactions.filter((t) => t.status === 'ESTORNADO');

    const receitaTotal = aprovados.reduce((sum, t) => sum + t.comissao, 0);
    const valorTotalVendas = aprovados.reduce((sum, t) => sum + t.valorCompra, 0);
    const ticketMedio = aprovados.length > 0 ? valorTotalVendas / aprovados.length : 0;
    const taxaAprovacao = filteredTransactions.length > 0
      ? (aprovados.length / filteredTransactions.length) * 100
      : 0;
    const totalEstornos = estornados.reduce((sum, t) => sum + t.valorCompra, 0);

    const compradoresUnicos = new Set(aprovados.map((t) => t.email || t.comprador)).size;

    const vendasPorProduto: Record<string, { quantidade: number; valor: number }> = {};
    aprovados.forEach((t) => {
      const key = t.produtoNormalizado;
      if (!vendasPorProduto[key]) vendasPorProduto[key] = { quantidade: 0, valor: 0 };
      vendasPorProduto[key].quantidade += 1;
      vendasPorProduto[key].valor += t.comissao;
    });

    const vendasPorMes: Record<string, number> = {};
    aprovados.forEach((t) => {
      const key = `${t.dataTransacao.getFullYear()}-${String(t.dataTransacao.getMonth() + 1).padStart(2, '0')}`;
      vendasPorMes[key] = (vendasPorMes[key] || 0) + t.comissao;
    });

    const vendasPorDia: Record<string, { vendas: number; quantidade: number }> = {};
    aprovados.forEach((t) => {
      const key = `${t.dataTransacao.getFullYear()}-${String(t.dataTransacao.getMonth() + 1).padStart(2, '0')}-${String(t.dataTransacao.getDate()).padStart(2, '0')}`;
      if (!vendasPorDia[key]) vendasPorDia[key] = { vendas: 0, quantidade: 0 };
      vendasPorDia[key].vendas += t.comissao;
      vendasPorDia[key].quantidade += 1;
    });

    const vendasPorMetodo: Record<string, number> = {};
    aprovados.forEach((t) => {
      vendasPorMetodo[t.metodoPagamento] = (vendasPorMetodo[t.metodoPagamento] || 0) + 1;
    });

    return {
      totalTransacoes: filteredTransactions.length,
      totalAprovados: aprovados.length,
      totalEstornados: estornados.length,
      receitaTotal,
      valorTotalVendas,
      ticketMedio,
      taxaAprovacao,
      totalEstornos,
      compradoresUnicos,
      vendasPorProduto,
      vendasPorMes,
      vendasPorDia,
      vendasPorMetodo,
    };
  }, [filteredTransactions]);

  const updateFilter = useCallback((key: keyof TransactionFilters, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Se o status selecionado não existe mais nas opções do novo contexto, limpa
      // Isso é tratado na UI com os options dependentes
      return next;
    });
    // Limpa o quick preset se o usuário mexer manualmente nas datas
    if (key === 'dataInicio' || key === 'dataFim') {
      setQuickDatePreset('');
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setQuickDatePreset('');
  }, []);

  const applyQuickDate = useCallback((preset: QuickDatePreset) => {
    const dates = getPresetDates(preset);
    setQuickDatePreset(preset);
    setFilters((prev) => ({ ...prev, dataInicio: dates.dataInicio, dataFim: dates.dataFim }));
  }, []);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return {
    transactions: filteredTransactions,
    allTransactions,
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    statusOptions,
    produtoOptions,
    metrics,
    quickDatePreset,
    applyQuickDate,
  };
}
