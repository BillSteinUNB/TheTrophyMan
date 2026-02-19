import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Catalog {
  name: string;
  url: string;
  logo?: string;
}

const catalogs: Catalog[] = [
  { name: 'Bullet by PCNA', url: 'https://www.pcna.com/en-ca/brand/bullet', logo: 'https://images.pcna.com/Data/Media/b95bc4ab-a9b0-4f34-a9d4-f2ed42465e7blogo-bullet.png' },
  { name: 'Barhill Catalog', url: 'https://catalog.barhill.com/', logo: 'https://barhill.com/images/barhill.png' },
  { name: 'Stars Awards', url: 'https://stars.awardscat.com/#p=1', logo: 'https://le-cdn.hibuwebsites.com/df4eef5640214dcc921fbb808860b6b7/dms3rep/multi/opt/Star-awards-Logo-1920w.png' },
  { name: 'Tromart Awards', url: 'https://tromartawards.com/nc2024/#p=1', logo: 'https://online.fliphtml5.com/qbjpc/accountlogo.jpg' },
  { name: 'Awards of Distinction', url: 'https://www.awardsofdistinction.ca/', logo: 'https://www.promoplace.com/awardsofdistinction/files/0.png' },
  { name: 'Caldwell Recognition', url: 'https://caldwellrecognition.com/catalogs/awards_and_recognition/Index.html#p=1', logo: 'https://caldwellrecognition.com/media/logo/stores/1/logo_1_.png' },
];

const Trophies = () => {
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
      id="trophies"
      ref={sectionRef}
      className="section-padding bg-white"
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
              src="/cat-trophies.jpg"
              alt="Trophies, Awards & Swag"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-heading text-mono-black mb-3">TROPHIES / AWARDS / SWAG</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl mb-4">
            Browse our award and recognition catalogs. Custom engraving available on almost any personal item.
          </p>
          <p className="text-small text-mono-500">
            Please <a href="#contact" className="underline hover:text-mono-black">contact us</a> to find out more information about custom engraving.
          </p>
        </div>

        {/* Catalog List */}
        <div className="max-w-2xl mx-auto">
          {catalogs.map((catalog, index) => (
            <a
              key={catalog.name}
              href={catalog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-stretch overflow-hidden bg-white border-2 border-mono-200 mb-4 transition-all duration-300 hover:border-mono-black hover:shadow-lg focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Logo Section - Full Height */}
              {catalog.logo ? (
                <div className="w-32 flex items-center justify-center bg-mono-50 p-4 border-r-2 border-mono-200">
                  <img
                    src={catalog.logo}
                    alt={`${catalog.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 flex items-center justify-center bg-mono-black text-white font-bold text-2xl border-r-2 border-mono-200">
                  {catalog.name.charAt(0)}
                </div>
              )}
              
              {/* Content Section */}
              <div className="flex-1 flex items-center justify-center px-8 py-6 relative">
                <span className="text-lg font-serif text-mono-black group-hover:text-mono-900 transition-colors text-center">
                  {catalog.name}
                </span>
                <ExternalLink 
                  size={20} 
                  className="absolute right-6 text-mono-400 group-hover:text-mono-black transition-colors" 
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trophies;
