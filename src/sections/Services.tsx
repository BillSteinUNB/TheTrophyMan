import { useEffect, useRef, useState } from 'react';
import { Trophy, PenTool, Shirt, Signpost, Gift, Sticker, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Trophy,
    title: 'Trophies & Awards',
    description: 'Custom trophies, medals, plaques, crystal and acrylic awards for every occasion.',
    link: '#shop',
  },
  {
    icon: PenTool,
    title: 'Engraving',
    description: 'Precision laser engraving on metal, wood, glass, and acrylic materials.',
    link: '#shop',
  },
  {
    icon: Shirt,
    title: 'Custom Apparel',
    description: 'Screen printing and embroidery for t-shirts, hoodies, hats, and uniforms.',
    link: '#shop',
  },
  {
    icon: Signpost,
    title: 'Signs & Banners',
    description: 'Vinyl banners, vehicle graphics, decals, and storefront signage.',
    link: '#contact',
  },
  {
    icon: Gift,
    title: 'Promotional Products',
    description: 'Branded merchandise including mugs, pens, keychains, and corporate gifts.',
    link: '#shop',
  },
  {
    icon: Sticker,
    title: 'Vinyl & Stickers',
    description: 'Custom decals, labels, and die-cut stickers for any application.',
    link: '#contact',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-black-card"
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-gold text-sm font-mono uppercase tracking-widest mb-4">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            From concept to creation, we deliver quality products with personalized service.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.has(index);

            return (
              <a
                key={service.title}
                href={service.link}
                data-index={index}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(service.link)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group bg-black border border-white/5 p-6 text-center hover:border-gold/50 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-white font-medium text-sm mb-2 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {service.description}
                </p>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            <span className="font-medium">Browse All Products</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
