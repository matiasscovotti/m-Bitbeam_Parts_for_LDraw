import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from './HomePage';
import { Product, Category, SearchSuggestion } from '@/types';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Premium de Algodón Orgánico',
    price: 29990,
    originalPrice: 39990,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true,
    isSale: true,
  },
  {
    id: '2',
    name: 'Zapatillas Deportivas Pro',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    category: 'Calzado',
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: '3',
    name: 'Chaqueta de Cuero Sintético',
    price: 159990,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: '4',
    name: 'Reloj Deportivo Digital',
    price: 199990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    category: 'Accesorios',
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    isNew: false,
    isSale: false,
  },
  {
    id: '5',
    name: 'Pantalón Jeans Clásico',
    price: 49990,
    originalPrice: 69990,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.0,
    reviewCount: 167,
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: '6',
    name: 'Mochila Urbana Resistente',
    price: 79990,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    category: 'Accesorios',
    rating: 4.4,
    reviewCount: 145,
    inStock: true,
    isNew: true,
    isSale: false,
  },
];

const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Ropa',
    slug: 'ropa',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    productCount: 1250,
  },
  {
    id: '2',
    name: 'Calzado',
    slug: 'calzado',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
    productCount: 890,
  },
  {
    id: '3',
    name: 'Accesorios',
    slug: 'accesorios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
    productCount: 650,
  },
  {
    id: '4',
    name: 'Deportes',
    slug: 'deportes',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    productCount: 420,
  },
];

const sampleSearchSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'camisetas', type: 'recent' },
  { id: '2', text: 'zapatillas nike', type: 'recent' },
  { id: '3', text: 'ropa de verano', type: 'trending' },
  { id: '4', text: 'ofertas black friday', type: 'trending' },
  { 
    id: '5', 
    text: 'Camiseta Premium', 
    type: 'product', 
    category: 'Ropa',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop'
  },
];

const meta: Meta<typeof HomePage> = {
  title: 'Templates/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Template completo de página de inicio para ecommerce. Incluye hero, categorías, productos destacados, ofertas y newsletter.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    heroTitle: {
      control: 'text',
      description: 'Título principal del hero',
    },
    heroSubtitle: {
      control: 'text',
      description: 'Subtítulo del hero',
    },
    heroCtaText: {
      control: 'text',
      description: 'Texto del botón CTA del hero',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    featuredProducts: sampleProducts,
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onCategoryClick: (category) => console.log('Ver categoría:', category.name),
    onHeroCtaClick: () => console.log('Hero CTA clicked'),
  },
};

export const CustomHero: Story = {
  args: {
    featuredProducts: sampleProducts,
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    heroTitle: 'Moda sostenible para el futuro',
    heroSubtitle: 'Descubre nuestra colección eco-friendly con materiales reciclados y procesos responsables.',
    heroCtaText: 'Ver colección eco',
    heroImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop',
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onCategoryClick: (category) => console.log('Ver categoría:', category.name),
    onHeroCtaClick: () => console.log('Hero CTA clicked'),
  },
};

export const MinimalProducts: Story = {
  args: {
    featuredProducts: sampleProducts.slice(0, 2),
    newProducts: [],
    saleProducts: [],
    categories: sampleCategories.slice(0, 2),
    searchSuggestions: sampleSearchSuggestions,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onCategoryClick: (category) => console.log('Ver categoría:', category.name),
    onHeroCtaClick: () => console.log('Hero CTA clicked'),
  },
};

export const SalesFocus: Story = {
  args: {
    featuredProducts: sampleProducts.filter(p => p.isSale),
    newProducts: [],
    saleProducts: sampleProducts.filter(p => p.isSale),
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    heroTitle: '¡Mega Sale! Hasta 50% OFF',
    heroSubtitle: 'Aprovecha nuestras ofertas especiales en toda la tienda. Descuentos por tiempo limitado.',
    heroCtaText: 'Ver ofertas',
    heroImage: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=600&fit=crop',
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onCategoryClick: (category) => console.log('Ver categoría:', category.name),
    onHeroCtaClick: () => console.log('Hero CTA clicked'),
  },
};

export const MobileView: Story = {
  args: {
    featuredProducts: sampleProducts,
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onCategoryClick: (category) => console.log('Ver categoría:', category.name),
    onHeroCtaClick: () => console.log('Hero CTA clicked'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

