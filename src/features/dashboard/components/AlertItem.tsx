import { AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { getRelativeTime } from '../../shared/utils/formatters';
import type { Alert } from '../../shared/types';

const alertConfig = {
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/30',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/30',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-500/30',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-500/30',
    textColor: 'text-red-800',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
  },
};

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} ${config.textColor} relative`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`${config.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{alert.title}</h4>
          <p className="text-sm mt-1">{alert.message}</p>
          <p className="text-xs mt-2 opacity-70">
            {getRelativeTime(alert.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
