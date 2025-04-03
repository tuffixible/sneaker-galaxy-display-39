
import { useState, useEffect } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const useThemeColors = () => {
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#2ecc71',
    secondary: '#f5f5f5',
    accent: '#ff4d00',
    background: '#F5F5F5'
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
        document.documentElement.style.setProperty('--primary', settings.primaryColor || colors.primary);
        document.documentElement.style.setProperty('--secondary', settings.secondaryColor || colors.secondary);
        document.documentElement.style.setProperty('--accent', settings.accentColor || colors.accent);
        document.documentElement.style.setProperty('--background', settings.backgroundColor || colors.background);
      }
    };

    loadColors();
    window.addEventListener('storeSettingsUpdated', loadColors);
    return () => window.removeEventListener('storeSettingsUpdated', loadColors);
  }, []);

  return colors;
};
