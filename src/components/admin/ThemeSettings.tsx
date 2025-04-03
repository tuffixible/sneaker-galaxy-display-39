
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, Palette, EyeIcon, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const themePresets = [
  { name: 'Azul Clássico', primary: '#3b82f6', secondary: '#eef2f7', accent: '#60a5fa', background: '#edf2f9' },
  { name: 'Verde Natureza', primary: '#16a34a', secondary: '#f0fdf4', accent: '#22c55e', background: '#f8fafc' },
  { name: 'Roxo Real', primary: '#8b5cf6', secondary: '#f5f3ff', accent: '#a855f7', background: '#faf5ff' },
  { name: 'Laranja Sunset', primary: '#f97316', secondary: '#fff7ed', accent: '#fb923c', background: '#fffbeb' },
  { name: 'Azul Oceano', primary: '#0ea5e9', secondary: '#f0f9ff', accent: '#38bdf8', background: '#ecf8ff' },
  { name: 'Rosa Suave', primary: '#ec4899', secondary: '#fdf2f8', accent: '#f472b6', background: '#fdf4ff' },
  { name: 'Cinza Elegante', primary: '#475569', secondary: '#f1f5f9', accent: '#64748b', background: '#f8fafc' },
];

const ThemeSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#eef2f7',
    accentColor: '#60a5fa',
    backgroundColor: '#edf2f9'
  });
  
  const [originalSettings, setOriginalSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#eef2f7',
    accentColor: '#60a5fa',
    backgroundColor: '#edf2f9'
  });

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    const newSettings = {
      primaryColor: storedSettings.primaryColor || '#3b82f6',
      secondaryColor: storedSettings.secondaryColor || '#eef2f7',
      accentColor: storedSettings.accentColor || '#60a5fa',
      backgroundColor: storedSettings.backgroundColor || '#edf2f9'
    };
    
    setSettings(newSettings);
    setOriginalSettings(newSettings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyPreset = (preset: typeof themePresets[0]) => {
    setSettings({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.background
    });
    
    // Apply colors immediately for preview
    previewColors({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.background
    });
  };

  const previewColors = (colors: typeof settings) => {
    document.documentElement.style.setProperty('--primary-color', colors.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', colors.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', colors.accentColor);
    document.documentElement.style.setProperty('--background-color', colors.backgroundColor);
    
    // Também aplicar como variáveis HSL para o Tailwind
    applyHSLColors(colors);
  };
  
  const applyHSLColors = (colors: typeof settings) => {
    // Função simples para converter hex para hsl
    const hexToHSL = (hex: string) => {
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
    };

    try {
      const primaryHSL = hexToHSL(colors.primaryColor);
      const secondaryHSL = hexToHSL(colors.secondaryColor);
      const accentHSL = hexToHSL(colors.accentColor);
      const backgroundHSL = hexToHSL(colors.backgroundColor);
      
      document.documentElement.style.setProperty('--primary', primaryHSL);
      document.documentElement.style.setProperty('--secondary', secondaryHSL);
      document.documentElement.style.setProperty('--accent', accentHSL);
      document.documentElement.style.setProperty('--background', backgroundHSL);
    } catch (error) {
      console.error("Erro ao aplicar cores HSL:", error);
    }
  };

  const resetToOriginal = () => {
    setSettings(originalSettings);
    previewColors(originalSettings);
    toast("Configurações de cores restauradas para os valores originais");
  };

  const saveSettings = () => {
    // Save settings to localStorage
    const storedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    const newSettings = {
      ...storedSettings,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      accentColor: settings.accentColor,
      backgroundColor: settings.backgroundColor
    };
    
    localStorage.setItem('storeSettings', JSON.stringify(newSettings));
    
    // Apply colors immediately
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    document.documentElement.style.setProperty('--background-color', settings.backgroundColor);
    
    // Aplicar variáveis HSL também
    applyHSLColors(settings);
    
    // Atualizar o original para os novos valores
    setOriginalSettings(settings);
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('storeSettingsUpdated', {
      detail: { type: 'colors' }
    }));
    
    toast.success("Configurações de tema salvas com sucesso");
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-50/80 border-b dark:bg-blue-950/30">
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <span>Configurações de Tema</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Temas Predefinidos</h3>
          <div className="flex flex-wrap gap-2">
            {themePresets.map((preset) => (
              <Button
                key={preset.name}
                size="sm"
                variant="outline"
                onClick={() => applyPreset(preset)}
                className="border-2 h-auto py-2 transition-all"
              >
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: preset.primary }}></span>
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-sm font-medium">Cor Primária</Label>
            <div className="flex gap-2">
              <Input 
                id="primaryColor" 
                name="primaryColor" 
                type="color"
                value={settings.primaryColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1 border-2 rounded-md cursor-pointer"
              />
              <Input 
                value={settings.primaryColor} 
                onChange={handleChange}
                name="primaryColor"
                className="font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">Usada para botões, links e elementos principais</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor" className="text-sm font-medium">Cor Secundária</Label>
            <div className="flex gap-2">
              <Input 
                id="secondaryColor" 
                name="secondaryColor" 
                type="color"
                value={settings.secondaryColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1 border-2 rounded-md cursor-pointer"
              />
              <Input 
                value={settings.secondaryColor} 
                onChange={handleChange}
                name="secondaryColor"
                className="font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">Usada para botões secundários e fundos</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-sm font-medium">Cor de Destaque</Label>
            <div className="flex gap-2">
              <Input 
                id="accentColor" 
                name="accentColor" 
                type="color"
                value={settings.accentColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1 border-2 rounded-md cursor-pointer"
              />
              <Input 
                value={settings.accentColor} 
                onChange={handleChange}
                name="accentColor"
                className="font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">Usada para destaques e acentos no site</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor" className="text-sm font-medium">Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input 
                id="backgroundColor" 
                name="backgroundColor" 
                type="color"
                value={settings.backgroundColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1 border-2 rounded-md cursor-pointer"
              />
              <Input 
                value={settings.backgroundColor} 
                onChange={handleChange}
                name="backgroundColor"
                className="font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">Usada para o fundo principal da página</p>
          </div>
        </div>
        
        <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => previewColors(settings)} size="sm">
              <EyeIcon className="h-4 w-4 mr-1" />
              Visualizar
            </Button>
            <Button variant="outline" onClick={resetToOriginal} size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Restaurar
            </Button>
          </div>
          <Button 
            onClick={saveSettings} 
            className="transition-all duration-300 hover:shadow-md ml-auto"
            animation="float"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg border">
          <h3 className="font-medium mb-2">Visualização</h3>
          <div className="flex flex-wrap gap-2">
            <div className="p-3 rounded-md" style={{ backgroundColor: settings.backgroundColor, color: contrastColor(settings.backgroundColor) }}>Fundo</div>
            <div className="p-3 rounded-md text-white" style={{ backgroundColor: settings.primaryColor, color: contrastColor(settings.primaryColor) }}>Primária</div>
            <div className="p-3 rounded-md" style={{ backgroundColor: settings.secondaryColor, color: contrastColor(settings.secondaryColor) }}>Secundária</div>
            <div className="p-3 rounded-md" style={{ backgroundColor: settings.accentColor, color: contrastColor(settings.accentColor) }}>Destaque</div>
          </div>
          
          <div className="mt-4 p-4 rounded-md shadow-sm" style={{ backgroundColor: settings.backgroundColor, color: contrastColor(settings.backgroundColor) }}>
            <h4 style={{ color: settings.primaryColor }}>Exemplo de Título</h4>
            <p className="mt-2 text-sm">Este é um exemplo de texto normal para verificar o contraste.</p>
            <div className="flex gap-2 mt-3 justify-center">
              <button 
                className="px-3 py-1 rounded-md text-sm" 
                style={{ backgroundColor: settings.primaryColor, color: contrastColor(settings.primaryColor) }}
              >
                Botão Primário
              </button>
              <button 
                className="px-3 py-1 rounded-md text-sm" 
                style={{ backgroundColor: settings.secondaryColor, color: contrastColor(settings.secondaryColor) }}
              >
                Botão Secundário
              </button>
              <button 
                className="px-3 py-1 rounded-md text-sm" 
                style={{ backgroundColor: settings.accentColor, color: contrastColor(settings.accentColor) }}
              >
                Botão Destaque
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Função para determinar a cor de contraste ideal (preto ou branco)
function contrastColor(hexColor: string): string {
  // Remove o # se presente
  hexColor = hexColor.replace('#', '');
  
  // Converte para RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  
  // Calcula a luminosidade perceptiva
  // https://www.w3.org/TR/WCAG20-TECHS/G18.html
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retorna preto ou branco dependendo da luminosidade
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default ThemeSettings;
