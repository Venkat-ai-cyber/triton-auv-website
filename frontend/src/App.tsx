import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// 15 Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { ControlPage } from './pages/ControlPage';
import { SensorsPage } from './pages/SensorsPage';
import { VisionAiPage } from './pages/VisionAiPage';
import { MissionsPage } from './pages/MissionsPage';
import { CadDesignPage } from './pages/CadDesignPage';
import { GalleryPage } from './pages/GalleryPage';
import { SponsorshipPage } from './pages/SponsorshipPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');

  // Handle URL hash for direct links and browser back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'home', 'about', 'engineering', 'technology', 'control', 
        'sensors', 'vision-ai', 'missions', 'cad-design', 'gallery', 
        'sponsorship', 'contact', 'login', 'register', 'dashboard'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'engineering':
        return <EngineeringPage onNavigate={handleNavigate} />;
      case 'technology':
        return <TechnologyPage onNavigate={handleNavigate} />;
      case 'control':
        return <ControlPage onNavigate={handleNavigate} />;
      case 'sensors':
        return <SensorsPage onNavigate={handleNavigate} />;
      case 'vision-ai':
        return <VisionAiPage onNavigate={handleNavigate} />;
      case 'missions':
        return <MissionsPage onNavigate={handleNavigate} />;
      case 'cad-design':
        return <CadDesignPage onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} />;
      case 'sponsorship':
        return <SponsorshipPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-ocean-cyan selection:text-ocean-deep">
      <div>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="animate-in fade-in duration-300">
          {renderPage()}
        </main>
      </div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
