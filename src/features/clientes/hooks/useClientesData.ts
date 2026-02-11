import { useMemo, useState } from 'react';
import { useTransactionData } from '../../../data/useTransactionData';
import type { Cliente, ClienteStats } from '../types';

export function useClientesData() {
  const { allTransactions } = useTransactionData();
  const [searchQuery, setSearchQuery] = useState('');

  // Agrupa transações por email (chave primária de identificação do cliente)
  const allClientes: Cliente[] = useMemo(() => {
    const map = new Map<string, {
      nome: string;
      email: string;
      telefone: string;
      primeiraCompra: Date;
      ultimaCompra: Date;
      totalCompras: number;
      ltv: number;
      totalTransacoes: number;
      temEstorno: boolean;
      produtos: Set<string>;
    }>();

    for (const t of allTransactions) {
      // Chave de agrupamento: email (preferido) ou nome como fallback
      const key = t.email ? t.email.toLowerCase().trim() : t.comprador.toLowerCase().trim();
      if (!key) continue;

      const existing = map.get(key);
      if (existing) {
        // Atualiza dados existentes
        if (!existing.nome && t.comprador) existing.nome = t.comprador;
        if (!existing.telefone && t.telefone) existing.telefone = t.telefone;
        if (t.dataTransacao < existing.primeiraCompra) existing.primeiraCompra = t.dataTransacao;
        if (t.dataTransacao > existing.ultimaCompra) existing.ultimaCompra = t.dataTransacao;
        existing.totalTransacoes += 1;
        if (t.status === 'APROVADO') {
          existing.ltv += t.valorCompra;
          existing.totalCompras += 1;
        }
        if (t.status === 'ESTORNADO' || t.status === 'CHARGEBACK') {
          existing.temEstorno = true;
        }
        existing.produtos.add(t.produtoNormalizado);
      } else {
        map.set(key, {
          nome: t.comprador,
          email: t.email,
          telefone: t.telefone,
          primeiraCompra: t.dataTransacao,
          ultimaCompra: t.dataTransacao,
          totalCompras: t.status === 'APROVADO' ? 1 : 0,
          ltv: t.status === 'APROVADO' ? t.valorCompra : 0,
          totalTransacoes: 1,
          temEstorno: t.status === 'ESTORNADO' || t.status === 'CHARGEBACK',
          produtos: new Set([t.produtoNormalizado]),
        });
      }
    }

    let id = 0;
    const result: Cliente[] = [];
    for (const [, data] of map) {
      id++;
      let status: Cliente['status'];
      if (data.totalCompras > 0 && !data.temEstorno) {
        status = 'ativo';
      } else if (data.temEstorno) {
        status = 'inativo';
      } else {
        status = 'pendente';
      }

      result.push({
        id: String(id),
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        dataCadastro: data.primeiraCompra.toISOString(),
        status,
        origem: Array.from(data.produtos).slice(0, 2).join(', '),
        valorTotal: Math.round(data.ltv * 100) / 100,
        ultimaInteracao: data.ultimaCompra.toISOString(),
      });
    }

    // Ordena por LTV decrescente
    result.sort((a, b) => b.valorTotal - a.valorTotal);
    return result;
  }, [allTransactions]);

  // Busca por nome ou email
  const clientes = useMemo(() => {
    if (!searchQuery.trim()) return allClientes;
    const q = searchQuery.toLowerCase().trim();
    return allClientes.filter(
      (c) => c.nome.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [allClientes, searchQuery]);

  // Stats calculadas dos clientes
  const stats: ClienteStats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const ativos = allClientes.filter((c) => c.status === 'ativo').length;
    const novosEsteMes = allClientes.filter((c) => {
      const d = new Date(c.dataCadastro);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).length;

    const totalLtv = allClientes.reduce((sum, c) => sum + c.valorTotal, 0);
    const mediaLtv = allClientes.length > 0 ? totalLtv / allClientes.length : 0;

    return {
      total: allClientes.length,
      ativos,
      novosEsteMes,
      conversao: `R$ ${mediaLtv.toFixed(0)}`,
    };
  }, [allClientes]);

  return {
    clientes,
    allClientes,
    stats,
    searchQuery,
    setSearchQuery,
  };
}
