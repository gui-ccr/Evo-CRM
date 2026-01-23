import { Send } from 'lucide-react';

interface MensagensHeaderProps {
  onNewDisparo: () => void;
}

export function MensagensHeader({ onNewDisparo }: MensagensHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-100 mb-1 sm:mb-2">
          Disparo de Mensagens
        </h1>
        <p className="text-sm sm:text-base text-zinc-200">
          Gerencie templates e automatize disparos de WhatsApp e E-mail
        </p>
      </div>
      <button
        onClick={onNewDisparo}
        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-zinc-300 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors border border-zinc-600 cursor-pointer touch-manipulation whitespace-nowrap"
      >
        <Send size={18} className="sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Novo Disparo</span>
      </button>
    </div>
  );
}
