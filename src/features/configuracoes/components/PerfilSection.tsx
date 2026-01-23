import { User } from 'lucide-react';

export function PerfilSection() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-evo-orange flex items-center justify-center">
          <User className="text-black" size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-evo-indigo">Márcio - EVO Coaching</h2>
          <p className="text-evo-dark-400">Gestor Principal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-evo-dark-400 text-sm mb-2">Nome Completo</label>
          <input
            type="text"
            defaultValue="Márcio - EVO Coaching"
            className="w-full px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-sm mb-2">E-mail</label>
          <input
            type="email"
            defaultValue="marcio@evocoaching.com.br"
            className="w-full px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-sm mb-2">Telefone</label>
          <input
            type="tel"
            defaultValue="(11) 99999-9999"
            className="w-full px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-sm mb-2">Cargo</label>
          <input
            type="text"
            defaultValue="Gestor Principal"
            className="w-full px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo focus:border-evo-orange focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 bg-evo-orange text-black font-semibold rounded-lg hover:bg-evo-coral transition-colors">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
