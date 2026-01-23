import { FileSpreadsheet } from 'lucide-react';
import { formatDateTime } from '../../shared/utils/formatters';
import { ImportacaoStatusBadge } from './ImportacaoStatusBadge';
import type { Importacao } from '../types';

interface ImportacoesTableProps {
  importacoes: Importacao[];
}

export function ImportacoesTable({ importacoes }: ImportacoesTableProps) {
  if (importacoes.length === 0) {
    return (
      <div className="text-center py-12 text-evo-dark-400">
        <p className="text-sm sm:text-base">Nenhuma importação realizada ainda.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile view - Cards */}
      <div className="block lg:hidden space-y-3">
        {importacoes.map((importacao) => (
          <div
            key={importacao.id}
            className="bg-zinc-300 border border-evo-purple/20 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-evo-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet size={20} className="text-evo-orange" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-evo-indigo text-sm truncate">{importacao.nomeArquivo}</h3>
                <p className="text-xs text-evo-dark-400 mt-1">{formatDateTime(importacao.dataUpload)}</p>
              </div>
              <ImportacaoStatusBadge status={importacao.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-evo-purple/20">
              <div className="text-center">
                <div className="text-[10px] text-evo-dark-400 mb-1">Leads Novos</div>
                <div className="font-bold text-emerald-500">{importacao.qtdLeadsNovos}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-evo-dark-400 mb-1">Duplicados</div>
                <div className="font-bold text-yellow-500">{importacao.qtdLeadsDuplicados}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-evo-purple/20">
              <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
                Arquivo
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
                Data/Hora
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
                Leads Novos
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
                Duplicados
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {importacoes.map((importacao) => (
              <tr
                key={importacao.id}
                className="border-b border-evo-purple/10 hover:bg-zinc-300 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-evo-orange/10 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet size={20} className="text-evo-orange" />
                    </div>
                    <span className="font-medium text-evo-indigo">
                      {importacao.nomeArquivo}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-evo-dark-400">
                  {formatDateTime(importacao.dataUpload)}
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-emerald-500">
                    {importacao.qtdLeadsNovos}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-yellow-500">
                    {importacao.qtdLeadsDuplicados}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <ImportacaoStatusBadge status={importacao.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
