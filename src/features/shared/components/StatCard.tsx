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
    <div className='bg-zinc-200 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-evo-purple/20 shadow-lg flex items-start justify-between hover:shadow-xl hover:border-evo-purple/40 transition-all'>
      <div className='flex-1 min-w-0'>
        <p className='text-xs sm:text-sm font-medium text-evo-dark-400 mb-1.5 truncate'>{label}</p>
        <h3 className='text-xl sm:text-2xl font-bold text-evo-indigo break-words'>{value}</h3>
        {trend && (
          <p className={`text-xs mt-1.5 sm:mt-2 font-medium ${trendPositive ? 'text-evo-purple' : 'text-evo-red'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className='text-evo-orange flex-shrink-0 ml-2'>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}
