import { Target } from 'lucide-react';

interface CrmHeaderProps {
  totalLeads: number;
  leadsQuentes: number;
}

export function CrmHeader({ totalLeads, leadsQuentes }: CrmHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2 flex items-center gap-3">
          <Target className="text-evo-orange" size={32} />
          CRM Intelligence
        </h1>
        <p className="text-zinc-200">
          Funil de vendas com lead scoring e filtros inteligentes
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-zinc-200 rounded-lg p-4 border-2 border-evo-purple/20">
          <p className="text-xs text-evo-dark-400 mb-1">Total de Leads</p>
          <p className="text-2xl font-bold text-evo-indigo">{totalLeads}</p>
        </div>
        <div className="bg-linear-to-br from-evo-orange to-evo-coral rounded-lg p-4">
          <p className="text-xs text-white mb-1">Leads Quentes</p>
          <p className="text-2xl font-bold text-white">{leadsQuentes}</p>
        </div>
      </div>
    </div>
  );
}
