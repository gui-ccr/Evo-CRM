import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-zinc-200 rounded-lg sm:rounded-xl shadow-lg border-2 border-evo-purple/20 p-4 sm:p-5 lg:p-6 ${className}`}>
      {title && (
        <h2 className='text-evo-indigo text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b-2 border-evo-purple/30 pb-2'>
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
