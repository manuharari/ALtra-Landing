
import React from 'react';
import { View } from '../types';
import { useContent } from '../context/ContentContext';
import { Lock, ArrowUpRight, Facebook, Instagram, Linkedin, Twitter, Youtube, Globe } from 'lucide-react';

interface FooterProps {
  onNav: (view: View) => void;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav, onAdminClick }) => {
  const { content } = useContent();
  const { footer, navigation } = content;

  // Helper to match string to icon
  const getSocialIcon = (network: string) => {
    const n = network.toLowerCase();
    if (n.includes('facebook')) return <Facebook size={18} />;
    if (n.includes('instagram')) return <Instagram size={18} />;
    if (n.includes('linkedin')) return <Linkedin size={18} />;
    if (n.includes('twitter') || n.includes('x')) return <Twitter size={18} />;
    if (n.includes('youtube')) return <Youtube size={18} />;
    return <Globe size={18} />;
  };

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">{content.general.companyName.toUpperCase()}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{footer.columnTitles.navigation}</h4>
            <ul className="space-y-2 text-sm">
              {navigation.filter(item => item.viewId !== View.CONTACT).map(item => (
                <li key={item.viewId}>
                  <button onClick={() => onNav(item.viewId)} className="hover:text-brand-400 transition-colors text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{footer.columnTitles.legal}</h4>
            <ul className="space-y-2 text-sm">
              {footer.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNav(link.viewId)} 
                    className="hover:text-brand-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{footer.columnTitles.social}</h4>
            <div className="flex flex-wrap gap-3">
              {footer.socialLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 hover:bg-brand-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg group"
                  title={link.network}
                >
                  {getSocialIcon(link.network)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs flex justify-center items-center gap-2 relative">
          <p>&copy; {new Date().getFullYear()} {content.general.companyName} México. {footer.copyrightText}</p>
          <button 
            onClick={onAdminClick}
            className="text-stone-700 hover:text-brand-500 transition-colors p-2"
            title="Admin Login"
          >
            <Lock size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
