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
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-indigo-600 flex-shrink-0" size={18} />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Filtros Inteligentes</h3>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-red-600 transition-colors touch-manipulation cursor-pointer"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Limpar Filtros</span>
            <span className="sm:hidden">Limpar</span>
          </button>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Origem do Lead
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {origens.map((origem) => (
              <button
                key={origem}
                onClick={() => toggleOrigem(origem)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border-2 transition-colors touch-manipulation cursor-pointer ${
                  filtros.origem?.includes(origem)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {origem}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border-2 capitalize transition-colors touch-manipulation ${
                  filtros.status?.includes(status)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Temperatura
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {temperaturas.map((temp) => (
              <button
                key={temp}
                onClick={() => toggleTemperatura(temp)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border-2 capitalize transition-colors touch-manipulation flex-1 sm:flex-initial cursor-pointer ${
                  filtros.temperatura?.includes(temp)
                    ? temp === 'quente'
                      ? 'bg-red-600 text-white border-red-600'
                      : temp === 'morno'
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {temp}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-start sm:items-center gap-2 cursor-pointer touch-manipulation">
            <input
              type="checkbox"
              checked={filtros.apenasQuentes || false}
              onChange={(e) =>
                onFiltrosChange({ ...filtros, apenasQuentes: e.target.checked || undefined })
              }
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5 sm:mt-0 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm text-gray-700">
              Apenas leads que clicaram no link de pagamento
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
