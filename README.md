# 🛍️ Sistema de Diseño para Ecommerce

Un sistema de diseño completo tipo Storybook enfocado en ecommerce, construido con **Tailwind CSS**, **React** y **Next.js**. Inspirado visualmente en [shadcnblocks.com](https://www.shadcnblocks.com/) con el enfoque funcional de [ecomusnext](https://ecomusnext-themesflat.vercel.app/).

## ✨ Características

- 🎨 **Diseño moderno** inspirado en las mejores prácticas de ecommerce
- 📱 **Responsive** y mobile-first
- ♿ **Accesible** con soporte completo para lectores de pantalla
- 🔧 **Modular** y fácil de personalizar
- 📚 **Documentado** con Storybook
- 🎯 **Optimizado** para conversión en ecommerce
- 🌱 **Sostenible** con código limpio y mantenible

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar Storybook
npm run storybook

# Ejecutar Next.js (desarrollo)
npm run dev
```

### Uso Básico

```tsx
import { Button, ProductCard, SearchInput } from './components';
import { Header, ProductGrid } from './blocks';
import { HomePage, ProductPage } from './templates';

// Usar componentes individuales
<Button variant="primary">Comprar ahora</Button>

// Usar bloques completos
<Header categories={categories} />

// Usar templates completos
<HomePage featuredProducts={products} />
```

## 🧱 Arquitectura

### Componentes
Elementos individuales y reutilizables:
- **Button** - Botones con múltiples variantes
- **ProductCard** - Tarjeta de producto con acciones
- **SearchInput** - Búsqueda con sugerencias inteligentes

### Bloques
Agrupaciones funcionales de componentes:
- **Header** - Navegación completa con búsqueda y carrito
- **ProductGrid** - Grilla de productos con filtros avanzados

### Templates
Páginas completas listas para usar:
- **HomePage** - Página de inicio con hero y secciones
- **ProductPage** - Página de producto con galería y reseñas

## 📁 Estructura del Proyecto

```
├── components/          # Componentes individuales
│   ├── Button/
│   ├── ProductCard/
│   └── SearchInput/
├── blocks/             # Bloques funcionales
│   ├── Header/
│   └── ProductGrid/
├── templates/          # Templates completos
│   ├── HomePage/
│   └── ProductPage/
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades
├── styles/             # Estilos globales
└── .storybook/         # Configuración Storybook
```

## 🎨 Sistema de Colores

```css
/* Colores principales */
--primary-500: #0ea5e9;    /* Azul principal */
--gray-900: #111827;       /* Negro principal */
--success-500: #22c55e;    /* Verde éxito */
--warning-500: #f59e0b;    /* Amarillo advertencia */
--error-500: #ef4444;      /* Rojo error */
```

## 📱 Responsive Design

Todos los componentes están optimizados para:
- 📱 **Mobile** (375px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large** (1440px+)

## 🔧 Personalización

### Tailwind CSS
Modifica `tailwind.config.js` para personalizar:
- Colores de marca
- Tipografías
- Espaciados
- Animaciones

### Componentes
Cada componente acepta props de personalización:

```tsx
<Button 
  variant="primary" 
  size="lg"
  leftIcon={<ShoppingCart />}
  fullWidth
>
  Agregar al carrito
</Button>
```

## 📚 Documentación

### Storybook
Ejecuta `npm run storybook` para ver:
- 📖 Documentación interactiva
- 🎮 Controles en tiempo real
- 📱 Vista responsive
- 🎨 Variantes de componentes

### TypeScript
Tipos completos para:
- Props de componentes
- Datos de productos
- Estados de aplicación
- Eventos y callbacks

## 🛒 Casos de Uso

### Ecommerce Básico
```tsx
import { HomePage } from './templates';

<HomePage 
  featuredProducts={products}
  categories={categories}
  onAddToCart={handleAddToCart}
/>
```

### Catálogo de Productos
```tsx
import { ProductGrid } from './blocks';

<ProductGrid 
  products={products}
  filters={filters}
  showFilters={true}
  gridCols={4}
/>
```

### Página de Producto
```tsx
import { ProductPage } from './templates';

<ProductPage 
  product={product}
  reviews={reviews}
  relatedProducts={related}
/>
```

## 🎯 Optimización para Conversión

- ⚡ **Carga rápida** con lazy loading
- 🔍 **SEO optimizado** con meta tags
- 📊 **Analytics ready** con eventos tracking
- 🛒 **UX optimizada** para checkout
- 💳 **Trust signals** integrados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) por el framework CSS
- [Storybook](https://storybook.js.org/) por la documentación
- [Lucide](https://lucide.dev/) por los iconos
- [Unsplash](https://unsplash.com/) por las imágenes de ejemplo

---

**¿Necesitas ayuda?** Abre un [issue](../../issues) o consulta la [documentación](../../wiki).

