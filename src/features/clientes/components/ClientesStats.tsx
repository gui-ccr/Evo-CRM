import { Users, UserCheck, TrendingUp, Target } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';
import type { ClienteStats } from '../types';

interface ClientesStatsProps {
  stats: ClienteStats;
}

export function ClientesStats({ stats }: ClientesStatsProps) {
  const pctAtivos = stats.total > 0 ? ((stats.ativos / stats.total) * 100).toFixed(0) : '0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <StatCard
        label="Total de Clientes"
        value={stats.total}
        icon={Users}
        trend="clientes únicos"
        trendPositive={true}
      />
      <StatCard
        label="Clientes Ativos"
        value={stats.ativos}
        icon={UserCheck}
        trend={`${pctAtivos}% do total`}
        trendPositive={true}
      />
      <StatCard
        label="Novos este Mês"
        value={stats.novosEsteMes}
        icon={TrendingUp}
        trend="primeira compra neste mês"
        trendPositive={stats.novosEsteMes > 0}
      />
      <StatCard
        label="LTV Médio"
        value={stats.conversao}
        icon={Target}
        trend="por cliente"
        trendPositive={true}
      />
    </div>
  );
}
