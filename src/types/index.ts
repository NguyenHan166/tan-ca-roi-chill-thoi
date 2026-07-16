export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  category: string;
  moodIds: string[];
  affiliateUrl: string;
  rating: number;
  badge: string;
  featured: boolean;
}

export interface Mood {
  id: string;
  name: string;
  quote: string;
  description: string;
  bgClass: string;
  textColorClass: string;
  icon: string; // Lucide icon name
  recommendedAudioId: string;
}

export interface Journal {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  type: 'video' | 'article';
  duration?: string;
  thumbnail: string;
  mediaUrl: string;
  featured?: boolean;
  content?: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  tags: string[];
}

export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  iconName: string;
}

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  price: number;
  reason: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  affiliateUrl: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'heart' | 'error';
}

export type TimeTheme = 'morning' | 'afternoon' | 'evening';
