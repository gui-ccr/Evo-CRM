import type { ClienteStatus } from '../types';

interface StatusBadgeProps {
  status: ClienteStatus;
}

const statusConfig = {
  ativo: {
    className: 'bg-emerald-600/40 text-emerald-800 border-emerald-500/30',
    label: 'Ativo',
  },
  pendente: {
    className: 'bg-yellow-600/40 text-yellow-800 border-yellow-500/30',
    label: 'Pendente',
  },
  inativo: {
    className: 'bg-red-600/40 text-red-800 border-red-500/30',
    label: 'Inativo',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      {config.label}
    </span>
  );
}
