import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Supplier {
  name: string;
  category: string;
  url: string;
}

const suppliers: Supplier[] = [
  {
    name: 'SanMar Canada',
    category: 'Apparel & Uniforms',
    url: 'https://www.sanmarcanada.ca',
  },
  {
    name: 'PCNA',
    category: 'Promotional Products',
    url: 'https://www.pcna.com',
  },
  {
    name: 'Trophies2Go',
    category: 'Awards & Trophies',
    url: 'https://www.trophies2go.com',
  },
  {
    name: 'VistaPrint',
    category: 'Signs & Banners',
    url: 'https://www.vistaprint.com',
  },
];

const Suppliers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="suppliers"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-max">
        {/* Header */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-heading text-mono-black mb-3">SUPPLIER CATALOGS</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl">
            Browse our trusted suppliers for product ideas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {suppliers.map((supplier, index) => (
            <a
              key={supplier.name}
              href={supplier.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block border border-mono-200 p-6 md:p-8 text-center transition-all duration-300 hover:border-mono-black focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-mono-black mb-1">
                {supplier.name}
              </h3>
              <p className="text-sm text-mono-500 mb-6">{supplier.category}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-mono-black group-hover:underline">
                Browse Catalog
                <ExternalLink size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-500 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="text-mono-600 mb-4">Found something you like?</p>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-mono-black hover:underline focus-ring"
          >
            Request a Quote
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Suppliers;
