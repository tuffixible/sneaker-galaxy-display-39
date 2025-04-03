
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ThemeSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    primaryColor: '#2ecc71',
    secondaryColor: '#f5f5f5',
    accentColor: '#ff4d00',
    backgroundColor: '#F5F5F5'
  });

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    setSettings({
      primaryColor: storedSettings.primaryColor || '#2ecc71',
      secondaryColor: storedSettings.secondaryColor || '#f5f5f5',
      accentColor: storedSettings.accentColor || '#ff4d00',
      backgroundColor: storedSettings.backgroundColor || '#F5F5F5'
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
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
    document.documentElement.style.setProperty('--primary', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
    document.documentElement.style.setProperty('--accent', settings.accentColor);
    document.documentElement.style.setProperty('--background', settings.backgroundColor);
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('storeSettingsUpdated', {
      detail: { type: 'colors' }
    }));
    
    toast.success("Theme settings saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input 
                id="primaryColor" 
                name="primaryColor" 
                type="color"
                value={settings.primaryColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                value={settings.primaryColor} 
                onChange={handleChange}
                name="primaryColor"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex gap-2">
              <Input 
                id="secondaryColor" 
                name="secondaryColor" 
                type="color"
                value={settings.secondaryColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                value={settings.secondaryColor} 
                onChange={handleChange}
                name="secondaryColor"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex gap-2">
              <Input 
                id="accentColor" 
                name="accentColor" 
                type="color"
                value={settings.accentColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                value={settings.accentColor} 
                onChange={handleChange}
                name="accentColor"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input 
                id="backgroundColor" 
                name="backgroundColor" 
                type="color"
                value={settings.backgroundColor} 
                onChange={handleChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                value={settings.backgroundColor} 
                onChange={handleChange}
                name="backgroundColor"
              />
            </div>
          </div>
        </div>
        
        <Button onClick={saveSettings} className="mt-4">
          <Save className="h-4 w-4 mr-2" />
          Save Theme Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
