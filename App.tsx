
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Products } from './components/Products';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { View } from './types';
import { ContentProvider, useContent } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const LegalPage: React.FC<{ type: 'privacy' | 'terms'; onBack: () => void }> = ({ type, onBack }) => {
  const { content } = useContent();
  const text = type === 'privacy' ? content.legal.privacyPolicy : content.legal.termsConditions;
  const title = type === 'privacy' ? 'Aviso de Privacidad' : 'Términos y Condiciones';

  // Simple Markdown-ish parser for display
  const renderText = (markdown: string) => {
    return markdown.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-serif font-bold text-brand-900 mb-6 mt-2">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-serif font-bold text-stone-800 mb-4 mt-6">{line.replace('## ', '')}</h2>;
      if (line.match(/^\d\./)) return <p key={i} className="mb-2 font-bold text-stone-800 mt-4">{line}</p>;
      return <p key={i} className="mb-2 text-stone-600 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="bg-white min-h-screen py-20 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-brand-600 font-bold uppercase text-xs tracking-widest mb-8 hover:underline">
          <ArrowLeft size={16} className="mr-2" /> Volver al inicio
        </button>
        <div className="prose prose-stone max-w-none">
          {renderText(text)}
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const { content } = useContent();

  // Update Browser Tab Title
  useEffect(() => {
    const titles: Record<string, string> = {
      [View.HOME]: 'Inicio',
      [View.ABOUT]: 'Nosotros',
      [View.PRODUCTS]: 'Catálogo',
      [View.GALLERY]: 'Galería',
      [View.CONTACT]: 'Contacto',
      [View.ADMIN]: 'Admin Panel',
      [View.PRIVACY]: 'Aviso de Privacidad',
      [View.TERMS]: 'Términos y Condiciones'
    };
    
    const pageTitle = titles[currentView] || 'Inicio';
    document.title = `${pageTitle} | ${content.general.companyName}`;
  }, [currentView, content.general.companyName]);

  const handleViewChange = (view: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const handleAdminClick = () => {
    if (currentUser) {
      setCurrentView(View.ADMIN);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setCurrentView(View.ADMIN);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onChangeView={handleViewChange} />;
      case View.PRODUCTS:
        return <Products onQuote={() => handleViewChange(View.CONTACT)} />;
      case View.ABOUT:
        return <About />;
      case View.GALLERY:
        return <Gallery />;
      case View.CONTACT:
        return <Contact />;
      case View.ADMIN:
        return <AdminPanel onExit={() => setCurrentView(View.HOME)} />;
      case View.PRIVACY:
        return <LegalPage type="privacy" onBack={() => handleViewChange(View.HOME)} />;
      case View.TERMS:
        return <LegalPage type="terms" onBack={() => handleViewChange(View.HOME)} />;
      default:
        return <Home onChangeView={handleViewChange} />;
    }
  };

  // Only show public navigation elements if NOT in admin view
  const isPublicView = currentView !== View.ADMIN;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col relative">
      {isPublicView && (
        <Navbar currentView={currentView} onChangeView={handleViewChange} />
      )}
      
      <main className="flex-grow animate-fade-in">
        {renderView()}
      </main>

      {isPublicView && <ChatBot />}
      {isPublicView && (
        <Footer onNav={handleViewChange} onAdminClick={handleAdminClick} />
      )}

      {/* Admin Logic */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
