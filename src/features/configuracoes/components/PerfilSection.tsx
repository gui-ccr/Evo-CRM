import { User } from 'lucide-react';

export function PerfilSection() {
  return (
    <div className="p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-evo-orange flex items-center justify-center flex-shrink-0">
          <User className="text-black" size={32} />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-evo-indigo">Márcio - EVO Coaching</h2>
          <p className="text-sm sm:text-base text-evo-dark-400">Gestor Principal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-evo-dark-400 text-xs sm:text-sm mb-2">Nome Completo</label>
          <input
            type="text"
            defaultValue="Márcio - EVO Coaching"
            className="w-full px-3 sm:px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo text-sm sm:text-base focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-xs sm:text-sm mb-2">E-mail</label>
          <input
            type="email"
            defaultValue="marcio@evocoaching.com.br"
            className="w-full px-3 sm:px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo text-sm sm:text-base focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-xs sm:text-sm mb-2">Telefone</label>
          <input
            type="tel"
            defaultValue="(11) 99999-9999"
            className="w-full px-3 sm:px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo text-sm sm:text-base focus:border-evo-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-evo-dark-400 text-xs sm:text-sm mb-2">Cargo</label>
          <input
            type="text"
            defaultValue="Gestor Principal"
            className="w-full px-3 sm:px-4 py-2 bg-zinc-300/60 border border-evo-purple/20 rounded-lg text-evo-indigo text-sm sm:text-base focus:border-evo-orange focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-evo-orange text-black font-semibold rounded-lg hover:bg-evo-coral transition-colors touch-manipulation cursor-pointer text-sm sm:text-base">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
