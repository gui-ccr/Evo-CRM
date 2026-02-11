import { Filter, X, Calendar } from 'lucide-react';
import type { TransactionFilters, QuickDatePreset } from '../../../data/useTransactionData';

interface DashboardFiltersProps {
  filters: TransactionFilters;
  onFilterChange: (key: keyof TransactionFilters, value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  statusOptions: string[];
  produtoOptions: string[];
  quickDatePreset: QuickDatePreset;
  onQuickDate: (preset: QuickDatePreset) => void;
}

const statusLabels: Record<string, string> = {
  APROVADO: 'Aprovado',
  ESTORNADO: 'Estornado',
  CHARGEBACK: 'Chargeback',
  PENDENTE: 'Pendente',
};

const quickDateOptions: { value: QuickDatePreset; label: string }[] = [
  { value: 'hoje', label: 'Hoje' },
  { value: '7dias', label: '7 dias' },
  { value: 'mes', label: 'Este Mês' },
  { value: 'ano', label: 'Ano Atual' },
];

export function DashboardFilters({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  statusOptions,
  produtoOptions,
  quickDatePreset,
  onQuickDate,
}: DashboardFiltersProps) {
  const selectClass =
    'bg-zinc-300/50 border border-zinc-600 text-zinc-900 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0';
  const inputClass =
    'bg-zinc-300/50 border border-zinc-600 text-zinc-900 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0';

  return (
    <div className="bg-zinc-200 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-zinc-600 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-indigo-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-zinc-800">Filtros</span>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            <X size={14} />
            Limpar
          </button>
        )}
      </div>

      {/* Quick Date Presets */}
      <div className="flex items-center gap-2 flex-wrap">
        <Calendar size={14} className="text-zinc-600 flex-shrink-0" />
        <span className="text-xs text-zinc-600">Período:</span>
        {quickDateOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onQuickDate(quickDatePreset === opt.value ? '' : opt.value)}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              quickDatePreset === opt.value
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-zinc-300/50 text-zinc-800 border-zinc-600 hover:border-indigo-500'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s] || s}
            </option>
          ))}
        </select>

        <select
          value={filters.produto}
          onChange={(e) => onFilterChange('produto', e.target.value)}
          className={selectClass}
        >
          <option value="">Todos os Produtos</option>
          {produtoOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e) => onFilterChange('dataInicio', e.target.value)}
          placeholder="Data Início"
          className={inputClass}
        />

        <input
          type="date"
          value={filters.dataFim}
          onChange={(e) => onFilterChange('dataFim', e.target.value)}
          placeholder="Data Fim"
          className={inputClass}
        />
      </div>
    </div>
  );
}
