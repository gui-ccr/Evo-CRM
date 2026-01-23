import { Info } from 'lucide-react';
import { AlertItem } from './AlertItem';
import type { Alert } from '../../shared/types';

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-400">
        <Info size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Nenhum alerta no momento</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
