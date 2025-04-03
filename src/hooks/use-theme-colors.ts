
import { useState, useEffect } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const useThemeColors = () => {
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#3b82f6', // Azul principal
    secondary: '#eef2f7', // Cinza azulado muito claro
    accent: '#60a5fa', // Azul mais claro para acentos
    background: '#edf2f9' // Branco gelo com leve tom azulado
  });

  useEffect(() => {
    const loadColors = () => {
      const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (settings.primaryColor || settings.secondaryColor || settings.accentColor) {
        setColors({
          primary: settings.primaryColor || colors.primary,
          secondary: settings.secondaryColor || colors.secondary,
          accent: settings.accentColor || colors.accent,
          background: settings.backgroundColor || colors.background
        });

        // Apply colors to CSS variables
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor || colors.primary);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor || colors.secondary);
        document.documentElement.style.setProperty('--accent-color', settings.accentColor || colors.accent);
        document.documentElement.style.setProperty('--background-color', settings.backgroundColor || colors.background);
      }
    };

    loadColors();
    window.addEventListener('storeSettingsUpdated', loadColors);
    return () => window.removeEventListener('storeSettingsUpdated', loadColors);
  }, []);

  return colors;
};
