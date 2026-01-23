import type { QuickStat } from '../../shared/types';

interface QuickStatItemProps extends QuickStat {}

function QuickStatItem({ label, value, description }: QuickStatItemProps) {
  return (
    <div className="text-center p-4">
      <p className="text-xs font-medium text-evo-dark-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-evo-indigo">{value}</p>
      {description && (
        <p className="text-xs text-evo-dark-500 mt-1">{description}</p>
      )}
    </div>
  );
}

interface QuickStatsBarProps {
  stats: QuickStat[];
}

export function QuickStatsBar({ stats }: QuickStatsBarProps) {
  return (
    <div className="bg-zinc-200 rounded-xl shadow-sm border border-evo-purple/20 divide-x divide-evo-purple/20 flex">
      {stats.map((stat, index) => (
        <div key={index} className="flex-1">
          <QuickStatItem {...stat} />
        </div>
      ))}
    </div>
  );
}
