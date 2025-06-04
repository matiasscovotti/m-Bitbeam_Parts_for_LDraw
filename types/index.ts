export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  features?: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  colors?: Color[];
  sizes?: Size[];
  tags?: string[];
}

export interface Color {
  name: string;
  value: string;
  available: boolean;
}

export interface Size {
  name: string;
  value: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
  selectedSize?: Size;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wishlist?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: Category[];
  productCount?: number;
}

export interface Filter {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'range' | 'color';
  options?: FilterOption[];
  min?: number;
  max?: number;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
  color?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type InputVariant = 'default' | 'error' | 'success';

