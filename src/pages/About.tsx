
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();
  
  // Content for different languages
  const getAboutContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Sobre a Xible Store",
          subtitle: "Nossa História",
          description: "A Xible Store nasceu da paixão por tênis de qualidade e design único. Fundada em 2020, nossa missão é oferecer os melhores tênis do mercado, combinando estilo, conforto e durabilidade.",
          mission: "Nossa missão é proporcionar uma experiência de compra excepcional, com produtos de alta qualidade e atendimento personalizado.",
          vision: "Ser reconhecida como a melhor loja online de tênis, oferecendo produtos exclusivos e uma experiência de compra inigualável."
        };
      case 'es':
        return {
          title: "Acerca de Xible Store",
          subtitle: "Nuestra Historia",
          description: "Xible Store nació de la pasión por zapatillas de calidad y diseño único. Fundada en 2020, nuestra misión es ofrecer las mejores zapatillas del mercado, combinando estilo, comodidad y durabilidad.",
          mission: "Nuestra misión es proporcionar una experiencia de compra excepcional, con productos de alta calidad y atención personalizada.",
          vision: "Ser reconocida como la mejor tienda online de zapatillas, ofreciendo productos exclusivos y una experiencia de compra inigualable."
        };
      default: // 'en'
        return {
          title: "About Xible Store",
          subtitle: "Our Story",
          description: "Xible Store was born from a passion for quality sneakers and unique design. Founded in 2020, our mission is to offer the best sneakers on the market, combining style, comfort, and durability.",
          mission: "Our mission is to provide an exceptional shopping experience, with high-quality products and personalized service.",
          vision: "To be recognized as the best online sneaker store, offering exclusive products and an unparalleled shopping experience."
        };
    }
  };
  
  const content = getAboutContent();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="container max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{content.subtitle}</h2>
              <p className="text-muted-foreground">{content.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">{language === 'pt' ? 'Nossa Missão' : (language === 'es' ? 'Nuestra Misión' : 'Our Mission')}</h3>
                <p className="text-muted-foreground">{content.mission}</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">{language === 'pt' ? 'Nossa Visão' : (language === 'es' ? 'Nuestra Visión' : 'Our Vision')}</h3>
                <p className="text-muted-foreground">{content.vision}</p>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <p className="italic text-lg">
                {language === 'pt' 
                  ? "Comprometidos com qualidade, estilo e satisfação do cliente." 
                  : (language === 'es' 
                    ? "Comprometidos con la calidad, el estilo y la satisfacción del cliente."
                    : "Committed to quality, style, and customer satisfaction.")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
