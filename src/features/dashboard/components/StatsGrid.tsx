import { StatCard } from '../../shared/components/StatCard';
import { useIconMapper } from '../../shared/hooks/useIconMapper';
import type { Stat } from '../../shared/types';

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = useIconMapper(stat.icon);
        return (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={Icon}
            trend={stat.trend}
            trendPositive={stat.trendPositive}
          />
        );
      })}
    </div>
  );
}
