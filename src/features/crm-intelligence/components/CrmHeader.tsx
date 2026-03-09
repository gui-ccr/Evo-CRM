import { Target } from 'lucide-react';
import { useLayoutTheme } from "../../shared/layout/ThemeContext";

interface CrmHeaderProps {
  totalLeads: number;
  leadsQuentes: number;
}

export function CrmHeader({ totalLeads, leadsQuentes }: CrmHeaderProps) {
  const theme = useLayoutTheme();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-2 sm:gap-3" style={{ color: theme.pageTitleColor }}>
          <Target className="text-indigo-500 flex-shrink-0" size={24} />
          <span>CRM Intelligence</span>
        </h1>
        <p className="text-sm sm:text-base" style={{ color: theme.pageSubtitleColor }}>
          Funil de vendas com lead scoring e filtros inteligentes
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-zinc-200 rounded-lg p-3 sm:p-4 border border-zinc-600">
          <p className="text-[10px] sm:text-xs text-zinc-900 mb-1">Total de Leads</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-500">{totalLeads}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-zinc-100 mb-1">Leads Quentes</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{leadsQuentes}</p>
        </div>
      </div>
    </div>
  );
}
