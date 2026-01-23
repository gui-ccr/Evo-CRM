/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../shared/components/Card';
import { MensagensHeader } from './components/MensagensHeader';
import { TemplatesList } from './components/TemplatesList';
import { TemplateEditor } from './components/TemplateEditor';
import { DisparoAgendador } from './components/DisparoAgendador';
import { RelatorioEntrega } from './components/RelatorioEntrega';
import { DisparosTable } from './components/DisparosTable';
import { useMensagensData } from './hooks/useMensagensData';

export function Mensagens() {
  const { templates, disparos } = useMensagensData();
  const [showEditor, setShowEditor] = useState(false);
  const [showAgendador, setShowAgendador] = useState(false);

  const handleNewDisparo = () => {
    setShowAgendador(true);
  };

  const handleSaveTemplate = (template: any) => {
    console.log('Template salvo:', template);
  };

  const handleAgendar = (agendamento: any) => {
    console.log('Disparo agendado:', agendamento);
  };

  const entregaStats = {
    total: 1840,
    entregues: 1752,
    lidos: 1486,
    erros: 88,
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 bg-evo-cyan-100 min-h-screen">
      <MensagensHeader onNewDisparo={handleNewDisparo} />

      <Card title="">
        <RelatorioEntrega stats={entregaStats} />
      </Card>

      <Card title="Templates de Mensagens">
        <div className="mb-3 sm:mb-4">
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-zinc-300 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors border border-zinc-500 touch-manipulation cursor-pointer w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            Criar Novo Template
          </button>
        </div>
        <TemplatesList templates={templates} />
      </Card>

      <Card title="Disparos Agendados e Histórico">
        <DisparosTable disparos={disparos} />
      </Card>

      <TemplateEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        onSave={handleSaveTemplate}
      />

      <DisparoAgendador
        isOpen={showAgendador}
        onClose={() => setShowAgendador(false)}
        templates={templates}
        onAgendar={handleAgendar}
      />
    </div>
  );
}
