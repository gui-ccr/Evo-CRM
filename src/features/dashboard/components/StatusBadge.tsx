import type { Sale } from '../../shared/types';

interface StatusBadgeProps {
  status: Sale['status'];
}

const statusConfig = {
  completed: {
    className: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    label: 'Aprovado',
  },
  pending: {
    className: 'bg-amber-100 text-amber-700 border-amber-300',
    label: 'Pendente',
  },
  cancelled: {
    className: 'bg-red-100 text-red-700 border-red-300',
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
