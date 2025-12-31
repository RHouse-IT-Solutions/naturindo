export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  rating: number;
  reviewCount: number;
  composition: string[];
  usage: string;
  benefits: string[];
  stock: number;
  testimonials: Testimonial[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: PaymentMethod;
  createdAt: string;
  user: User;
}

export type PaymentMethod = 'bank_transfer' | 'ewallet' | 'qris';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isAd?: boolean;
}
