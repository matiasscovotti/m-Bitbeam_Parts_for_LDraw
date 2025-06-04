import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './ProductGrid';
import { Product, Filter } from '@/types';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Premium de Algodón Orgánico',
    price: 29990,
    originalPrice: 39990,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    category: 'Ropa',
    brand: 'Nike',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    isNew: true,
    isSale: true,
    colors: [
      { name: 'Negro', value: 'black', available: true },
      { name: 'Blanco', value: 'white', available: true },
      { name: 'Azul', value: 'blue', available: true },
    ],
  },
  {
    id: '2',
    name: 'Zapatillas Deportivas Pro',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    category: 'Calzado',
    brand: 'Adidas',
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    isNew: false,
    isSale: false,
    colors: [
      { name: 'Negro', value: 'black', available: true },
      { name: 'Blanco', value: 'white', available: false },
    ],
  },
  {
    id: '3',
    name: 'Chaqueta de Cuero Sintético',
    price: 159990,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    category: 'Ropa',
    brand: 'Puma',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    isSale: false,
    colors: [
      { name: 'Negro', value: 'black', available: true },
      { name: 'Marrón', value: 'brown', available: true },
    ],
  },
  {
    id: '4',
    name: 'Pantalón Jeans Clásico',
    price: 49990,
    originalPrice: 69990,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    category: 'Ropa',
    brand: 'Nike',
    rating: 4.0,
    reviewCount: 167,
    inStock: true,
    isNew: false,
    isSale: true,
    colors: [
      { name: 'Azul', value: 'blue', available: true },
      { name: 'Negro', value: 'black', available: true },
    ],
  },
  {
    id: '5',
    name: 'Reloj Deportivo Digital',
    price: 199990,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    category: 'Accesorios',
    brand: 'Nike',
    rating: 4.6,
    reviewCount: 203,
    inStock: false,
    isNew: false,
    isSale: false,
    colors: [
      { name: 'Negro', value: 'black', available: true },
      { name: 'Blanco', value: 'white', available: true },
    ],
  },
  {
    id: '6',
    name: 'Mochila Urbana Resistente',
    price: 79990,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    category: 'Accesorios',
    brand: 'Adidas',
    rating: 4.4,
    reviewCount: 145,
    inStock: true,
    isNew: true,
    isSale: false,
    colors: [
      { name: 'Negro', value: 'black', available: true },
      { name: 'Gris', value: 'gray', available: true },
      { name: 'Azul', value: 'blue', available: true },
    ],
  },
];

const sampleFilters: Filter[] = [
  {
    id: 'category',
    name: 'Categoría',
    type: 'checkbox',
    options: [
      { id: 'ropa', label: 'Ropa', value: 'ropa', count: 3 },
      { id: 'calzado', label: 'Calzado', value: 'calzado', count: 1 },
      { id: 'accesorios', label: 'Accesorios', value: 'accesorios', count: 2 },
    ],
  },
  {
    id: 'price',
    name: 'Precio',
    type: 'range',
    min: 0,
    max: 250000,
  },
  {
    id: 'brand',
    name: 'Marca',
    type: 'checkbox',
    options: [
      { id: 'nike', label: 'Nike', value: 'nike', count: 3 },
      { id: 'adidas', label: 'Adidas', value: 'adidas', count: 2 },
      { id: 'puma', label: 'Puma', value: 'puma', count: 1 },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    type: 'color',
    options: [
      { id: 'black', label: 'Negro', value: 'black', color: '#000000', count: 6 },
      { id: 'white', label: 'Blanco', value: 'white', color: '#FFFFFF', count: 4 },
      { id: 'blue', label: 'Azul', value: 'blue', color: '#3B82F6', count: 3 },
      { id: 'gray', label: 'Gris', value: 'gray', color: '#6B7280', count: 1 },
    ],
  },
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Blocks/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Grilla de productos completa con filtros avanzados, ordenamiento, paginación y vistas de grilla/lista. Optimizada para ecommerce.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showFilters: {
      control: 'boolean',
      description: 'Mostrar panel de filtros',
    },
    showSorting: {
      control: 'boolean',
      description: 'Mostrar opciones de ordenamiento',
    },
    showViewToggle: {
      control: 'boolean',
      description: 'Mostrar toggle entre vista grilla/lista',
    },
    gridCols: {
      control: 'select',
      options: [2, 3, 4, 5],
      description: 'Número de columnas en la grilla',
    },
    itemsPerPage: {
      control: 'number',
      description: 'Productos por página',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    products: sampleProducts,
    filters: sampleFilters,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
    onQuickView: (product) => console.log('Vista rápida:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const WithoutFilters: Story = {
  args: {
    products: sampleProducts,
    showFilters: false,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const TwoColumns: Story = {
  args: {
    products: sampleProducts,
    filters: sampleFilters,
    gridCols: 2,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const FourColumns: Story = {
  args: {
    products: sampleProducts,
    filters: sampleFilters,
    gridCols: 4,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    products: [],
    filters: sampleFilters,
    loading: true,
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const EmptyState: Story = {
  args: {
    products: [],
    filters: sampleFilters,
    emptyMessage: 'No se encontraron productos que coincidan con tus filtros',
    onProductClick: (product) => console.log('Ver producto:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const MinimalView: Story = {
  args: {
    products: sampleProducts,
    showFilters: false,
    showSorting: false,
    showViewToggle: false,
    gridCols: 3,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {
    products: sampleProducts,
    filters: sampleFilters,
    onProductClick: (product) => console.log('Ver producto:', product.name),
    onAddToCart: (product) => console.log('Agregar al carrito:', product.name),
    onAddToWishlist: (product) => console.log('Agregar a favoritos:', product.name),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

