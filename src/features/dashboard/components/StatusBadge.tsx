import type { Sale } from '../../shared/types';

interface StatusBadgeProps {
  status: Sale['status'];
}

const statusConfig = {
  completed: {
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Concluída',
  },
  pending: {
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    label: 'Pendente',
  },
  cancelled: {
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'Cancelada',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config.className}`}>
      {config.label}
    </span>
  );
}
