import { Card } from '../shared/components/Card';
import { CrmHeader } from './components/CrmHeader';
import { FiltrosInteligentes } from './components/FiltrosInteligentes';
import { LeadsList } from './components/LeadsList';
import { useCrmData } from './hooks/useCrmData';

export function CrmIntelligence() {
  const { leads, filtros, setFiltros, totalLeads, leadsQuentesCount } = useCrmData();

  return (
    <div className="p-8 space-y-8 bg-zinc-900 min-h-screen">
      <CrmHeader totalLeads={totalLeads} leadsQuentes={leadsQuentesCount} />

      <FiltrosInteligentes filtros={filtros} onFiltrosChange={setFiltros} />

      <Card title={`Leads Priorizados (${leads.length})`}>
        <div className="mb-4 p-3 bg-evo-orange/10 border border-evo-orange/20 rounded-lg">
          <p className="text-sm text-evo-orange">
            <strong>Lead Scoring:</strong> Leads ordenados por prioridade. Quanto maior o score, mais engajado está o lead.
          </p>
        </div>
        <LeadsList leads={leads} />
      </Card>
    </div>
  );
}
