
import { SiteContent, View } from './types';

export const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
  role: 'master'
};

// =========================================================================================
// PASTE YOUR JSON EXPORT HERE TO UPDATE THE SITE
// REPLACE THE ENTIRE OBJECT BELOW WITH THE CONTENT FROM "altra-pisos-config.json"
// =========================================================================================

export const INITIAL_CONTENT: SiteContent = {
  theme: {
    primaryColor: '#5f3d30',
    secondaryColor: '#bc8952',
    accentColor: '#dbc49c',
    backgroundColor: '#fbf8f3',
  },
  general: {
    companyName: "Altra Pisos",
    tagline: "Soluciones Premium en Pisos",
    contactEmail: "ventas@altrapisos.com.mx",
    contactPhone: "+52 (55) 1234 5678",
    whatsapp: "+525583464031",
    contactAddress: "Av. Paseo de la Reforma, CDMX, México, 06500"
  },
  legal: {
    privacyPolicy: `
# Aviso de Privacidad

En Altra Pisos, nos comprometemos a proteger su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal.

1. **Recopilación de Información**: Recopilamos información que usted nos proporciona voluntariamente a través de nuestros formularios de contacto, como su nombre, correo electrónico y número de teléfono.
2. **Uso de la Información**: Utilizamos sus datos únicamente para responder a sus solicitudes de cotización y mejorar nuestros servicios.
3. **Protección de Datos**: Implementamos medidas de seguridad para proteger su información contra el acceso no autorizado.
4. **Derechos ARCO**: Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales contactándonos en nuestro correo oficial.

Fecha de última actualización: 2024.
    `,
    termsConditions: `
# Términos y Condiciones

Bienvenido a Altra Pisos. Al utilizar nuestro sitio web, usted acepta los siguientes términos:

1. **Uso del Sitio**: El contenido de este sitio es para información general y está sujeto a cambios sin previo aviso.
2. **Propiedad Intelectual**: Todo el material en este sitio web es propiedad de Altra Pisos o de sus licenciantes. Queda prohibida su reproducción sin consentimiento.
3. **Limitación de Responsabilidad**: Altra Pisos no se hace responsable por daños directos o indirectos derivados del uso de este sitio web.
4. **Ley Aplicable**: Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.
    `
  },
  navigation: [
    { viewId: View.HOME, label: 'Inicio' },
    { viewId: View.ABOUT, label: 'Nosotros' },
    { viewId: View.PRODUCTS, label: 'Productos' },
    { viewId: View.GALLERY, label: 'Galería' },
    { viewId: View.CONTACT, label: 'Contacto' },
  ],
  footer: {
    description: "Soluciones integrales en recubrimientos para la industria hospitalaria, comercial y transporte en México.",
    copyrightText: "Todos los derechos reservados.",
    columnTitles: {
      navigation: "Navegación",
      legal: "Legal",
      social: "Síguenos"
    },
    legalLinks: [
      { label: "Aviso de Privacidad", viewId: View.PRIVACY },
      { label: "Términos y Condiciones", viewId: View.TERMS }
    ],
    socialLinks: [
      { network: 'Facebook', url: 'https://facebook.com' },
      { network: 'Instagram', url: 'https://instagram.com' },
      { network: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  },
  home: {
    heroSlideCount: 4
  },
  products: [
    {
      id: 'homo-01',
      name: 'Piso Homogéneo',
      description: 'Durabilidad extrema y asepsia total para entornos críticos. Una sola capa de vinilo compacto que garantiza resistencia al tráfico pesado y facilidad de mantenimiento.',
      features: ['Antibacterial', 'Alta resistencia al desgaste', 'Sin juntas visibles (termosellado)', 'Fácil limpieza'],
      category: 'homogeneo',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
      applications: ['Hospitales', 'Clínicas', 'Laboratorios', 'Pasillos de alto tráfico'],
      highlight: true
    },
    {
      id: 'cond-01',
      name: 'Piso Conductivo',
      description: 'Control estático avanzado. Diseñado para disipar cargas electrostáticas en áreas donde la precisión electrónica es vital.',
      features: ['Disipación electrostática', 'Resistencia química', 'Superficie lisa e higiénica', 'Cumple normativas de seguridad'],
      category: 'conductivo',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop',
      applications: ['Quirófanos', 'Centros de Datos (Data Centers)', 'Salas de Rayos X', 'Manufactura Electrónica'],
      highlight: true
    },
    {
      id: 'het-01',
      name: 'Piso Heterogéneo',
      description: 'Versatilidad y diseño superior. Múltiples capas que ofrecen absorción acústica y una variedad infinita de acabados visuales tipo madera o piedra.',
      features: ['Aislamiento acústico', 'Diseños realistas (madera/piedra)', 'Confort al caminar', 'Resistente a rayaduras'],
      category: 'heterogeneo',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
      applications: ['Oficinas Corporativas', 'Jardines de Niños', 'Autobuses de Pasajeros', 'Áreas Comerciales'],
      highlight: true
    },
    {
      id: 'tach-01',
      name: 'Piso Tachón (Studded)',
      description: 'El estándar industrial para uso rudo y seguridad antideslizante. Textura de moneda icónica para agarre máximo en ambientes oscuros o dinámicos.',
      features: ['Antideslizante superior', 'Extrema durabilidad', 'Resistente a impactos', 'Estética industrial'],
      category: 'tachon',
      image: 'https://images.unsplash.com/photo-1514306191717-45224512c2d0?q=80&w=1000&auto=format&fit=crop',
      applications: ['Sets de Televisión', 'Cine y Teatros', 'Transporte de Carga', 'Rampas y Pasarelas'],
      highlight: false
    }
  ],
  testimonials: [
    { id: 1, client: "Grupo Hospitalario ABC", feedback: "Estándares internacionales en nuestros quirófanos.", logoUrl: "https://ui-avatars.com/api/?name=ABC&background=0D8ABC&color=fff" },
    { id: 2, client: "Hospitales Ángeles", feedback: "Calidad y durabilidad en cada pasillo.", logoUrl: "https://ui-avatars.com/api/?name=Angeles&background=004d40&color=fff" },
    { id: 3, client: "TV Azteca", feedback: "La base perfecta para nuestros foros de televisión.", logoUrl: "https://ui-avatars.com/api/?name=TVA&background=bf360c&color=fff" },
    { id: 4, client: "ETN Turistar", feedback: "Resistencia superior en nuestra flotilla de lujo.", logoUrl: "https://ui-avatars.com/api/?name=ETN&background=1a237e&color=fff" },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800", label: "Pasillo Hospitalario", size: "tall" },
    { src: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800", label: "Quirófano de Alta Especialidad", size: "wide" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", label: "Oficinas Corporativas Santa Fe", size: "small" },
    { src: "https://images.unsplash.com/photo-1514306191717-45224512c2d0?q=80&w=800", label: "Set de Televisión", size: "tall" },
    { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800", label: "Lobby Hotelero", size: "wide" },
    { src: "https://images.unsplash.com/photo-1574621100236-d25a649d0639?q=80&w=800", label: "Gimnasio Deportivo", size: "small" },
    { src: "https://images.unsplash.com/photo-1665484507044-6a0d2685764d?q=80&w=800", label: "Transporte Público", size: "small" }
  ],
  about: {
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop",
    history: [
      "Fundada con la visión de elevar los estándares de infraestructura hospitalaria y comercial en México, Altra Pisos se ha consolidado como el referente en recubrimientos especializados.",
      "Entendemos que un quirófano no puede fallar, que un set de televisión necesita silencio visual y acústico, y que el transporte público requiere una durabilidad a prueba de todo. Nuestra alianza con Relleflooring nos permite ofrecer tecnología de punta."
    ],
    stats: [
      { label: "Años de Experiencia", value: "15+" },
      { label: "Proyectos Ejecutados", value: "500+" },
      { label: "Garantía de Instalación", value: "100%" },
      { label: "Cumplimiento ISO/NOM", value: "Norma" },
    ],
    steps: [
      { title: "Evaluación Técnica", desc: "Visitamos su obra para medir humedad, nivelación y condiciones del sustrato." },
      { title: "Preparación", desc: "Aplicación de pastas niveladoras y primers especializados para una base perfecta." },
      { title: "Instalación", desc: "Colocación experta del recubrimiento, cuidando los patrones y el diseño." },
      { title: "Termosellado", desc: "Soldadura térmica de juntas para garantizar una superficie monolítica e higiénica." },
    ]
  }
};
