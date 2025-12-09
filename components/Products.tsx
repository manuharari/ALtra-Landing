import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ProductsProps {
  onQuote: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onQuote }) => {
  const { content } = useContent();

  return (
    <div className="bg-brand-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">Catálogo Exclusivo</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-brand-950 font-bold mb-6">Nuestras Soluciones</h3>
          <p className="text-stone-600 text-lg leading-relaxed">
            Cada espacio requiere una ingeniería específica. Desde la asepsia total hasta la acústica perfecta, tenemos el piso ideal.
          </p>
        </div>

        <div className="space-y-24">
          {content.products.map((product, index) => (
            <div 
              key={product.id} 
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-brand-900 transform translate-x-4 translate-y-4 rounded-sm transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 opacity-10"></div>
                <div className="relative overflow-hidden rounded-sm shadow-2xl h-80 lg:h-[500px] w-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur px-6 py-3">
                    <p className="font-serif text-brand-900 italic font-medium">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block p-3 bg-brand-100 rounded-full mb-2">
                    <div className="w-6 h-6 bg-brand-600 rounded-full opacity-20"></div>
                </div>
                <h4 className="font-serif text-3xl md:text-4xl text-brand-900 font-bold">{product.name}</h4>
                <p className="text-stone-600 text-lg leading-relaxed border-l-4 border-brand-300 pl-4">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h5 className="font-bold text-brand-800 mb-3 uppercase text-xs tracking-wider">Características</h5>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-stone-700 text-sm">
                          <Check className="w-4 h-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-brand-800 mb-3 uppercase text-xs tracking-wider">Aplicaciones</h5>
                    <ul className="space-y-2">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start text-stone-700 text-sm">
                          <span className="w-1.5 h-1.5 bg-brand-300 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={onQuote}
                    className="bg-brand-900 text-white px-8 py-3 rounded-sm font-medium tracking-wide hover:bg-brand-800 transition-colors flex items-center gap-3"
                  >
                    Cotizar Ahora
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};