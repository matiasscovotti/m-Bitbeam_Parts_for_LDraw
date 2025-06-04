import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput, SearchSuggestion } from './SearchInput';

const sampleSuggestions: SearchSuggestion[] = [
  // Recent searches
  { id: '1', text: 'camisetas', type: 'recent' },
  { id: '2', text: 'zapatillas nike', type: 'recent' },
  { id: '3', text: 'pantalones jeans', type: 'recent' },
  
  // Trending searches
  { id: '4', text: 'ropa de verano', type: 'trending' },
  { id: '5', text: 'ofertas black friday', type: 'trending' },
  { id: '6', text: 'accesorios tech', type: 'trending' },
  { id: '7', text: 'decoración hogar', type: 'trending' },
  
  // Product suggestions
  { 
    id: '8', 
    text: 'Camiseta Premium Algodón', 
    type: 'product', 
    category: 'Ropa',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop'
  },
  { 
    id: '9', 
    text: 'Zapatillas Deportivas Pro', 
    type: 'product', 
    category: 'Calzado',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop'
  },
  { 
    id: '10', 
    text: 'Chaqueta Cuero Sintético', 
    type: 'product', 
    category: 'Abrigos',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=50&h=50&fit=crop'
  },
  
  // Category suggestions
  { id: '11', text: 'Ropa Hombre', type: 'category' },
  { id: '12', text: 'Ropa Mujer', type: 'category' },
  { id: '13', text: 'Calzado Deportivo', type: 'category' },
];

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input de búsqueda avanzado con sugerencias inteligentes, búsquedas recientes, tendencias y autocompletado. Optimizado para ecommerce.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'bordered'],
      description: 'Variante visual del input',
    },
    showSuggestions: {
      control: 'boolean',
      description: 'Mostrar dropdown de sugerencias',
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
    placeholder: 'Buscar productos...',
    suggestions: sampleSuggestions,
    onSearch: (query) => console.log('Buscar:', query),
    onChange: (value) => console.log('Cambio:', value),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    value: 'camiseta',
    suggestions: sampleSuggestions,
    onSearch: (query) => console.log('Buscar:', query),
    onChange: (value) => console.log('Cambio:', value),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    value: 'buscando...',
    loading: true,
    suggestions: sampleSuggestions,
    onSearch: (query) => console.log('Buscar:', query),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const WithoutSuggestions: Story = {
  args: {
    placeholder: 'Búsqueda simple...',
    showSuggestions: false,
    onSearch: (query) => console.log('Buscar:', query),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Buscar en la tienda...',
    suggestions: sampleSuggestions,
    onSearch: (query) => console.log('Buscar:', query),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const BorderedVariant: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Buscar productos...',
    suggestions: sampleSuggestions,
    onSearch: (query) => console.log('Buscar:', query),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pequeño</label>
        <SearchInput
          size="sm"
          placeholder="Búsqueda pequeña..."
          suggestions={sampleSuggestions.slice(0, 5)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mediano</label>
        <SearchInput
          size="md"
          placeholder="Búsqueda mediana..."
          suggestions={sampleSuggestions.slice(0, 5)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Grande</label>
        <SearchInput
          size="lg"
          placeholder="Búsqueda grande..."
          suggestions={sampleSuggestions.slice(0, 5)}
        />
      </div>
    </div>
  ),
};

export const EcommerceHeader: Story = {
  render: () => (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div className="text-xl font-bold text-gray-900">TiendaOnline</div>
        <div className="flex-1 max-w-2xl">
          <SearchInput
            size="lg"
            variant="filled"
            placeholder="¿Qué estás buscando hoy?"
            suggestions={sampleSuggestions}
            onSearch={(query) => console.log('Buscar:', query)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">Cuenta</button>
          <button className="text-gray-600 hover:text-gray-900">Carrito (0)</button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

