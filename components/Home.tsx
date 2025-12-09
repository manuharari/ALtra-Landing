import React from 'react';
import { Hero } from './Hero';
import { useContent } from '../context/ContentContext';
import { View } from '../types';
import { ArrowRight, Star } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  const { content } = useContent();

  // Filter products that are marked as highlighted
  const highlightedProducts = content.products.filter(p => p.highlight);
  // Fallback if no highlights are set, show first 3
  const displayedProducts = highlightedProducts.length > 0 ? highlightedProducts : content.products.slice(0, 3);

  return (
    <>
      <Hero onCtaClick={() => onChangeView(View.PRODUCTS)} />

      {/* Clients Bar */}
      <div className="bg-stone-100 border-b border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-6">Confían en Nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {content.testimonials.map((client) => (
               <div key={client.id} className="flex flex-col items-center">
                  <img src={client.logoUrl} alt={client.client} className="h-12 w-12 rounded-full mb-2 object-cover" />
                  <span className="font-serif font-bold text-stone-800">{client.client}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-900 mb-2">Destacados</h2>
              <p className="text-stone-500">Lo mejor de nuestra tecnología para sus espacios.</p>
            </div>
            <button 
                onClick={() => onChangeView(View.PRODUCTS)}
                className="hidden md:flex items-center text-brand-700 font-bold hover:text-brand-900 transition-colors"
            >
                Ver todo <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedProducts.map((prod) => (
              <div key={prod.id} className="group cursor-pointer" onClick={() => onChangeView(View.PRODUCTS)}>
                <div className="relative overflow-hidden rounded-sm mb-4 h-64">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-brand-700 transition-colors">{prod.name}</h3>
                <p className="text-stone-500 text-sm mt-2 line-clamp-2">{prod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-16">Lo que dicen nuestros clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.testimonials.map((c) => (
                    <div key={c.id} className="bg-brand-800 p-8 rounded-sm text-left relative">
                        <div className="text-brand-400 mb-4 flex"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                        <p className="italic text-brand-100 mb-6 font-light">"{c.feedback}"</p>
                        <p className="font-bold text-white font-serif">{c.client}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};