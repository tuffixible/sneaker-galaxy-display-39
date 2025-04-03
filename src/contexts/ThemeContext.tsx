
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useThemeColors } from '@/hooks/use-theme-colors';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // If not found, check user's system preference, otherwise default to 'light'
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  
  // Use the theme colors hook
  const colors = useThemeColors();
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  
  // Apply theme to the document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Apply theme colors
  useEffect(() => {
    // Definir cores CSS personalizadas
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    document.documentElement.style.setProperty('--background-color', colors.background);
    
    // Atualizar também algumas variáveis do Tailwind
    const hslValues = {
      primary: convertHexToHSL(colors.primary),
      accent: convertHexToHSL(colors.accent),
      background: convertHexToHSL(colors.background),
      secondary: convertHexToHSL(colors.secondary)
    };
    
    if (hslValues.primary) {
      document.documentElement.style.setProperty('--primary', hslValues.primary);
    }
    if (hslValues.accent) {
      document.documentElement.style.setProperty('--accent', hslValues.accent);
    }
    if (hslValues.background) {
      document.documentElement.style.setProperty('--background', hslValues.background);
    }
    if (hslValues.secondary) {
      document.documentElement.style.setProperty('--secondary', hslValues.secondary);
    }
  }, [colors]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Função auxiliar para converter hex para HSL
function convertHexToHSL(hex: string): string | null {
  // Remover o # se estiver presente
  hex = hex.replace(/^#/, '');

  // Converter de hex para RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Encontrar os valores máximo e mínimo para calcular a luminosidade
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  // Calcular a tonalidade e saturação
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h = Math.round(h * 60);
  }
  
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
