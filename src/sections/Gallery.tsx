import { useState, useEffect, useRef } from 'react';
import { ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const categories = ['All', 'Trophies', 'Medals', 'Apparel', 'Pens', 'Promo'];

const galleryItems = [
  {
    id: 1,
    image: '/images/service-trophies.jpg',
    title: 'Gold Cup Trophies',
    category: 'Trophies',
    description: 'Classic championship trophies for sports teams and competitions',
  },
  {
    id: 2,
    image: '/images/service-awards.jpg',
    title: 'Crystal Awards',
    category: 'Trophies',
    description: 'Elegant crystal awards for corporate recognition',
  },
  {
    id: 3,
    image: '/images/gallery-sports-1.jpg',
    title: 'Medal Sets',
    category: 'Medals',
    description: 'Complete medal sets with ribbons for tournaments',
  },
  {
    id: 4,
    image: '/images/service-apparel.jpg',
    title: 'Custom Team Jerseys',
    category: 'Apparel',
    description: 'Screen printed and embroidered team apparel',
  },
  {
    id: 5,
    image: '/images/gallery-apparel-2.jpg',
    title: 'Varsity Jackets',
    category: 'Apparel',
    description: 'Custom embroidered championship jackets',
  },
  {
    id: 6,
    image: '/images/service-promo.jpg',
    title: 'Promotional Pens',
    category: 'Pens',
    description: 'Engraved and printed pens for corporate gifts',
  },
  {
    id: 7,
    image: '/images/gallery-signs-1.jpg',
    title: 'Brass Plaques',
    category: 'Trophies',
    description: 'Professional engraved plaques for recognition',
  },
  {
    id: 8,
    image: '/images/service-engraving.jpg',
    title: 'Custom Engraving',
    category: 'Promo',
    description: 'Precision engraving on various materials',
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredItems]);

  useEffect(() => {
    setVisibleItems(new Set());
  }, [activeFilter]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-black"
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-gold text-sm font-mono uppercase tracking-widest mb-4">
            Our Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Product Gallery
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Browse examples of our custom trophies, awards, apparel, and promotional products.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                activeFilter === category
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-white/70 border-white/20 hover:border-gold hover:text-gold'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => {
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={item.id}
                data-index={index}
                onClick={() => setSelectedItem(item)}
                className={`group relative aspect-square overflow-hidden cursor-pointer bg-black-card transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-gold text-xs uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-medium text-sm">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-black" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Shop CTA */}
        <div className="mt-10 text-center">
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-gold text-black px-8 py-3 font-medium hover:bg-gold-light transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl bg-black-card border-white/10 p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedItem?.title || 'Gallery Item'}
          </DialogTitle>
          {selectedItem && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-gold text-xs uppercase tracking-wider mb-2">
                  {selectedItem.category}
                </span>
                <h3 className="font-display text-2xl text-white mb-3">
                  {selectedItem.title}
                </h3>
                <p className="text-white/60 mb-6">
                  {selectedItem.description}
                </p>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="self-start bg-gold text-black px-6 py-3 font-medium hover:bg-gold-light transition-colors"
                >
                  Shop Similar Items
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
