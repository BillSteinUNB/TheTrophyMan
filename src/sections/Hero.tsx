import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Custom trophies and awards"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max text-center pt-20">
        <div className="max-w-4xl mx-auto animate-fade-up">
          {/* Headline */}
          <h1 className="text-display text-white mb-6 tracking-tight">
            <span className="block">CUSTOM AWARDS.</span>
            <span className="block">PROMOTIONAL PRODUCTS.</span>
            <span className="block">MADE IN OROMOCTO.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Trusted by teams, businesses, and organizations across New Brunswick for over 25 years.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('#clothing')}
              className="group inline-flex items-center gap-2 bg-white text-mono-black px-8 py-4 text-sm font-semibold border-2 border-white transition-all duration-200 hover:bg-transparent hover:text-white focus-ring"
            >
              Browse Catalogs
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              className="group inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 text-sm font-semibold border-2 border-white transition-all duration-200 hover:bg-white hover:text-mono-black focus-ring"
            >
              Medal Mounting
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 text-sm font-semibold border-2 border-white transition-all duration-200 hover:bg-white hover:text-mono-black focus-ring"
            >
              Get in Touch
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
