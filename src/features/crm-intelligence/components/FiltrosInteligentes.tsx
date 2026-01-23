import { Filter, X } from 'lucide-react';
import type { FiltrosCRM, LeadOrigem, LeadStatus, LeadTemperatura } from '../types';

interface FiltrosInteligentesProps {
  filtros: FiltrosCRM;
  onFiltrosChange: (filtros: FiltrosCRM) => void;
}

export function FiltrosInteligentes({ filtros, onFiltrosChange }: FiltrosInteligentesProps) {
  const origens: LeadOrigem[] = [
    'Evento SP - Novembro',
    'Evento RJ - Outubro',
    'Landing Page',
    'Instagram',
    'Indicação',
    'Lançamento Digital',
  ];

  const statusOptions: LeadStatus[] = [
    'novo',
    'contatado',
    'interessado',
    'negociacao',
    'convertido',
    'perdido',
  ];

  const temperaturas: LeadTemperatura[] = ['quente', 'morno', 'frio'];

  const toggleOrigem = (origem: LeadOrigem) => {
    const current = filtros.origem || [];
    const updated = current.includes(origem)
      ? current.filter(o => o !== origem)
      : [...current, origem];
    onFiltrosChange({ ...filtros, origem: updated.length > 0 ? updated : undefined });
  };

  const toggleStatus = (status: LeadStatus) => {
    const current = filtros.status || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onFiltrosChange({ ...filtros, status: updated.length > 0 ? updated : undefined });
  };

  const toggleTemperatura = (temp: LeadTemperatura) => {
    const current = filtros.temperatura || [];
    const updated = current.includes(temp)
      ? current.filter(t => t !== temp)
      : [...current, temp];
    onFiltrosChange({ ...filtros, temperatura: updated.length > 0 ? updated : undefined });
  };

  const limparFiltros = () => {
    onFiltrosChange({});
  };

  const temFiltrosAtivos = Object.keys(filtros).length > 0;

  return (
    <div className="bg-zinc-200 rounded-xl p-6 border-2 border-evo-purple/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-evo-orange" size={20} />
          <h3 className="font-semibold text-evo-indigo">Filtros Inteligentes</h3>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="flex items-center gap-1 text-sm text-evo-dark-400 hover:text-evo-orange transition-colors"
          >
            <X size={16} />
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-evo-dark-400 mb-2">
            Origem do Lead
          </label>
          <div className="flex flex-wrap gap-2">
            {origens.map((origem) => (
              <button
                key={origem}
                onClick={() => toggleOrigem(origem)}
                className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-colors ${
                  filtros.origem?.includes(origem)
                    ? 'bg-evo-orange text-white border-evo-orange'
                    : 'bg-zinc-200 text-evo-indigo border-evo-purple/20 hover:border-evo-orange'
                }`}
              >
                {origem}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-evo-dark-400 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-3 py-1.5 text-sm rounded-lg border-2 capitalize transition-colors ${
                  filtros.status?.includes(status)
                    ? 'bg-evo-purple text-white border-evo-purple'
                    : 'bg-zinc-200 text-evo-indigo border-evo-purple/20 hover:border-evo-purple'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-evo-dark-400 mb-2">
            Temperatura
          </label>
          <div className="flex gap-2">
            {temperaturas.map((temp) => (
              <button
                key={temp}
                onClick={() => toggleTemperatura(temp)}
                className={`px-4 py-2 text-sm rounded-lg border-2 capitalize transition-colors ${
                  filtros.temperatura?.includes(temp)
                    ? temp === 'quente'
                      ? 'bg-red-500 text-white border-red-500'
                      : temp === 'morno'
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'bg-blue-500 text-white border-blue-500'
                    : 'bg-zinc-200 text-evo-indigo border-evo-purple/20 hover:border-evo-orange'
                }`}
              >
                {temp}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filtros.apenasQuentes || false}
              onChange={(e) =>
                onFiltrosChange({ ...filtros, apenasQuentes: e.target.checked || undefined })
              }
              className="w-4 h-4 text-evo-orange border-evo-purple/20 rounded focus:ring-evo-orange"
            />
            <span className="text-sm text-evo-indigo">
              Apenas leads que clicaram no link de pagamento
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
