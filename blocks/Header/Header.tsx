import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X,
  ChevronDown,
  MapPin,
  Phone
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { SearchInput, SearchSuggestion } from '@/components/SearchInput';
import { Button } from '@/components/Button';
import { Category, CartItem } from '@/types';

export interface HeaderProps {
  logo?: React.ReactNode;
  categories?: Category[];
  cartItems?: CartItem[];
  wishlistCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  searchSuggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: Category) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'full';
  showTopBar?: boolean;
  showCategories?: boolean;
  sticky?: boolean;
}

const sampleCategories: Category[] = [
  { id: '1', name: 'Ropa', slug: 'ropa', productCount: 1250 },
  { id: '2', name: 'Calzado', slug: 'calzado', productCount: 890 },
  { id: '3', name: 'Accesorios', slug: 'accesorios', productCount: 650 },
  { id: '4', name: 'Deportes', slug: 'deportes', productCount: 420 },
  { id: '5', name: 'Hogar', slug: 'hogar', productCount: 780 },
  { id: '6', name: 'Tecnología', slug: 'tecnologia', productCount: 340 },
];

export const Header: React.FC<HeaderProps> = ({
  logo,
  categories = sampleCategories,
  cartItems = [],
  wishlistCount = 0,
  isLoggedIn = false,
  userName,
  userAvatar,
  searchSuggestions = [],
  onSearch,
  onCategoryClick,
  onCartClick,
  onWishlistClick,
  onLoginClick,
  onProfileClick,
  className,
  variant = 'default',
  showTopBar = true,
  showCategories = true,
  sticky = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const DefaultLogo = () => (
    <div className="text-xl font-bold text-gray-900">
      TiendaOnline
    </div>
  );

  return (
    <header className={cn(
      'bg-white border-b border-gray-200',
      sticky && 'sticky top-0 z-50',
      className
    )}>
      {/* Top Bar */}
      {showTopBar && variant === 'full' && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone size={14} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={14} />
                  <span>Envío gratis en pedidos +$50</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Ayuda
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Seguir pedido
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ml-2 lg:ml-0">
              {logo || <DefaultLogo />}
            </div>
          </div>

          {/* Search Bar */}
          {variant !== 'minimal' && (
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchInput
                size="lg"
                variant="filled"
                placeholder="¿Qué estás buscando hoy?"
                suggestions={searchSuggestions}
                onSearch={onSearch}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Icon for Mobile */}
            {variant !== 'minimal' && (
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Lista de deseos"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* User Account */}
            {isLoggedIn ? (
              <div className="relative group">
                <button
                  onClick={onProfileClick}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="hidden md:block text-sm">{userName}</span>
                  <ChevronDown size={14} className="hidden md:block" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onLoginClick}
                leftIcon={<User size={16} />}
              >
                <span className="hidden sm:block">Iniciar sesión</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {variant !== 'minimal' && (
          <div className="lg:hidden pb-4">
            <SearchInput
              size="md"
              variant="filled"
              placeholder="Buscar productos..."
              suggestions={searchSuggestions}
              onSearch={onSearch}
            />
          </div>
        )}
      </div>

      {/* Categories Navigation */}
      {showCategories && variant !== 'minimal' && (
        <div className="hidden lg:block border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center h-12 space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryClick?.(category)}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={handleCategoryLeave}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    activeCategory === category.id
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {category.name}
                  {category.productCount && (
                    <span className="ml-1 text-xs text-gray-400">
                      ({category.productCount})
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4">
            {/* Categories */}
            {showCategories && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryClick?.(category);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Account Actions */}
            <div className="border-t border-gray-200 pt-4">
              {!isLoggedIn ? (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    onLoginClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  leftIcon={<User size={16} />}
                >
                  Iniciar sesión
                </Button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2"
                  >
                    Mi perfil
                  </button>
                  <button className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2">
                    Mis pedidos
                  </button>
                  <button className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

