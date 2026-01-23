import { Users, UserCheck, TrendingUp, Target } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';
import type { ClienteStats } from '../types';

interface ClientesStatsProps {
  stats: ClienteStats;
}

export function ClientesStats({ stats }: ClientesStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <StatCard
        label="Total de Leads"
        value={stats.total}
        icon={Users}
        trend="+324 este mês"
        trendPositive={true}
      />
      <StatCard
        label="Clientes Ativos"
        value={stats.ativos}
        icon={UserCheck}
        trend="75% do total"
        trendPositive={true}
      />
      <StatCard
        label="Novos este Mês"
        value={stats.novosEsteMes}
        icon={TrendingUp}
        trend="+12% vs mês passado"
        trendPositive={true}
      />
      <StatCard
        label="Taxa de Conversão"
        value={stats.conversao}
        icon={Target}
        trend="+2.3% este mês"
        trendPositive={true}
      />
    </div>
  );
}
