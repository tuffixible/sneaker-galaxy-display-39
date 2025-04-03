
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const themePresets = [
  { name: 'Default Blue', primary: '#3b82f6', secondary: '#f5f7fa', accent: '#0ea5e9', background: '#f0f5fa' },
  { name: 'Nature Green', primary: '#16a34a', secondary: '#f0fdf4', accent: '#22c55e', background: '#f8fafc' },
  { name: 'Royal Purple', primary: '#8b5cf6', secondary: '#f5f3ff', accent: '#a855f7', background: '#faf5ff' },
  { name: 'Sunset Orange', primary: '#f97316', secondary: '#fff7ed', accent: '#fb923c', background: '#fffbeb' },
  { name: 'Ocean Blue', primary: '#0ea5e9', secondary: '#f0f9ff', accent: '#38bdf8', background: '#ecf8ff' },
];

const ThemeSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#f5f7fa',
    accentColor: '#0ea5e9',
    backgroundColor: '#f0f5fa'
  });

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    setSettings({
      primaryColor: storedSettings.primaryColor || '#3b82f6',
      secondaryColor: storedSettings.secondaryColor || '#f5f7fa',
      accentColor: storedSettings.accentColor || '#0ea5e9',
      backgroundColor: storedSettings.backgroundColor || '#f0f5fa'
    });
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
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('storeSettingsUpdated', {
      detail: { type: 'colors' }
    }));
    
    toast.success("Theme settings saved successfully");
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-50/50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-blue-600" />
          <span>Theme Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Theme Presets</h3>
          <div className="flex flex-wrap gap-2">
            {themePresets.map((preset) => (
              <Button
                key={preset.name}
                size="sm"
                variant="outline"
                onClick={() => applyPreset(preset)}
                className="border-2 h-auto py-2"
              >
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: preset.primary }}></span>
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-sm font-medium">Primary Color</Label>
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
            <p className="text-xs text-muted-foreground">Used for buttons, links, and key UI elements</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor" className="text-sm font-medium">Secondary Color</Label>
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
            <p className="text-xs text-muted-foreground">Used for secondary buttons and backgrounds</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-sm font-medium">Accent Color</Label>
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
            <p className="text-xs text-muted-foreground">Used for highlights and accents throughout the site</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor" className="text-sm font-medium">Background Color</Label>
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
            <p className="text-xs text-muted-foreground">Used for the main page background</p>
          </div>
        </div>
        
        <div className="pt-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => previewColors(settings)}>Preview</Button>
          <Button 
            onClick={saveSettings} 
            className="transition-all duration-300 hover:shadow-md"
            animation="float"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Theme Settings
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg border">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="flex flex-wrap gap-2">
            <div className="p-3 rounded-md" style={{ backgroundColor: settings.backgroundColor }}>Background</div>
            <div className="p-3 rounded-md text-white" style={{ backgroundColor: settings.primaryColor }}>Primary</div>
            <div className="p-3 rounded-md" style={{ backgroundColor: settings.secondaryColor }}>Secondary</div>
            <div className="p-3 rounded-md text-white" style={{ backgroundColor: settings.accentColor }}>Accent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
