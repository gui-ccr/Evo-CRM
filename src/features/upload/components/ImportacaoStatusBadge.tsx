import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { ImportacaoStatus } from '../types';

interface ImportacaoStatusBadgeProps {
  status: ImportacaoStatus;
}

const statusConfig = {
  concluido: {
    icon: CheckCircle,
    className: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    label: 'Concluído',
  },
  processando: {
    icon: Clock,
    className: 'bg-amber-100 text-amber-700 border-amber-300',
    label: 'Processando',
  },
  erro: {
    icon: XCircle,
    className: 'bg-red-100 text-red-700 border-red-300',
    label: 'Erro',
  },
};

export function ImportacaoStatusBadge({ status }: ImportacaoStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
}
