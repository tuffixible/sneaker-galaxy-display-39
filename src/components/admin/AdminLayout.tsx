
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from './AdminSidebar';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, logout, user, loading } = useAuth();
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
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
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
        <header className="border-b border-border p-4 bg-card flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">{t ? t('adminDashboard') : 'Admin Dashboard'}</h1>
              <p className="text-sm text-muted-foreground">
                {t ? t('loggedInAs') : 'Logged in as'}: {user?.name} ({user?.email})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/site-config">
                <Settings className="h-4 w-4 mr-2" />
                {t ? t('siteSettings') : 'Site Settings'}
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              {t ? t('logout') : 'Logout'}
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 pt-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
