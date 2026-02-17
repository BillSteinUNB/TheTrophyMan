import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTABanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      {/* Gold gradient background */}
      <div className="absolute inset-0 gradient-gold" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.3) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-black/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-black/10" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left content */}
          <div
            className={`text-center lg:text-left transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-black/70 text-lg max-w-xl">
              Let's create something amazing together. Whether it's trophies for your 
              team, branded apparel for your business, or promotional products— we've got you covered.
            </p>
          </div>

          {/* Right content - CTA */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              onClick={scrollToContact}
              className="bg-black text-gold hover:bg-black/80 transition-all duration-300 rounded-none px-8 py-6 text-sm font-semibold tracking-wide group"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <div className="flex items-center gap-4 text-black/70">
              <span className="text-sm">or call</span>
              <a
                href="tel:+15063578677"
                className="flex items-center gap-2 text-black font-medium hover:underline"
              >
                <Phone className="w-4 h-4" />
                (506) 357-8677
              </a>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-12 pt-8 border-t border-black/10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-black/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>Free Design Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>Rush Orders Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>Bulk Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
