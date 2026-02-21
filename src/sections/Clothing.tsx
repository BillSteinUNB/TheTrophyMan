import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Supplier {
  name: string;
  url: string;
  logo?: string;
  scale?: number;
  translateX?: string;
  translateY?: string;
}

const suppliers: Supplier[] = [
  { name: 'AJM', url: 'https://www.ajmintl.com/', logo: '/AJMLogo.jpg', scale: 0.9 },
  { name: 'Athletic Knit', url: 'https://www.athleticknit.com/', logo: '/AthleticKnit.png', scale: 1.15 },
  { name: 'Biz Collection', url: 'https://www.bizcollection.ca/', logo: '/BizCollection.png', scale: 1.2 },
  { name: 'Canada Sportswear', url: 'https://canadasportswear.com/', logo: 'https://canadasportswear.com/cdn/shop/files/logos_for_webste_-_CSW_2024_300x300.jpg' },
  { name: 'Fashion Biz', url: 'https://issuu.com/fashionbiznz/docs/2022_fashion_biz_-_ca?fr=sNDJkYjg2NjQ3', logo: '/fashionbiz-logo.svg', scale: 0.65 },
  { name: 'Kobe Sportswear', url: 'https://kobesportswear.com/', logo: 'https://kobesportswear.com/wp-content/themes/kobesportswear/img/refresh/kobe_sportswear_logo_header.png', scale: 0.65 },
  { name: 'S&S Canada', url: 'https://en-ca.ssactivewear.com/', logo: '/S&S Activewear.png', scale: 0.6 },
  { name: 'Sanmar', url: 'https://www.sanmarcanada.com/', logo: 'https://static.sanmarcanada.com/frontend/Infortis/ultimo_ui/en_US/images/logo.png', translateX: '10%', translateY: '10%' },
  { name: 'Storm Tech', url: 'https://www.stormtech.ca/', logo: '/Stormtec.webp', scale: 1.15 },
  { name: 'TriMark Sportswear', url: 'https://www.trimarksportswear.com/home_page', logo: '/Trimark.jpg', scale: 0.75 },
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
      className="bg-white flex flex-col"
    >
      <div className="bg-mono-off-white w-full pt-[clamp(4rem,10vh,7.5rem)] pb-12 md:pb-16">
        <div className="container-max">
          {/* Header with Images */}
          <div
            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
              <div className="aspect-[16/9] md:aspect-auto md:h-[400px] overflow-hidden flex items-center justify-center bg-mono-off-white rounded-2xl">
                <img
                  src="/TMHatHoodieNew.png"
                  alt="Clothing & Accessories"
                  className="w-full h-full object-contain scale-[0.85]"
                />
              </div>
              <div className="aspect-[16/9] md:aspect-auto md:h-[400px] overflow-hidden flex items-center justify-center bg-mono-off-white rounded-2xl">
                <img
                  src="/Pivotboxing.png"
                  alt="Boxer wearing Trophy Man apparel"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h2 className="text-heading text-mono-black mb-3">CLOTHING & ACCESSORIES</h2>
            <div className="w-12 h-0.5 bg-mono-black mb-4" />
            <div className="max-w-4xl mx-auto">
              <p className="text-body text-mono-600">
                Browse our trusted suppliers for apparel and accessories. Custom embroidery and screen printing available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 md:py-16 pb-[clamp(4rem,10vh,7.5rem)]">
        <div className="container-max">
          {/* Supplier Grid */}
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 md:gap-6">
            {suppliers.map((supplier, index) => (
              <a
                key={supplier.name}
                href={supplier.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus-ring border border-mono-100/50 hover:border-mono-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {/* Logo Section */}
                <div className="w-full h-24 sm:h-32 flex items-center justify-center mb-4">
                  {supplier.logo ? (
                    <img
                      src={supplier.logo}
                      alt={`${supplier.name} logo`}
                      className="max-w-full max-h-full object-contain grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      style={{
                        transform: `scale(${supplier.scale || 1}) translate(${supplier.translateX || '0'}, ${supplier.translateY || '0'})`,
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-mono-50 text-mono-400 font-bold text-2xl rounded-xl transition-colors duration-300 group-hover:bg-mono-100 group-hover:text-mono-800">
                      {supplier.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex items-center gap-2 w-full justify-center">
                  <span className="text-sm sm:text-base font-sans font-medium text-mono-600 group-hover:text-mono-black transition-colors text-center">
                    {supplier.name}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-mono-300 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-mono-black"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clothing;
