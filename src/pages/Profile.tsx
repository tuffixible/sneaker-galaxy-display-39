
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import refactored components
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import AddressForm from "@/components/profile/AddressForm";
import PasswordForm from "@/components/profile/PasswordForm";
import useProfileTranslation from "@/hooks/useProfileTranslation";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const content = useProfileTranslation(language);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <ProfileHeader title={content.title} email={user?.email} />

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
                  <PersonalInfoForm user={user} language={language} />
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
                  <AddressForm language={language} />
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
                  <PasswordForm language={language} />
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
