import type { Meta, StoryObj } from '@storybook/react';
import { ProductPage } from './ProductPage';
import { Product, Review } from '@/types';

const sampleProduct: Product = {
  id: '1',
  name: 'Camiseta Premium de Algodón Orgánico',
  price: 29990,
  originalPrice: 39990,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=750&fit=crop',
  ],
  category: 'Ropa',
  brand: 'EcoFashion',
  rating: 4.5,
  reviewCount: 128,
  description: 'Camiseta de alta calidad confeccionada en algodón orgánico 100%. Diseño moderno y cómodo, perfecto para el uso diario. Fabricada con procesos sostenibles y materiales eco-friendly que respetan el medio ambiente.',
  features: [
    'Algodón orgánico 100% certificado',
    'Corte regular fit para máxima comodidad',
    'Cuello redondo reforzado',
    'Costuras dobles para mayor durabilidad',
    'Certificación GOTS (Global Organic Textile Standard)',
    'Lavable en máquina a 30°C',
    'Secado rápido',
    'Resistente al encogimiento',
  ],
  inStock: true,
  isNew: true,
  isSale: true,
  colors: [
    { name: 'Negro', value: '#000000', available: true },
    { name: 'Blanco', value: '#FFFFFF', available: true },
    { name: 'Azul', value: '#3B82F6', available: true },
    { name: 'Gris', value: '#6B7280', available: false },
    { name: 'Verde', value: '#10B981', available: true },
  ],
  sizes: [
    { name: 'XS', value: 'xs', available: true },
    { name: 'S', value: 's', available: true },
    { name: 'M', value: 'm', available: true },
    { name: 'L', value: 'l', available: false },
    { name: 'XL', value: 'xl', available: true },
  ],
};

const outOfStockProduct: Product = {
  ...sampleProduct,
  id: '2',
  name: 'Zapatillas Deportivas Edición Limitada',
  price: 129990,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
  category: 'Calzado',
  inStock: false,
  isNew: false,
  isSale: false,
  originalPrice: undefined,
};

const sampleReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'María García',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    comment: 'Excelente calidad, muy cómoda y el material se siente premium. La talla es exacta y el color es tal como se ve en las fotos. Definitivamente volvería a comprar.',
    date: '2024-01-15',
    helpful: 12,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Carlos López',
    rating: 4,
    comment: 'Buena camiseta, aunque esperaba que fuera un poco más gruesa. El algodón orgánico se nota en la suavidad. El envío fue rápido.',
    date: '2024-01-10',
    helpful: 8,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Ana Rodríguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    comment: 'Me encanta! Es mi tercera camiseta de esta marca. La calidad es consistente y el envío fue súper rápido. Muy recomendable.',
    date: '2024-01-08',
    helpful: 15,
  },
  {
    id: '4',
    userId: '4',
    userName: 'Pedro Martínez',
    rating: 3,
    comment: 'Está bien, pero esperaba mejor calidad por el precio. El color se ve un poco diferente que en las fotos.',
    date: '2024-01-05',
    helpful: 3,
  },
];

const relatedProducts: Product[] = [
  {
    id: '3',
    name: 'Pantalón Jeans Clásico',
    price: 49990,
    originalPrice: 69990,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.0,
    reviewCount: 167,
    inStock: true,
    isSale: true,
  },
  {
    id: '4',
    name: 'Chaqueta de Cuero Sintético',
    price: 159990,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: true,
  },
  {
    id: '5',
    name: 'Sudadera con Capucha',
    price: 79990,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: '6',
    name: 'Polo Básico',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    category: 'Ropa',
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
  },
];

const meta: Meta<typeof ProductPage> = {
  title: 'Templates/ProductPage',
  component: ProductPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Template completo de página de producto para ecommerce. Incluye galería de imágenes, selección de variantes, reseñas y productos relacionados.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
    onReviewSubmit: (review) => console.log('Nueva reseña:', review),
  },
};

export const OutOfStock: Story = {
  args: {
    product: outOfStockProduct,
    reviews: sampleReviews.slice(0, 2),
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
};

export const WithoutVariants: Story = {
  args: {
    product: {
      ...sampleProduct,
      colors: undefined,
      sizes: undefined,
    },
    reviews: sampleReviews,
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity) => 
      console.log('Agregar al carrito:', { product: product.name, quantity }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
};

export const SingleImage: Story = {
  args: {
    product: {
      ...sampleProduct,
      images: undefined, // Will use only the main image
    },
    reviews: sampleReviews,
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
};

export const NoReviews: Story = {
  args: {
    product: sampleProduct,
    reviews: [],
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
};

export const NoRelatedProducts: Story = {
  args: {
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts: [],
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
};

export const MobileView: Story = {
  args: {
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts: relatedProducts,
    onAddToCart: (product, quantity, color, size) => 
      console.log('Agregar al carrito:', { product: product.name, quantity, color: color?.name, size: size?.name }),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onShare: (product) => console.log('Compartir:', product.name),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

