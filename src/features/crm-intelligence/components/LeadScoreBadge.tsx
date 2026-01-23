import { Flame, Droplet, Snowflake } from 'lucide-react';
import type { LeadTemperatura } from '../types';

interface LeadScoreBadgeProps {
  score: number;
  temperatura: LeadTemperatura;
}

export function LeadScoreBadge({ score, temperatura }: LeadScoreBadgeProps) {
  const config = {
    quente: {
      icon: Flame,
      className: 'bg-red-500/20 text-red-500 border-red-500/30',
      iconColor: 'text-red-500',
    },
    morno: {
      icon: Droplet,
      className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      iconColor: 'text-yellow-500',
    },
    frio: {
      icon: Snowflake,
      className: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, className, iconColor } = config[temperatura];

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-full border ${className}`}>
        <Icon size={14} className={iconColor} />
        {score}
      </span>
    </div>
  );
}
