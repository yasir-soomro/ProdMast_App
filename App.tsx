import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Shared';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { AuthPage } from './components/Auth';

// Wrapper to conditionally render Navbar/Footer
const Layout: React.FC<{ children: React.ReactNode, isAuthenticated: boolean, onLogout: () => void }> = ({ children, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50 font-sans selection:bg-primary/30 selection:text-white">
      {!isAuthPage && <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      <main>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <ScrollToTop />
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<Landing />} /> {/* Reusing Landing for demo simplicity */}
          <Route path="/services" element={<Landing />} />
          <Route path="/pricing" element={<Landing />} />
          <Route path="/contact" element={<Landing />} />
          
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage type="login" onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage type="signup" onLogin={handleLogin} />} 
          />
          
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
