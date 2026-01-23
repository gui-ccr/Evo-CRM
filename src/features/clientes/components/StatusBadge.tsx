import type { ClienteStatus } from '../types';

interface StatusBadgeProps {
  status: ClienteStatus;
}

const statusConfig = {
  ativo: {
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Ativo',
  },
  pendente: {
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    label: 'Pendente',
  },
  inativo: {
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
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
