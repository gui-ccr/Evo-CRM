import { Mail, Phone, MoreVertical } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { StatusBadge } from './StatusBadge';
import type { Cliente } from '../types';

interface ClientesTableProps {
  clientes: Cliente[];
  onEdit?: (cliente: Cliente) => void;
}

export function ClientesTable({ clientes, onEdit }: ClientesTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600">
        <p className="text-sm sm:text-base">Nenhum cliente cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile view - Cards */}
      <div className="block lg:hidden space-y-3">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white rounded-lg p-4 space-y-3 border border-zinc-600 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-indigo-500 text-base truncate">{cliente.nome}</h3>
                <p className="text-xs text-zinc-600 mt-1">{formatDate(cliente.dataCadastro)}</p>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <StatusBadge status={cliente.status} />
                <button
                  onClick={() => onEdit?.(cliente)}
                  className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors touch-manipulation cursor-pointer"
                >
                  <MoreVertical size={18} className="text-zinc-600" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-600">
                <Mail size={14} className="flex-shrink-0" />
                <span className="truncate">{cliente.email}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <Phone size={14} className="flex-shrink-0" />
                <span>{cliente.telefone}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-indigo-500/10">
              <div>
                <div className="text-xs text-zinc-600">Origem</div>
                <div className="text-sm font-medium text-indigo-500">{cliente.origem}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-600 mb-1">Valor Total</div>
                <div className="font-bold text-indigo-500">{formatCurrency(cliente.valorTotal)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-zinc-600">
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Nome
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Contato
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Origem
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Cadastro
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Valor Total
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Status
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b border-indigo-500/10 hover:bg-zinc-300/60 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-indigo-500">{cliente.nome}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Mail size={14} />
                      {cliente.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Phone size={14} />
                      {cliente.telefone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-zinc-600">
                  {cliente.origem}
                </td>
                <td className="py-4 px-4 text-sm text-zinc-600">
                  {formatDate(cliente.dataCadastro)}
                </td>
                <td className="py-4 px-4 font-semibold text-indigo-500">
                  {formatCurrency(cliente.valorTotal)}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={cliente.status} />
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onEdit?.(cliente)}
                    className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <MoreVertical size={18} className="text-zinc-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
