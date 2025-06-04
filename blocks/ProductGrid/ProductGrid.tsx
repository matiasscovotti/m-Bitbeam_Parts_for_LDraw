import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Product, Filter as FilterType, FilterOption } from '@/types';

export interface ProductGridProps {
  products: Product[];
  filters?: FilterType[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
  showFilters?: boolean;
  showSorting?: boolean;
  showViewToggle?: boolean;
  itemsPerPage?: number;
  loading?: boolean;
  emptyMessage?: string;
  gridCols?: 2 | 3 | 4 | 5;
}

type SortOption = {
  id: string;
  label: string;
  value: string;
};

type ViewMode = 'grid' | 'list';

const sortOptions: SortOption[] = [
  { id: 'featured', label: 'Destacados', value: 'featured' },
  { id: 'price-low', label: 'Precio: Menor a mayor', value: 'price-asc' },
  { id: 'price-high', label: 'Precio: Mayor a menor', value: 'price-desc' },
  { id: 'name', label: 'Nombre A-Z', value: 'name-asc' },
  { id: 'rating', label: 'Mejor valorados', value: 'rating-desc' },
  { id: 'newest', label: 'Más recientes', value: 'newest' },
];

const sampleFilters: FilterType[] = [
  {
    id: 'category',
    name: 'Categoría',
    type: 'checkbox',
    options: [
      { id: 'ropa', label: 'Ropa', value: 'ropa', count: 245 },
      { id: 'calzado', label: 'Calzado', value: 'calzado', count: 128 },
      { id: 'accesorios', label: 'Accesorios', value: 'accesorios', count: 89 },
    ],
  },
  {
    id: 'price',
    name: 'Precio',
    type: 'range',
    min: 0,
    max: 500000,
  },
  {
    id: 'brand',
    name: 'Marca',
    type: 'checkbox',
    options: [
      { id: 'nike', label: 'Nike', value: 'nike', count: 45 },
      { id: 'adidas', label: 'Adidas', value: 'adidas', count: 38 },
      { id: 'puma', label: 'Puma', value: 'puma', count: 22 },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    type: 'color',
    options: [
      { id: 'black', label: 'Negro', value: 'black', color: '#000000', count: 67 },
      { id: 'white', label: 'Blanco', value: 'white', color: '#FFFFFF', count: 54 },
      { id: 'blue', label: 'Azul', value: 'blue', color: '#3B82F6', count: 43 },
      { id: 'red', label: 'Rojo', value: 'red', color: '#EF4444', count: 32 },
    ],
  },
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters = sampleFilters,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className,
  showFilters = true,
  showSorting = true,
  showViewToggle = true,
  itemsPerPage = 12,
  loading = false,
  emptyMessage = 'No se encontraron productos',
  gridCols = 3,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedFilters.category?.length > 0) {
        if (!selectedFilters.category.includes(product.category.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (selectedFilters.price) {
        const [min, max] = selectedFilters.price;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Brand filter
      if (selectedFilters.brand?.length > 0) {
        if (!product.brand || !selectedFilters.brand.includes(product.brand.toLowerCase())) {
          return false;
        }
      }

      // Color filter
      if (selectedFilters.color?.length > 0) {
        if (!product.colors?.some(color => 
          selectedFilters.color.includes(color.name.toLowerCase())
        )) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedFilters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleFilterChange = (filterId: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const activeFiltersCount = Object.keys(selectedFilters).length;

  const gridColsClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  };

  const FilterSection: React.FC<{ filter: FilterType }> = ({ filter }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">{filter.name}</h3>
          <ChevronDown 
            size={16} 
            className={cn('transition-transform', isOpen && 'rotate-180')} 
          />
        </button>
        
        {isOpen && (
          <div className="mt-3 space-y-2">
            {filter.type === 'checkbox' && filter.options && (
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter.id]?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentValues = selectedFilters[filter.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter((v: string) => v !== option.value);
                        handleFilterChange(filter.id, newValues.length > 0 ? newValues : undefined);
                      }}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {option.label}
                      {option.count && (
                        <span className="text-gray-500 ml-1">({option.count})</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {filter.type === 'range' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    min={filter.min}
                    max={filter.max}
                    value={selectedFilters[filter.id]?.[0] || ''}
                    onChange={(e) => {
                      const min = parseInt(e.target.value) || filter.min;
                      const max = selectedFilters[filter.id]?.[1] || filter.max;
                      handleFilterChange(filter.id, [min, max]);
                    }}
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    min={filter.min}
                    max={filter.max}
                    value={selectedFilters[filter.id]?.[1] || ''}
                    onChange={(e) => {
                      const min = selectedFilters[filter.id]?.[0] || filter.min;
                      const max = parseInt(e.target.value) || filter.max;
                      handleFilterChange(filter.id, [min, max]);
                    }}
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
            )}

            {filter.type === 'color' && filter.options && (
              <div className="flex flex-wrap gap-2">
                {filter.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      const currentValues = selectedFilters[filter.id] || [];
                      const isSelected = currentValues.includes(option.value);
                      const newValues = isSelected
                        ? currentValues.filter((v: string) => v !== option.value)
                        : [...currentValues, option.value];
                      handleFilterChange(filter.id, newValues.length > 0 ? newValues : undefined);
                    }}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all',
                      selectedFilters[filter.id]?.includes(option.value)
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                    style={{ backgroundColor: option.color }}
                    title={option.label}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('flex gap-8', className)}>
      {/* Filters Sidebar */}
      {showFilters && (
        <>
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Limpiar todo
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {filters.map((filter) => (
                  <FilterSection key={filter.id} filter={filter} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto h-full pb-20">
                <div className="space-y-4">
                  {filters.map((filter) => (
                    <FilterSection key={filter.id} filter={filter} />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="flex-1"
                  >
                    Limpiar
                  </Button>
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1"
                  >
                    Ver resultados ({sortedProducts.length})
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(true)}
                leftIcon={<SlidersHorizontal size={16} />}
                className="lg:hidden"
              >
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1 bg-gray-900 text-white text-xs rounded-full px-1.5 py-0.5">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            )}

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              {loading ? 'Cargando...' : `${sortedProducts.length} productos`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sorting */}
            {showSorting && (
              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* View Toggle */}
            {showViewToggle && (
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <List size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {Object.entries(selectedFilters).map(([filterId, value]) => {
              const filter = filters.find(f => f.id === filterId);
              if (!filter) return null;

              if (Array.isArray(value)) {
                return value.map((v) => (
                  <span
                    key={`${filterId}-${v}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                  >
                    {filter.name}: {v}
                    <button
                      onClick={() => {
                        const newValues = value.filter((val: string) => val !== v);
                        handleFilterChange(filterId, newValues.length > 0 ? newValues : undefined);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ));
              } else if (filter.type === 'range') {
                return (
                  <span
                    key={filterId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                  >
                    {filter.name}: ${value[0]} - ${value[1]}
                    <button
                      onClick={() => clearFilter(filterId)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        ) : (
          <>
            <div className={cn(
              viewMode === 'grid' 
                ? `grid gap-6 ${gridColsClasses[gridCols]}`
                : 'space-y-4'
            )}>
              {paginatedProducts.map((product) => (
                <div key={product.id} onClick={() => onProductClick?.(product)}>
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                    onQuickView={onQuickView}
                    imageAspectRatio={viewMode === 'list' ? 'square' : 'portrait'}
                    className={viewMode === 'list' ? 'flex gap-4' : ''}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

