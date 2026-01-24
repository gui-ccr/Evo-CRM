import { X, Mail, Phone, Calendar, TrendingUp, Link as LinkIcon, MessageCircle, Activity } from 'lucide-react';
import { formatCurrency, formatDate, formatDateTime } from '../../shared/utils/formatters';
import { LeadScoreBadge } from './LeadScoreBadge';
import { WhatsAppButton } from './WhatsAppButton';
import type { LeadCRM } from '../types';

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadCRM | null;
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
  novo: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  contatado: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  interessado: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  negociacao: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  convertido: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  perdido: 'bg-red-500/20 text-red-500 border-red-500/30',
};

export function LeadDetailsModal({ isOpen, onClose, lead }: LeadDetailsModalProps) {
  if (!isOpen || !lead) return null;

  // Dados fictÃ­cios para demonstraÃ§Ã£o
  const interacoes = [
    { tipo: 'email', data: '2025-01-20 14:30', descricao: 'Abriu email de boas-vindas' },
    { tipo: 'link', data: '2025-01-20 14:35', descricao: 'Clicou no link da landing page' },
    { tipo: 'whatsapp', data: '2025-01-19 10:15', descricao: 'Respondeu mensagem no WhatsApp' },
    { tipo: 'email', data: '2025-01-18 09:00', descricao: 'Recebeu email de oferta' },
  ];

  const notas = [
    { data: '2025-01-20', autor: 'JoÃ£o Silva', texto: 'Lead muito interessado, pediu mais informaÃ§Ãµes sobre o programa premium.' },
    { data: '2025-01-19', autor: 'Maria Santos', texto: 'Primeiro contato realizado via WhatsApp. Respondeu positivamente.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-zinc-600 p-4 sm:p-6 flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{lead.nome}</h2>
            <div className="flex flex-wrap items-center gap-2">
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
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-lg transition-colors touch-manipulation cursor-pointer flex-shrink-0 ml-4"
          >
            <X size={20} className="text-zinc-900" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* InformaÃ§Ãµes de Contato */}
          <div className="bg-zinc-300/60 rounded-lg p-4 sm:p-5 border border-zinc-600">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Phone size={18} className="text-evo-orange" />
              InformaÃ§Ãµes de Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-zinc-900 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-900">Email</p>
                  <p className="text-sm font-medium text-zinc-900 truncate">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-zinc-900 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-900">Telefone</p>
                  <p className="text-sm font-medium text-zinc-900">{lead.telefone}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-600">
                <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              </div>
            </div>
          </div>

          {/* Dados do Lead */}
          <div className="bg-zinc-300/60 rounded-lg p-4 sm:p-5 border border-zinc-600">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-evo-orange" />
              Dados do Lead
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-900 mb-1">Origem</p>
                <p className="text-sm font-medium text-zinc-900">{lead.origem}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-900 mb-1">Data de Cadastro</p>
                <p className="text-sm font-medium text-zinc-900">{formatDate(lead.dataCadastro)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-900 mb-1">Ãšltima InteraÃ§Ã£o</p>
                <p className="text-sm font-medium text-zinc-900">{formatDateTime(lead.ultimaInteracao)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-900 mb-1">Valor Potencial</p>
                <p className="text-sm font-bold text-indigo-500">{formatCurrency(lead.valorPotencial)}</p>
              </div>
            </div>
          </div>

          {/* Score e Temperatura */}
          <div className="bg-gradient-to-br from-evo-orange/10 to-evo-purple/10 rounded-lg p-4 sm:p-5 border-2 border-evo-orange/30">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-evo-orange" />
              AnÃ¡lise de Engajamento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/80 rounded-lg">
                <p className="text-xs text-zinc-900 mb-2">Score Geral</p>
                <p className="text-3xl font-bold text-indigo-500">{lead.score}</p>
                <p className="text-xs text-zinc-900 mt-1">de 100</p>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-lg">
                <p className="text-xs text-zinc-900 mb-2">Temperatura</p>
                <p className="text-2xl font-bold capitalize" style={{
                  color: lead.temperatura === 'quente' ? '#10b981' : lead.temperatura === 'morno' ? '#f59e0b' : '#6b7280'
                }}>
                  {lead.temperatura}
                </p>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-lg">
                <p className="text-xs text-zinc-900 mb-2">Status</p>
                <p className="text-sm font-bold text-zinc-900">{statusLabels[lead.status]}</p>
              </div>
            </div>
          </div>

          {/* HistÃ³rico de InteraÃ§Ãµes */}
          <div className="bg-zinc-300/60 rounded-lg p-4 sm:p-5 border border-zinc-600">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-evo-orange" />
              HistÃ³rico de InteraÃ§Ãµes
            </h3>
            <div className="space-y-3">
              {interacoes.map((interacao, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-500/10">
                  <div className="w-8 h-8 rounded-full bg-evo-cyan/20 flex items-center justify-center flex-shrink-0">
                    {interacao.tipo === 'email' && <Mail size={14} className="text-evo-cyan" />}
                    {interacao.tipo === 'link' && <LinkIcon size={14} className="text-evo-orange" />}
                    {interacao.tipo === 'whatsapp' && <MessageCircle size={14} className="text-emerald-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900">{interacao.descricao}</p>
                    <p className="text-xs text-zinc-900 mt-1">{formatDateTime(interacao.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="bg-zinc-300/60 rounded-lg p-4 sm:p-5 border border-zinc-600">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-evo-orange" />
              Notas e ObservaÃ§Ãµes
            </h3>
            <div className="space-y-3">
              {notas.map((nota, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-indigo-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-zinc-900">{nota.autor}</p>
                    <p className="text-xs text-zinc-900">{formatDate(nota.data)}</p>
                  </div>
                  <p className="text-sm text-zinc-900">{nota.texto}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full px-4 py-2.5 bg-indigo-500 text-zinc-100 font-semibold rounded-lg hover:bg-indigo-600 transition-colors touch-manipulation cursor-pointer">
              Adicionar Nova Nota
            </button>
          </div>

          {/* AÃ§Ãµes */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-600">
            <button className="flex-1 px-4 py-2.5 bg-emerald-500 text-zinc-100 font-semibold rounded-lg hover:bg-emerald-600 transition-colors touch-manipulation cursor-pointer">
              Marcar como Convertido
            </button>
            <button className="flex-1 px-4 py-2.5 bg-evo-orange text-zinc-100 font-semibold rounded-lg hover:bg-evo-coral transition-colors touch-manipulation cursor-pointer">
              Agendar Follow-up
            </button>
            <button className="flex-1 px-4 py-2.5 border-2 border-zinc-300 text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors touch-manipulation cursor-pointer">
              Editar Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
