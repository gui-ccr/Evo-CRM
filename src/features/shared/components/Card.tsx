import type { ReactNode } from 'react';
import { useLayoutTheme } from '../layout/ThemeContext';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  const theme = useLayoutTheme();

  return (
    <div
      className={`rounded-lg sm:rounded-xl shadow-card p-4 sm:p-5 lg:p-6 ${className}`}
      style={{
        backgroundColor: theme.cardBackground,
        border: `1px solid ${theme.cardBorder}`,
      }}
    >
      {title && (
        <h2
          className="text-base sm:text-lg font-bold mb-3 sm:mb-4 pb-2"
          style={{
            color: theme.cardTitleColor,
            borderBottom: `1px solid ${theme.cardBorder}`,
          }}
        >
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
