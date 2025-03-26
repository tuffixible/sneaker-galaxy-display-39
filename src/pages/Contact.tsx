
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Multilingual form labels and messages
  const getFormContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Entre em Contato",
          subtitle: "Ficaremos felizes em ouvir você",
          name: "Nome",
          email: "E-mail",
          subject: "Assunto",
          message: "Mensagem",
          submit: "Enviar Mensagem",
          required: "Este campo é obrigatório",
          invalidEmail: "Por favor forneça um e-mail válido",
          messageTooShort: "Sua mensagem deve ter pelo menos 20 caracteres",
          successTitle: "Mensagem Enviada!",
          successDescription: "Agradecemos seu contato. Responderemos em breve."
        };
      case 'es':
        return {
          title: "Contacto",
          subtitle: "Estaremos encantados de escucharte",
          name: "Nombre",
          email: "Correo electrónico",
          subject: "Asunto",
          message: "Mensaje",
          submit: "Enviar Mensaje",
          required: "Este campo es obligatorio",
          invalidEmail: "Por favor, proporcione un correo electrónico válido",
          messageTooShort: "Su mensaje debe tener al menos 20 caracteres",
          successTitle: "¡Mensaje Enviado!",
          successDescription: "Gracias por contactarnos. Le responderemos pronto."
        };
      default: // 'en'
        return {
          title: "Contact Us",
          subtitle: "We'd love to hear from you",
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message",
          submit: "Send Message",
          required: "This field is required",
          invalidEmail: "Please provide a valid email",
          messageTooShort: "Your message must be at least 20 characters long",
          successTitle: "Message Sent!",
          successDescription: "Thank you for contacting us. We'll respond soon."
        };
    }
  };
  
  const content = getFormContent();
  
  // Form schema with validation
  const formSchema = z.object({
    name: z.string().min(1, { message: content.required }),
    email: z.string().min(1, { message: content.required }).email({ message: content.invalidEmail }),
    subject: z.string().min(1, { message: content.required }),
    message: z.string().min(20, { message: content.messageTooShort }),
  });
  
  // Setup form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success notification
    toast({
      title: content.successTitle,
      description: content.successDescription,
    });
    
    // Reset form
    form.reset();
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="container max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">{content.title}</h1>
            <p className="text-muted-foreground">{content.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{language === 'pt' ? 'Endereço' : (language === 'es' ? 'Dirección' : 'Address')}</h3>
                <p className="text-muted-foreground">
                  1234 Sneaker Street<br />
                  Footwear District<br />
                  New York, NY 10001
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">{language === 'pt' ? 'Email' : (language === 'es' ? 'Correo' : 'Email')}</h3>
                <p className="text-muted-foreground">contact@xiblestore.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">{language === 'pt' ? 'Telefone' : (language === 'es' ? 'Teléfono' : 'Phone')}</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">{language === 'pt' ? 'Horário de Atendimento' : (language === 'es' ? 'Horario de Atención' : 'Hours')}</h3>
                <p className="text-muted-foreground">
                  {language === 'pt' 
                    ? "Segunda a Sexta: 9h às 18h" 
                    : (language === 'es' 
                      ? "Lunes a Viernes: 9am a 6pm"
                      : "Monday to Friday: 9am to 6pm")}
                  <br />
                  {language === 'pt' 
                    ? "Sábado: 10h às 15h" 
                    : (language === 'es' 
                      ? "Sábado: 10am a 3pm"
                      : "Saturday: 10am to 3pm")}
                </p>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.name}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.email}</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.subject}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.message}</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-32" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === 'pt' ? 'Enviando...' : (language === 'es' ? 'Enviando...' : 'Sending...')}
                      </span>
                    ) : content.submit}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
