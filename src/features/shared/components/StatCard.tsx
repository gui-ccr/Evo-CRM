import type { LucideIcon } from 'lucide-react';
import { useLayoutTheme } from '../layout/ThemeContext';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendPositive }: StatCardProps) {
  const theme = useLayoutTheme();

  return (
    <div
      className="rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg flex items-start justify-between hover:shadow-xl hover:border-indigo-500 transition-all border"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorder,
      }}
    >
      <div className='flex-1 min-w-0'>
        <p className='text-xs sm:text-sm font-medium mb-1.5 truncate' style={{ color: theme.pageSubtitleColor }}>{label}</p>
        <h3 className='text-xl sm:text-2xl font-bold text-indigo-500 break-words'>{value}</h3>
        {trend && (
          <p className={`text-xs mt-1.5 sm:mt-2 font-medium ${trendPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className='text-indigo-500 flex-shrink-0 ml-2'>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}
