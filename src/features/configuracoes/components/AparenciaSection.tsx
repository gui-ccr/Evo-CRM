import { Palette } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

export function AparenciaSection() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-4 sm:p-5 lg:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Palette className="text-evo-orange flex-shrink-0" size={20} />
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-evo-indigo">Aparência</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-evo-dark-400 text-xs sm:text-sm mb-3">Tema do Dashboard</label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition-colors touch-manipulation ${
                theme === 'dark'
                  ? 'border-evo-orange bg-zinc-300/60'
                  : 'border-evo-purple/20 bg-zinc-300/60 hover:border-evo-purple/30 active:bg-zinc-300'
              }`}
            >
              <div className="w-full h-16 sm:h-20 bg-evo-indigo rounded mb-2"></div>
              <p className="text-evo-indigo font-medium text-sm sm:text-base">Dark Mode</p>
              <p className="text-evo-dark-400 text-xs sm:text-sm">
                {theme === 'dark' ? 'Tema atual' : 'Clique para ativar'}
              </p>
            </button>

            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition-colors touch-manipulation ${
                theme === 'light'
                  ? 'border-evo-orange bg-zinc-300/60'
                  : 'border-evo-purple/20 bg-zinc-300/60 hover:border-evo-purple/30 active:bg-zinc-300'
              }`}
            >
              <div className="w-full h-16 sm:h-20 bg-zinc-200 rounded mb-2 border border-evo-purple/20"></div>
              <p className="text-evo-indigo font-medium text-sm sm:text-base">Light Mode</p>
              <p className="text-evo-dark-400 text-xs sm:text-sm">
                {theme === 'light' ? 'Tema atual' : 'Clique para ativar'}
              </p>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-evo-orange/10 border border-evo-orange/20 rounded-lg">
          <p className="text-evo-orange text-xs sm:text-sm">
            <strong>Cores EVO Coaching:</strong> Laranja (#FF6B35), Azul (#4ECDC4), Coral (#FF8B6A)
          </p>
        </div>
      </div>
    </div>
  );
}
