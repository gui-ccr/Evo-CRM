import { Edit2 } from 'lucide-react';
import { TemplateTypeIcon } from './TemplateTypeIcon';
import type { Template } from '../types';

interface TemplatesListProps {
  templates: Template[];
}

export function TemplatesList({ templates }: TemplatesListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-600">
        <p>Nenhum template cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-zinc-300/60 border border-zinc-600 rounded-lg p-3 sm:p-4 hover:border-evo-orange transition-colors"
        >
          <div className="flex items-start gap-2 sm:gap-3 mb-3">
            <TemplateTypeIcon tipo={template.tipo} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-indigo-500 mb-1 text-sm sm:text-base truncate">
                {template.nome}
              </h3>
              <span className="text-[10px] sm:text-xs text-zinc-600">
                {template.tipo === 'whatsapp' ? 'WhatsApp' : 'E-mail'}
              </span>
            </div>
            <button className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors touch-manipulation flex-shrink-0">
              <Edit2 size={16} className="text-zinc-600" />
            </button>
          </div>

          {template.assunto && (
            <div className="mb-2">
              <span className="text-[10px] sm:text-xs font-medium text-zinc-600">Assunto:</span>
              <p className="text-xs sm:text-sm text-indigo-500 line-clamp-1">{template.assunto}</p>
            </div>
          )}

          <div className="mb-3">
            <span className="text-[10px] sm:text-xs font-medium text-zinc-600">Mensagem:</span>
            <p className="text-xs sm:text-sm text-zinc-2000 line-clamp-3">
              {template.mensagem}
            </p>
          </div>

          {template.variaveis.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {template.variaveis.map((variavel) => (
                <span
                  key={variavel}
                  className="px-1.5 sm:px-2 py-0.5 bg-indigo-500/20 text-indigo-500 text-[10px] sm:text-xs rounded"
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
