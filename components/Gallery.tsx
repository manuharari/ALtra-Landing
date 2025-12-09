import React from 'react';
import { useContent } from '../context/ContentContext';

export const Gallery: React.FC = () => {
  const { content } = useContent();
  const images = content.gallery;

  return (
    <div className="bg-brand-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-brand-900 mb-4">Galería de Proyectos</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Evidencia visual de nuestra calidad en los entornos más exigentes de México.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative group overflow-hidden rounded-sm shadow-md cursor-pointer
                ${img.size === 'tall' ? 'row-span-2' : ''} 
                ${img.size === 'wide' ? 'md:col-span-2' : ''}
              `}
            >
              <img 
                src={img.src} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium font-serif text-lg tracking-wide border-b border-brand-500 pb-1">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};