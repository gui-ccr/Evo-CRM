import type { Sale } from '../../shared/types';

interface StatusBadgeProps {
  status: Sale['status'];
}

const statusConfig = {
  completed: {
    className: 'bg-emerald-600/40 text-emerald-900 border-emerald-500/30',
    label: 'Aprovado',
  },
  pending: {
    className: 'bg-yellow-600/40 text-yellow-900 border-yellow-500/30',
    label: 'Pendente',
  },
  cancelled: {
    className: 'bg-red-600/40 text-red-900 border-red-500/30',
    label: 'Estornado',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config.className}`}>
      {config.label}
    </span>
  );
}
