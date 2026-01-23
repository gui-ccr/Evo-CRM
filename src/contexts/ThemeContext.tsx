// Contexto de Tema - Dark/Light Mode
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Busca o tema salvo no localStorage ou usa 'dark' como padrão
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('evo-theme');
    return (savedTheme as Theme) || 'dark';
  });

  // Atualiza o tema no localStorage e na classe do HTML
  useEffect(() => {
    localStorage.setItem('evo-theme', theme);

    // Remove ambas as classes primeiro
    document.documentElement.classList.remove('light', 'dark');
    // Adiciona a classe do tema atual
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
