import { UserPlus } from 'lucide-react';

interface ClientesHeaderProps {
  onAddClient: () => void;
}

export function ClientesHeader({ onAddClient }: ClientesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          Gestão de Clientes
        </h1>
        <p className="text-zinc-200">
          Gerencie seus leads e clientes de coaching
        </p>
      </div>
      <button
        onClick={onAddClient}
        className="flex items-center gap-2 px-6 py-3 bg-zinc-300 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors border border-zinc-600 cursor-pointer"
      >
        <UserPlus size={20} />
        Adicionar Cliente
      </button>
    </div>
  );
}
