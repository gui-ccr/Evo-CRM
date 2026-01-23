import { Clock, Send, CheckCircle, XCircle } from 'lucide-react';
import type { DisparoStatus } from '../types';

interface DisparoStatusBadgeProps {
  status: DisparoStatus;
}

const statusConfig = {
  agendado: {
    icon: Clock,
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    label: 'Agendado',
  },
  enviando: {
    icon: Send,
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    label: 'Enviando',
  },
  concluido: {
    icon: CheckCircle,
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Concluído',
  },
  erro: {
    icon: XCircle,
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'Erro',
  },
};

export function DisparoStatusBadge({ status }: DisparoStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
}
