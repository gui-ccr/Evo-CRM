import { useState } from 'react';
import { X, Send, Calendar, Users, MessageCircle, Mail, Filter } from 'lucide-react';
import type { Template, TemplateType } from '../types';
import type { LeadOrigem, LeadStatus, LeadTemperatura } from '../../crm-intelligence/types';

interface DisparoAgendadorProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  onAgendar: (agendamento: {
    templateId: string;
    tipo: TemplateType;
    destinatarios: 'todos' | 'filtro';
    eventoFiltro?: LeadOrigem;
    statusFiltro?: LeadStatus[];
    temperaturaFiltro?: LeadTemperatura[];
    dataAgendamento: string;
    horaAgendamento: string;
    envioImediato: boolean;
  }) => void;
}

export function DisparoAgendador({ isOpen, onClose, templates, onAgendar }: DisparoAgendadorProps) {
  const [templateId, setTemplateId] = useState('');
  const [destinatarios, setDestinatarios] = useState<'todos' | 'filtro'>('todos');
  const [eventoFiltro, setEventoFiltro] = useState<LeadOrigem | ''>('');
  const [statusFiltro, setStatusFiltro] = useState<LeadStatus[]>([]);
  const [temperaturaFiltro, setTemperaturaFiltro] = useState<LeadTemperatura[]>([]);
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horaAgendamento, setHoraAgendamento] = useState('');
  const [envioImediato, setEnvioImediato] = useState(false);

  const eventos: LeadOrigem[] = [
    'Evento SP - Novembro',
    'Evento RJ - Outubro',
    'Landing Page',
    'Instagram',
    'Indicação',
    'Lançamento Digital'
  ];

  const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: 'novo', label: 'Novo' },
    { value: 'contatado', label: 'Contatado' },
    { value: 'interessado', label: 'Interessado' },
    { value: 'negociacao', label: 'Negociação' },
    { value: 'convertido', label: 'Convertido' },
    { value: 'perdido', label: 'Perdido' }
  ];

  const temperaturaOptions: { value: LeadTemperatura; label: string }[] = [
    { value: 'quente', label: 'Quente 🔥' },
    { value: 'morno', label: 'Morno 🌤️' },
    { value: 'frio', label: 'Frio ❄️' }
  ];

  if (!isOpen) return null;

  const templateSelecionado = templates.find(t => t.id === templateId);

  const handleAgendar = () => {
    onAgendar({
      templateId,
      tipo: templateSelecionado?.tipo || 'whatsapp',
      destinatarios,
      eventoFiltro: destinatarios === 'filtro' && eventoFiltro ? (eventoFiltro as LeadOrigem) : undefined,
      statusFiltro: destinatarios === 'filtro' && statusFiltro.length > 0 ? statusFiltro : undefined,
      temperaturaFiltro: destinatarios === 'filtro' && temperaturaFiltro.length > 0 ? temperaturaFiltro : undefined,
      dataAgendamento,
      horaAgendamento,
      envioImediato,
    });

    setTemplateId('');
    setDestinatarios('todos');
    setEventoFiltro('');
    setStatusFiltro([]);
    setTemperaturaFiltro([]);
    setDataAgendamento('');
    setHoraAgendamento('');
    setEnvioImediato(false);
    onClose();
  };

  const handleStatusChange = (status: LeadStatus) => {
    setStatusFiltro(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleTemperaturaChange = (temperatura: LeadTemperatura) => {
    setTemperaturaFiltro(prev =>
      prev.includes(temperatura)
        ? prev.filter(t => t !== temperatura)
        : [...prev, temperatura]
    );
  };

  const templatesWhatsApp = templates.filter(t => t.tipo === 'whatsapp');
  const templatesEmail = templates.filter(t => t.tipo === 'email');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-200 border-b-2 border-zinc-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Send className="text-evo-orange" size={28} />
            <h2 className="text-2xl font-bold text-indigo-500">Agendar Disparo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-evo-cyan-50 rounded-lg transition-colors"
          >
            <X size={24} className="text-zinc-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-2">
              Selecione o Template
            </label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-600 rounded-lg focus:border-evo-orange focus:outline-none"
            >
              <option value="">Escolha um template...</option>
              {templatesWhatsApp.length > 0 && (
                <optgroup label="WhatsApp">
                  {templatesWhatsApp.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.nome}
                    </option>
                  ))}
                </optgroup>
              )}
              {templatesEmail.length > 0 && (
                <optgroup label="E-mail">
                  {templatesEmail.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.nome}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {templateSelecionado && (
            <div className="p-4 bg-evo-cyan-50 border border-zinc-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {templateSelecionado.tipo === 'whatsapp' ? (
                  <MessageCircle size={16} className="text-green-500" />
                ) : (
                  <Mail size={16} className="text-blue-500" />
                )}
                <p className="text-sm font-medium text-indigo-500">
                  Preview do Template
                </p>
              </div>
              {templateSelecionado.assunto && (
                <p className="text-xs text-zinc-600 mb-1">
                  <strong>Assunto:</strong> {templateSelecionado.assunto}
                </p>
              )}
              <p className="text-sm text-zinc-2000">{templateSelecionado.mensagem}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-3">
              Destinatários
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-4 border border-zinc-600 rounded-lg cursor-pointer hover:border-evo-orange transition-colors">
                <input
                  type="radio"
                  name="destinatarios"
                  value="todos"
                  checked={destinatarios === 'todos'}
                  onChange={(e) => setDestinatarios(e.target.value as 'todos')}
                  className="w-4 h-4 text-evo-orange"
                />
                <Users size={20} className="text-evo-orange" />
                <div className="flex-1">
                  <p className="font-medium text-indigo-500">Todos os Leads</p>
                  <p className="text-xs text-zinc-600">Enviar para toda a base (2.847 leads)</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-zinc-600 rounded-lg cursor-pointer hover:border-evo-orange transition-colors">
                <input
                  type="radio"
                  name="destinatarios"
                  value="filtro"
                  checked={destinatarios === 'filtro'}
                  onChange={(e) => setDestinatarios(e.target.value as 'filtro')}
                  className="w-4 h-4 text-evo-orange"
                />
                <Filter size={20} className="text-evo-orange" />
                <div className="flex-1">
                  <p className="font-medium text-indigo-500">Leads Filtrados</p>
                  <p className="text-xs text-zinc-600">Filtre por evento, status e temperatura</p>
                </div>
              </label>

              {destinatarios === 'filtro' && (
                <div className="ml-12 p-4 bg-evo-cyan-50 border border-zinc-600 rounded-lg space-y-4">
                  <p className="text-xs text-zinc-600 italic">
                    Selecione pelo menos um filtro abaixo
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">
                      Evento/Origem (opcional)
                    </label>
                    <select
                      value={eventoFiltro}
                      onChange={(e) => setEventoFiltro(e.target.value as LeadOrigem)}
                      className="w-full px-4 py-2 border border-zinc-600 rounded-lg focus:border-evo-orange focus:outline-none"
                    >
                      <option value="">Todos os eventos</option>
                      {eventos.map(evento => (
                        <option key={evento} value={evento}>
                          {evento}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">
                      Status do Lead (múltipla escolha)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {statusOptions.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2 p-2 border border-zinc-600 rounded cursor-pointer hover:border-evo-orange transition-colors">
                          <input
                            type="checkbox"
                            checked={statusFiltro.includes(value)}
                            onChange={() => handleStatusChange(value)}
                            className="w-4 h-4 text-evo-orange border-zinc-600 rounded focus:ring-evo-orange"
                          />
                          <span className="text-sm text-indigo-500">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">
                      Temperatura do Lead (múltipla escolha)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {temperaturaOptions.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2 p-2 px-4 border border-zinc-600 rounded cursor-pointer hover:border-evo-orange transition-colors">
                          <input
                            type="checkbox"
                            checked={temperaturaFiltro.includes(value)}
                            onChange={() => handleTemperaturaChange(value)}
                            className="w-4 h-4 text-evo-orange border-zinc-600 rounded focus:ring-evo-orange"
                          />
                          <span className="text-sm text-indigo-500">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={envioImediato}
                onChange={(e) => setEnvioImediato(e.target.checked)}
                className="w-4 h-4 text-evo-orange border-zinc-600 rounded focus:ring-evo-orange"
              />
              <span className="text-sm font-medium text-indigo-500">
                Enviar imediatamente após confirmar
              </span>
            </label>

            {!envioImediato && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    <Calendar size={16} className="inline mr-1" />
                    Data
                  </label>
                  <input
                    type="date"
                    value={dataAgendamento}
                    onChange={(e) => setDataAgendamento(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-zinc-600 rounded-lg focus:border-evo-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={horaAgendamento}
                    onChange={(e) => setHoraAgendamento(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-600 rounded-lg focus:border-evo-orange focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {templateId && (envioImediato || (dataAgendamento && horaAgendamento)) && (
            <div className="p-4 bg-evo-orange/10 border border-evo-orange/20 rounded-lg space-y-2">
              <p className="text-sm text-evo-orange">
                <strong>Resumo:</strong> {destinatarios === 'todos' ? '2.847' : '284'} mensagens{' '}
                serão {envioImediato ? 'enviadas imediatamente' : `agendadas para ${dataAgendamento} às ${horaAgendamento}`}
              </p>
              {destinatarios === 'filtro' && (eventoFiltro || statusFiltro.length > 0 || temperaturaFiltro.length > 0) && (
                <div className="text-xs text-evo-orange/80 space-y-1">
                  <p className="font-semibold">Filtros aplicados:</p>
                  {eventoFiltro && <p>• Evento/Origem: <strong>{eventoFiltro}</strong></p>}
                  {statusFiltro.length > 0 && (
                    <p>• Status: <strong>{statusFiltro.map(s => statusOptions.find(opt => opt.value === s)?.label).join(', ')}</strong></p>
                  )}
                  {temperaturaFiltro.length > 0 && (
                    <p>• Temperatura: <strong>{temperaturaFiltro.map(t => temperaturaOptions.find(opt => opt.value === t)?.label).join(', ')}</strong></p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t-2 border-zinc-600">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-zinc-600 text-indigo-500 rounded-lg hover:border-indigo-500 transition-colors font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleAgendar}
              disabled={
                !templateId ||
                (!envioImediato && (!dataAgendamento || !horaAgendamento)) ||
                (destinatarios === 'filtro' && !eventoFiltro && statusFiltro.length === 0 && temperaturaFiltro.length === 0)
              }
              className="flex-1 px-6 py-3 bg-evo-orange text-black rounded-lg hover:bg-evo-coral transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {envioImediato ? 'Enviar Agora' : 'Agendar Disparo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
