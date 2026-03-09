import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { lightTheme, darkTheme, type ThemeTokens } from './layoutTheme';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'evo-crm-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) === 'dark';
      document.documentElement.setAttribute('data-theme', saved ? 'dark' : 'light');
      return saved;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: isDark ? darkTheme : lightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** Retorna o objeto de tokens do tema ativo. Use no lugar de `layoutTheme`. */
export function useLayoutTheme(): ThemeTokens {
  return useTheme().theme;
}
