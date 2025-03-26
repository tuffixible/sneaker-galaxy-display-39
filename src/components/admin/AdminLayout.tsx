
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from './AdminSidebar';
import { Loader2 } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // If auth is loaded and user is not authenticated or not admin, redirect to login
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login', { state: { from: { pathname: '/admin' } } });
      } else if (!isAdmin) {
        navigate('/'); // Redirect to home if not admin
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);
  
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">
            {t ? (t('loading') || 'Loading...') : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-8 pt-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
