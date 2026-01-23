import { Mail, Phone, Link as LinkIcon, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { LeadScoreBadge } from './LeadScoreBadge';
import { WhatsAppButton } from './WhatsAppButton';
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
  if (leads.length === 0) {
    return (
      <div className="text-center py-12 text-evo-dark-400">
        <p>Nenhum lead encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="bg-zinc-200 rounded-lg p-6 border-2 border-evo-purple/20 hover:border-evo-orange transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-evo-indigo">{lead.nome}</h3>
                <LeadScoreBadge score={lead.score} temperatura={lead.temperatura} />
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                  {statusLabels[lead.status]}
                </span>
                {lead.clicouLink && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-evo-orange/20 text-evo-orange text-xs font-medium rounded-full border border-evo-orange/30">
                    <LinkIcon size={12} />
                    Clicou no Link
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-evo-dark-400">
                  <Mail size={14} />
                  {lead.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-evo-dark-400">
                  <Phone size={14} />
                  {lead.telefone}
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-evo-dark-400">
                <div>
                  <span className="font-medium">Origem:</span> {lead.origem}
                </div>
                <div>
                  <span className="font-medium">Cadastro:</span> {formatDate(lead.dataCadastro)}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-evo-purple" />
                  <span className="font-medium">Potencial:</span>{' '}
                  <span className="text-evo-purple font-bold">{formatCurrency(lead.valorPotencial)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              <button className="px-4 py-2 border-2 border-evo-purple/20 text-evo-indigo rounded-lg hover:border-evo-purple transition-colors">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
