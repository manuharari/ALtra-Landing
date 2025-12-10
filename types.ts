
export enum View {
  HOME = 'home',
  ABOUT = 'about',
  PRODUCTS = 'products',
  GALLERY = 'gallery',
  CONTACT = 'contact',
  ADMIN = 'admin',
  PRIVACY = 'privacy',
  TERMS = 'terms'
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: 'homogeneo' | 'heterogeneo' | 'conductivo' | 'tachon';
  applications: string[];
  highlight?: boolean;
}

export interface Testimonial {
  id: number;
  client: string;
  feedback: string;
  logoUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
}

export interface NavigationItem {
  viewId: View;
  label: string;
}

export interface SocialLink {
  network: string; // e.g., 'Facebook', 'Instagram'
  url: string;
}

export interface FooterConfig {
  description: string;
  copyrightText: string;
  columnTitles: {
    navigation: string;
    legal: string;
    social: string;
  };
  legalLinks: { label: string; viewId: View }[]; // Changed url to viewId for internal routing
  socialLinks: SocialLink[];
}

export interface SiteContent {
  theme: ThemeConfig;
  general: {
    companyName: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    whatsapp: string; // New field for WhatsApp number
  };
  legal: {
    privacyPolicy: string;
    termsConditions: string;
  };
  navigation: NavigationItem[];
  footer: FooterConfig;
  home: {
    heroSlideCount: number;
  };
  products: ProductData[];
  testimonials: Testimonial[];
  gallery: { src: string; label: string; size: string }[];
  about: {
    heroImage: string;
    image: string;
    history: string[];
    stats: { label: string; value: string; }[];
    steps: { title: string; desc: string; }[];
  };
}

export type Role = 'master' | 'editor';

export interface User {
  username: string;
  password?: string;
  role: Role;
}
