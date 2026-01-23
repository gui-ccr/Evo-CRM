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
  negociacao: 'Em Negociação',
  convertido: 'Convertido',
  perdido: 'Perdido',
};

const statusColors = {
  novo: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  contatado: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  interessado: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  negociacao: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  convertido: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  perdido: 'bg-red-500/20 text-red-500 border-red-500/30',
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
      <div className="text-center py-12 text-evo-dark-400">
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
          className="bg-zinc-200 rounded-lg p-4 sm:p-5 lg:p-6 border-2 border-evo-purple/20 hover:border-evo-orange transition-all"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-evo-indigo">{lead.nome}</h3>
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
                <div className="flex items-center gap-2 text-xs sm:text-sm text-evo-dark-400">
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-evo-dark-400">
                  <Phone size={14} className="flex-shrink-0" />
                  {lead.telefone}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6 text-[10px] sm:text-xs text-evo-dark-400">
                <div>
                  <span className="font-medium">Origem:</span> <span className="text-evo-indigo">{lead.origem}</span>
                </div>
                <div>
                  <span className="font-medium">Cadastro:</span> {formatDate(lead.dataCadastro)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-evo-purple flex-shrink-0" />
                  <span className="font-medium">Potencial:</span>{' '}
                  <span className="text-evo-purple font-bold">{formatCurrency(lead.valorPotencial)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-2">
              <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              <button
                onClick={() => handleViewDetails(lead)}
                className="flex-1 lg:flex-initial px-3 sm:px-4 py-2 border-2 border-evo-purple/20 text-evo-indigo text-sm rounded-lg hover:border-evo-purple transition-colors touch-manipulation cursor-pointer"
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
