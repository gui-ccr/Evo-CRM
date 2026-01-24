import { useState } from 'react';
import { Mail, Phone, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { LeadScoreBadge } from './LeadScoreBadge';
import { WhatsAppButton } from './WhatsAppButton';
import { LeadDetailsModal } from './LeadDetailsModal';
import type { LeadCRM } from '../types';

interface LeadsListProps {
  leads: LeadCRM[];
}

const statusLabels = {
  novo: 'Novo',
  contatado: 'Contatado',
  interessado: 'Interessado',
  negociacao: 'Em NegociaÃ§Ã£o',
  convertido: 'Convertido',
  perdido: 'Perdido',
};

const statusColors = {
  novo: 'bg-blue-600/30 text-blue-900 border-blue-500/30',
  contatado: 'bg-purple-600/30 text-purple-900 border-purple-500/30',
  interessado: 'bg-yellow-600/30 text-yellow-900 border-yellow-500/30',
  negociacao: 'bg-orange-600/30 text-orange-900 border-orange-500/30',
  convertido: 'bg-emerald-600/30 text-emerald-900 border-emerald-500/30',
  perdido: 'bg-red-600/30 text-red-900 border-red-500/30',
};

export function LeadsList({ leads }: LeadsListProps) {
  const [selectedLead, setSelectedLead] = useState<LeadCRM | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (lead: LeadCRM) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-900">
        <p className="text-sm sm:text-base">Nenhum lead encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {leads.map((lead) => (
        <div
          key={lead.id}
          className="bg-zinc-200 rounded-lg p-4 sm:p-5 lg:p-6 border border-zinc-600 hover:border-evo-orange transition-all"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900">{lead.nome}</h3>
                <LeadScoreBadge score={lead.score} temperatura={lead.temperatura} />
                <span className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                  {statusLabels[lead.status]}
                </span>
                {lead.clicouLink && (
                  <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-evo-orange/20 text-evo-orange text-[10px] sm:text-xs font-medium rounded-full border border-evo-orange/30">
                    <LinkIcon size={12} />
                    <span className="hidden sm:inline">Clicou no Link</span>
                    <span className="sm:hidden">Link</span>
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-900">
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-900">
                  <Phone size={14} className="flex-shrink-0" />
                  {lead.telefone}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6 text-[10px] sm:text-xs text-zinc-900">
                <div>
                  <span className="font-medium">Origem:</span> <span className="text-zinc-900">{lead.origem}</span>
                </div>
                <div>
                  <span className="font-medium">Cadastro:</span> {formatDate(lead.dataCadastro)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-indigo-500 flex-shrink-0" />
                  <span className="font-medium">Potencial:</span>{' '}
                  <span className="text-indigo-500 font-bold">{formatCurrency(lead.valorPotencial)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-2">
              <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              <button
                onClick={() => handleViewDetails(lead)}
                className="flex-1 lg:flex-initial px-3 sm:px-4 py-2 border border-zinc-600 text-zinc-900 text-sm rounded-lg hover:border-indigo-500 transition-colors touch-manipulation cursor-pointer"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <LeadDetailsModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      lead={selectedLead}
    />
    </>
  );
}
