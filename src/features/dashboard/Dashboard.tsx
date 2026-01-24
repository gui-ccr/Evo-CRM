import { Card } from '../shared/components/Card';
import { DashboardHeader } from './components/DashboardHeader';
import { StatsGrid } from './components/StatsGrid';
import { QuickStatsBar } from './components/QuickStatsBar';
import { SalesChart } from './components/SalesChart';
import { LeadsVendasChart } from './components/LeadsVendasChart';
import { RecentSalesTable } from './components/RecentSalesTable';
import { AlertsList } from './components/AlertsList';
import { useDashboardData } from './hooks/useDashboardData';

export function Dashboard() {
  const { stats, sales, alerts, quickStats } = useDashboardData();

  return (
    <div className="p-8 space-y-8 bg-evo-cyan-900 min-h-screen">
      <DashboardHeader
        title="Dashboard Nexus EVO"
        subtitle="Visão executiva do seu negócio de coaching"
      />

      <StatsGrid stats={stats} />

      <QuickStatsBar stats={quickStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="">
          <LeadsVendasChart />
        </Card>

        <Card title="">
          <SalesChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="Últimas Conversões">
            <RecentSalesTable sales={sales} />
          </Card>
        </div>

        <div>
          <Card title="Notificações">
            <AlertsList alerts={alerts} />
          </Card>
        </div>
      </div>
    </div>
  );
}
