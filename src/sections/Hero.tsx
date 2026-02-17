import { useEffect, useRef } from 'react';
import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToShop = () => {
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image - Full coverage */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Trophy collection"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-24">
          <div
            ref={textRef}
            className="max-w-2xl opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-3 py-1.5 mb-5">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Oromocto, New Brunswick</span>
            </div>

            {/* Gold accent line */}
            <div className="w-12 h-0.5 bg-gold mb-5" />

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Trophies, Awards & <span className="text-gold">Promotional Products</span>
            </h1>

            {/* Subhead */}
            <p className="text-base lg:text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              Locally owned in Oromocto, NB. Custom trophies, medals, plaques, apparel, 
              pens, and promotional items. Bulk pricing available with fast turnaround.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={scrollToShop}
                className="bg-gold text-black hover:bg-gold-light transition-all duration-200 rounded-none px-6 py-5 text-sm font-semibold group"
              >
                <ShoppingBag className="mr-2 w-4 h-4" />
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 rounded-none px-6 py-5 text-sm font-semibold"
              >
                Get a Quote
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-8">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>25+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Bulk Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span>Fast Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
