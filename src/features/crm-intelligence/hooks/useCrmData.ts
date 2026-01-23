import { useState } from 'react';
import type { LeadCRM, FiltrosCRM } from '../types';

export function useCrmData() {
  const [filtros, setFiltros] = useState<FiltrosCRM>({});

  const leadsCompletos: LeadCRM[] = [
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '11987654321',
      origem: 'Evento SP - Novembro',
      status: 'interessado',
      temperatura: 'quente',
      score: 95,
      dataCadastro: new Date(2025, 10, 20).toISOString(),
      ultimaInteracao: new Date(2025, 10, 26).toISOString(),
      clicouLink: true,
      valorPotencial: 24000,
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '11987651234',
      origem: 'Landing Page',
      status: 'contatado',
      temperatura: 'morno',
      score: 72,
      dataCadastro: new Date(2025, 10, 18).toISOString(),
      ultimaInteracao: new Date(2025, 10, 25).toISOString(),
      clicouLink: false,
      valorPotencial: 18000,
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      telefone: '21987655678',
      origem: 'Evento RJ - Outubro',
      status: 'negociacao',
      temperatura: 'quente',
      score: 88,
      dataCadastro: new Date(2025, 9, 15).toISOString(),
      ultimaInteracao: new Date(2025, 10, 27).toISOString(),
      clicouLink: true,
      valorPotencial: 48000,
    },
    {
      id: '4',
      nome: 'Ana Paula',
      email: 'ana.paula@email.com',
      telefone: '11987659999',
      origem: 'Instagram',
      status: 'novo',
      temperatura: 'frio',
      score: 45,
      dataCadastro: new Date(2025, 10, 26).toISOString(),
      ultimaInteracao: new Date(2025, 10, 26).toISOString(),
      clicouLink: false,
      valorPotencial: 12000,
    },
    {
      id: '5',
      nome: 'Roberto Lima',
      email: 'roberto.lima@email.com',
      telefone: '11987657777',
      origem: 'Indicação',
      status: 'interessado',
      temperatura: 'quente',
      score: 90,
      dataCadastro: new Date(2025, 10, 22).toISOString(),
      ultimaInteracao: new Date(2025, 10, 27).toISOString(),
      clicouLink: true,
      valorPotencial: 24000,
    },
    {
      id: '6',
      nome: 'Fernanda Costa',
      email: 'fernanda.costa@email.com',
      telefone: '11987658888',
      origem: 'Lançamento Digital',
      status: 'contatado',
      temperatura: 'morno',
      score: 68,
      dataCadastro: new Date(2025, 10, 24).toISOString(),
      ultimaInteracao: new Date(2025, 10, 26).toISOString(),
      clicouLink: false,
      valorPotencial: 18000,
    },
  ];

  const filtrarLeads = (leads: LeadCRM[]): LeadCRM[] => {
    let resultado = [...leads];

    if (filtros.origem && filtros.origem.length > 0) {
      resultado = resultado.filter(lead => filtros.origem!.includes(lead.origem));
    }

    if (filtros.status && filtros.status.length > 0) {
      resultado = resultado.filter(lead => filtros.status!.includes(lead.status));
    }

    if (filtros.temperatura && filtros.temperatura.length > 0) {
      resultado = resultado.filter(lead => filtros.temperatura!.includes(lead.temperatura));
    }

    if (filtros.scoreMinimo !== undefined) {
      resultado = resultado.filter(lead => lead.score >= filtros.scoreMinimo!);
    }

    if (filtros.apenasQuentes) {
      resultado = resultado.filter(lead => lead.clicouLink);
    }

    return resultado.sort((a, b) => b.score - a.score);
  };

  const leads = filtrarLeads(leadsCompletos);
  const leadsQuentes = leadsCompletos.filter(l => l.temperatura === 'quente' && l.clicouLink);

  return {
    leads,
    leadsQuentes,
    filtros,
    setFiltros,
    totalLeads: leadsCompletos.length,
    leadsQuentesCount: leadsQuentes.length,
  };
}
