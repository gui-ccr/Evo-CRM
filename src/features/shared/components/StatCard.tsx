import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendPositive }: StatCardProps) {
  return (
    <div className='bg-zinc-200 rounded-xl p-6 border-2 border-evo-purple/20 shadow-lg flex items-start justify-between hover:shadow-xl hover:border-evo-purple/40 transition-all'>
      <div>
        <p className='text-sm font-medium text-evo-dark-400 mb-1.5'>{label}</p>
        <h3 className='text-2xl font-bold text-evo-indigo'>{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trendPositive ? 'text-evo-purple' : 'text-evo-red'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className='text-evo-orange'>
        <Icon size={24} />
      </div>
    </div>
  );
}
