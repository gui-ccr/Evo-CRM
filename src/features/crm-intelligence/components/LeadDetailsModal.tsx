import { X, Mail, Phone, Calendar, TrendingUp, Link as LinkIcon, MessageCircle, Activity } from 'lucide-react';
import { formatCurrency, formatDate, formatDateTime } from '../../shared/utils/formatters';
import { LeadScoreBadge } from './LeadScoreBadge';
import { WhatsAppButton } from './WhatsAppButton';
import type { LeadCRM } from '../types';
import { useLayoutTheme } from '../../shared/layout/ThemeContext';

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadCRM | null;
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
  interessado: 'bg-amber-100 text-amber-700 border-amber-300',
  negociacao: 'bg-orange-100 text-orange-700 border-orange-300',
  convertido: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  perdido: 'bg-red-100 text-red-700 border-red-300',
};

export function LeadDetailsModal({ isOpen, onClose, lead }: LeadDetailsModalProps) {
  const theme = useLayoutTheme();

  if (!isOpen || !lead) return null;

  // Dados fictícios para demonstração
  const interacoes = [
    { tipo: 'email', data: '2025-01-20 14:30', descricao: 'Abriu email de boas-vindas' },
    { tipo: 'link', data: '2025-01-20 14:35', descricao: 'Clicou no link da landing page' },
    { tipo: 'whatsapp', data: '2025-01-19 10:15', descricao: 'Respondeu mensagem no WhatsApp' },
    { tipo: 'email', data: '2025-01-18 09:00', descricao: 'Recebeu email de oferta' },
  ];

  const notas = [
    { data: '2025-01-20', autor: 'João Silva', texto: 'Lead muito interessado, pediu mais informações sobre o programa premium.' },
    { data: '2025-01-19', autor: 'Maria Santos', texto: 'Primeiro contato realizado via WhatsApp. Respondeu positivamente.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: theme.cardBackground, border: `1px solid ${theme.cardBorder}` }}
      >
        {/* Header */}
        <div
          className="sticky top-0 border-b p-4 sm:p-6 flex items-start justify-between"
          style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: theme.cardTitleColor }}>{lead.nome}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <LeadScoreBadge score={lead.score} temperatura={lead.temperatura} />
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[lead.status]}`}>
                {statusLabels[lead.status]}
              </span>
              {lead.clicouLink && (
                <span className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full border border-indigo-300">
                  <LinkIcon size={12} />
                  Clicou no Link
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors touch-manipulation cursor-pointer shrink-0 ml-4 hover:bg-gray-100"
            style={{ color: theme.cardTitleColor }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Informações de Contato */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.cardTitleColor }}>
              <Phone size={18} className="text-indigo-500" />
              Informações de Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-700 truncate">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Telefone</p>
                  <p className="text-sm font-medium text-gray-700">{lead.telefone}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <WhatsAppButton telefone={lead.telefone} nome={lead.nome} />
              </div>
            </div>
          </div>

          {/* Dados do Lead */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.cardTitleColor }}>
              <Activity size={18} className="text-indigo-500" />
              Dados do Lead
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Origem</p>
                <p className="text-sm font-medium text-gray-700">{lead.origem}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data de Cadastro</p>
                <p className="text-sm font-medium text-gray-700">{formatDate(lead.dataCadastro)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Última Interação</p>
                <p className="text-sm font-medium text-gray-700">{formatDateTime(lead.ultimaInteracao)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Valor Potencial</p>
                <p className="text-sm font-bold text-indigo-500">{formatCurrency(lead.valorPotencial)}</p>
              </div>
            </div>
          </div>

          {/* Score e Temperatura */}
          <div className="bg-indigo-50 rounded-lg p-4 sm:p-5 border border-indigo-200">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.cardTitleColor }}>
              <TrendingUp size={18} className="text-indigo-500" />
              Análise de Engajamento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Score Geral</p>
                <p className="text-3xl font-bold text-indigo-500">{lead.score}</p>
                <p className="text-xs text-gray-500 mt-1">de 100</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Temperatura</p>
                <p className="text-2xl font-bold capitalize" style={{
                  color: lead.temperatura === 'quente' ? '#10b981' : lead.temperatura === 'morno' ? '#f59e0b' : '#6b7280'
                }}>
                  {lead.temperatura}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <p className="text-sm font-bold text-gray-700">{statusLabels[lead.status]}</p>
              </div>
            </div>
          </div>

          {/* Histórico de Interações */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.cardTitleColor }}>
              <Calendar size={18} className="text-indigo-500" />
              Histórico de Interações
            </h3>
            <div className="space-y-3">
              {interacoes.map((interacao, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    {interacao.tipo === 'email' && <Mail size={14} className="text-indigo-600" />}
                    {interacao.tipo === 'link' && <LinkIcon size={14} className="text-indigo-600" />}
                    {interacao.tipo === 'whatsapp' && <MessageCircle size={14} className="text-emerald-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700">{interacao.descricao}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDateTime(interacao.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.cardTitleColor }}>
              <MessageCircle size={18} className="text-indigo-500" />
              Notas e Observações
            </h3>
            <div className="space-y-3">
              {notas.map((nota, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-gray-700">{nota.autor}</p>
                    <p className="text-xs text-gray-500">{formatDate(nota.data)}</p>
                  </div>
                  <p className="text-sm text-gray-700">{nota.texto}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors touch-manipulation cursor-pointer">
              Adicionar Nova Nota
            </button>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors touch-manipulation cursor-pointer">
              Marcar como Convertido
            </button>
            <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors touch-manipulation cursor-pointer">
              Agendar Follow-up
            </button>
            <button className="flex-1 px-4 py-2.5 border-2 border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors touch-manipulation cursor-pointer" style={{ color: theme.cardTitleColor }}>
              Editar Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
