
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { EditModeProvider } from './contexts/EditModeContext';
import { routes } from './routes';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <EditModeProvider>
                <Router>
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                      >
                        {route.children &&
                          route.children.map((child, childIndex) => (
                            <Route
                              key={childIndex}
                              path={child.path}
                              element={child.element}
                            />
                          ))}
                      </Route>
                    ))}
                  </Routes>
                </Router>
                <Toaster />
              </EditModeProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
