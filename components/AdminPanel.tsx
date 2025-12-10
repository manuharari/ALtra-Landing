
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { LogOut, Save, RefreshCw, Palette, Type, Image as ImageIcon, Layout, Plus, Trash, Grid, Monitor, Download, CheckCircle, Loader2, Users, Upload, MessageSquareQuote, ListOrdered, Star, PanelTop, Globe } from 'lucide-react';
import { ProductData, Testimonial } from '../types';

export const AdminPanel: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { content, updateContent, resetContent } = useContent();
  const { currentUser, users, addUser, deleteUser, changePassword, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'general' | 'layout' | 'theme' | 'products' | 'about' | 'gallery' | 'users' | 'testimonials'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // User Management State
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [changePassUser, setChangePassUser] = useState('');
  const [changePassValue, setChangePassValue] = useState('');

  // Helper to update specific fields safely
  const updateField = (path: string, value: any) => {
    const newContent = JSON.parse(JSON.stringify(content));
    const keys = path.split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    updateContent(newContent);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate a network request or "Push" action
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "altra-pisos-config.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // --- Actions ---
  const addProduct = () => {
    const newProd: ProductData = {
      id: `new-${Date.now()}`,
      name: 'Nuevo Producto',
      description: 'Descripción del producto...',
      features: ['Característica 1', 'Característica 2'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
      category: 'heterogeneo',
      applications: ['Uso 1', 'Uso 2'],
      highlight: false
    };
    const newProducts = [...content.products, newProd];
    updateField('products', newProducts);
  };

  const removeProduct = (idx: number) => {
    if(confirm('¿Seguro que desea eliminar este producto?')) {
        const newProducts = [...content.products];
        newProducts.splice(idx, 1);
        updateField('products', newProducts);
    }
  };

  const addTestimonial = () => {
      const newTesti: Testimonial = {
          id: Date.now(),
          client: 'Nuevo Cliente',
          feedback: 'Opinión del cliente...',
          logoUrl: 'https://ui-avatars.com/api/?name=NC&background=random&color=fff'
      };
      const newTestis = [...content.testimonials, newTesti];
      updateField('testimonials', newTestis);
  };

  const removeTestimonial = (idx: number) => {
    if(confirm('¿Eliminar este testimonio?')) {
        const newTestis = [...content.testimonials];
        newTestis.splice(idx, 1);
        updateField('testimonials', newTestis);
    }
  };

  const addGalleryImage = () => {
      const newContent = JSON.parse(JSON.stringify(content));
      newContent.gallery.unshift({
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
          label: "Nuevo Proyecto",
          size: "small"
      });
      updateContent(newContent);
  };

  const removeGalleryImage = (index: number) => {
      if(confirm('¿Eliminar imagen de galería?')) {
        const newContent = JSON.parse(JSON.stringify(content));
        newContent.gallery.splice(index, 1);
        updateContent(newContent);
      }
  };

  const addHistory = () => {
      const newHist = [...content.about.history, "Nuevo párrafo sobre la historia de la empresa."];
      updateField('about.history', newHist);
  };
  const removeHistory = (idx: number) => {
      if(confirm('¿Eliminar párrafo?')) {
          const newHist = [...content.about.history];
          newHist.splice(idx, 1);
          updateField('about.history', newHist);
      }
  };

  const addStat = () => {
      const newStats = [...content.about.stats, { label: "Etiqueta", value: "0" }];
      updateField('about.stats', newStats);
  };
  const removeStat = (idx: number) => {
      if(confirm('¿Eliminar dato estadístico?')) {
        const newStats = [...content.about.stats];
        newStats.splice(idx, 1);
        updateField('about.stats', newStats);
      }
  };

  const addStep = () => {
      const newSteps = [...content.about.steps, { title: "Nuevo Paso", desc: "Descripción del proceso." }];
      updateField('about.steps', newSteps);
  };
  const removeStep = (idx: number) => {
      if(confirm('¿Eliminar paso del proceso?')) {
        const newSteps = [...content.about.steps];
        newSteps.splice(idx, 1);
        updateField('about.steps', newSteps);
      }
  };

  const addLegalLink = () => {
      const newLinks = [...content.footer.legalLinks, { label: "Nuevo Enlace", viewId: 'privacy' }];
      updateField('footer.legalLinks', newLinks);
  };
  const removeLegalLink = (idx: number) => {
      const newLinks = [...content.footer.legalLinks];
      newLinks.splice(idx, 1);
      updateField('footer.legalLinks', newLinks);
  };

  const addSocialLink = () => {
      const newLinks = [...content.footer.socialLinks, { network: "Red Social", url: "https://" }];
      updateField('footer.socialLinks', newLinks);
  };
  const removeSocialLink = (idx: number) => {
      const newLinks = [...content.footer.socialLinks];
      newLinks.splice(idx, 1);
      updateField('footer.socialLinks', newLinks);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if(newUser && newPass) {
      const success = addUser({ username: newUser, password: newPass, role: 'editor' });
      if(success) {
        setNewUser('');
        setNewPass('');
        alert('Usuario creado correctamente');
      } else {
        alert('El usuario ya existe');
      }
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if(changePassValue) {
        const targetUser = changePassUser || currentUser?.username;
        if (targetUser) {
            changePassword(targetUser, changePassValue);
            setChangePassValue('');
            alert('Contraseña actualizada');
        }
    }
  };

  const handleLogout = () => {
      logout();
      onExit();
  };

  return (
    <div className="min-h-screen flex bg-stone-100 font-sans text-stone-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-stone-900 text-white flex-col flex-shrink-0 hidden md:flex shadow-xl z-20">
        <div className="p-6 border-b border-stone-800">
            <h1 className="font-serif text-2xl font-bold tracking-wide text-brand-500">Altra Admin</h1>
            <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'master' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <p className="text-stone-400 text-xs">Hola, <span className="text-white font-bold">{currentUser?.username}</span></p>
            </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <SidebarTab active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<Layout size={18} />} label="General & Legal" />
            <SidebarTab active={activeTab === 'layout'} onClick={() => setActiveTab('layout')} icon={<PanelTop size={18} />} label="Menú y Pie" />
            <SidebarTab active={activeTab === 'theme'} onClick={() => setActiveTab('theme')} icon={<Palette size={18} />} label="Tema y Colores" />
            <SidebarTab active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<ImageIcon size={18} />} label="Catálogo" />
            <SidebarTab active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} icon={<MessageSquareQuote size={18} />} label="Clientes" />
            <SidebarTab active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<Grid size={18} />} label="Galería" />
            <SidebarTab active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<Type size={18} />} label="Nosotros" />
            <SidebarTab active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={18} />} label="Usuarios" />
        </nav>

        <div className="p-4 border-t border-stone-800 space-y-2">
            <button 
                onClick={resetContent} 
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors"
            >
                <RefreshCw size={18} />
                Restaurar Default
            </button>
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
            >
                <LogOut size={18} />
                Cerrar Sesión
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-stone-50 relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-stone-900 text-white p-4 flex justify-between items-center shrink-0">
             <span className="font-serif font-bold">Altra Admin</span>
             <button onClick={handleLogout}><LogOut size={20} /></button>
        </div>

        {/* Top Toolbar */}
        <header className="bg-white border-b border-stone-200 h-20 flex items-center justify-between px-8 shadow-sm shrink-0 z-10">
            <h2 className="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
                <span className="text-brand-600 uppercase text-xs tracking-widest font-sans bg-brand-50 px-2 py-1 rounded">Editando</span>
                {activeTab === 'testimonials' ? 'Clientes y Testimonios' : 
                 activeTab === 'layout' ? 'Menú y Pie de Página' : 
                 activeTab === 'users' ? 'Gestión de Usuarios' : 
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            
            <div className="flex items-center gap-3">
                 <button 
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2.5 text-stone-600 hover:text-brand-900 hover:bg-brand-50 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors border border-transparent hover:border-brand-200"
                    title="Descargar archivo JSON de configuración"
                 >
                    <Download size={18} />
                    <span className="hidden lg:inline">Exportar Respaldo</span>
                 </button>

                 <div className="h-8 w-px bg-stone-200 mx-1"></div>

                 <button 
                    onClick={onExit}
                    className="flex items-center gap-2 px-4 py-2.5 text-stone-600 hover:text-brand-900 hover:bg-brand-50 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors"
                 >
                    <Monitor size={18} />
                    <span className="hidden lg:inline">Ver Sitio</span>
                 </button>

                 <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-900 text-white rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-brand-800 transition-all shadow-md disabled:opacity-70 disabled:cursor-wait min-w-[180px] justify-center"
                 >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
                 </button>
            </div>
        </header>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
            <div className="max-w-4xl mx-auto space-y-8 pb-20">

                {activeTab === 'general' && (
                <div className="space-y-6 animate-fade-in">
                    <Group title="Información de la Marca">
                        <Input label="Nombre de Empresa" value={content.general.companyName} onChange={(v: string) => updateField('general.companyName', v)} />
                        <Input label="Slogan / Tagline" value={content.general.tagline} onChange={(v: string) => updateField('general.tagline', v)} />
                    </Group>
                    <Group title="Configuración de Inicio (Home)">
                        <div>
                             <label className="block text-xs font-bold text-stone-500 uppercase mb-2 ml-1">
                                Número de Diapositivas en Hero (Slideshow)
                             </label>
                             <div className="flex items-center gap-4">
                                <input 
                                  type="range" 
                                  min="3" 
                                  max="8" 
                                  step="1"
                                  value={content.home?.heroSlideCount || 4} 
                                  onChange={(e) => updateField('home.heroSlideCount', parseInt(e.target.value))}
                                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="font-bold text-lg text-brand-900">{content.home?.heroSlideCount || 4}</span>
                             </div>
                        </div>
                    </Group>
                    <Group title="Información de Contacto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Email de Ventas" value={content.general.contactEmail} onChange={(v: string) => updateField('general.contactEmail', v)} />
                            <Input label="Teléfono (Llamadas)" value={content.general.contactPhone} onChange={(v: string) => updateField('general.contactPhone', v)} />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <Input label="WhatsApp (Sin espacios)" value={content.general.whatsapp} onChange={(v: string) => updateField('general.whatsapp', v)} />
                        </div>
                        <TextArea label="Dirección Física" value={content.general.contactAddress} onChange={(v: string) => updateField('general.contactAddress', v)} />
                    </Group>
                    
                    <Group title="Páginas Legales">
                        <p className="text-xs text-stone-500 mb-4">Puede usar formato básico como # Título, **Negrita**, etc.</p>
                        <TextArea label="Aviso de Privacidad (Texto Completo)" value={content.legal.privacyPolicy} onChange={(v: string) => updateField('legal.privacyPolicy', v)} />
                        <div className="mt-4">
                            <TextArea label="Términos y Condiciones (Texto Completo)" value={content.legal.termsConditions} onChange={(v: string) => updateField('legal.termsConditions', v)} />
                        </div>
                    </Group>
                </div>
                )}

                {activeTab === 'layout' && (
                  <div className="space-y-6 animate-fade-in">
                    <Group title="Menú Principal (Navbar)">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.navigation.map((item, idx) => (
                             <div key={item.viewId}>
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-2 ml-1">
                                    Enlace: {item.viewId === 'contact' ? 'Botón CTA' : item.viewId.toUpperCase()}
                                </label>
                                <input 
                                    type="text"
                                    value={item.label}
                                    onChange={(e) => updateField(`navigation.${idx}.label`, e.target.value)}
                                    className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-stone-600"
                                />
                             </div>
                          ))}
                       </div>
                    </Group>
                    <Group title="Pie de Página (Footer)">
                       <div className="space-y-4">
                          <TextArea label="Descripción del Footer" value={content.footer.description} onChange={(v: string) => updateField('footer.description', v)} />
                          <Input label="Texto Copyright" value={content.footer.copyrightText} onChange={(v: string) => updateField('footer.copyrightText', v)} />
                          
                          <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-4 mt-4">
                             <Input label="Título Col 1 (Nav)" value={content.footer.columnTitles.navigation} onChange={(v: string) => updateField('footer.columnTitles.navigation', v)} />
                             <Input label="Título Col 2 (Legal)" value={content.footer.columnTitles.legal} onChange={(v: string) => updateField('footer.columnTitles.legal', v)} />
                             <Input label="Título Col 3 (Social)" value={content.footer.columnTitles.social} onChange={(v: string) => updateField('footer.columnTitles.social', v)} />
                          </div>

                          {/* Social Media Links */}
                          <div className="border-t border-stone-200 pt-4 mt-4">
                             <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-stone-500 uppercase">Redes Sociales</label>
                                <button onClick={addSocialLink} className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1 rounded flex items-center gap-1 font-bold uppercase tracking-wider">
                                    <Plus size={12} /> Red
                                </button>
                             </div>
                             {content.footer.socialLinks.map((link, idx) => (
                                <div key={idx} className="flex gap-2 mb-2 items-center">
                                   <div className="w-8 flex justify-center text-stone-400">
                                       <Globe size={16} />
                                   </div>
                                   <input 
                                      className="flex-1 bg-stone-900 border border-stone-700 text-white rounded px-3 py-2 text-sm"
                                      value={link.network}
                                      onChange={(e) => updateField(`footer.socialLinks.${idx}.network`, e.target.value)}
                                      placeholder="Nombre (Facebook...)"
                                   />
                                   <input 
                                      className="flex-[2] bg-stone-900 border border-stone-700 text-white rounded px-3 py-2 text-sm"
                                      value={link.url}
                                      onChange={(e) => updateField(`footer.socialLinks.${idx}.url`, e.target.value)}
                                      placeholder="URL (https://...)"
                                   />
                                   <button onClick={() => removeSocialLink(idx)} className="text-stone-400 hover:text-red-500"><Trash size={16}/></button>
                                </div>
                             ))}
                          </div>

                          {/* Legal Links (Labels only) */}
                          <div className="border-t border-stone-200 pt-4 mt-4">
                             <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Etiquetas de Enlaces Legales</label>
                             {content.footer.legalLinks.map((link, idx) => (
                                <div key={idx} className="flex gap-2 mb-2 items-center">
                                   <span className="text-xs text-stone-400 w-20">{link.viewId === 'privacy' ? 'Aviso' : 'Términos'}</span>
                                   <input 
                                      className="flex-1 bg-stone-900 border border-stone-700 text-white rounded px-3 py-2 text-sm"
                                      value={link.label}
                                      onChange={(e) => updateField(`footer.legalLinks.${idx}.label`, e.target.value)}
                                   />
                                </div>
                             ))}
                          </div>
                       </div>
                    </Group>
                  </div>
                )}

                {activeTab === 'theme' && (
                <div className="space-y-6 animate-fade-in">
                    <Group title="Paleta de Colores">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ColorInput label="Primario (Brand-900)" desc="Textos principales, botones oscuros." value={content.theme.primaryColor} onChange={(v: string) => updateField('theme.primaryColor', v)} />
                            <ColorInput label="Secundario (Brand-500)" desc="Detalles dorados, bordes." value={content.theme.secondaryColor} onChange={(v: string) => updateField('theme.secondaryColor', v)} />
                            <ColorInput label="Acento (Brand-300)" desc="Fondos decorativos suaves." value={content.theme.accentColor} onChange={(v: string) => updateField('theme.accentColor', v)} />
                            <ColorInput label="Fondo General" desc="Color de fondo de la página." value={content.theme.backgroundColor} onChange={(v: string) => updateField('theme.backgroundColor', v)} />
                        </div>
                    </Group>
                </div>
                )}

                {activeTab === 'products' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="flex justify-end">
                        <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:bg-green-700 transition-colors">
                            <Plus size={16} /> Nuevo Producto
                        </button>
                    </div>
                    {content.products.map((prod, idx) => (
                    <div key={prod.id} className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 relative group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-stone-200 group-hover:bg-brand-500 transition-colors"></div>
                        <button onClick={() => removeProduct(idx)} className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full z-10" type="button"><Trash size={18} /></button>
                        <div className="pl-4">
                            <h4 className="font-serif font-bold text-lg text-brand-900 mb-6 pb-2 border-b border-stone-100 flex justify-between items-center">
                                <span>{prod.name}</span>
                                <span className="text-xs font-sans font-normal text-stone-400 uppercase tracking-widest mr-8">ID: {prod.id}</span>
                            </h4>
                            <div className="mb-6 flex items-center gap-3 bg-stone-50 p-3 rounded border border-stone-200">
                                <input type="checkbox" checked={prod.highlight || false} onChange={(e) => updateField(`products.${idx}.highlight`, e.target.checked)} className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 cursor-pointer" />
                                <span className="text-sm font-bold text-stone-700 flex items-center gap-2"><Star size={14} className={prod.highlight ? "fill-brand-500 text-brand-500" : "text-stone-400"} /> Mostrar en "Destacados"</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <Input label="Nombre del Producto" value={prod.name} onChange={(v: string) => updateField(`products.${idx}.name`, v)} />
                                <ImageField label="Imagen del Producto" value={prod.image} onChange={(v: string) => updateField(`products.${idx}.image`, v)} />
                            </div>
                            <TextArea label="Descripción Comercial" value={prod.description} onChange={(v: string) => updateField(`products.${idx}.description`, v)} />
                            <div className="mt-6">
                                <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Características Clave</label>
                                <input className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none" value={prod.features.join(', ')} onChange={(e) => updateField(`products.${idx}.features`, e.target.value.split(',').map(s => s.trim()))} />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}

                {activeTab === 'testimonials' && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <p className="text-stone-500 text-sm">Estos testimonios aparecen en la página principal.</p>
                        <button onClick={addTestimonial} className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:bg-green-700 transition-colors">
                            <Plus size={16} /> Nuevo Cliente
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.testimonials.map((testi, idx) => (
                        <div key={testi.id} className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 relative">
                           <div className="absolute top-0 left-0 w-full h-1 bg-stone-200"></div>
                           <button onClick={() => removeTestimonial(idx)} className="absolute top-2 right-2 text-stone-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full" type="button"><Trash size={16} /></button>
                           <h4 className="font-bold text-sm text-stone-400 uppercase mb-4">Cliente #{idx + 1}</h4>
                           <div className="space-y-4">
                              <Input label="Nombre del Cliente" value={testi.client} onChange={(v: string) => updateField(`testimonials.${idx}.client`, v)} />
                              <TextArea label="Testimonio" value={testi.feedback} onChange={(v: string) => updateField(`testimonials.${idx}.feedback`, v)} />
                              <ImageField label="Logo" value={testi.logoUrl} onChange={(v: string) => updateField(`testimonials.${idx}.logoUrl`, v)} />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border border-stone-200">
                        <h3 className="font-bold text-stone-900 uppercase tracking-wide">Gestión de Portafolio</h3>
                        <button onClick={addGalleryImage} className="text-sm bg-brand-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-brand-700 font-bold uppercase tracking-wider transition-colors shadow-lg">
                            <Plus size={16} /> Nueva Imagen
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {content.gallery.map((img, idx) => (
                        <div key={idx} className="bg-white p-4 rounded shadow-sm border border-stone-200 flex flex-col items-start relative hover:shadow-md transition-shadow">
                            <div className="w-full space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Título del Proyecto" value={img.label} onChange={(v: string) => updateField(`gallery.${idx}.label`, v)} />
                                    <div>
                                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Tamaño en Grid</label>
                                        <select className="w-full bg-stone-900 border border-stone-700 text-white rounded px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none" value={img.size} onChange={(e) => updateField(`gallery.${idx}.size`, e.target.value)}>
                                            <option value="small">Pequeño</option>
                                            <option value="wide">Ancho</option>
                                            <option value="tall">Alto</option>
                                        </select>
                                    </div>
                                </div>
                                <ImageField label="Imagen del Proyecto" value={img.src} onChange={(v: string) => updateField(`gallery.${idx}.src`, v)} />
                            </div>
                            <button onClick={() => removeGalleryImage(idx)} className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full" type="button"><Trash size={18} /></button>
                        </div>
                        ))}
                    </div>
                </div>
                )}

                {activeTab === 'about' && (
                <div className="space-y-6 animate-fade-in">
                    <Group title="Imágenes de Sección">
                         <ImageField 
                            label="Imagen Principal (Junto al texto)" 
                            value={content.about.image} 
                            onChange={(v: string) => updateField('about.image', v)} 
                         />
                         <div className="mt-4">
                             <ImageField 
                                label="Imagen de Fondo (Banner Superior)" 
                                value={content.about.heroImage} 
                                onChange={(v: string) => updateField('about.heroImage', v)} 
                             />
                         </div>
                    </Group>
                    <Group title="Historia">
                        <div className="flex justify-end mb-2"><button onClick={addHistory} className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1 rounded flex items-center gap-1 font-bold uppercase tracking-wider"><Plus size={12} /> Párrafo</button></div>
                        {content.about.history.map((para, idx) => (
                            <div key={idx} className="relative">
                                <TextArea label={`Párrafo ${idx+1}`} value={para} onChange={(v: string) => {const newHistory = [...content.about.history]; newHistory[idx] = v; updateField('about.history', newHistory);}} />
                                <button onClick={() => removeHistory(idx)} className="absolute top-0 right-0 p-2 text-stone-400 hover:text-red-500" type="button"><Trash size={14}/></button>
                            </div>
                        ))}
                    </Group>
                    <Group title="Estadísticas">
                        <div className="flex justify-end mb-4"><button onClick={addStat} className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1 rounded flex items-center gap-1 font-bold uppercase tracking-wider"><Plus size={12} /> Dato</button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{content.about.stats.map((stat, idx) => (<div key={idx} className="bg-stone-50 p-4 rounded border border-stone-200 relative group"><button onClick={() => removeStat(idx)} className="absolute top-2 right-2 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" type="button"><Trash size={14}/></button><div className="mb-4 text-xs font-bold text-brand-600 uppercase tracking-widest">Dato {idx+1}</div><div className="space-y-3"><Input label="Valor" value={stat.value} onChange={(v: string) => {const newStats = [...content.about.stats]; newStats[idx].value = v; updateField('about.stats', newStats);}} /><Input label="Etiqueta" value={stat.label} onChange={(v: string) => {const newStats = [...content.about.stats]; newStats[idx].label = v; updateField('about.stats', newStats);}} /></div></div>))}</div>
                    </Group>
                    <Group title="Proceso">
                         <div className="flex justify-end mb-4"><button onClick={addStep} className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1 rounded flex items-center gap-1 font-bold uppercase tracking-wider"><Plus size={12} /> Paso</button></div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{content.about.steps.map((step, idx) => (<div key={idx} className="bg-stone-50 p-4 rounded border border-stone-200 relative group"><button onClick={() => removeStep(idx)} className="absolute top-2 right-2 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" type="button"><Trash size={14}/></button><div className="mb-2 text-xs font-bold text-brand-600 uppercase tracking-widest flex items-center gap-2"><ListOrdered size={14} /> Paso {idx+1}</div><div className="space-y-3"><Input label="Título" value={step.title} onChange={(v: string) => {const newSteps = [...content.about.steps]; newSteps[idx].title = v; updateField('about.steps', newSteps);}} /><TextArea label="Descripción" value={step.desc} onChange={(v: string) => {const newSteps = [...content.about.steps]; newSteps[idx].desc = v; updateField('about.steps', newSteps);}} /></div></div>))}</div>
                    </Group>
                </div>
                )}

                {activeTab === 'users' && (
                  <div className="space-y-8 animate-fade-in">
                      {/* Users tab implementation remains same as previous */}
                      <Group title="Mi Cuenta">
                        <div className="max-w-md">
                           <h4 className="font-bold text-stone-900 mb-4 text-sm">Cambiar mi contraseña</h4>
                           <form onSubmit={handleChangePassword} className="space-y-4">
                              <div><label className="block text-xs font-bold text-stone-500 uppercase mb-2">Nueva Contraseña</label><input type="password" value={changePassValue} onChange={(e) => {setChangePassValue(e.target.value); setChangePassUser('');}} className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none" placeholder="••••••••" /></div>
                              <button type="submit" className="bg-brand-900 text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-brand-800 transition-colors">Actualizar Contraseña</button>
                           </form>
                        </div>
                      </Group>
                      {currentUser?.role === 'master' && (
                        <>
                          <Group title="Crear Nuevo Usuario">
                            {/* ... same user creation form ... */}
                            <div className="max-w-md">
                              <form onSubmit={handleCreateUser} className="space-y-4 bg-stone-50 p-6 rounded border border-stone-200">
                                <div><label className="block text-xs font-bold text-stone-500 uppercase mb-2">Nombre de Usuario</label><input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none" /></div>
                                <div><label className="block text-xs font-bold text-stone-500 uppercase mb-2">Contraseña Inicial</label><input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none" /></div>
                                <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center justify-center gap-2"><Plus size={16} /> Crear Editor</button>
                              </form>
                            </div>
                          </Group>
                          <Group title="Lista de Usuarios">
                             <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                   <thead><tr className="border-b border-stone-200"><th className="py-3 text-xs font-bold text-stone-500 uppercase">Usuario</th><th className="py-3 text-xs font-bold text-stone-500 uppercase">Rol</th><th className="py-3 text-xs font-bold text-stone-500 uppercase text-right">Acciones</th></tr></thead>
                                   <tbody>{users.map((u) => (<tr key={u.username} className="border-b border-stone-100 last:border-0 hover:bg-stone-50"><td className="py-4 font-bold text-stone-800">{u.username}</td><td className="py-4"><span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${u.role === 'master' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{u.role}</span></td><td className="py-4 text-right"><div className="flex justify-end gap-2"><button type="button" onClick={() => {const newP = prompt(`Nueva contraseña para ${u.username}:`); if(newP) changePassword(u.username, newP);}} className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded" title="Cambiar Contraseña"><Users size={16} /></button>{(u.username !== 'admin' && u.username !== currentUser.username) && (<button type="button" onClick={(e) => {e.stopPropagation(); if(confirm(`¿Eliminar usuario ${u.username}?`)) deleteUser(u.username);}} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded" title="Eliminar Usuario"><Trash size={16} /></button>)}</div></td></tr>))}</tbody>
                                </table>
                             </div>
                          </Group>
                        </>
                      )}
                  </div>
                )}
            </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-stone-900 text-white px-6 py-4 rounded shadow-2xl flex items-center gap-3 animate-fade-in-up z-50 border border-brand-500">
             <CheckCircle className="text-green-500" size={24} />
             <div>
                <h4 className="font-bold text-sm">Cambios Guardados</h4>
                <p className="text-xs text-stone-400">La configuración se ha actualizado correctamente.</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ... Helper Components (SidebarTab, Group, Input, ImageField, ColorInput, TextArea) remain mostly the same ...
const SidebarTab = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-brand-900 text-white shadow-lg translate-x-1' 
        : 'text-stone-400 hover:text-white hover:bg-stone-800'
    }`}
  >
    <span className={`${active ? 'text-brand-400' : ''}`}>{icon}</span>
    {label}
  </button>
);

const Group = ({ title, children }: any) => (
  <div className="bg-white p-6 md:p-8 rounded-sm border border-stone-200 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-brand-500"></div>
    <h3 className="font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100 text-sm uppercase tracking-wider flex items-center gap-2">
        <span className="w-1 h-4 bg-brand-500 rounded-full"></span>
        {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({ label, value, onChange }: any) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-stone-500 uppercase mb-2 ml-1">{label}</label>
    <input 
      type="text" 
      className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-stone-600 transition-all shadow-inner"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

const ImageField = ({ label, value, onChange }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-stone-500 uppercase mb-2 ml-1">{label}</label>
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 bg-stone-200 rounded overflow-hidden flex-shrink-0 border border-stone-300 relative group">
            {value ? (
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <ImageIcon size={24} />
                </div>
            )}
        </div>
        <div className="flex-1 space-y-3">
             <div className="flex gap-2">
                <input 
                    type="text" 
                    className="flex-1 bg-stone-900 border border-stone-700 text-white rounded px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-stone-600"
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://..."
                />
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-stone-700 hover:bg-stone-600 text-white px-3 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Upload size={16} /> 
                    Subir
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
             </div>
        </div>
      </div>
    </div>
  );
};

const ColorInput = ({ label, desc, value, onChange }: any) => (
  <div className="flex items-start gap-4 p-3 rounded-lg border border-stone-100 hover:border-stone-300 transition-colors bg-stone-50">
    <div className="relative group cursor-pointer">
        <input 
            type="color" 
            className="h-12 w-12 rounded cursor-pointer border-0 p-0 opacity-0 absolute inset-0 z-10"
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
        />
        <div 
            className="h-12 w-12 rounded shadow-sm border border-stone-200" 
            style={{ backgroundColor: value }}
        />
    </div>
    <div className="flex-1">
        <label className="block text-xs font-bold text-stone-800 uppercase mb-0.5">{label}</label>
        <p className="text-[10px] text-stone-500 mb-2">{desc}</p>
        <input 
            type="text" 
            className="w-full bg-white border border-stone-300 text-stone-800 rounded px-2 py-1 text-xs font-mono uppercase focus:border-brand-500 focus:outline-none"
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
        />
    </div>
  </div>
);

const TextArea = ({ label, value, onChange }: any) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-stone-500 uppercase mb-2 ml-1">{label}</label>
    <textarea 
      rows={4}
      className="w-full bg-stone-900 border border-stone-700 text-white rounded px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-stone-600 transition-all shadow-inner resize-y"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);
