
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const { content } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Seleccione...',
    message: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user types
    if (name === 'email' || name === 'phone') {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', phone: '' };

    if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es obligatorio.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingrese un correo válido.';
        isValid = false;
    }

    if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es obligatorio para contactarlo.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
        setStatus('submitting');
        
        // Simulate network request
        setTimeout(() => {
            console.log('Form Data:', formData);
            setStatus('success');
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                projectType: 'Seleccione...',
                message: ''
            });
            
            // Reset status after 5 seconds to allow another submission
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    }
  };

  const inputClasses = "w-full bg-stone-900 border border-stone-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder-stone-500";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500 bg-stone-900/50";

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form Side */}
          <div className="bg-stone-50 p-8 md:p-12 rounded-sm shadow-lg border-t-4 border-brand-700">
            <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">Solicitar Cotización</h2>
            <p className="text-stone-500 mb-8 text-sm">Complete el formulario y un especialista le contactará en menos de 24 horas.</p>
            
            {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-green-800 mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-green-700 text-sm">Hemos recibido sus datos. Uno de nuestros asesores comerciales se pondrá en contacto con usted a la brevedad.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-green-700 font-bold underline text-sm hover:text-green-900"
                    >
                        Enviar otra solicitud
                    </button>
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Nombre</label>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        type="text" 
                        className={inputClasses} 
                        placeholder="Su nombre" 
                    />
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Empresa</label>
                    <input 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        type="text" 
                        className={inputClasses} 
                        placeholder="Nombre de la empresa" 
                    />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            type="email" 
                            className={`${inputClasses} ${errors.email ? errorClasses : ''}`} 
                            placeholder="correo@empresa.com" 
                        />
                        {errors.email && (
                            <p className="text-red-600 text-[10px] mt-1 font-bold flex items-center gap-1 animate-fade-in">
                                <AlertCircle size={10} /> {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                            Teléfono <span className="text-red-500">*</span>
                        </label>
                        <input 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            type="tel" 
                            className={`${inputClasses} ${errors.phone ? errorClasses : ''}`} 
                            placeholder="(55) 1234 5678" 
                        />
                         {errors.phone && (
                            <p className="text-red-600 text-[10px] mt-1 font-bold flex items-center gap-1 animate-fade-in">
                                <AlertCircle size={10} /> {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Tipo de Proyecto</label>
                    <select 
                        name="projectType" 
                        value={formData.projectType} 
                        onChange={handleChange} 
                        className={inputClasses}
                    >
                    <option className="bg-stone-800 text-white">Seleccione...</option>
                    <option className="bg-stone-800 text-white">Hospital / Clínica</option>
                    <option className="bg-stone-800 text-white">Oficina / Comercial</option>
                    <option className="bg-stone-800 text-white">Transporte / Vehicular</option>
                    <option className="bg-stone-800 text-white">Estudio TV / Cine</option>
                    <option className="bg-stone-800 text-white">Otro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Mensaje</label>
                    <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={4} 
                        className={inputClasses} 
                        placeholder="Detalles de metros cuadrados, ubicación, etc."
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-800 text-white font-bold py-4 rounded-sm hover:bg-brand-900 transition-colors tracking-widest uppercase text-sm shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> Enviando...
                        </>
                    ) : (
                        'Enviar Solicitud'
                    )}
                </button>
                </form>
            )}
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-100 p-3 rounded-full mr-4">
                    <MapPin className="text-brand-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900">Oficina Central</h4>
                    <p className="text-stone-600">{content.general.contactAddress}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-100 p-3 rounded-full mr-4">
                    <Phone className="text-brand-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900">Llámanos</h4>
                    <p className="text-stone-600">{content.general.contactPhone}</p>
                    <p className="text-stone-500 text-sm">Lunes a Viernes, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-100 p-3 rounded-full mr-4">
                    <Mail className="text-brand-700 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900">Correo</h4>
                    <p className="text-stone-600">{content.general.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-10">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-brand-500" />
                Preguntas Frecuentes
              </h3>
              <div className="space-y-4">
                <details className="group border border-stone-200 rounded-sm p-4 bg-white cursor-pointer">
                  <summary className="font-bold text-stone-800 list-none flex justify-between items-center">
                    ¿Realizan envíos a toda la República?
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-stone-600 mt-2 text-sm">Sí, contamos con logística para enviar material a cualquier estado de México.</p>
                </details>
                <details className="group border border-stone-200 rounded-sm p-4 bg-white cursor-pointer">
                  <summary className="font-bold text-stone-800 list-none flex justify-between items-center">
                    ¿Venden material sin instalación?
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-stone-600 mt-2 text-sm">Sí, aunque recomendamos nuestra instalación certificada para validar garantías extendidas.</p>
                </details>
                <details className="group border border-stone-200 rounded-sm p-4 bg-white cursor-pointer">
                  <summary className="font-bold text-stone-800 list-none flex justify-between items-center">
                    ¿Qué mantenimiento requieren los pisos?
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-stone-600 mt-2 text-sm">Nuestros pisos homogéneos y conductivos son de bajo mantenimiento, generalmente solo requieren limpieza con mopas neutras y pulido periódico.</p>
                </details>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
