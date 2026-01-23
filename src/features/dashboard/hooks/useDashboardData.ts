import type { Stat, QuickStat, Sale, Alert } from '../../shared/types';

export function useDashboardData() {
  const stats: Stat[] = [
    {
      id: '1',
      label: 'Total de Leads Únicos',
      value: 2847,
      trend: '+324 novos este mês',
      trendPositive: true,
      icon: 'users',
    },
    {
      id: '2',
      label: 'Taxa de Conversão Geral',
      value: '18.5%',
      trend: '+2.3% vs mês passado',
      trendPositive: true,
      icon: 'trending-up',
    },
    {
      id: '3',
      label: 'ROI Estimado',
      value: '487%',
      trend: 'R$ 4.87 para cada R$ 1.00 investido',
      trendPositive: true,
      icon: 'dollar-sign',
    },
    {
      id: '4',
      label: 'Status dos Disparos',
      value: '94.2%',
      trend: 'Taxa de entrega hoje',
      trendPositive: true,
      icon: 'send',
    },
  ];

  const sales: Sale[] = [
    {
      id: '1',
      customerName: 'João Silva',
      vehicleModel: 'Mentoria Premium - 12 meses',
      vehicleBrand: 'Evento SP - Novembro',
      saleDate: new Date(2025, 10, 25).toISOString(),
      amount: 24000,
      status: 'completed',
      paymentMethod: 'financing',
    },
    {
      id: '2',
      customerName: 'Maria Santos',
      vehicleModel: 'Mentoria Executiva - 6 meses',
      vehicleBrand: 'Lançamento Digital',
      saleDate: new Date(2025, 10, 24).toISOString(),
      amount: 18000,
      status: 'completed',
      paymentMethod: 'cash',
    },
    {
      id: '3',
      customerName: 'Carlos Oliveira',
      vehicleModel: 'Programa Aceleração',
      vehicleBrand: 'Evento RJ - Outubro',
      saleDate: new Date(2025, 10, 23).toISOString(),
      amount: 12000,
      status: 'pending',
      paymentMethod: 'financing',
    },
    {
      id: '4',
      customerName: 'Ana Paula',
      vehicleModel: 'Mentoria Premium - 12 meses',
      vehicleBrand: 'Indicação Cliente',
      saleDate: new Date(2025, 10, 22).toISOString(),
      amount: 24000,
      status: 'completed',
      paymentMethod: 'leasing',
    },
    {
      id: '5',
      customerName: 'Roberto Lima',
      vehicleModel: 'Mentoria VIP - 24 meses',
      vehicleBrand: 'Evento SP - Novembro',
      saleDate: new Date(2025, 10, 20).toISOString(),
      amount: 48000,
      status: 'completed',
      paymentMethod: 'financing',
    },
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Aula ao Vivo Hoje',
      message: 'Lembrete automático agendado para 284 leads às 18h.',
      createdAt: new Date(2025, 10, 27, 10, 30).toISOString(),
      priority: 'high',
    },
    {
      id: '2',
      type: 'info',
      title: 'Nova Lista Processada',
      message: '156 novos leads do Evento SP adicionados ao sistema.',
      createdAt: new Date(2025, 10, 27, 9, 15).toISOString(),
      priority: 'medium',
    },
    {
      id: '3',
      type: 'success',
      title: 'Campanha Concluída',
      message: 'Disparo de WhatsApp para 500 leads finalizado com 96% de entrega.',
      createdAt: new Date(2025, 10, 26, 16, 45).toISOString(),
      priority: 'low',
    },
    {
      id: '4',
      type: 'warning',
      title: 'Leads Quentes',
      message: '23 leads abriram o link de pagamento nas últimas 24h.',
      createdAt: new Date(2025, 10, 26, 14, 20).toISOString(),
      priority: 'medium',
    },
  ];

  const quickStats: QuickStat[] = [
    { label: "Ticket Médio", value: "R$ 21.6K", description: "por mentoria" },
    { label: "Conversão", value: "18.5%", description: "leads → vendas" },
    { label: "Engajamento", value: "87%", description: "taxa de abertura" },
  ];

  return {
    stats,
    sales,
    alerts,
    quickStats,
  };
}
