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
      <div className="text-center py-12 text-evo-dark-400">
        <p>Nenhum disparo agendado.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-evo-purple/20">
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Nome do Disparo
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Agendamento
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Destinatários
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Enviados
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Erros
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-evo-dark-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {disparos.map((disparo) => (
            <tr
              key={disparo.id}
              className="border-b border-evo-purple/10 hover:bg-zinc-300/60 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <TemplateTypeIcon tipo={disparo.tipo} />
                  <span className="font-medium text-evo-indigo">
                    {disparo.nome}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-evo-dark-400">
                {formatDateTime(disparo.dataAgendamento)}
              </td>
              <td className="py-4 px-4">
                <span className="font-semibold text-evo-indigo">
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
  );
}
