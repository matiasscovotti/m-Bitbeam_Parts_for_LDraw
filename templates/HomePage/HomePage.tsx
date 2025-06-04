import React from 'react';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Header } from '@/blocks/Header';
import { ProductGrid } from '@/blocks/ProductGrid';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';
import { Product, Category, SearchSuggestion } from '@/types';

export interface HomePageProps {
  featuredProducts?: Product[];
  newProducts?: Product[];
  saleProducts?: Product[];
  categories?: Category[];
  searchSuggestions?: SearchSuggestion[];
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  onHeroCtaClick?: () => void;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onCategoryClick?: (category: Category) => void;
  className?: string;
}

const defaultFeaturedProducts: Product[] = [
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
  },
];

const defaultCategories: Category[] = [
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

export const HomePage: React.FC<HomePageProps> = ({
  featuredProducts = defaultFeaturedProducts,
  newProducts = defaultFeaturedProducts.filter(p => p.isNew),
  saleProducts = defaultFeaturedProducts.filter(p => p.isSale),
  categories = defaultCategories,
  searchSuggestions = [],
  heroImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
  heroTitle = 'Descubre la moda que te define',
  heroSubtitle = 'Encuentra las últimas tendencias en ropa, calzado y accesorios con la mejor calidad y precios increíbles.',
  heroCtaText = 'Explorar colección',
  onHeroCtaClick,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onCategoryClick,
  className,
}) => {
  const features = [
    {
      icon: Truck,
      title: 'Envío gratis',
      description: 'En compras superiores a $50.000',
    },
    {
      icon: Shield,
      title: 'Compra segura',
      description: 'Protección total en tus pagos',
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención al cliente siempre disponible',
    },
    {
      icon: Star,
      title: 'Calidad garantizada',
      description: 'Productos de las mejores marcas',
    },
  ];

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Header */}
      <Header
        categories={categories}
        searchSuggestions={searchSuggestions}
        onCategoryClick={onCategoryClick}
        variant="full"
      />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-slide-up">
            {heroSubtitle}
          </p>
          <Button
            size="lg"
            onClick={onHeroCtaClick}
            rightIcon={<ArrowRight size={20} />}
            className="bg-white text-gray-900 hover:bg-gray-100 animate-scale-in"
          >
            {heroCtaText}
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  <feature.icon size={24} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora nuestras categorías
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra exactamente lo que buscas en nuestras categorías principales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick?.(category)}
                className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] hover:shadow-medium transition-all duration-300"
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  {category.productCount && (
                    <p className="text-sm opacity-90">
                      {category.productCount} productos
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Productos destacados
              </h2>
              <p className="text-lg text-gray-600">
                Los productos más populares y mejor valorados
              </p>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nuevos productos
                </h2>
                <p className="text-lg text-gray-600">
                  Las últimas incorporaciones a nuestro catálogo
                </p>
              </div>
              <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                Ver todos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-error-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ofertas especiales
                </h2>
                <p className="text-lg text-gray-600">
                  Aprovecha estos descuentos por tiempo limitado
                </p>
              </div>
              <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                Ver todas las ofertas
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mantente al día con las últimas tendencias
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas, nuevos productos y consejos de moda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">TiendaOnline</h3>
              <p className="text-gray-600 text-sm">
                Tu destino para la moda y el estilo. Calidad, variedad y los mejores precios.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => onCategoryClick?.(category)}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Envíos y devoluciones</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Guía de tallas</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 TiendaOnline. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

