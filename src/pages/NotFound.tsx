
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto py-16">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="mt-6 text-2xl font-semibold">Page not found</h2>
          <p className="mt-4 text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium rounded-full transition-all hover:bg-foreground/90"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
