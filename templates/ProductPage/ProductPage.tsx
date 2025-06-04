import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { Header } from '@/blocks/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';
import { Product, Color, Size, Review } from '@/types';

export interface ProductPageProps {
  product: Product;
  relatedProducts?: Product[];
  reviews?: Review[];
  onAddToCart?: (product: Product, quantity: number, selectedColor?: Color, selectedSize?: Size) => void;
  onAddToWishlist?: (product: Product) => void;
  onShare?: (product: Product) => void;
  onReviewSubmit?: (review: Omit<Review, 'id' | 'date'>) => void;
  className?: string;
}

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
  description: 'Camiseta de alta calidad confeccionada en algodón orgánico 100%. Diseño moderno y cómodo, perfecto para el uso diario. Fabricada con procesos sostenibles y materiales eco-friendly.',
  features: [
    'Algodón orgánico 100%',
    'Corte regular fit',
    'Cuello redondo reforzado',
    'Costuras dobles para mayor durabilidad',
    'Certificación GOTS',
    'Lavable en máquina',
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

const sampleReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'María García',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    comment: 'Excelente calidad, muy cómoda y el material se siente premium. La talla es exacta y el color es tal como se ve en las fotos.',
    date: '2024-01-15',
    helpful: 12,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Carlos López',
    rating: 4,
    comment: 'Buena camiseta, aunque esperaba que fuera un poco más gruesa. El algodón orgánico se nota en la suavidad.',
    date: '2024-01-10',
    helpful: 8,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Ana Rodríguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    comment: 'Me encanta! Es mi tercera camiseta de esta marca. La calidad es consistente y el envío fue súper rápido.',
    date: '2024-01-08',
    helpful: 15,
  },
];

export const ProductPage: React.FC<ProductPageProps> = ({
  product = sampleProduct,
  relatedProducts = [],
  reviews = sampleReviews,
  onAddToCart,
  onAddToWishlist,
  onShare,
  onReviewSubmit,
  className,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    product.colors?.find(c => c.available)
  );
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    product.sizes?.find(s => s.available)
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  const images = product.images || [product.image];
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating || 0;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedColor, selectedSize);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn('min-h-screen bg-white', className)}>
      {/* Header */}
      <Header variant="default" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <span>Inicio</span>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImageIndex === index
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-lg text-gray-600 mb-4">
                  por <span className="font-medium">{product.brand}</span>
                </p>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        'fill-current',
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} reseñas)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-error-100 text-error-800 text-sm font-medium px-2 py-1 rounded">
                  Ahorra {discountPercentage}%
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color: {selectedColor?.name}
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.available && setSelectedColor(color)}
                      disabled={!color.available}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        selectedColor?.name === color.name
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-400',
                        !color.available && 'opacity-50 cursor-not-allowed'
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Talla: {selectedSize?.name}
                </h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.available && setSelectedSize(size)}
                      disabled={!size.available}
                      className={cn(
                        'px-4 py-2 border rounded-lg text-sm font-medium transition-all',
                        selectedSize?.name === size.name
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400',
                        !size.available && 'opacity-50 cursor-not-allowed line-through'
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Cantidad</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {product.inStock ? (
                  <span className="flex items-center gap-1 text-sm text-success-600">
                    <Check size={16} />
                    En stock
                  </span>
                ) : (
                  <span className="text-sm text-error-600">Agotado</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="h-12"
              >
                {product.inStock ? 'Agregar al carrito' : 'Producto agotado'}
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onAddToWishlist?.(product)}
                  leftIcon={<Heart size={16} />}
                  className="flex-1"
                >
                  Favoritos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onShare?.(product)}
                  leftIcon={<Share2 size={16} />}
                  className="flex-1"
                >
                  Compartir
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck size={16} />
                  <span>Envío gratis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={16} />
                  <span>Compra segura</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw size={16} />
                  <span>30 días devolución</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Descripción' },
                { id: 'reviews', label: `Reseñas (${reviews.length})` },
                { id: 'shipping', label: 'Envío y devoluciones' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Características principales
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <Check size={16} className="text-success-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Reseñas de clientes
                  </h3>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-4">
                          {review.userAvatar && (
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {review.userName}
                              </h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={cn(
                                      'fill-current',
                                      i < review.rating
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            {review.helpful && (
                              <button className="text-sm text-gray-500 hover:text-gray-700">
                                ¿Te resultó útil? ({review.helpful})
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Información de envío
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Envío gratis en compras superiores a $50.000</li>
                      <li>• Entrega en 2-5 días hábiles</li>
                      <li>• Seguimiento en tiempo real</li>
                      <li>• Empaque ecológico</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Política de devoluciones
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 30 días para devoluciones</li>
                      <li>• Producto en condiciones originales</li>
                      <li>• Reembolso completo o cambio</li>
                      <li>• Proceso simple y rápido</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

