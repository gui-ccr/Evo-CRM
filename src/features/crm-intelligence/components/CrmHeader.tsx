import { Target } from 'lucide-react';

interface CrmHeaderProps {
  totalLeads: number;
  leadsQuentes: number;
}

export function CrmHeader({ totalLeads, leadsQuentes }: CrmHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-100 mb-2 flex items-center gap-2 sm:gap-3">
          <Target className="text-evo-orange flex-shrink-0" size={24} />
          <span>CRM Intelligence</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-200">
          Funil de vendas com lead scoring e filtros inteligentes
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-zinc-200 rounded-lg p-3 sm:p-4 border-2 border-evo-purple/20">
          <p className="text-[10px] sm:text-xs text-evo-dark-400 mb-1">Total de Leads</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-evo-indigo">{totalLeads}</p>
        </div>
        <div className="bg-gradient-to-br from-evo-orange to-evo-coral rounded-lg p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-white mb-1">Leads Quentes</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{leadsQuentes}</p>
        </div>
      </div>
    </div>
  );
}
