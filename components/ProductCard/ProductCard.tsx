import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Product } from '@/types';
import { Button } from '../Button';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
  showQuickActions?: boolean;
  showBadges?: boolean;
  imageAspectRatio?: 'square' | 'portrait' | 'landscape';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className,
  showQuickActions = true,
  showBadges = true,
  imageAspectRatio = 'portrait',
}) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  return (
    <div className={cn(
      'group relative bg-white rounded-lg border border-gray-200 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden',
      className
    )}>
      {/* Image Container */}
      <div className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatioClasses[imageAspectRatio]
      )}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        {showBadges && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
                Nuevo
              </span>
            )}
            {product.isSale && discountPercentage > 0 && (
              <span className="bg-error-500 text-white text-xs font-medium px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
                Agotado
              </span>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onAddToWishlist && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToWishlist(product);
                }}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Agregar a favoritos"
              >
                <Heart size={16} className="text-gray-600" />
              </button>
            )}
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Vista rápida"
              >
                <Eye size={16} className="text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* Quick Add to Cart */}
        {onAddToCart && product.inStock && (
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<ShoppingCart size={14} />}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
            >
              Agregar al carrito
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
        )}

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={cn(
                    'fill-current',
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-3">
            <span className="text-xs text-gray-500 mr-1">Colores:</span>
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className={cn(
                  'w-4 h-4 rounded-full border border-gray-300',
                  !color.available && 'opacity-50'
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

