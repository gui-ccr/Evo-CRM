import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface ProgressBarProps {
  progresso: number;
  status: 'processando' | 'concluido' | 'erro';
  arquivo: string;
  detalhes?: {
    total: number;
    processados: number;
    novos: number;
    duplicados: number;
  };
}

export function ProgressBar({ progresso, status, arquivo, detalhes }: ProgressBarProps) {
  const statusConfig = {
    processando: {
      icon: Loader2,
      iconClass: 'animate-spin text-blue-500',
      barColor: 'bg-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      label: 'Processando...',
    },
    concluido: {
      icon: CheckCircle,
      iconClass: 'text-emerald-500',
      barColor: 'bg-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      label: 'Concluído!',
    },
    erro: {
      icon: XCircle,
      iconClass: 'text-red-500',
      barColor: 'bg-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      label: 'Erro no processamento',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`p-6 rounded-xl border-2 ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon size={24} className={config.iconClass} />
        <div className="flex-1">
          <p className="font-semibold text-indigo-500">{config.label}</p>
          <p className="text-sm text-zinc-600">{arquivo}</p>
        </div>
        <span className="text-2xl font-bold text-indigo-500">{progresso}%</span>
      </div>

      <div className="relative w-full h-3 bg-evo-cyan-50 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${config.barColor} transition-all duration-300 ease-out`}
          style={{ width: `${progresso}%` }}
        >
          <div className="w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>

      {detalhes && (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-zinc-600">Total</p>
            <p className="text-lg font-bold text-indigo-500">{detalhes.total}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-600">Processados</p>
            <p className="text-lg font-bold text-blue-500">{detalhes.processados}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-600">Novos</p>
            <p className="text-lg font-bold text-emerald-500">{detalhes.novos}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-600">Duplicados</p>
            <p className="text-lg font-bold text-yellow-500">{detalhes.duplicados}</p>
          </div>
        </div>
      )}
    </div>
  );
}
