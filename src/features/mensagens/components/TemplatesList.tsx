import { Edit2 } from 'lucide-react';
import { TemplateTypeIcon } from './TemplateTypeIcon';
import type { Template } from '../types';

interface TemplatesListProps {
  templates: Template[];
}

export function TemplatesList({ templates }: TemplatesListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12 text-evo-dark-400">
        <p>Nenhum template cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-zinc-300/60 border border-evo-purple/20 rounded-lg p-4 hover:border-evo-orange transition-colors"
        >
          <div className="flex items-start gap-3 mb-3">
            <TemplateTypeIcon tipo={template.tipo} />
            <div className="flex-1">
              <h3 className="font-semibold text-evo-indigo mb-1">
                {template.nome}
              </h3>
              <span className="text-xs text-evo-dark-400">
                {template.tipo === 'whatsapp' ? 'WhatsApp' : 'E-mail'}
              </span>
            </div>
            <button className="p-2 hover:bg-evo-purple/10 rounded-lg transition-colors">
              <Edit2 size={16} className="text-evo-dark-400" />
            </button>
          </div>

          {template.assunto && (
            <div className="mb-2">
              <span className="text-xs font-medium text-evo-dark-400">Assunto:</span>
              <p className="text-sm text-evo-indigo">{template.assunto}</p>
            </div>
          )}

          <div className="mb-3">
            <span className="text-xs font-medium text-evo-dark-400">Mensagem:</span>
            <p className="text-sm text-evo-dark-500 line-clamp-3">
              {template.mensagem}
            </p>
          </div>

          {template.variaveis.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {template.variaveis.map((variavel) => (
                <span
                  key={variavel}
                  className="px-2 py-0.5 bg-evo-purple/20 text-evo-purple text-xs rounded"
                >
                  {`{{${variavel}}}`}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
