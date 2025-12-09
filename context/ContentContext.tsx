import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent } from '../types';
import { INITIAL_CONTENT } from '../constants';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('altra_site_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  useEffect(() => {
    try {
        localStorage.setItem('altra_site_content', JSON.stringify(content));
    } catch (e) {
        console.error("Storage limit reached", e);
        // We notify the user via console or potentially a global error state if needed, 
        // but for now preventing the crash is the priority.
    }
    applyTheme(content.theme);
  }, [content]);

  // Inject CSS variables for dynamic coloring
  const applyTheme = (theme: SiteContent['theme']) => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand-900', theme.primaryColor);
    root.style.setProperty('--color-brand-500', theme.secondaryColor);
    root.style.setProperty('--color-brand-300', theme.accentColor);
    root.style.setProperty('--color-brand-50', theme.backgroundColor);
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const resetContent = () => {
    setContent(INITIAL_CONTENT);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};