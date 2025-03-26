
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { UserCircle, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  }, [isAuthenticated, navigate]);

  // Content based on language
  const getProfileContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Perfil do Usuário",
          personalInfo: "Informações Pessoais",
          accountSettings: "Configurações da Conta",
          addresses: "Endereços",
          name: "Nome",
          email: "Email",
          phone: "Telefone",
          bio: "Biografia",
          address: "Endereço",
          street: "Rua",
          city: "Cidade",
          state: "Estado",
          postalCode: "CEP",
          country: "País",
          password: "Senha",
          currentPassword: "Senha Atual",
          newPassword: "Nova Senha",
          confirmPassword: "Confirmar Senha",
          saveChanges: "Salvar Alterações",
          saving: "Salvando...",
          savedSuccess: "Alterações salvas com sucesso!",
          errorRequired: "Este campo é obrigatório",
          errorEmail: "Por favor insira um email válido",
          errorPhone: "Por favor insira um telefone válido",
          errorPassword: "A senha deve ter pelo menos 6 caracteres",
          errorPasswordMatch: "As senhas não coincidem"
        };
      case 'es':
        return {
          title: "Perfil de Usuario",
          personalInfo: "Información Personal",
          accountSettings: "Configuración de la Cuenta",
          addresses: "Direcciones",
          name: "Nombre",
          email: "Correo electrónico",
          phone: "Teléfono",
          bio: "Biografía",
          address: "Dirección",
          street: "Calle",
          city: "Ciudad",
          state: "Estado",
          postalCode: "Código Postal",
          country: "País",
          password: "Contraseña",
          currentPassword: "Contraseña Actual",
          newPassword: "Nueva Contraseña",
          confirmPassword: "Confirmar Contraseña",
          saveChanges: "Guardar Cambios",
          saving: "Guardando...",
          savedSuccess: "¡Cambios guardados con éxito!",
          errorRequired: "Este campo es obligatorio",
          errorEmail: "Por favor ingresa un correo electrónico válido",
          errorPhone: "Por favor ingresa un teléfono válido",
          errorPassword: "La contraseña debe tener al menos 6 caracteres",
          errorPasswordMatch: "Las contraseñas no coinciden"
        };
      default: // 'en'
        return {
          title: "User Profile",
          personalInfo: "Personal Information",
          accountSettings: "Account Settings",
          addresses: "Addresses",
          name: "Name",
          email: "Email",
          phone: "Phone",
          bio: "Bio",
          address: "Address",
          street: "Street",
          city: "City",
          state: "State",
          postalCode: "Postal Code",
          country: "Country",
          password: "Password",
          currentPassword: "Current Password",
          newPassword: "New Password",
          confirmPassword: "Confirm Password",
          saveChanges: "Save Changes",
          saving: "Saving...",
          savedSuccess: "Changes saved successfully!",
          errorRequired: "This field is required",
          errorEmail: "Please enter a valid email",
          errorPhone: "Please enter a valid phone number",
          errorPassword: "Password must be at least 6 characters",
          errorPasswordMatch: "Passwords don't match"
        };
    }
  };

  const content = getProfileContent();

  // Form schemas
  const personalInfoSchema = z.object({
    name: z.string().min(1, { message: content.errorRequired }),
    email: z.string().min(1, { message: content.errorRequired }).email({ message: content.errorEmail }),
    phone: z.string().optional(),
    bio: z.string().optional(),
  });

  const addressSchema = z.object({
    street: z.string().min(1, { message: content.errorRequired }),
    city: z.string().min(1, { message: content.errorRequired }),
    state: z.string().min(1, { message: content.errorRequired }),
    postalCode: z.string().min(1, { message: content.errorRequired }),
    country: z.string().min(1, { message: content.errorRequired }),
  });

  const passwordSchema = z.object({
    currentPassword: z.string().min(6, { message: content.errorPassword }),
    newPassword: z.string().min(6, { message: content.errorPassword }),
    confirmPassword: z.string().min(6, { message: content.errorPassword }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: content.errorPasswordMatch,
    path: ["confirmPassword"],
  });

  // Initialize forms
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      bio: "",
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submissions
  const onSubmitPersonalInfo = async (values: z.infer<typeof personalInfoSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    
    setIsSubmitting(false);
  };

  const onSubmitAddress = async (values: z.infer<typeof addressSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    
    setIsSubmitting(false);
  };

  const onSubmitPassword = async (values: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    
    passwordForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UserCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="personal">{content.personalInfo}</TabsTrigger>
              <TabsTrigger value="address">{content.addresses}</TabsTrigger>
              <TabsTrigger value="password">{content.password}</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>{content.personalInfo}</CardTitle>
                  <CardDescription>
                    {language === 'pt' 
                      ? 'Atualize suas informações pessoais aqui.' 
                      : language === 'es' 
                        ? 'Actualiza tu información personal aquí.' 
                        : 'Update your personal information here.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...personalInfoForm}>
                    <form onSubmit={personalInfoForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
                      <FormField
                        control={personalInfoForm.control}
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
                        control={personalInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.email}</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.phone}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={personalInfoForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.bio}</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                className="min-h-32" 
                              />
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
                            {content.saving}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Save className="mr-2 h-4 w-4" />
                            {content.saveChanges}
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>{content.addresses}</CardTitle>
                  <CardDescription>
                    {language === 'pt' 
                      ? 'Adicione ou edite seus endereços de entrega.' 
                      : language === 'es' 
                        ? 'Agrega o edita tus direcciones de entrega.' 
                        : 'Add or edit your shipping addresses.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(onSubmitAddress)} className="space-y-6">
                      <FormField
                        control={addressForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.street}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.city}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.state}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={addressForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.postalCode}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{content.country}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {content.saving}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Save className="mr-2 h-4 w-4" />
                            {content.saveChanges}
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>{content.password}</CardTitle>
                  <CardDescription>
                    {language === 'pt' 
                      ? 'Altere sua senha aqui. Depois de salvar, você será desconectado.' 
                      : language === 'es' 
                        ? 'Cambia tu contraseña aquí. Después de guardar, serás desconectado.' 
                        : 'Change your password here. After saving, you will be logged out.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.currentPassword}</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.newPassword}</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.confirmPassword}</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
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
                            {content.saving}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Save className="mr-2 h-4 w-4" />
                            {content.saveChanges}
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
