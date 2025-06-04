import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { SearchSuggestion, Category, CartItem, Product } from '@/types';

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

const sampleCategories: Category[] = [
  { id: '1', name: 'Ropa', slug: 'ropa', productCount: 1250 },
  { id: '2', name: 'Calzado', slug: 'calzado', productCount: 890 },
  { id: '3', name: 'Accesorios', slug: 'accesorios', productCount: 650 },
  { id: '4', name: 'Deportes', slug: 'deportes', productCount: 420 },
  { id: '5', name: 'Hogar', slug: 'hogar', productCount: 780 },
  { id: '6', name: 'Tecnología', slug: 'tecnologia', productCount: 340 },
];

const sampleProduct: Product = {
  id: '1',
  name: 'Camiseta Premium',
  price: 29990,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
  category: 'Ropa',
  inStock: true,
};

const sampleCartItems: CartItem[] = [
  { product: sampleProduct, quantity: 2 },
  { product: { ...sampleProduct, id: '2', name: 'Zapatillas' }, quantity: 1 },
];

const meta: Meta<typeof Header> = {
  title: 'Blocks/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header completo para ecommerce con búsqueda, navegación por categorías, carrito, favoritos y gestión de usuario. Responsive y accesible.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'full'],
      description: 'Variante del header',
    },
    showTopBar: {
      control: 'boolean',
      description: 'Mostrar barra superior con información de contacto',
    },
    showCategories: {
      control: 'boolean',
      description: 'Mostrar navegación de categorías',
    },
    sticky: {
      control: 'boolean',
      description: 'Header pegajoso al hacer scroll',
    },
    isLoggedIn: {
      control: 'boolean',
      description: 'Estado de autenticación del usuario',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: sampleCartItems,
    wishlistCount: 3,
    isLoggedIn: false,
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onLoginClick: () => console.log('Iniciar sesión'),
  },
};

export const LoggedIn: Story = {
  args: {
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: sampleCartItems,
    wishlistCount: 5,
    isLoggedIn: true,
    userName: 'María García',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onProfileClick: () => console.log('Ver perfil'),
  },
};

export const FullVariant: Story = {
  args: {
    variant: 'full',
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: sampleCartItems,
    wishlistCount: 2,
    isLoggedIn: true,
    userName: 'Juan Pérez',
    showTopBar: true,
    showCategories: true,
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onProfileClick: () => console.log('Ver perfil'),
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    cartItems: [],
    wishlistCount: 0,
    isLoggedIn: false,
    showTopBar: false,
    showCategories: false,
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onLoginClick: () => console.log('Iniciar sesión'),
  },
};

export const EmptyCart: Story = {
  args: {
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: [],
    wishlistCount: 0,
    isLoggedIn: false,
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onLoginClick: () => console.log('Iniciar sesión'),
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
        <span className="text-xl font-bold text-gray-900">MiTienda</span>
      </div>
    ),
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: sampleCartItems,
    wishlistCount: 7,
    isLoggedIn: true,
    userName: 'Ana López',
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onProfileClick: () => console.log('Ver perfil'),
  },
};

export const MobileView: Story = {
  args: {
    categories: sampleCategories,
    searchSuggestions: sampleSearchSuggestions,
    cartItems: sampleCartItems,
    wishlistCount: 3,
    isLoggedIn: false,
    onSearch: (query) => console.log('Buscar:', query),
    onCategoryClick: (category) => console.log('Categoría:', category.name),
    onCartClick: () => console.log('Abrir carrito'),
    onWishlistClick: () => console.log('Abrir favoritos'),
    onLoginClick: () => console.log('Iniciar sesión'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

