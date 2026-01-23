import type { Cliente, ClienteStats } from '../types';

export function useClientesData() {
  const clientes: Cliente[] = [
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '(11) 98765-4321',
      dataCadastro: new Date(2025, 9, 15).toISOString(),
      status: 'ativo',
      origem: 'Evento SP - Novembro',
      valorTotal: 24000,
      ultimaInteracao: new Date(2025, 10, 20).toISOString(),
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '(11) 98765-1234',
      dataCadastro: new Date(2025, 9, 10).toISOString(),
      status: 'ativo',
      origem: 'Indicação',
      valorTotal: 18000,
      ultimaInteracao: new Date(2025, 10, 22).toISOString(),
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      telefone: '(21) 98765-5678',
      dataCadastro: new Date(2025, 8, 25).toISOString(),
      status: 'pendente',
      origem: 'Landing Page',
      valorTotal: 0,
      ultimaInteracao: new Date(2025, 10, 18).toISOString(),
    },
    {
      id: '4',
      nome: 'Ana Paula',
      email: 'ana.paula@email.com',
      telefone: '(11) 98765-9999',
      dataCadastro: new Date(2025, 10, 1).toISOString(),
      status: 'ativo',
      origem: 'Evento RJ - Outubro',
      valorTotal: 48000,
      ultimaInteracao: new Date(2025, 10, 25).toISOString(),
    },
    {
      id: '5',
      nome: 'Roberto Lima',
      email: 'roberto.lima@email.com',
      telefone: '(11) 98765-7777',
      dataCadastro: new Date(2025, 7, 12).toISOString(),
      status: 'inativo',
      origem: 'Instagram',
      valorTotal: 12000,
      ultimaInteracao: new Date(2025, 8, 5).toISOString(),
    },
  ];

  const stats: ClienteStats = {
    total: 2847,
    ativos: 2156,
    novosEsteMes: 324,
    conversao: '18.5%',
  };

  return { clientes, stats };
}
