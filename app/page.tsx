import { HomePage } from '@/templates/HomePage';

export default function Home() {
  return (
    <HomePage 
      onProductClick={(product) => console.log('Ver producto:', product.name)}
      onAddToCart={(product) => console.log('Agregar al carrito:', product.name)}
      onAddToWishlist={(product) => console.log('Agregar a favoritos:', product.name)}
      onCategoryClick={(category) => console.log('Ver categoría:', category.name)}
      onHeroCtaClick={() => console.log('Hero CTA clicked')}
    />
  );
}

