import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Supplier {
  name: string;
  url: string;
}

const suppliers: Supplier[] = [
  { name: 'AJM', url: 'https://www.ajmintl.com/' },
  { name: 'AlphaBroder', url: 'https://www.alphabroder.ca/home' },
  { name: 'Athletic Knit', url: 'https://www.athleticknit.com/' },
  { name: 'Augusta Sportswear', url: 'https://www.augustasportswear.com/' },
  { name: 'Biz Collection', url: 'https://www.bizcollection.ca/' },
  { name: 'Canada Sportswear', url: 'https://canadasportswear.com/' },
  { name: 'Fashion Biz', url: 'https://issuu.com/fashionbiznz/docs/2022_fashion_biz_-_ca?fr=sNDJkYjg2NjQ3' },
  { name: 'Kobe Sportswear', url: 'https://kobesportswear.com/' },
  { name: 'S&S Canada', url: 'https://en-ca.ssactivewear.com/' },
  { name: 'Sanmar', url: 'https://www.sanmarcanada.com/' },
  { name: 'Storm Tech', url: 'https://www.stormtech.ca/' },
  { name: 'TriMark Sportswear', url: 'https://www.trimarksportswear.com/home_page' },
];

const Clothing = () => {
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

  return (
    <section
      id="clothing"
      ref={sectionRef}
      className="section-padding bg-mono-off-white"
    >
      <div className="container-max">
        {/* Header with Image */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8">
            <img
              src="/cat-clothing.jpg"
              alt="Clothing & Accessories"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-heading text-mono-black mb-3">CLOTHING & ACCESSORIES</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl">
            Browse our trusted suppliers for apparel and accessories. Custom embroidery and screen printing available.
          </p>
        </div>

        {/* Supplier Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {suppliers.map((supplier, index) => (
            <a
              key={supplier.name}
              href={supplier.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center bg-mono-black text-white px-4 py-4 text-sm font-medium transition-all duration-300 hover:bg-mono-700 focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="mr-2">{supplier.name}</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clothing;
