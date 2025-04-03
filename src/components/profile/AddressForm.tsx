
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

// Schema definition
const addressSchema = z.object({
  street: z.string().min(1, { message: "This field is required" }),
  city: z.string().min(1, { message: "This field is required" }),
  state: z.string().min(1, { message: "This field is required" }),
  postalCode: z.string().min(1, { message: "This field is required" }),
  country: z.string().min(1, { message: "This field is required" }),
});

type AddressFormProps = {
  language: string;
};

const AddressForm = ({ language }: AddressFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Content based on language
  const getContent = () => {
    switch(language) {
      case 'pt':
        return {
          street: "Rua",
          city: "Cidade",
          state: "Estado",
          postalCode: "CEP",
          country: "País",
          saveChanges: "Salvar Alterações",
          saving: "Salvando...",
          savedSuccess: "Alterações salvas com sucesso!",
        };
      case 'es':
        return {
          street: "Calle",
          city: "Ciudad",
          state: "Estado",
          postalCode: "Código Postal",
          country: "País",
          saveChanges: "Guardar Cambios",
          saving: "Guardando...",
          savedSuccess: "¡Cambios guardados con éxito!",
        };
      default: // 'en'
        return {
          street: "Street",
          city: "City",
          state: "State",
          postalCode: "Postal Code",
          country: "Country",
          saveChanges: "Save Changes",
          saving: "Saving...",
          savedSuccess: "Changes saved successfully!",
        };
    }
  };

  const content = getContent();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
  );
};

export default AddressForm;
