import { useState, useEffect, useRef } from 'react';
import { Grid3X3, List } from 'lucide-react';
import { categories, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = getProductsByCategory(activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-black"
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="inline-block text-gold text-sm font-mono uppercase tracking-widest mb-3">
              Browse Our Collection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Shop Products
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Quality trophies, awards, apparel, and promotional products. 
              Bulk pricing available for larger orders.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'text-gold' : 'text-white/40 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' ? 'text-gold' : 'text-white/40 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-white/70 border-white/20 hover:border-gold hover:text-gold'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-white/40 text-sm">
          <span>Showing {filteredProducts.length} products</span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-gold hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-4 lg:gap-6 transition-all duration-700 delay-200 ${
            viewMode === 'grid'
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'grid-cols-1'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/50 text-lg">No products found in this category.</p>
            <Button
              onClick={() => setActiveCategory('all')}
              variant="outline"
              className="mt-4 border-gold text-gold hover:bg-gold hover:text-black rounded-none"
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Bulk Order CTA */}
        <div className="mt-16 p-8 bg-black-card border border-white/5 text-center">
          <h3 className="font-display text-xl text-white mb-2">
            Need a Custom Quote?
          </h3>
          <p className="text-white/50 mb-6 max-w-lg mx-auto">
            For large orders, custom designs, or special requests, contact us directly 
            for personalized pricing and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold text-black hover:bg-gold-light rounded-none"
            >
              Request Custom Quote
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-none"
              onClick={() => window.open('tel:+15063578677')}
            >
              Call (506) 357-8677
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
