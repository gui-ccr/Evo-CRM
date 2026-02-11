import { useMemo } from 'react';
import { useTransactionData } from '../../../data/useTransactionData';
import type { Stat, QuickStat, Sale, Alert } from '../../shared/types';
import { formatCurrency, formatCompactNumber } from '../../shared/utils/formatters';

function mapPaymentMethod(metodo: string): Sale['paymentMethod'] {
  const m = metodo.toUpperCase();
  if (m.includes('PIX')) return 'pix';
  if (m.includes('CRÉDITO') || m.includes('CREDITO')) return 'cartao';
  if (m.includes('MÁQUINA') || m.includes('MAQUINA') || m.includes('MAQ')) return 'maquina';
  return 'cartao';
}

function mapStatus(status: string): Sale['status'] {
  if (status === 'APROVADO') return 'completed';
  if (status === 'ESTORNADO' || status === 'CHARGEBACK') return 'cancelled';
  return 'pending';
}

export function useDashboardData() {
  const txData = useTransactionData();
  const { metrics, transactions, filters, updateFilter, clearFilters, hasActiveFilters, statusOptions, produtoOptions, quickDatePreset, applyQuickDate } = txData;

  const stats: Stat[] = useMemo(() => [
    {
      id: '1',
      label: 'Total de Transações',
      value: metrics.totalTransacoes,
      trend: `${metrics.totalAprovados} aprovadas`,
      trendPositive: true,
      icon: 'users',
    },
    {
      id: '2',
      label: 'Receita (Comissão)',
      value: formatCurrency(metrics.receitaTotal),
      trend: `Ticket médio: ${formatCurrency(metrics.ticketMedio)}`,
      trendPositive: true,
      icon: 'dollar-sign',
    },
    {
      id: '3',
      label: 'Taxa de Aprovação',
      value: `${metrics.taxaAprovacao.toFixed(1)}%`,
      trend: `${metrics.totalEstornados} estornos`,
      trendPositive: metrics.taxaAprovacao >= 80,
      icon: 'trending-up',
    },
    {
      id: '4',
      label: 'Compradores Únicos',
      value: metrics.compradoresUnicos,
      trend: `${Object.keys(metrics.vendasPorProduto).length} produtos`,
      trendPositive: true,
      icon: 'send',
    },
  ], [metrics]);

  const sales: Sale[] = useMemo(() => {
    return transactions.slice(0, 10).map((t) => ({
      id: t.id,
      customerName: t.comprador,
      mentoriaModel: t.produtoNormalizado,
      mentoriaBrand: t.oferta,
      saleDate: t.dataTransacao.toISOString(),
      amount: t.comissao,
      status: mapStatus(t.status),
      paymentMethod: mapPaymentMethod(t.metodoPagamento),
    }));
  }, [transactions]);

  const alerts: Alert[] = useMemo(() => {
    const items: Alert[] = [];

    if (metrics.totalEstornados > 0) {
      items.push({
        id: 'a1',
        type: 'warning',
        title: 'Estornos Detectados',
        message: `${metrics.totalEstornados} transações estornadas (${formatCurrency(metrics.totalEstornos)}).`,
        createdAt: new Date().toISOString(),
        priority: 'high',
      });
    }

    const topProduto = Object.entries(metrics.vendasPorProduto)
      .sort(([, a], [, b]) => b.quantidade - a.quantidade)[0];
    if (topProduto) {
      items.push({
        id: 'a2',
        type: 'success',
        title: 'Produto Mais Vendido',
        message: `${topProduto[0]} com ${topProduto[1].quantidade} vendas.`,
        createdAt: new Date().toISOString(),
        priority: 'medium',
      });
    }

    items.push({
      id: 'a3',
      type: 'info',
      title: 'Dados Carregados',
      message: `${metrics.totalTransacoes} transações do relatório de vendas RJ 2025.`,
      createdAt: new Date().toISOString(),
      priority: 'low',
    });

    if (hasActiveFilters) {
      items.push({
        id: 'a4',
        type: 'info',
        title: 'Filtros Ativos',
        message: 'Os dados exibidos estão filtrados. Limpe os filtros para ver tudo.',
        createdAt: new Date().toISOString(),
        priority: 'low',
      });
    }

    return items;
  }, [metrics, hasActiveFilters]);

  const quickStats: QuickStat[] = useMemo(() => [
    {
      label: "Ticket Médio",
      value: formatCurrency(metrics.ticketMedio),
      description: "por transação",
    },
    {
      label: "Aprovação",
      value: `${metrics.taxaAprovacao.toFixed(1)}%`,
      description: "taxa de aprovação",
    },
    {
      label: "Valor Total",
      value: `R$ ${formatCompactNumber(metrics.valorTotalVendas)}`,
      description: "em vendas aprovadas",
    },
  ], [metrics]);

  // Dados para gráficos
  const chartData = useMemo(() => {
    // Vendas por mês para SalesChart
    const mesesOrdenados = Object.entries(metrics.vendasPorMes)
      .sort(([a], [b]) => a.localeCompare(b));

    const monthNames: Record<string, string> = {
      '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr',
      '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago',
      '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
    };

    const salesChartLabels = mesesOrdenados.map(([key]) => {
      const [, month] = key.split('-');
      return monthNames[month] || month;
    });
    const salesChartValues = mesesOrdenados.map(([, value]) => value);

    // Vendas por dia para LeadsVendasChart, agrupadas por mês com labels legíveis
    const diasOrdenados = Object.entries(metrics.vendasPorDia)
      .sort(([a], [b]) => a.localeCompare(b));

    const monthlyMap: Record<string, { transacoes: number; valor: number }> = {};
    diasOrdenados.forEach(([dateKey, data]) => {
      const [year, month] = dateKey.split('-');
      const sortKey = `${year}-${month}`;
      if (!monthlyMap[sortKey]) monthlyMap[sortKey] = { transacoes: 0, valor: 0 };
      monthlyMap[sortKey].transacoes += data.quantidade;
      monthlyMap[sortKey].valor += data.vendas;
    });

    const monthlyOrdenado = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b));
    const leadsChartLabels = monthlyOrdenado.map(([key]) => {
      const [year, month] = key.split('-');
      return `${monthNames[month] || month}/${year.slice(2)}`;
    });
    const leadsChartTransacoes = monthlyOrdenado.map(([, data]) => data.transacoes);
    const leadsChartValor = monthlyOrdenado.map(([, data]) => data.valor);

    // Vendas por produto (para possível uso)
    const produtoLabels = Object.keys(metrics.vendasPorProduto).sort(
      (a, b) => metrics.vendasPorProduto[b].quantidade - metrics.vendasPorProduto[a].quantidade
    );
    const produtoQuantidades = produtoLabels.map((p) => metrics.vendasPorProduto[p].quantidade);
    const produtoValores = produtoLabels.map((p) => metrics.vendasPorProduto[p].valor);

    return {
      salesChart: { labels: salesChartLabels, values: salesChartValues },
      leadsChart: {
        labels: leadsChartLabels,
        transacoes: leadsChartTransacoes,
        valores: leadsChartValor,
      },
      produtoChart: {
        labels: produtoLabels,
        quantidades: produtoQuantidades,
        valores: produtoValores,
      },
    };
  }, [metrics]);

  return {
    stats,
    sales,
    alerts,
    quickStats,
    chartData,
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    statusOptions,
    produtoOptions,
    quickDatePreset,
    applyQuickDate,
  };
}
