
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Returns = () => {
  const { language } = useLanguage();
  
  // Content for different languages
  const getReturnsContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Devoluções e Trocas",
          subtitle: "Nossa política para garantir sua satisfação",
          timeframeTitle: "Prazo",
          timeframeText: "Aceitamos devoluções dentro de 30 dias após a compra para itens não usados em condição original com todas as etiquetas.",
          exchangeTitle: "Trocas",
          exchangeText: "As trocas por tamanho ou cor diferentes estão disponíveis sem custo adicional, sujeitas à disponibilidade.",
          refundTitle: "Reembolsos",
          refundText: "Reembolsos são processados no método de pagamento original em até 10 dias úteis após recebermos e inspecionarmos o item devolvido.",
          processTitle: "Processo de Devolução",
          processSteps: [
            "Inicie uma solicitação de devolução através da sua conta ou entre em contato com nosso serviço de atendimento ao cliente",
            "Você receberá uma etiqueta de devolução por e-mail",
            "Embale o item com cuidado na embalagem original, se possível",
            "Anexe a etiqueta de devolução e envie o pacote",
            "Após recebermos e inspecionarmos o item, processaremos seu reembolso ou troca"
          ],
          nonReturnableTitle: "Itens Não Retornáveis",
          nonReturnableText: "Produtos usados, danificados ou sem a embalagem original não são elegíveis para devolução ou troca.",
        };
      case 'es':
        return {
          title: "Devoluciones y Cambios",
          subtitle: "Nuestra política para garantizar su satisfacción",
          timeframeTitle: "Plazo",
          timeframeText: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra para artículos no utilizados en condiciones originales con todas las etiquetas.",
          exchangeTitle: "Cambios",
          exchangeText: "Los cambios por un tamaño o color diferente están disponibles sin costo adicional, sujetos a disponibilidad.",
          refundTitle: "Reembolsos",
          refundText: "Los reembolsos se procesan en el método de pago original dentro de los 10 días hábiles posteriores a la recepción e inspección del artículo devuelto.",
          processTitle: "Proceso de Devolución",
          processSteps: [
            "Inicie una solicitud de devolución a través de su cuenta o contacte a nuestro servicio de atención al cliente",
            "Recibirá una etiqueta de devolución por correo electrónico",
            "Empaque el artículo con cuidado en el embalaje original, si es posible",
            "Adjunte la etiqueta de devolución y envíe el paquete",
            "Después de recibir e inspeccionar el artículo, procesaremos su reembolso o cambio"
          ],
          nonReturnableTitle: "Artículos No Retornables",
          nonReturnableText: "Los productos usados, dañados o sin el embalaje original no son elegibles para devolución o cambio.",
        };
      default: // 'en'
        return {
          title: "Returns & Exchanges",
          subtitle: "Our policy to ensure your satisfaction",
          timeframeTitle: "Timeframe",
          timeframeText: "We accept returns within 30 days of purchase for unworn items in original condition with all tags.",
          exchangeTitle: "Exchanges",
          exchangeText: "Exchanges for different size or color are available at no extra cost, subject to availability.",
          refundTitle: "Refunds",
          refundText: "Refunds are processed to the original payment method within 10 business days after we receive and inspect the returned item.",
          processTitle: "Return Process",
          processSteps: [
            "Initiate a return request through your account or contact our customer service",
            "You'll receive a return label via email",
            "Pack the item carefully in the original packaging if possible",
            "Attach the return label and ship the package",
            "After we receive and inspect the item, we'll process your refund or exchange"
          ],
          nonReturnableTitle: "Non-Returnable Items",
          nonReturnableText: "Products that have been worn, damaged, or without original packaging are not eligible for return or exchange.",
        };
    }
  };
  
  const content = getReturnsContent();
  
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
              <h2 className="text-2xl font-semibold mb-4">{content.timeframeTitle}</h2>
              <p className="text-muted-foreground">{content.timeframeText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.exchangeTitle}</h2>
              <p className="text-muted-foreground">{content.exchangeText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.refundTitle}</h2>
              <p className="text-muted-foreground">{content.refundText}</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.processTitle}</h2>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                {content.processSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">{content.nonReturnableTitle}</h2>
              <p className="text-muted-foreground">{content.nonReturnableText}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
