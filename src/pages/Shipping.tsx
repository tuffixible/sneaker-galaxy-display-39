
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Shipping = () => {
  const { language } = useLanguage();
  
  // Content for different languages
  const getShippingContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Informações de Envio",
          subtitle: "Tudo que você precisa saber sobre nossas políticas de envio",
          processingTitle: "Processamento",
          processingText: "Pedidos são processados e enviados em até 2 dias úteis após a confirmação do pagamento.",
          shippingMethodsTitle: "Métodos de Envio",
          standardShipping: "Envio Padrão (3-5 dias úteis): Gratuito para compras acima de R$250",
          expressShipping: "Envio Expresso (1-2 dias úteis): Taxa adicional de R$25",
          internationalTitle: "Envios Internacionais",
          internationalText: "Oferecemos envio internacional para vários países. Taxas e prazos variam de acordo com o destino.",
          trackingTitle: "Rastreamento",
          trackingText: "Um código de rastreamento será enviado ao seu e-mail assim que seu pedido for despachado.",
          deliveryTitle: "Entrega",
          deliveryText: "Por favor, certifique-se de que alguém estará disponível para receber a entrega no endereço fornecido.",
        };
      case 'es':
        return {
          title: "Información de Envío",
          subtitle: "Todo lo que necesitas saber sobre nuestras políticas de envío",
          processingTitle: "Procesamiento",
          processingText: "Los pedidos se procesan y envían dentro de los 2 días hábiles posteriores a la confirmación del pago.",
          shippingMethodsTitle: "Métodos de Envío",
          standardShipping: "Envío Estándar (3-5 días hábiles): Gratis para compras superiores a $250",
          expressShipping: "Envío Express (1-2 días hábiles): Cargo adicional de $25",
          internationalTitle: "Envíos Internacionales",
          internationalText: "Ofrecemos envío internacional a varios países. Las tarifas y los plazos varían según el destino.",
          trackingTitle: "Seguimiento",
          trackingText: "Se enviará un código de seguimiento a tu correo electrónico una vez que se despache tu pedido.",
          deliveryTitle: "Entrega",
          deliveryText: "Asegúrate de que alguien esté disponible para recibir la entrega en la dirección proporcionada.",
        };
      default: // 'en'
        return {
          title: "Shipping Information",
          subtitle: "Everything you need to know about our shipping policies",
          processingTitle: "Processing",
          processingText: "Orders are processed and shipped within 2 business days after payment confirmation.",
          shippingMethodsTitle: "Shipping Methods",
          standardShipping: "Standard Shipping (3-5 business days): Free for orders over $250",
          expressShipping: "Express Shipping (1-2 business days): Additional $25 fee",
          internationalTitle: "International Shipping",
          internationalText: "We offer international shipping to various countries. Rates and timeframes vary by destination.",
          trackingTitle: "Tracking",
          trackingText: "A tracking number will be emailed to you once your order has been dispatched.",
          deliveryTitle: "Delivery",
          deliveryText: "Please ensure someone is available to receive the delivery at the provided address.",
        };
    }
  };
  
  const content = getShippingContent();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="container max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">{content.title}</h1>
            <p className="text-muted-foreground">{content.subtitle}</p>
          </div>
          
          <div className="space-y-10">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.processingTitle}</h2>
              <p className="text-muted-foreground">{content.processingText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.shippingMethodsTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>{content.standardShipping}</li>
                <li>{content.expressShipping}</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.internationalTitle}</h2>
              <p className="text-muted-foreground">{content.internationalText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.trackingTitle}</h2>
              <p className="text-muted-foreground">{content.trackingText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.deliveryTitle}</h2>
              <p className="text-muted-foreground">{content.deliveryText}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
