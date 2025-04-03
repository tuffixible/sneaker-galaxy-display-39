
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FAQ = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Content for different languages
  const getFAQContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Perguntas Frequentes",
          subtitle: "Encontre respostas para as perguntas mais comuns",
          searchPlaceholder: "Pesquisar perguntas...",
          categories: {
            orders: "Pedidos e Envio",
            returns: "Devoluções e Reembolsos",
            products: "Produtos e Tamanhos",
            account: "Conta e Pagamentos"
          },
          faqs: [
            {
              category: "orders",
              question: "Quanto tempo leva para processar meu pedido?",
              answer: "Os pedidos geralmente são processados dentro de 1-2 dias úteis após a confirmação do pagamento."
            },
            {
              category: "orders",
              question: "Como posso rastrear meu pedido?",
              answer: "Assim que seu pedido for enviado, você receberá um email com o código de rastreamento e instruções sobre como acompanhar a entrega."
            },
            {
              category: "orders",
              question: "Vocês enviam internacionalmente?",
              answer: "Sim, enviamos para diversos países. As taxas de envio e prazos variam de acordo com o destino."
            },
            {
              category: "orders",
              question: "Posso alterar ou cancelar meu pedido após a compra?",
              answer: "Você pode alterar ou cancelar seu pedido dentro de 2 horas após a compra. Após esse período, seu pedido já pode estar em processamento."
            },
            {
              category: "returns",
              question: "Qual é a política de devolução?",
              answer: "Aceitamos devoluções de produtos não usados com todas as etiquetas originais dentro de 30 dias após a compra."
            },
            {
              category: "returns",
              question: "Como faço para devolver um produto?",
              answer: "Para iniciar uma devolução, acesse sua conta, encontre o pedido e selecione 'Iniciar Devolução'. Você receberá instruções detalhadas por email."
            },
            {
              category: "returns",
              question: "Quanto tempo leva para processar um reembolso?",
              answer: "Os reembolsos são processados dentro de 7-10 dias úteis após recebermos e inspecionarmos o produto devolvido."
            },
            {
              category: "products",
              question: "Como saber qual tamanho escolher?",
              answer: "Consulte nosso guia de tamanhos detalhado para encontrar o ajuste perfeito. Em geral, recomendamos escolher o mesmo tamanho que você usa em outros tênis esportivos."
            },
            {
              category: "products",
              question: "Os produtos são autênticos?",
              answer: "Sim, todos os nossos produtos são 100% autênticos e originais. Trabalhamos diretamente com as marcas ou distribuidores autorizados."
            },
            {
              category: "account",
              question: "Como criar uma conta?",
              answer: "Você pode criar uma conta clicando no ícone de usuário no topo da página e selecionando 'Criar Conta'. O processo leva apenas alguns minutos."
            },
            {
              category: "account",
              question: "Quais métodos de pagamento vocês aceitam?",
              answer: "Aceitamos cartões de crédito (Visa, Mastercard, American Express), PayPal, e transferências bancárias em alguns casos."
            }
          ],
          noResults: "Nenhum resultado encontrado. Tente outra pesquisa ou entre em contato conosco para ajuda.",
          moreQuestions: "Mais perguntas? Entre em contato conosco",
          contactLink: "Vá para a página de contato"
        };
      case 'es':
        return {
          title: "Preguntas Frecuentes",
          subtitle: "Encuentra respuestas a las preguntas más comunes",
          searchPlaceholder: "Buscar preguntas...",
          categories: {
            orders: "Pedidos y Envíos",
            returns: "Devoluciones y Reembolsos",
            products: "Productos y Tallas",
            account: "Cuenta y Pagos"
          },
          faqs: [
            {
              category: "orders",
              question: "¿Cuánto tiempo tarda en procesarse mi pedido?",
              answer: "Los pedidos generalmente se procesan dentro de 1-2 días hábiles después de la confirmación del pago."
            },
            {
              category: "orders",
              question: "¿Cómo puedo rastrear mi pedido?",
              answer: "Tan pronto como se envíe su pedido, recibirá un correo electrónico con el código de seguimiento e instrucciones sobre cómo seguir la entrega."
            },
            {
              category: "orders",
              question: "¿Envían internacionalmente?",
              answer: "Sí, enviamos a varios países. Las tarifas de envío y los plazos varían según el destino."
            },
            {
              category: "orders",
              question: "¿Puedo cambiar o cancelar mi pedido después de la compra?",
              answer: "Puede cambiar o cancelar su pedido dentro de las 2 horas posteriores a la compra. Después de este período, su pedido ya puede estar en proceso."
            },
            {
              category: "returns",
              question: "¿Cuál es la política de devolución?",
              answer: "Aceptamos devoluciones de productos no usados con todas las etiquetas originales dentro de los 30 días posteriores a la compra."
            },
            {
              category: "returns",
              question: "¿Cómo devuelvo un producto?",
              answer: "Para iniciar una devolución, acceda a su cuenta, encuentre el pedido y seleccione 'Iniciar Devolución'. Recibirá instrucciones detalladas por correo electrónico."
            },
            {
              category: "returns",
              question: "¿Cuánto tiempo tarda en procesarse un reembolso?",
              answer: "Los reembolsos se procesan dentro de los 7-10 días hábiles posteriores a la recepción e inspección del producto devuelto."
            },
            {
              category: "products",
              question: "¿Cómo sé qué talla elegir?",
              answer: "Consulte nuestra guía de tallas detallada para encontrar el ajuste perfecto. En general, recomendamos elegir la misma talla que usa en otras zapatillas deportivas."
            },
            {
              category: "products",
              question: "¿Los productos son auténticos?",
              answer: "Sí, todos nuestros productos son 100% auténticos y originales. Trabajamos directamente con las marcas o distribuidores autorizados."
            },
            {
              category: "account",
              question: "¿Cómo creo una cuenta?",
              answer: "Puede crear una cuenta haciendo clic en el icono de usuario en la parte superior de la página y seleccionando 'Crear Cuenta'. El proceso solo toma unos minutos."
            },
            {
              category: "account",
              question: "¿Qué métodos de pago aceptan?",
              answer: "Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), PayPal y transferencias bancarias en algunos casos."
            }
          ],
          noResults: "No se encontraron resultados. Intente con otra búsqueda o contáctenos para obtener ayuda.",
          moreQuestions: "¿Más preguntas? Contáctenos",
          contactLink: "Ir a la página de contacto"
        };
      default: // 'en'
        return {
          title: "Frequently Asked Questions",
          subtitle: "Find answers to the most common questions",
          searchPlaceholder: "Search questions...",
          categories: {
            orders: "Orders & Shipping",
            returns: "Returns & Refunds",
            products: "Products & Sizing",
            account: "Account & Payments"
          },
          faqs: [
            {
              category: "orders",
              question: "How long does it take to process my order?",
              answer: "Orders are typically processed within 1-2 business days after payment confirmation."
            },
            {
              category: "orders",
              question: "How can I track my order?",
              answer: "Once your order ships, you'll receive an email with tracking information and instructions on how to follow your delivery."
            },
            {
              category: "orders",
              question: "Do you ship internationally?",
              answer: "Yes, we ship to many countries worldwide. Shipping rates and timeframes vary by destination."
            },
            {
              category: "orders",
              question: "Can I change or cancel my order after purchase?",
              answer: "You can change or cancel your order within 2 hours of purchase. After this period, your order may already be processing."
            },
            {
              category: "returns",
              question: "What is the return policy?",
              answer: "We accept returns of unworn items with all original tags within 30 days of purchase."
            },
            {
              category: "returns",
              question: "How do I return a product?",
              answer: "To initiate a return, log into your account, find the order and select 'Start Return'. You'll receive detailed instructions via email."
            },
            {
              category: "returns",
              question: "How long does it take to process a refund?",
              answer: "Refunds are processed within 7-10 business days after we receive and inspect the returned product."
            },
            {
              category: "products",
              question: "How do I know what size to choose?",
              answer: "Please refer to our detailed size guide to find your perfect fit. In general, we recommend selecting the same size you wear in other athletic sneakers."
            },
            {
              category: "products",
              question: "Are the products authentic?",
              answer: "Yes, all our products are 100% authentic and original. We work directly with brands or authorized distributors."
            },
            {
              category: "account",
              question: "How do I create an account?",
              answer: "You can create an account by clicking the user icon at the top of the page and selecting 'Create Account'. The process takes just a few minutes."
            },
            {
              category: "account",
              question: "What payment methods do you accept?",
              answer: "We accept credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers in some cases."
            }
          ],
          noResults: "No results found. Try another search or contact us for help.",
          moreQuestions: "More questions? Get in touch",
          contactLink: "Go to contact page"
        };
    }
  };
  
  const content = getFAQContent();
  
  // Filter FAQs based on search query
  const filteredFAQs = content.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group FAQs by category
  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof content.faqs>);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="container max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">{content.title}</h1>
            <p className="text-muted-foreground mb-8">{content.subtitle}</p>
            
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={content.searchPlaceholder}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-10">
            {Object.keys(groupedFAQs).length > 0 ? (
              Object.entries(groupedFAQs).map(([category, faqs]) => (
                <div key={category} className="bg-card p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">{content.categories[category as keyof typeof content.categories]}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${category}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="py-2 text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">{content.noResults}</p>
              </div>
            )}
            
            <div className="bg-secondary/30 p-8 rounded-lg text-center">
              <p className="text-lg mb-4">{content.moreQuestions}</p>
              <a 
                href="/contact" 
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {content.contactLink}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
