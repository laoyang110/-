import { Routes, Route } from "react-router-dom";
import { useState, ReactNode } from "react";
import { AuthContext } from '@/contexts/authContext';
import { Toaster } from "sonner";
import { useTheme } from "@/hooks/useTheme";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Recharge from "@/pages/Recharge";
import TransactionHistory from "@/pages/TransactionHistory";
import AccountManagement from "@/pages/AccountManagement";
import Promotions from "@/pages/Promotions";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 container mx-auto w-full px-4 py-6">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { theme } = useTheme();

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      <div className={`min-h-screen bg-gray-50 ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recharge" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Recharge />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <Layout>
                  <TransactionHistory />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AccountManagement />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/promotions" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Promotions />
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
