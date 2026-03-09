import { AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { getRelativeTime } from '../../shared/utils/formatters';
import { useTheme } from '../../shared/layout/ThemeContext';
import type { Alert } from '../../shared/types';

const alertConfigLight = {
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-300',
    iconColor: 'text-amber-600',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-300',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-900',
    borderColor: 'border-emerald-300',
    iconColor: 'text-emerald-600',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    borderColor: 'border-red-300',
    iconColor: 'text-red-600',
  },
};

const alertConfigDark = {
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-950/40',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-700',
    iconColor: 'text-amber-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-950/40',
    textColor: 'text-blue-300',
    borderColor: 'border-blue-700',
    iconColor: 'text-blue-400',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-950/40',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-700',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-950/40',
    textColor: 'text-red-300',
    borderColor: 'border-red-700',
    iconColor: 'text-red-400',
  },
};

interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const { isDark } = useTheme();
  const alertConfig = isDark ? alertConfigDark : alertConfigLight;
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
