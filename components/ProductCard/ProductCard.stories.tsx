import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

const sampleProduct: Product = {
  id: '1',
  name: 'Camiseta Premium de Algodón Orgánico',
  price: 29990,
  originalPrice: 39990,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
  category: 'Ropa',
  brand: 'EcoFashion',
  rating: 4.5,
  reviewCount: 128,
  description: 'Camiseta de alta calidad confeccionada en algodón orgánico 100%',
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
  name: 'Zapatillas Deportivas Premium',
  price: 89990,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
  category: 'Calzado',
  inStock: false,
  isNew: false,
  isSale: false,
  originalPrice: undefined,
};

const newProduct: Product = {
  ...sampleProduct,
  id: '3',
  name: 'Chaqueta de Cuero Sintético',
  price: 159990,
  image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
  category: 'Abrigos',
  isNew: true,
  isSale: false,
  originalPrice: undefined,
  rating: undefined,
  reviewCount: undefined,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de producto completa con imagen, información, badges, acciones rápidas y estados interactivos. Optimizada para ecommerce.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showQuickActions: {
      control: 'boolean',
      description: 'Mostrar acciones rápidas al hacer hover',
    },
    showBadges: {
      control: 'boolean',
      description: 'Mostrar badges de estado (nuevo, oferta, agotado)',
    },
    imageAspectRatio: {
      control: 'select',
      options: ['square', 'portrait', 'landscape'],
      description: 'Proporción de aspecto de la imagen',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: sampleProduct,
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onQuickView: (product) => console.log('Vista rápida:', product.name),
  },
};

export const OutOfStock: Story = {
  args: {
    product: outOfStockProduct,
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onQuickView: (product) => console.log('Vista rápida:', product.name),
  },
};

export const NewProduct: Story = {
  args: {
    product: newProduct,
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onQuickView: (product) => console.log('Vista rápida:', product.name),
  },
};

export const WithoutQuickActions: Story = {
  args: {
    product: sampleProduct,
    showQuickActions: false,
  },
};

export const WithoutBadges: Story = {
  args: {
    product: sampleProduct,
    showBadges: false,
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
  },
};

export const SquareImage: Story = {
  args: {
    product: sampleProduct,
    imageAspectRatio: 'square',
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
};

export const LandscapeImage: Story = {
  args: {
    product: sampleProduct,
    imageAspectRatio: 'landscape',
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
};

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <ProductCard
        product={sampleProduct}
        onAddToCart={(product) => console.log('Agregar al carrito:', product.name)}
        onAddToWishlist={(product) => console.log('Agregar a favoritos:', product.name)}
        onQuickView={(product) => console.log('Vista rápida:', product.name)}
      />
      <ProductCard
        product={outOfStockProduct}
        onAddToCart={(product) => console.log('Agregar al carrito:', product.name)}
        onAddToWishlist={(product) => console.log('Agregar a favoritos:', product.name)}
        onQuickView={(product) => console.log('Vista rápida:', product.name)}
      />
      <ProductCard
        product={newProduct}
        onAddToCart={(product) => console.log('Agregar al carrito:', product.name)}
        onAddToWishlist={(product) => console.log('Agregar a favoritos:', product.name)}
        onQuickView={(product) => console.log('Vista rápida:', product.name)}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

