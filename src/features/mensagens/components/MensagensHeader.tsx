import { Send } from 'lucide-react';

interface MensagensHeaderProps {
  onNewDisparo: () => void;
}

export function MensagensHeader({ onNewDisparo }: MensagensHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          Disparo de Mensagens
        </h1>
        <p className="text-zinc-200">
          Gerencie templates e automatize disparos de WhatsApp e E-mail
        </p>
      </div>
      <button
        onClick={onNewDisparo}
        className="flex items-center gap-2 px-6 py-3 bg-zinc-300 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors border border-zinc-600 cursor-pointer"
      >
        <Send size={20} />
        Novo Disparo
      </button>
    </div>
  );
}
