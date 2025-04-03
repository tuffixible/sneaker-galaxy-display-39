
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-xl mx-auto py-16 px-8 bg-white rounded-2xl shadow-lg">
          <div className="mb-8 text-primary animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          </div>
          
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-6 text-3xl font-semibold text-gray-800">Página não encontrada</h2>
          <p className="mt-4 text-lg text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Voltar
            </Button>
            
            <Link to="/">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
              >
                <Home size={18} />
                Página Inicial
              </Button>
            </Link>
            
            <Link to="/catalogo">
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2"
              >
                <Search size={18} />
                Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
