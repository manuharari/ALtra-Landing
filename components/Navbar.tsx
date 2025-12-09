import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { View } from '../types';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();

  const handleNav = (view: View) => {
    onChangeView(view);
    setIsOpen(false);
  };

  // Find the label for Contact specifically for the CTA button, default to 'Contacto'
  const contactLabel = content.navigation.find(n => n.viewId === View.CONTACT)?.label || 'Cotizar';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => handleNav(View.HOME)}
          >
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-brand-900 tracking-tight">{content.general.companyName.toUpperCase()}</span>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-600 font-semibold pl-1">{content.general.tagline}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {content.navigation.filter(item => item.viewId !== View.CONTACT).map((item) => (
              <button
                key={item.viewId}
                onClick={() => handleNav(item.viewId)}
                className={`text-sm font-medium transition-colors duration-200 uppercase tracking-wider ${
                  currentView === item.viewId
                    ? 'text-brand-700 border-b-2 border-brand-500'
                    : 'text-stone-600 hover:text-brand-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
                onClick={() => handleNav(View.CONTACT)}
                className="bg-brand-800 text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-brand-900 transition-all flex items-center gap-2"
            >
                <Phone size={16} />
                {contactLabel}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-900 hover:text-brand-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-100 absolute w-full shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {content.navigation.map((item) => (
              <button
                key={item.viewId}
                onClick={() => handleNav(item.viewId)}
                className={`block w-full text-left px-3 py-4 text-base font-medium border-l-4 ${
                  currentView === item.viewId
                    ? 'bg-brand-50 border-brand-600 text-brand-900'
                    : 'border-transparent text-stone-600 hover:bg-stone-50 hover:text-brand-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};