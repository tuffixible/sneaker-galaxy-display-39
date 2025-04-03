
import React from 'react';
import { MessageCircle, Instagram, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface FloatingSocialButtonsProps {
  whatsappNumber?: string;
  instagramUser?: string;
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({
  whatsappNumber = "5511999999999",
  instagramUser = "xiblestore"
}) => {
  // Carrega as configurações das redes sociais do localStorage
  const [socialLinks, setSocialLinks] = React.useState({
    whatsapp: whatsappNumber,
    instagram: instagramUser
  });

  React.useEffect(() => {
    // Busca as configurações do localStorage
    const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    if (settings.socialLinks) {
      setSocialLinks({
        whatsapp: settings.socialLinks.whatsapp || whatsappNumber,
        instagram: settings.socialLinks.instagram || instagramUser
      });
    }

    // Escuta por atualizações nas configurações
    const handleSettingsUpdate = () => {
      const updatedSettings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
      if (updatedSettings.socialLinks) {
        setSocialLinks({
          whatsapp: updatedSettings.socialLinks.whatsapp || whatsappNumber,
          instagram: updatedSettings.socialLinks.instagram || instagramUser
        });
      }
    };

    window.addEventListener('storeSettingsUpdated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('storeSettingsUpdated', handleSettingsUpdate);
    };
  }, [whatsappNumber, instagramUser]);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${socialLinks.whatsapp}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const instagramUrl = `https://instagram.com/${socialLinks.instagram}`;
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <Button
        onClick={handleWhatsAppClick}
        variant="whatsapp"
        size="circle"
        animation="float"
        aria-label="Chat no WhatsApp"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300",
          "bg-gradient-to-r from-green-500 to-green-600",
          "hover:shadow-green-300/50 hover:shadow-xl"
        )}
      >
        <MessageCircle size={24} className="text-white animate-pulse" />
      </Button>
      
      <Button
        onClick={handleInstagramClick}
        variant="instagram"
        size="circle"
        animation="float"
        aria-label="Siga no Instagram"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300",
          "bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400",
          "hover:shadow-pink-300/50 hover:shadow-xl"
        )}
      >
        <Instagram size={24} className="text-white animate-pulse" />
      </Button>
    </div>
  );
};

export default FloatingSocialButtons;
