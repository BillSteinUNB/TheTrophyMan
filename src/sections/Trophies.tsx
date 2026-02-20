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
  { name: 'Tromart Awards', url: 'https://tromartawards.com/nc2024/#p=1' },
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
          <div className="max-w-4xl mx-auto">
            <p className="text-body text-mono-600 mb-4">
              Browse our award and recognition catalogs. Custom engraving available on almost any personal item.
            </p>
            <p className="text-small text-mono-500">
              Please <a href="#contact" className="underline hover:text-mono-black">contact us</a> to find out more information about custom engraving.
            </p>
          </div>
        </div>

        {/* Catalog List */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalogs.map((catalog, index) => (
            <a
              key={catalog.name}
              href={catalog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center bg-white border border-mono-200 rounded-xl px-4 py-5 transition-all duration-300 hover:border-mono-400 hover:shadow-lg focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Logo Section - Fixed Width Container */}
              <div className="w-28 h-20 flex items-center justify-center flex-shrink-0">
                {catalog.logo ? (
                  <img
                    src={catalog.logo}
                    alt={`${catalog.name} logo`}
                    className="max-w-full max-h-full object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-mono-100 text-mono-600 font-bold text-xl rounded-lg">
                    {catalog.name.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="flex-1 flex items-center justify-between ml-4">
                <span className="text-base font-sans font-medium text-mono-900 group-hover:text-mono-black transition-colors">
                  {catalog.name}
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

export default Trophies;
