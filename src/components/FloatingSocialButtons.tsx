
import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingSocialButtonsProps {
  whatsappNumber?: string;
  instagramUser?: string;
}

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({
  whatsappNumber = "5511999999999", // Formato: código do país + DDD + número
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
        animation="bounce"
        aria-label="Chat no WhatsApp"
      >
        <MessageCircle size={24} />
      </Button>
      
      <Button
        onClick={handleInstagramClick}
        variant="instagram"
        size="circle"
        animation="scale"
        aria-label="Siga no Instagram"
      >
        <Instagram size={24} />
      </Button>
    </div>
  );
};

export default FloatingSocialButtons;
