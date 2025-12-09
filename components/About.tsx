import React from 'react';
import { Award, Clock, Users, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const About: React.FC = () => {
  const { content } = useContent();

  const getIcon = (idx: number) => {
      const icons = [<Clock className="w-8 h-8" />, <Users className="w-8 h-8" />, <Award className="w-8 h-8" />, <ShieldCheck className="w-8 h-8" />];
      return icons[idx] || icons[0];
  };

  return (
    <div className="bg-white">
      {/* Intro */}
      <div className="relative py-20 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop" alt="Architecture" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Nuestra Esencia</h2>
          <p className="max-w-2xl mx-auto text-xl text-stone-300 leading-relaxed">
            En {content.general.companyName}, no solo vendemos recubrimientos; integramos ingeniería y estética para transformar espacios críticos.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.about.stats.map((stat, idx) => (
            <div key={idx} className="bg-brand-50 p-6 rounded-sm shadow-lg text-center border-b-4 border-brand-600 hover:-translate-y-1 transition-transform">
              <div className="text-brand-700 flex justify-center mb-3">{getIcon(idx)}</div>
              <div className="text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="font-serif text-3xl font-bold text-brand-900 mb-6">Más de una década de excelencia en México</h3>
            <div className="space-y-4 text-stone-600 text-lg leading-relaxed text-justify">
              {content.about.history.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 border-2 border-brand-200 z-0 rounded-sm"></div>
             <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" 
              alt="Installation worker" 
              className="relative z-10 rounded-sm shadow-xl w-full h-[400px] object-cover filter sepia-[.15]"
             />
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-3xl font-bold text-center text-brand-900 mb-12">Nuestro Proceso de Instalación</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {content.about.steps.map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className="text-6xl font-serif text-brand-100 font-bold absolute -top-8 -left-4 select-none z-0">0{idx+1}</div>
                        <div className="relative z-10 bg-white p-6 rounded-sm shadow-sm h-full border-t-2 border-brand-500">
                            <h4 className="font-bold text-lg text-stone-900 mb-2">{step.title}</h4>
                            <p className="text-stone-600 text-sm">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};