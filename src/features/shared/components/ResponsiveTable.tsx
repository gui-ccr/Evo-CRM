import type { ReactNode } from 'react';

interface ResponsiveTableProps {
  children: ReactNode;
}

export function ResponsiveTable({ children }: ResponsiveTableProps) {
  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        {children}
      </div>

      <div className="md:hidden">
        <p className="text-sm text-evo-dark-400 mb-4 p-4 bg-evo-orange/10 border border-evo-orange/20 rounded-lg">
          💡 <strong>Dica:</strong> Para melhor visualização da tabela, gire seu dispositivo para o modo paisagem ou acesse pelo desktop.
        </p>
        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
