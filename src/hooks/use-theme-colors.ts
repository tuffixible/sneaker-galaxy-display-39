
import { useState, useEffect } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const useThemeColors = () => {
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#3b82f6', // Updated to a nicer blue
    secondary: '#f5f7fa', // Updated to a slightly blue-white
    accent: '#0ea5e9', // Updated to a lighter blue
    background: '#f0f5fa' // Updated to an off-white with blue tint
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
