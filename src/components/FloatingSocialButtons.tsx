
import React from 'react';
import { Instagram, WhatsApp } from 'lucide-react';

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
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 animate-bounce"
        style={{ animationDuration: '2s', animationIterationCount: 1 }}
        aria-label="Chat no WhatsApp"
      >
        <WhatsApp size={24} />
      </button>
      
      <button
        onClick={handleInstagramClick}
        className="bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        aria-label="Siga no Instagram"
      >
        <Instagram size={24} />
      </button>
    </div>
  );
};

export default FloatingSocialButtons;
