import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'product' | 'category';
  category?: string;
  image?: string;
}

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  suggestions?: SearchSuggestion[];
  showSuggestions?: boolean;
  loading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'bordered';
}

const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

const variantClasses = {
  default: 'bg-white border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500',
  filled: 'bg-gray-100 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-500',
  bordered: 'bg-transparent border-2 border-gray-300 focus:border-gray-900',
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar productos...',
  value = '',
  onChange,
  onSearch,
  onClear,
  suggestions = [],
  showSuggestions = true,
  loading = false,
  className,
  size = 'md',
  variant = 'default',
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentValue = onChange ? value : internalValue;

  useEffect(() => {
    if (!onChange) {
      setInternalValue(value);
    }
  }, [value, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    setShowDropdown(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && currentValue.trim()) {
      onSearch(currentValue.trim());
      setShowDropdown(false);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange('');
    } else {
      setInternalValue('');
    }
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
    setShowDropdown(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (onChange) {
      onChange(suggestion.text);
    } else {
      setInternalValue(suggestion.text);
    }
    if (onSearch) {
      onSearch(suggestion.text);
    }
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (suggestions.length > 0 && showSuggestions) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding dropdown to allow for suggestion clicks
    setTimeout(() => setShowDropdown(false), 150);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(currentValue.toLowerCase())
  );

  const recentSuggestions = filteredSuggestions.filter(s => s.type === 'recent');
  const trendingSuggestions = filteredSuggestions.filter(s => s.type === 'trending');
  const productSuggestions = filteredSuggestions.filter(s => s.type === 'product');
  const categorySuggestions = filteredSuggestions.filter(s => s.type === 'category');

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              'w-full rounded-lg pl-10 pr-10 transition-all duration-200 focus:outline-none',
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
          />
          {(currentValue || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {loading ? (
                <div className="animate-spin">
                  <Search size={16} className="text-gray-400" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && showSuggestions && (filteredSuggestions.length > 0 || currentValue === '') && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-strong z-50 max-h-96 overflow-y-auto"
        >
          {currentValue === '' && (
            <>
              {/* Recent Searches */}
              {recentSuggestions.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Búsquedas recientes
                  </h4>
                  {recentSuggestions.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                    >
                      <Clock size={14} className="text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {trendingSuggestions.length > 0 && (
                <div className="p-3">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Tendencias
                  </h4>
                  {trendingSuggestions.slice(0, 5).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                    >
                      <TrendingUp size={14} className="text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {currentValue !== '' && (
            <>
              {/* Product Suggestions */}
              {productSuggestions.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Productos
                  </h4>
                  {productSuggestions.slice(0, 4).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                    >
                      {suggestion.image && (
                        <img
                          src={suggestion.image}
                          alt=""
                          className="w-8 h-8 object-cover rounded mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <span className="text-sm text-gray-700 block">{suggestion.text}</span>
                        {suggestion.category && (
                          <span className="text-xs text-gray-500">{suggestion.category}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Category Suggestions */}
              {categorySuggestions.length > 0 && (
                <div className="p-3">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Categorías
                  </h4>
                  {categorySuggestions.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                    >
                      <Search size={14} className="text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

