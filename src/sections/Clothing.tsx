import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Supplier {
  name: string;
  url: string;
  logo?: string;
}

const suppliers: Supplier[] = [
  { name: 'AJM', url: 'https://www.ajmintl.com/', logo: 'https://www.ajmintl.com/wp-content/uploads/2024/09/AJM-LOGO-web-2-150x150.png' },
  { name: 'AlphaBroder', url: 'https://www.alphabroder.ca/home', logo: 'https://www.alphabroder.com/img/RotatingBanner_LoggedOutHomepage_03.27.25_US_Logo.png' },
  { name: 'Athletic Knit', url: 'https://www.athleticknit.com/', logo: 'https://www.athleticknit.com/image/2020/04/athletic-knit-logo-2.png' },
  { name: 'Augusta Sportswear', url: 'https://www.augustasportswear.com/', logo: 'https://www.augustasportswear.ca/logos/Augusta-LOGO_2C.png' },
  { name: 'Biz Collection', url: 'https://www.bizcollection.ca/', logo: 'https://www.bizcollection.ca/wp-content/uploads/2018/10/biz-collection-logo-2.png' },
  { name: 'Canada Sportswear', url: 'https://canadasportswear.com/', logo: 'https://canadasportswear.com/cdn/shop/files/logos_for_webste_-_CSW_2024_300x300.jpg' },
  { name: 'Fashion Biz', url: 'https://issuu.com/fashionbiznz/docs/2022_fashion_biz_-_ca?fr=sNDJkYjg2NjQ3' },
  { name: 'Kobe Sportswear', url: 'https://kobesportswear.com/', logo: 'https://kobesportswear.com/wp-content/themes/kobesportswear/img/refresh/kobe_sportswear_logo_header.png' },
  { name: 'S&S Canada', url: 'https://en-ca.ssactivewear.com/', logo: 'https://pbs.twimg.com/profile_images/1268592851755569154/xByCrI3w_400x400.jpg' },
  { name: 'Sanmar', url: 'https://www.sanmarcanada.com/', logo: 'https://static.sanmarcanada.com/frontend/Infortis/ultimo_ui/en_US/images/logo.png' },
  { name: 'Storm Tech', url: 'https://www.stormtech.ca/', logo: 'https://www.stormtechperformance.com/assets/img/logo.png' },
  { name: 'TriMark Sportswear', url: 'https://www.trimarksportswear.com/home_page', logo: 'https://www.trimarksportswear.com/user/themes/trimark/images/logos/logo.svg' },
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map((supplier, index) => (
            <a
              key={supplier.name}
              href={supplier.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center bg-white border border-mono-200 rounded-xl px-4 py-5 transition-all duration-300 hover:border-mono-300 hover:shadow-md focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Logo Section - Fixed Width */}
              {supplier.logo ? (
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img
                    src={supplier.logo}
                    alt={`${supplier.name} logo`}
                    className="w-full h-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-mono-100 text-mono-600 font-bold text-xl flex-shrink-0 rounded-lg">
                  {supplier.name.charAt(0)}
                </div>
              )}
              
              {/* Content Section */}
              <div className="flex-1 flex items-center justify-between ml-4">
                <span className="text-base font-sans font-medium text-mono-900 group-hover:text-mono-black transition-colors">
                  {supplier.name}
                </span>
                <ExternalLink 
                  size={20} 
                  className="ml-3 text-mono-400 group-hover:text-mono-700 transition-colors flex-shrink-0" 
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clothing;
