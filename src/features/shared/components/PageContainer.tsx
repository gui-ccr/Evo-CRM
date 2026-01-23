import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 bg-evo-cyan-100 min-h-screen">
      {children}
    </div>
  );
}
