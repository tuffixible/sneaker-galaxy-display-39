
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
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

// Schema definition
const personalInfoSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email: z.string().min(1, { message: "This field is required" }).email({ message: "Please enter a valid email" }),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type PersonalInfoFormProps = {
  user: { name?: string; email?: string } | null;
  language: string;
};

const PersonalInfoForm = ({ user, language }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          name: "Nome",
          email: "Email",
          phone: "Telefone",
          bio: "Biografia",
          saveChanges: "Salvar Alterações",
          saving: "Salvando...",
          savedSuccess: "Alterações salvas com sucesso!",
        };
      case 'es':
        return {
          name: "Nombre",
          email: "Correo electrónico",
          phone: "Teléfono",
          bio: "Biografía",
          saveChanges: "Guardar Cambios",
          saving: "Guardando...",
          savedSuccess: "¡Cambios guardados con éxito!",
        };
      default: // 'en'
        return {
          name: "Name",
          email: "Email",
          phone: "Phone",
          bio: "Bio",
          saveChanges: "Save Changes",
          saving: "Saving...",
          savedSuccess: "Changes saved successfully!",
        };
    }
  };

  const content = getContent();

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: content.savedSuccess,
      description: new Date().toLocaleString(),
    });
    
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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
          control={form.control}
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
  );
};

export default PersonalInfoForm;
