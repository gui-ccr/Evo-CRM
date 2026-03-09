import { Clock, Send, CheckCircle, XCircle } from 'lucide-react';
import type { DisparoStatus } from '../types';

interface DisparoStatusBadgeProps {
  status: DisparoStatus;
}

const statusConfig = {
  agendado: {
    icon: Clock,
    className: 'bg-blue-100 text-blue-700 border-blue-300',
    label: 'Agendado',
  },
  enviando: {
    icon: Send,
    className: 'bg-amber-100 text-amber-700 border-amber-300',
    label: 'Enviando',
  },
  concluido: {
    icon: CheckCircle,
    className: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    label: 'Concluído',
  },
  erro: {
    icon: XCircle,
    className: 'bg-red-100 text-red-700 border-red-300',
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
