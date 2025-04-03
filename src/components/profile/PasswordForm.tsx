
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

type PasswordFormProps = {
  language: string;
};

const PasswordForm = ({ language }: PasswordFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          currentPassword: "Senha Atual",
          newPassword: "Nova Senha",
          confirmPassword: "Confirmar Senha",
          saveChanges: "Salvar Alterações",
          saving: "Salvando...",
          savedSuccess: "Alterações salvas com sucesso!",
          errorRequired: "Este campo é obrigatório",
          errorPassword: "A senha deve ter pelo menos 6 caracteres",
          errorPasswordMatch: "As senhas não coincidem"
        };
      case 'es':
        return {
          currentPassword: "Contraseña Actual",
          newPassword: "Nueva Contraseña",
          confirmPassword: "Confirmar Contraseña",
          saveChanges: "Guardar Cambios",
          saving: "Guardando...",
          savedSuccess: "¡Cambios guardados con éxito!",
          errorRequired: "Este campo es obligatorio",
          errorPassword: "La contraseña debe tener al menos 6 caracteres",
          errorPasswordMatch: "Las contraseñas no coinciden"
        };
      default: // 'en'
        return {
          currentPassword: "Current Password",
          newPassword: "New Password",
          confirmPassword: "Confirm Password",
          saveChanges: "Save Changes",
          saving: "Saving...",
          savedSuccess: "Changes saved successfully!",
          errorRequired: "This field is required",
          errorPassword: "Password must be at least 6 characters",
          errorPasswordMatch: "Passwords don't match"
        };
    }
  };

  const content = getContent();

  // Password schema with validation
  const passwordSchema = z.object({
    currentPassword: z.string().min(6, { message: content.errorPassword }),
    newPassword: z.string().min(6, { message: content.errorPassword }),
    confirmPassword: z.string().min(6, { message: content.errorPassword }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: content.errorPasswordMatch,
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    
    form.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
  );
};

export default PasswordForm;
