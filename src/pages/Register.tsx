
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Content for different languages
  const getRegisterContent = () => {
    switch(language) {
      case 'pt':
        return {
          title: "Criar uma conta",
          nameLabel: "Nome",
          namePlaceholder: "Digite seu nome completo",
          emailLabel: "Email",
          emailPlaceholder: "Digite seu email",
          passwordLabel: "Senha",
          passwordPlaceholder: "Crie uma senha",
          confirmPasswordLabel: "Confirmar senha",
          confirmPasswordPlaceholder: "Digite a senha novamente",
          registerButton: "Cadastrar",
          loginPrompt: "Já tem uma conta?",
          loginLink: "Entrar",
          errorRequired: "Este campo é obrigatório",
          errorEmail: "Por favor insira um email válido",
          errorPassword: "A senha deve ter pelo menos 6 caracteres",
          errorPasswordMatch: "As senhas não coincidem",
          errorNameTooShort: "O nome deve ter pelo menos 3 caracteres",
          registering: "Cadastrando...",
          showPassword: "Mostrar senha",
          hidePassword: "Ocultar senha"
        };
      case 'es':
        return {
          title: "Crear una cuenta",
          nameLabel: "Nombre",
          namePlaceholder: "Ingresa tu nombre completo",
          emailLabel: "Correo electrónico",
          emailPlaceholder: "Ingresa tu correo electrónico",
          passwordLabel: "Contraseña",
          passwordPlaceholder: "Crea una contraseña",
          confirmPasswordLabel: "Confirmar contraseña",
          confirmPasswordPlaceholder: "Ingresa la contraseña nuevamente",
          registerButton: "Registrarse",
          loginPrompt: "¿Ya tienes una cuenta?",
          loginLink: "Iniciar sesión",
          errorRequired: "Este campo es obligatorio",
          errorEmail: "Por favor ingresa un correo electrónico válido",
          errorPassword: "La contraseña debe tener al menos 6 caracteres",
          errorPasswordMatch: "Las contraseñas no coinciden",
          errorNameTooShort: "El nombre debe tener al menos 3 caracteres",
          registering: "Registrando...",
          showPassword: "Mostrar contraseña",
          hidePassword: "Ocultar contraseña"
        };
      default: // 'en'
        return {
          title: "Create an account",
          nameLabel: "Name",
          namePlaceholder: "Enter your full name",
          emailLabel: "Email",
          emailPlaceholder: "Enter your email",
          passwordLabel: "Password",
          passwordPlaceholder: "Create a password",
          confirmPasswordLabel: "Confirm password",
          confirmPasswordPlaceholder: "Enter the password again",
          registerButton: "Register",
          loginPrompt: "Already have an account?",
          loginLink: "Log in",
          errorRequired: "This field is required",
          errorEmail: "Please enter a valid email",
          errorPassword: "Password must be at least 6 characters",
          errorPasswordMatch: "Passwords do not match",
          errorNameTooShort: "Name must be at least 3 characters",
          registering: "Registering...",
          showPassword: "Show password",
          hidePassword: "Hide password"
        };
    }
  };
  
  const content = getRegisterContent();
  
  // Create form schema with validation
  const formSchema = z.object({
    name: z.string().min(3, { message: content.errorNameTooShort }),
    email: z.string().min(1, { message: content.errorRequired }).email({ message: content.errorEmail }),
    password: z.string().min(6, { message: content.errorPassword }),
    confirmPassword: z.string().min(1, { message: content.errorRequired }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: content.errorPasswordMatch,
    path: ["confirmPassword"],
  });
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const success = await register(values.email, values.password, values.name);
    
    if (success) {
      // Redirect to home page after successful registration
      navigate('/');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-sm mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{content.title}</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.nameLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={content.namePlaceholder}
                        {...field}
                      />
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
                    <FormLabel>{content.emailLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={content.emailPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.passwordLabel}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={content.passwordPlaceholder}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" aria-label={content.hidePassword} />
                          ) : (
                            <Eye className="h-5 w-5" aria-label={content.showPassword} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.confirmPasswordLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={content.confirmPasswordPlaceholder}
                        {...field}
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
                    {content.registering}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {content.registerButton}
                  </span>
                )}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-4">
            <p>
              {content.loginPrompt}{" "}
              <Link to="/login" className="text-primary hover:underline">
                {content.loginLink}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
