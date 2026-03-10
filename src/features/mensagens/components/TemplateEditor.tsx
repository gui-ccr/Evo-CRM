import { useState } from 'react';
import { X, Plus, Eye } from 'lucide-react';
import type { TemplateType } from '../types';
import { useLayoutTheme } from '../../shared/layout/ThemeContext';

interface TemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: {
    nome: string;
    tipo: TemplateType;
    assunto?: string;
    mensagem: string;
    variaveis: string[];
  }) => void;
}

const variaveisDisponiveis = [
  { nome: 'nome', descricao: 'Nome do lead' },
  { nome: 'email', descricao: 'E-mail do lead' },
  { nome: 'cpf', descricao: 'CPF do lead' },
  { nome: 'data', descricao: 'Data específica' },
];

export function TemplateEditor({ isOpen, onClose, onSave }: TemplateEditorProps) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TemplateType>('whatsapp');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const theme = useLayoutTheme();

  if (!isOpen) return null;

  const inserirVariavel = (variavel: string) => {
    const textarea = document.getElementById('mensagem-textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = mensagem;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newText = `${before}{{${variavel}}}${after}`;
    setMensagem(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variavel.length + 4, start + variavel.length + 4);
    }, 0);
  };

  const extrairVariaveis = (texto: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...texto.matchAll(regex)];
    return [...new Set(matches.map(m => m[1]))];
  };

  const gerarPreview = () => {
    let preview = mensagem;
    extrairVariaveis(mensagem).forEach(variavel => {
      const exemplo = variavel === 'nome' ? 'João Silva' :
        variavel === 'evento' ? 'Evento SP - Novembro' :
          variavel === 'horario' ? '18h00' :
            variavel === 'link' ? 'https://evo.com.br/pagamento' :
              variavel === 'programa' ? 'Mentoria Premium' :
                variavel === 'data' ? '25/11/2025' :
                  `[${variavel}]`;
      preview = preview.replace(new RegExp(`\\{\\{${variavel}\\}\\}`, 'g'), exemplo);
    });
    return preview;
  };

  const handleSave = () => {
    const variaveis = extrairVariaveis(mensagem);
    onSave({
      nome,
      tipo,
      assunto: tipo === 'email' ? assunto : undefined,
      mensagem,
      variaveis,
    });
    setNome('');
    setAssunto('');
    setMensagem('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme.cardBackground, border: `1px solid ${theme.cardBorder}` }}>
        <div className="sticky top-0 border-b-2 p-6 flex items-center justify-between" style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
          <h2 className="text-2xl font-bold text-indigo-500">Criar Novo Template</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            style={{ color: theme.cardTitleColor }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nome do Template
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Boas-vindas WhatsApp"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tipo
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TemplateType)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700 cursor-pointer"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-mail</option>
              </select>
            </div>
          </div>

          {tipo === 'email' && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Assunto do E-mail
              </label>
              <input
                type="text"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Ex: Confirmação - Sua Mentoria EVO Coaching"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Variáveis Disponíveis
            </label>
            <div className="flex flex-wrap gap-2">
              {variaveisDisponiveis.map((variavel) => (
                <button
                  key={variavel.nome}
                  onClick={() => inserirVariavel(variavel.nome)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm cursor-pointer"
                  title={variavel.descricao}
                >
                  {`#${variavel.nome}#`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Mensagem
            </label>
            <textarea
              id="mensagem-textarea"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem aqui... Clique nas variáveis acima para inserir."
              rows={8}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-2">
              Use as variáveis acima para personalizar a mensagem
            </p>
          </div>

          {mensagem && (
            <div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-700 mb-2 cursor-pointer"
              >
                <Eye size={16} />
                {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
              </button>

              {showPreview && (
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Preview (exemplo):
                  </p>
                  <p className="text-sm text-indigo-600 whitespace-pre-wrap">
                    {gerarPreview()}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!nome || !mensagem}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Salvar Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
