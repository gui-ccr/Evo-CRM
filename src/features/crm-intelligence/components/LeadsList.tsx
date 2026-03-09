import { useState } from 'react';
import { Mail, Phone, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { LeadScoreBadge } from './LeadScoreBadge';
import { WhatsAppButton } from './WhatsAppButton';
import { LeadDetailsModal } from './LeadDetailsModal';
import { useLayoutTheme } from '../../shared/layout/ThemeContext';
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
  novo: 'bg-blue-100 text-blue-700 border-blue-300',
  contatado: 'bg-purple-100 text-purple-700 border-purple-300',
  interessado: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  negociacao: 'bg-orange-100 text-orange-700 border-orange-300',
  convertido: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  perdido: 'bg-red-100 text-red-700 border-red-300',
};

export function LeadsList({ leads }: LeadsListProps) {
  const [selectedLead, setSelectedLead] = useState<LeadCRM | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useLayoutTheme();

  const handleViewDetails = (lead: LeadCRM) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: theme.cardTitleColor }}>
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
          className="rounded-lg p-4 sm:p-5 lg:p-6 border hover:border-indigo-500 transition-all"
          style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold" style={{ color: theme.cardTitleColor }}>{lead.nome}</h3>
                <LeadScoreBadge score={lead.score} temperatura={lead.temperatura} />
                <span className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                  {statusLabels[lead.status]}
                </span>
                {lead.clicouLink && (
                  <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-medium rounded-full border border-indigo-300">
                    <LinkIcon size={12} />
                    <span className="hidden sm:inline">Clicou no Link</span>
                    <span className="sm:hidden">Link</span>
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: theme.cardTitleColor }}>
                  <Mail size={14} className="shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: theme.cardTitleColor }}>
                  <Phone size={14} className="shrink-0" />
                  {lead.telefone}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6 text-[10px] sm:text-xs" style={{ color: theme.cardTitleColor }}>
                <div>
                  <span className="font-medium">Origem:</span> {lead.origem}
                </div>
                <div>
                  <span className="font-medium">Cadastro:</span> {formatDate(lead.dataCadastro)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-indigo-500 shrink-0" />
                  <span className="font-medium">Potencial:</span>{' '}
                  <span className="text-indigo-500 font-bold">{formatCurrency(lead.valorPotencial)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col gap-2">
              <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              <button
                onClick={() => handleViewDetails(lead)}
                className="flex-1 lg:flex-initial px-3 sm:px-4 py-2 border text-sm rounded-lg hover:border-indigo-500 transition-colors touch-manipulation cursor-pointer"
                style={{ borderColor: theme.cardBorder, color: theme.cardTitleColor }}
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
