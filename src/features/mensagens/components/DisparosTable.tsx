import { formatDateTime } from '../../shared/utils/formatters';
import { TemplateTypeIcon } from './TemplateTypeIcon';
import { DisparoStatusBadge } from './DisparoStatusBadge';
import type { Disparo } from '../types';

interface DisparosTableProps {
  disparos: Disparo[];
}

export function DisparosTable({ disparos }: DisparosTableProps) {
  if (disparos.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600">
        <p className="text-sm sm:text-base">Nenhum disparo agendado.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile view - Cards */}
      <div className="block lg:hidden space-y-3">
        {disparos.map((disparo) => (
          <div
            key={disparo.id}
            className="bg-zinc-300/60 border border-zinc-600 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start gap-3 mb-2">
              <TemplateTypeIcon tipo={disparo.tipo} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-indigo-500 text-sm">{disparo.nome}</h3>
                <p className="text-xs text-zinc-600 mt-1">{formatDateTime(disparo.dataAgendamento)}</p>
              </div>
              <DisparoStatusBadge status={disparo.status} />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-600">
              <div className="text-center">
                <div className="text-[10px] text-zinc-600 mb-1">Destinatários</div>
                <div className="font-bold text-indigo-500">{disparo.qtdDestinatarios}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-zinc-600 mb-1">Enviados</div>
                <div className="font-bold text-emerald-500">{disparo.qtdEnviados}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-zinc-600 mb-1">Erros</div>
                <div className="font-bold text-red-500">{disparo.qtdErros}</div>
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
                Nome do Disparo
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Agendamento
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Destinatários
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Enviados
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Erros
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {disparos.map((disparo) => (
              <tr
                key={disparo.id}
                className="border-b border-indigo-500/10 hover:bg-zinc-300/60 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <TemplateTypeIcon tipo={disparo.tipo} />
                    <span className="font-medium text-indigo-500">
                      {disparo.nome}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-zinc-600">
                  {formatDateTime(disparo.dataAgendamento)}
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-indigo-500">
                    {disparo.qtdDestinatarios}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-emerald-500">
                    {disparo.qtdEnviados}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-red-500">
                    {disparo.qtdErros}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <DisparoStatusBadge status={disparo.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
