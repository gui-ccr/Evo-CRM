import { Mail, Phone, MoreVertical } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { StatusBadge } from './StatusBadge';
import type { Cliente } from '../types';

interface ClientesTableProps {
  clientes: Cliente[];
}

export function ClientesTable({ clientes }: ClientesTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 text-evo-dark-400">
        <p>Nenhum cliente cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-evo-purple/20">
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Nome
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Contato
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Origem
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Cadastro
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Valor Total
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Status
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr
              key={cliente.id}
              className="border-b border-evo-purple/10 hover:bg-evo-cyan-50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="font-medium text-evo-indigo">{cliente.nome}</div>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-evo-dark-400">
                    <Mail size={14} />
                    {cliente.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-evo-dark-400">
                    <Phone size={14} />
                    {cliente.telefone}
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-evo-dark-400">
                {cliente.origem}
              </td>
              <td className="py-4 px-4 text-sm text-evo-dark-400">
                {formatDate(cliente.dataCadastro)}
              </td>
              <td className="py-4 px-4 font-semibold text-evo-purple">
                {formatCurrency(cliente.valorTotal)}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={cliente.status} />
              </td>
              <td className="py-4 px-4">
                <button className="p-2 hover:bg-evo-purple/10 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-evo-dark-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
