import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { content } = useContent();
  const maxSlides = content.home?.heroSlideCount || 4;
  const products = content.products.slice(0, maxSlides); // Respect the config limit
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  if (!products || products.length === 0) return <div className="h-[50vh] bg-stone-900 flex items-center justify-center text-white">No products loaded</div>;

  const currentProduct = products[currentIndex];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-stone-900">
      {/* Background Images */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transform scale-105"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-brand-600/90 backdrop-blur text-xs uppercase tracking-widest font-bold text-white rounded-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {currentProduct.category.toUpperCase()}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
              {currentProduct.name}
            </h1>
            <p className="text-xl text-stone-200 mb-8 font-light max-w-lg leading-relaxed">
              {currentProduct.description.substring(0, 100)}... <br/>
              Diseñado para {currentProduct.applications[0]} y {currentProduct.applications[1]}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onCtaClick}
                className="px-8 py-4 bg-white text-brand-900 font-bold uppercase tracking-widest text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-2 group"
              >
                Ver Catálogo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2 px-6 py-4 border border-white/30 text-white/80 text-sm font-medium uppercase tracking-wide">
                <span className="text-brand-400 font-bold">0{currentIndex + 1}</span> / 0{products.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-3">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-300 ${
              idx === currentIndex ? 'w-12 bg-brand-500' : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};