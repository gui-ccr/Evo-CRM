import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { ImportacaoStatus } from '../types';

interface ImportacaoStatusBadgeProps {
  status: ImportacaoStatus;
}

const statusConfig = {
  concluido: {
    icon: CheckCircle,
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Concluído',
  },
  processando: {
    icon: Clock,
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    label: 'Processando',
  },
  erro: {
    icon: XCircle,
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
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
