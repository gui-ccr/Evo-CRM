import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Cliente } from '../types';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onSave: (cliente: Partial<Cliente>) => void;
  mode: 'add' | 'edit';
}

export function ClienteModal({ isOpen, onClose, cliente, onSave, mode }: ClienteModalProps) {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nome: '',
    email: '',
    telefone: '',
    origem: 'Website',
    status: 'lead',
    valorTotal: 0,
  });

  useEffect(() => {
    if (mode === 'edit' && cliente) {
      setFormData(cliente);
    } else if (mode === 'add') {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        origem: 'Website',
        status: 'lead',
        valorTotal: 0,
      });
    }
  }, [cliente, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof Cliente, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-evo-purple/20">
          <h2 className="text-lg sm:text-xl font-bold text-evo-indigo">
            {mode === 'add' ? 'Adicionar Novo Cliente' : 'Editar Cliente'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-lg transition-colors touch-manipulation cursor-pointer"
          >
            <X size={20} className="text-evo-dark-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-evo-dark-400 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={formData.nome || ''}
              onChange={(e) => handleChange('nome', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
              required
            />
          </div>

          {/* Email e Telefone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-evo-dark-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-evo-dark-400 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                value={formData.telefone || ''}
                onChange={(e) => handleChange('telefone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
                required
              />
            </div>
          </div>

          {/* Origem e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-evo-dark-400 mb-2">
                Origem
              </label>
              <select
                value={formData.origem || 'Website'}
                onChange={(e) => handleChange('origem', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
              >
                <option value="Website">Website</option>
                <option value="Indicação">Indicação</option>
                <option value="Redes Sociais">Redes Sociais</option>
                <option value="Telefone">Telefone</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-evo-dark-400 mb-2">
                Status
              </label>
              <select
                value={formData.status || 'lead'}
                onChange={(e) => handleChange('status', e.target.value as Cliente['status'])}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </div>

          {/* Valor Total */}
          <div>
            <label className="block text-sm font-medium text-evo-dark-400 mb-2">
              Valor Total
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.valorTotal || 0}
              onChange={(e) => handleChange('valorTotal', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-evo-purple/20 focus:border-evo-purple focus:outline-none text-evo-indigo transition-colors"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-evo-purple/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border-2 border-zinc-300 text-zinc-700 font-semibold hover:bg-zinc-100 transition-colors touch-manipulation cursor-pointer w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-evo-purple text-white font-semibold hover:bg-evo-indigo transition-colors touch-manipulation cursor-pointer w-full sm:w-auto"
            >
              {mode === 'add' ? 'Adicionar Cliente' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
